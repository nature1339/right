import { useRouter } from "next/router";
import userStore from "@store/user";
import { loginApi } from "@utils/api";
import { parseJwt } from "@utils/jwt";
import { useEffect } from "react";
import themeStore from "@store/theme";
import useToast from "@hooks/toast";
import ToastModal from "@components/toastModal";
import Head from "@components/head";
import { useTranslation } from "react-i18next";

export default function Login() {
  const { t } = useTranslation();
  const { isVisible, message, showToast } = useToast();
  const { theme } = themeStore();
  const [siteName, mode] = theme.split("-");

  const router = useRouter();
  const { setUser, userInfo } = userStore();

  useEffect(() => {
    if (userInfo.accessToken) {
      router.push("/orders");
    }
  }, [userInfo.accessToken]);

  const handleLogin = async (e) => {
    e.preventDefault();
    const form = e.target;
    const loginId = form.loginId.value;
    const password = form.password.value;

    if (!loginId || !password) {
      showToast(t("아이디와 비밀번호를 모두 입력해 주세요."));
      return;
    }

    try {
      const data = await loginApi(loginId, password, "POST");

      // ✅ 로그인 응답 확인용 로그 추가
      console.log("🧪 로그인 응답:", data);
      console.log("🧪 accessToken:", data.accessToken);
      console.log("🧪 refreshToken:", data.refreshToken);

      if (data.accessToken && data.refreshToken) {
        const userData = await parseJwt(data.accessToken);

        // Zustand에 저장
        setUser(data.accessToken, data.refreshToken, userData.userid);

        // localStorage에 저장
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("refreshToken", data.refreshToken);

        router.push("/orders");
      } else {
        throw new Error(t("로그인에 실패했습니다. 다시 시도해 주세요."));
      }
    } catch (error) {
      showToast(t(error.message || "로그인 중 오류 발생"));
    }
  };

  return (
    <>
      <Head title={t("로그인")} />
      <div className={`body_wrap sign_body ${mode}`}>
        <div className="body_wrap_inner">
          <form id="loginForm" onSubmit={handleLogin} autoComplete="off">
            <div className="sign_wrap sign_login_wrap">
              <div className="sign_text">
                <h2>LOG IN</h2>
                <p>{t("거래에 참여하려면 로그인하십시오.")}</p>
              </div>
              <div className="sign_box">
                <div className="input_wrap">
                  <input
                    type="text"
                    id="loginId"
                    name="loginId"
                    placeholder={t("아이디를 입력하세요.")}
                  />
                </div>
                <div className="input_wrap">
                  <input
                    type="password"
                    id="password"
                    name="password"
                    placeholder={t("비밀번호 입력하세요.")}
                  />
                </div>
                <div className="btn_wrap">
                  <button
                    className="btn primary !bg-primary !border-primary hover:!shadow-none"
                    type="submit"
                  >
                    {t("로그인")}
                  </button>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}
