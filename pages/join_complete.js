import { useTranslation } from "react-i18next";
const JoinComplete = () => {
  const { t, i18n } = useTranslation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f7] px-4 py-20 md:py-40">
      <div className="w-full max-w-[580px] px-4">
        <h2 className="text-[44px] font-bold text-center mb-3">
          {t("회원가입")}
        </h2>
        <div className="flex justify-center items-center gap-5 mb-16">
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          <p className="text-[18px] text-[#636363] text-center">
            {/* 홍길동님(아이디)의 회원가입이 성공적으로
            <br />
            완료되었습니다. */}
            {t("회원가입이 완료되었습니다.")}
          </p>
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
        </div>
        <div className="flex justify-center mb-20">
          <img
            src="/pnc/join_complete.png"
            alt="회원가입 완료"
            className="mix-blend-darken"
          />
        </div>
        <button
          type="button"
          className={
            "w-full bg-[#324580] text-[20px] text-white py-[17px] font-semibold rounded-md hover:bg-indigo-900 transition"
          }
        >
          {t("로그인")}
        </button>
      </div>
    </div>
  );
};

export default JoinComplete;
