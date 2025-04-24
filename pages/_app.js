import { useRouter } from "next/router";
import AuthGuard from "@components/authGuard";
import themeStore from "@store/theme";
import { WebSocketProvider } from "@utils/WebSocketProvider";
import { OrderWebSocketProvider } from "@utils/OrderWebSocketProvider";
import {
  HydrationBoundary,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { useState, useEffect } from "react";
import Head from "next/head";
import HealthGuard from "@components/healthGuard";
import Header from "@components/header";
import clsx from "clsx";

import "@css/index.css";
import "@css/mainHead.css";
// import "@css/pnc.css";
import "@utils/in18";
import "@css/sing.css";
import "@css/daterangepicker.css";

export default function App({ Component, pageProps }) {
  const { theme } = themeStore();
  const [siteName, mode] = theme.split("-");

  const router = useRouter();

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("pnc_html");
    if (siteName === "pnc") {
      if (
        [
          "/",
          "/login",
          "/join",
          "/company-intro",
          "/notice",
          "/domestic-futures",
          "/foreign-futures",
          "/system",
        ].includes(router.pathname)
      ) {
        html.classList.add("pnc_html");
      }
      // html.classList.add("pnc_html");
    }
  }, [siteName]);

  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 0,
            gcTime: 0,
          },
        },
      })
  );

  // 서버 에러페이지
  if (router.pathname === "/server-error") {
    return <Component {...pageProps} />;
  }

  return (
    <>
      <Head>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
      </Head>
      <QueryClientProvider client={queryClient}>
        <HydrationBoundary state={pageProps.dehydratedState}>
          <HealthGuard>
            <AuthGuard>
              <div
                className={clsx(
                  theme,
                  "body_wrap",
                  // 다크모드 사용 안함 페이지
                  [
                    "/",
                    "/company-intro",
                    "/domestic-futures",
                    "/foreign-futures",
                    "/system",
                    ,
                  ].includes(router.pathname)
                    ? `${siteName}-light login_body`
                    : mode,
                  {
                    // 로그인 회원가입 페이지
                    "pb-0": ["/join", "/login"].includes(router.pathname),
                  },
                  {
                    "pt-[100px]":
                      siteName == "pnc" &&
                      [
                        "/orders",
                        "/cash",
                        "/history",
                        "/ovnight",
                        "/counseling",
                      ].includes(router.pathname),
                  }
                )}
              >
                <div className="body_wrap_inner">
                  <Header />
                  {/* 소켓 사용 안함 페이지 */}
                  {[
                    "/",
                    "/intro-test",
                    "/login",
                    "/join",
                    "/copy-trading",
                    "/company-intro",
                    "/domestic-futures",
                    "/foreign-futures",
                    "/system",
                    "/counseling",
                    "/notice",
                  ].includes(router.pathname) ? (
                    <Component {...pageProps} />
                  ) : (
                    <WebSocketProvider>
                      <OrderWebSocketProvider>
                        <Component {...pageProps} />
                      </OrderWebSocketProvider>
                    </WebSocketProvider>
                  )}
                </div>
              </div>
            </AuthGuard>
          </HealthGuard>
        </HydrationBoundary>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </>
  );
}
