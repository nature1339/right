import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import userStore from "store/user";

export default function AuthGuard({ children }) {
  const router = useRouter();
  const { userInfo, isLoading: isLoadingUserInfo } = userStore();
  const [isLoading, setIsLoading] = useState(true);

  // 비로그인시 접근 불가 페이지
  const allowedPaths = [
    "/orders",
    "/cash",
    "/history",
    "/ovnight",
    "/counseling",
    "/copy-trading",
  ];
  const isProtectedPath = allowedPaths.includes(router.pathname);
  const isAuthenticated = !!userInfo.accessToken || !!userInfo.refreshToken;

  useEffect(() => {
    if (isProtectedPath && !isAuthenticated && !isLoadingUserInfo) {
      router.push("/login");
    } else if (isProtectedPath && isAuthenticated) {
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, [isAuthenticated, isProtectedPath, isLoadingUserInfo]);

  if (isLoading) {
    return <></>;
  }

  if (!isProtectedPath) return children;

  if (!isAuthenticated) return null;

  return children;
}
