import React, { useEffect, useState } from "react";
import Link from "next/link";
import Header from "@components/header";
import useFormState from "@hooks/useFormState";
import useToast from "@hooks/toast";
import ToastModal from "@components/toastModal";
import { useMutation } from "@tanstack/react-query";
import { join, apiRequest } from "@utils/api";
import { useRouter } from "next/router";
import themeStore from "@store/theme";
import { privacyPolicyAgree, privacyPolicyAgreeEn } from "@constants/join";
import clsx from "clsx";
import Head from "@components/head";
import { useTranslation } from "react-i18next";
import { CiCircleInfo } from "react-icons/ci";
import SelectBox from "@components/pnc/ui/SelectBox";
import Checkbox from "@components/pnc/ui/Checkbox";

const SignupForm = () => {
  const { t, i18n } = useTranslation();
  const { theme } = themeStore();
  const [siteName, mode] = theme.split("-");

  const router = useRouter();
  const { isVisible, message, showToast } = useToast();
  const [formValues, onChange] = useFormState({
    userid: "",
    password: "",
    passwordConfirm: "",
    username: "",
    mobile: "",
    bankname: "",
    ownername: "",
    accountno: "",
    joincode: "",
  });
  const [isPrivacyPolicyAgree, setIsPrivacyPolicyAgree] = useState(false);
  const [isAgree, setIsAgree] = useState(false);

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [banksList, setBanksList] = useState([]);
  useEffect(() => {
    const fetchBanksList = async () => {
      try {
        const res = await apiRequest("/banks/", { method: "GET" });
        setBanksList(res);
        setIsError(false);
      } catch (error) {
        console.error("은행 리스트를 불러오는 데 실패했습니다.", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanksList();
  }, []);

  const { mutate: joinMutate } = useMutation({
    mutationFn: join,
    onSuccess: () => {
      // showToast(t("회원가입이 완료되었습니다."));
      router.push("/join-complete");
    },
    onError: (error) => {
      if (error.status === 400 || error.status === 409) {
        showToast(error.message);
        return;
      }

      showToast(t("서버 오류입니다. 관리자에게 문의하세요."));
    },
  });

  const onJoin = (e) => {
    e.preventDefault(); // Prevent page refresh

    const {
      userid,
      password,
      passwordConfirm,
      username,
      mobile,
      accountno,
      bankname,
      ownername,
      joincode,
    } = formValues;

    const useridRegex = /^[A-Za-z0-9]{4,}$/; // 영어 소문자, 대문자, 숫자 포함, 4자리 이상만 허용
    if (!useridRegex.test(userid)) {
      showToast(t("아이디는 영어와 숫자로 4자리 이상이어야 합니다."));
      return;
    }

    if (password.length < 6) {
      showToast(t("비밀번호는 6자리 이상이어야 합니다."));
      return;
    }

    if (password !== passwordConfirm) {
      showToast(t("비밀번호가 일치하지 않습니다."));
      return;
    }

    const mobileRegex = /^[0-9]+$/;
    if (!mobileRegex.test(mobile)) {
      showToast(t("전화번호는 숫자만 입력 가능합니다."));
      return;
    }

    if (bankname === "") {
      showToast(t("은행을 선택하세요."));
      return;
    }
    if (ownername === "") {
      showToast(t("예금주를 입력하세요."));
      return;
    }

    if (!mobileRegex.test(accountno)) {
      showToast(t("계좌번호는 숫자만 입력 가능합니다."));
      return;
    }

    if (joincode === "") {
      showToast(t("가입코드를 입력하세요."));
      return;
    }

    if (username === "") {
      showToast(t("이름을 입력하세요."));
      return;
    }

    joinMutate({
      userInfo: {
        userid,
        password,
        username,
        mobile,
        joincode,
      },
      accountInfo: {
        userid,
        bankname,
        accountno,
        ownername,
      },
    });
  };

  return (
    <div className="min-h-screen py-[80px] md:py-[160px] flex items-center justify-center bg-[#f3f5f7] p-[16px] auth-wrap">
      {isPrivacyPolicyAgree ? (
        <div className="w-full max-w-[580px] px-[16px]">
          <h2 className="text-[44px] font-bold text-center mb-[12px]">
            회원가입
          </h2>
          <div className="flex justify-center items-center gap-[20px] mb-[64px]">
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
            <p className="text-[18px] text-[#636363] text-center">
              회원가입을 위한 정보를 입력해주세요.
            </p>
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          </div>

          <form
            id="joinForm"
            onSubmit={onJoin}
            autoComplete="off"
            className="space-y-[16px]"
          >
            {/* 아이디 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                아이디 <span className="text-red-500">*</span>
              </label>
              <input
                name="userid"
                id="userId"
                value={formValues.userid}
                onChange={onChange}
                type="text"
                placeholder={t("사용하실 아이디를 입력하세요.(4자리 이상)")}
                className="w-full border rounded-md"
              />
              <div className="flex gap-[8px] mt-[8px]">
                <CiCircleInfo size={18} className="mt-[4px]" color="#131313" />
                <p className="text-[18px] text-[#636363]">
                  가입 후에는 사용자 아이디를 변경할 수 없습니다.
                  <br />
                  아이디 분실 시 자산 손실의 위험이 있으니 주의하시기 바랍니다.
                </p>
              </div>
            </div>

            {/* 비밀번호 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                비밀번호 <span className="text-red-500">*</span>
              </label>
              <input
                id="password"
                name="password"
                value={formValues.password1nd}
                onChange={onChange}
                type="password"
                placeholder={t("비밀번호(6자리 이상)")}
                className="w-full border rounded-md"
                autoComplete="new-password"
              />
            </div>

            {/* 비밀번호 확인 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                비밀번호 확인 <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder={t("비밀번호확인")}
                autoComplete="new-password"
                value={formValues.password2nd}
                onChange={onChange}
                className="w-full border rounded-md"
              />
            </div>

            {/* 이름 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                이름
              </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder={t("이름(실명)을 입력하세요.")}
                value={formValues.username}
                onChange={onChange}
                className="w-full border rounded-md"
              />
            </div>

            {/* 전화번호 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                전화번호
              </label>
              <input
                type="text"
                id="mobile"
                name="mobile"
                placeholder={t("전화번호를 입력하세요.(숫자만 입력 가능)")}
                value={formValues.mobile}
                onChange={onChange}
                className="w-full border rounded-md"
              />
            </div>

            {/* 계좌정보 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                계좌번호 <span className="text-red-500">*</span>
              </label>
              <div className="flex space-x-[8px]">
                <input
                  type="text"
                  id="accountno"
                  name="accountno"
                  placeholder={t("계좌번호 (숫자만 입력 가능)")}
                  value={formValues.accountno}
                  onChange={onChange}
                  className="w-2/3 px-[12px] font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
                />
                {isLoading && (
                  <div className="flex items-center justify-between w-full px-[12px] font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default">
                    {t("로딩 중...")}
                  </div>
                )}
                {isError && (
                  <div className="flex items-center justify-between w-full px-[12px] font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default">
                    {t("은행 불러오기 실패")}
                  </div>
                )}
                {banksList && (
                  <SelectBox
                    id="bankname"
                    className="w-1/3"
                    name="bankname"
                    value={formValues.bankname}
                    onChange={(e) => {
                      onChange(e);
                    }}
                    option={[
                      {
                        name: "은행선택",
                        value: "",
                      },
                      ...banksList.map((bank) => {
                        return {
                          name: bank.name,
                          value: bank.id,
                        };
                      }),
                    ]}
                  />
                )}
              </div>
            </div>
            <div>
              <input
                type="text"
                id="ownername"
                name="ownername"
                placeholder={t("예금주")}
                value={formValues.ownername}
                onChange={onChange}
                className="w-full border rounded-md"
              />
            </div>

            {/* 가입코드 */}
            <div>
              <label className="block text-[19px] font-semibold mb-[8px] text-[#131313]">
                가입코드
              </label>
              <input
                type="text"
                id="joincode"
                name="joincode"
                placeholder={t("가입코드를 입력하세요")}
                value={formValues.joincode}
                onChange={onChange}
                className="w-full border rounded-md"
              />
            </div>

            {/* 버튼 */}
            <div>
              <button
                type="submit"
                className="mt-[64px] w-full bg-[#324580] text-[20px] text-white py-[17px] font-semibold rounded-md hover:bg-indigo-900 transition"
              >
                {t("회원가입")}
              </button>
            </div>
          </form>

          <div className="flex justify-center items-center gap-[20px] my-[28px]">
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
            <p className="text-[18px] text-[#636363] text-center">
              {t("이미 회원이시면 로그인 해주세요.")}
            </p>
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          </div>
          <div className="w-[200px] mx-auto border border-[#C3C3C3] rounded-md">
            <Link
              href="/login"
              className="block text-center bg-white text-[20px] py-[17px] font-semibold rounded-md transition"
            >
              {t("로그인")}
            </Link>
          </div>
        </div>
      ) : (
        <div className="w-full max-w-[580px] px-[16px]">
          <h2 className="text-[44px] font-bold text-center mb-[12px]">
            {t("약관동의")}
          </h2>
          <div className="flex justify-center items-center gap-[20px] mb-[64px]">
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
            <p className="text-[18px] text-[#636363] text-center">
              {t("개인정보 수집 및 이용 동의")}
            </p>
            <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          </div>

          <div className="border border-gray-300 rounded-md p-[32px] h-[400px] overflow-y-auto text-[14px] text-[#636363] whitespace-pre-wrap mb-[16px] bg-white leading-snug">
            {i18n.language === "ko" ? privacyPolicyAgree : privacyPolicyAgreeEn}
          </div>

          <div className="flex items-center mb-[64px] pt-[12px]">
            {/* <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-[8px]"
          /> */}
            <label htmlFor="agree" className="flex items-center">
              <Checkbox
                id="agree"
                onChange={(e) => setIsAgree((prev) => !prev)}
              />

              <span className="text-[16px] text-[#131313] ml-[8px]"></span>
              {t("약관을 내용을 읽고 동의합니다.")}
            </label>
          </div>

          <button
            type="button"
            onClick={() => setIsPrivacyPolicyAgree(true)}
            disabled={!isAgree}
            className={`w-full text-[20px] text-white py-[17px] font-semibold rounded-md transition ${
              isAgree
                ? "bg-[#324580] hover:bg-indigo-900"
                : "bg-gray-400 cursor-not-allowed"
            }`}
          >
            {t("확인")}
          </button>
        </div>
      )}
      <ToastModal message={message} isVisible={isVisible} />
    </div>
  );
};

export default SignupForm;
