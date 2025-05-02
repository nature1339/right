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

export default function Join() {
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
      showToast(t("회원가입이 완료되었습니다."));
      setTimeout(() => {
        router.push("/login");
      }, 3000);
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
    <>
      <Head title={t("회원가입")} />
      <div className={`body_wrap sign_body ${mode}`}>
        <div className="body_wrap_inner">
          <Header />
          <form id="joinForm" onSubmit={onJoin} autoComplete="off">
            {isPrivacyPolicyAgree ? (
              <div className="sign_wrap sign_top ">
                <div className="sign_text">
                  <h2>SIGN UP</h2>
                  <p>
                    {isPrivacyPolicyAgree
                      ? t("회원가입을 위한 정보를 입력해주세요.")
                      : t("개인정보 수집 및 이용 동의")}
                  </p>
                </div>
                <div className="sign_box">
                  <div className="input_wrap">
                    <input
                      type="text"
                      name="userid"
                      id="userId"
                      placeholder={t(
                        "사용하실 아이디를 입력하세요.(4자리 이상)"
                      )}
                      value={formValues.userid}
                      onChange={onChange}
                    />
                    <p>
                      {t("가입 후에는 사용자 아이디를 변경할 수 없습니다.")}
                      <br />
                      {t(
                        "아이디 분실 시 자산 손실의 위험이 있으니 주의하시기 바랍니다."
                      )}
                    </p>
                  </div>

                  <div className="input_wrap">
                    <input
                      type="password"
                      id="password"
                      name="password"
                      placeholder={t("비밀번호(6자리 이상)")}
                      autoComplete="new-password"
                      value={formValues.password1nd}
                      onChange={onChange}
                    />
                  </div>

                  <div className="input_wrap">
                    <input
                      type="password"
                      id="passwordConfirm"
                      name="passwordConfirm"
                      placeholder={t("비밀번호확인")}
                      autoComplete="new-password"
                      value={formValues.password2nd}
                      onChange={onChange}
                    />
                  </div>

                  <div className="input_wrap">
                    <input
                      type="text"
                      id="username"
                      name="username"
                      placeholder={t("이름(실명)을 입력하세요.")}
                      value={formValues.username}
                      onChange={onChange}
                    />
                  </div>

                  <div className="input_wrap">
                    <input
                      type="text"
                      id="mobile"
                      name="mobile"
                      placeholder={t(
                        "전화번호를 입력하세요.(숫자만 입력 가능)"
                      )}
                      value={formValues.mobile}
                      onChange={onChange}
                    />
                  </div>
                  <div className="input_wrap">
                    <select
                      name="bankname"
                      value={formValues.bankname}
                      onChange={onChange}
                    >
                      <option value="">{t("은행선택")}</option>
                      {isLoading && <option disabled>{t("로딩 중...")}</option>}
                      {isError && (
                        <option disabled>{t("은행 불러오기 실패")}</option>
                      )}
                      {banksList.map((bank) => (
                        <option
                          key={bank.id || bank.code || bank.name}
                          value={bank.name}
                        >
                          {t(bank.name)}
                        </option>
                      ))}
                    </select>
                  </div>
                  {/*<div className="input_wrap">
                    <select
                      name="bankname"
                      id="bankname"
                      value={formValues.bankname}
                      onChange={onChange}
                    >
                      <option value="">{t("은행선택")}</option>
                      <option value="KB국민은행">{t("KB국민은행")}</option>
                      <option value="농협은행">{t("농협은행")}</option>
                      <option value="신한은행">{t("신한은행")}</option>
                      <option value="우리은행">{t("우리은행")}</option>
                      <option value="하나은행">{t("하나은행")}</option>
                      <option value="SC제일은행">{t("SC제일은행")}</option>
                      <option value="한국씨티은행">{t("한국씨티은행")}</option>
                      <option value="DGB대구은행">{t("DGB대구은행")}</option>
                      <option value="BNK부산은행">{t("BNK부산은행")}</option>
                      <option value="광주은행">{t("광주은행")}</option>
                      <option value="제주은행">{t("제주은행")}</option>
                      <option value="전북은행">{t("전북은행")}</option>
                      <option value="BNK경남은행">{t("BNK경남은행")}</option>
                      <option value="케이뱅크">{t("케이뱅크")}</option>
                      <option value="카카오뱅크">{t("카카오뱅크")}</option>
                      <option value="KDB산업은행">{t("KDB산업은행")}</option>
                      <option value="기업은행">{t("기업은행")}</option>
                      <option value="새마을금고">{t("새마을금고")}</option>
                      <option value="SH수협은행">{t("SH수협은행")}</option>
                      <option value="우체국">{t("우체국")}</option>
                      <option value="신협은행">{t("신협은행")}</option>
                    </select>
                  </div>*/}

                  <div className="input_wrap">
                    <input
                      type="text"
                      id="ownername"
                      name="ownername"
                      placeholder={t("예금주")}
                      value={formValues.ownername}
                      onChange={onChange}
                    />
                  </div>

                  <div className="input_wrap">
                    <input
                      type="text"
                      id="accountno"
                      name="accountno"
                      placeholder={t("계좌번호 (숫자만 입력 가능)")}
                      value={formValues.accountno}
                      onChange={onChange}
                    />
                  </div>

                  <div className="input_wrap">
                    <input
                      type="text"
                      id="joincode"
                      name="joincode"
                      placeholder={t("가입코드를 입력하세요")}
                      value={formValues.joincode}
                      onChange={onChange}
                    />
                  </div>

                  <div className="btn_wrap">
                    <button
                      className="btn bg-primary text-white border-primary"
                      type="submit"
                    >
                      {t("회원가입")}
                    </button>
                  </div>

                  <p className="login_text">
                    <Link href="/login" className="underline">
                      {t("이미 회원이시면 로그인 해주세요.")}
                    </Link>
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center ">
                <div className="border border-gray-200 border-solid rounded-2xl max-w-[500px] w-full p-12">
                  <div className="sign_text">
                    <h2>SIGN UP</h2>
                    <p>
                      {isPrivacyPolicyAgree
                        ? t("회원가입을 위한 정보를 입력해주세요.")
                        : t("개인정보 수집 및 이용 동의")}
                    </p>
                  </div>
                  <div className="max-w-[450px] w-full">
                    <textarea
                      className="w-full h-[45vh] border-gray-200 resize-none rounded-md p-4 dark:bg-[#2b3139] text-[14px]"
                      value={
                        i18n.language === "ko"
                          ? privacyPolicyAgree
                          : privacyPolicyAgreeEn
                      }
                      readOnly
                    />
                    <div className="flex gap-2 mt-2 justify-between items-center">
                      <label className="flex gap-2 items-center cursor-pointer">
                        <input
                          className="w-7 h-7"
                          type="checkbox"
                          checked={isAgree}
                          onChange={() => setIsAgree((prev) => !prev)}
                        />
                        <div className="dark:text-[#e3e3e3]">
                          {t("약관을 내용을 읽고 동의합니다.")}
                        </div>
                      </label>
                      <button
                        onClick={() => setIsPrivacyPolicyAgree(true)}
                        disabled={!isAgree}
                        className={clsx(
                          "w-[80px] h-[40px] text-white rounded-[.4rem] text-[14px]",
                          "bg-primary disabled:bg-gray-300",
                          "dark:bg-[#00aaff] dark:disabled:bg-gray-300"
                        )}
                      >
                        {t("확인")}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}
