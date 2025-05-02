import { useRouter } from "next/router";
import userStore from "@store/user";
import { loginApi } from "@utils/api";
import { parseJwt } from "@utils/jwt";
import { useEffect } from "react";
import themeStore from "@store/theme";
import useToast from "@hooks/toast";
import ToastModal from "@components/toastModal";
import { useTranslation } from "react-i18next";
import Checkbox from "@components/pnc/ui/Checkbox";

const LoginPNC = () => {
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
      <div className="min-h-screen flex items-center justify-center bg-[#f3f5f7] px-[16px] py-[80px] md:py-[160px] auth-wrap">
        <div className="w-full max-w-[580px] px-[16px]">
          <h2 className="text-[44px] font-bold text-center mb-[64px]">
            {t("로그인")}
          </h2>

          <form id="loginForm" onSubmit={handleLogin} autoComplete="off">
            <div className="mb-[16px]">
              <label
                htmlFor="username"
                className="block text-[19px] font-semibold mb-[8px] text-[#131313]"
              >
                아이디
              </label>
              <input
                id="loginId"
                name="loginId"
                type="text"
                placeholder={t("아이디를 입력하세요.")}
                className="w-full border rounded-md"
              />
            </div>

            <div className="mb-[20px]">
              <label
                htmlFor="password"
                className="block text-[19px] font-semibold mb-[8px] text-[#131313]"
              >
                비밀번호
              </label>
              <input
                id="password"
                name="password"
                type="password"
                placeholder={t("비밀번호 입력하세요.")}
                className="w-full border rounded-md"
              />
            </div>

            <div className="mb-[40px] flex items-center">
              <label htmlFor="remember" className="flex items-center">
                {/* <input type="checkbox" id="remember" className="mr-[8px]" /> */}
                <Checkbox id="remember" onChange={() => false} />
                <span className="text-[16px] text-[#131313] ml-[8px]">
                  아이디 저장
                </span>
              </label>
            </div>

            <button
              type="submit"
              className="w-full bg-[#324580] text-[20px] text-white py-[17px] font-semibold rounded-md hover:bg-indigo-900 transition"
            >
              {t("로그인")}
            </button>
          </form>

          <div className="flex justify-center items-center text-[16px] text-gray-600 mt-[24px]">
            <a href="/join" className="hover:underline">
              회원가입
            </a>
            <div className="mx-[24px] h-[16px] w-px bg-[#D9D9D9]"></div>
            <div className="space-x-[8px]">
              <a href="#" className="hover:underline">
                아이디 찾기
              </a>
              <span>·</span>
              <a href="#" className="hover:underline">
                비밀번호 변경
              </a>
            </div>
          </div>
        </div>
      </div>
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
};

export default LoginPNC;
