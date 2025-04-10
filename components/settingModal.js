import React, { useEffect, useState } from "react";
import RealtimeAlrimModal from "./realtimeAlrimModal";
import ChangePwModal from "./changePwModal";
import { useRouter } from "next/router";
import userStore from "../store/user";
import apiRequest, { getUser, getUserAccount } from "../utils/api";
import ToastModal from "@components/toastModal";
import useToast from "../hooks/toast";
import themeStore from "store/theme";
import { useQueryClient } from "@tanstack/react-query";
import { useQuery } from "@tanstack/react-query";
import Toggle from "react-toggle";
import { useTranslation } from "react-i18next";

import "react-toggle/style.css";

export default function NoticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { t, i18n } = useTranslation();
  const { theme, toggleTheme, setTheme } = themeStore();
  const [siteName, mode] = theme.split("-");

  const { isVisible, message, showToast } = useToast(); //토스트

  const [alrimModal, setAlrimModal] = useState(false);
  const openAlrimModal = () => setAlrimModal(true);
  const closeAlrimModal = () => setAlrimModal(false);

  const [chgPwModal, setChgPwModal] = useState(false);
  const openChgPwModal = () => setChgPwModal(true);
  const closeChgPwModal = () => setChgPwModal(false);

  const { clearUser } = userStore();
  const router = useRouter();

  // 초기 설정값 정의
  const defaultSettings = {
    orderConfirmBuy: false,
    orderConfirmSell: false,
    orderConfirmModify: false,
    orderConfirmCancel: false,
    orderFilledBuy: false,
    orderFilledSell: false,
    orderRejected: false,
    depositWithdrawal: false,
  };

  const [setting, setSetting] = useState(defaultSettings);

  const logout = () => {
    clearUser();
    onClose();
    router.push("/login");
  };

  useEffect(() => {
    getSetting();
  }, []);

  const getSetting = async () => {
    try {
      const response = await apiRequest("/user/settings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      setSetting(response || defaultSettings);
    } catch (error) {
      console.error("getSetting error:", error);
    }
  };

  const handleChange = (e) => {
    const { name, checked } = e.target;
    setSetting((prevSetting) => ({
      ...prevSetting,
      [name]: checked,
    }));
  };

  const queryClient = useQueryClient();

  const handleSave = async () => {
    try {
      await apiRequest("/user/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(setting),
      });
      showToast("설정이 저장되었습니다.");
      setTimeout(() => {
        onClose();
      }, 1000);
      queryClient.refetchQueries(["settings"]);
    } catch (error) {
      console.error("설정 저장 실패:", error);
    }
  };

  const { data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUser,
  });

  const { data: userAccount } = useQuery({
    queryKey: ["userAccount"],
    queryFn: getUserAccount,
  });

  return (
    <>
      <div className="modal_wrap" id="modal_setting">
        <div className="modal setting_st">
          <div className="modal_header">
            <h2>{t("설정")}</h2>
            <div className="close" onClick={onClose}></div>
          </div>
          <div className="modal_body">
            <div className="setting_wrap">
              <div className="inner">
                <h3>{t("회원 정보")}</h3>
                <div className="item">
                  <p>{t("아이디")}</p>
                  <div className="text-[14px]">{user?.userid}</div>
                </div>
                <div className="item">
                  <p>{t("이름")}</p>
                  <div className="text-[14px]">{user?.username}</div>
                </div>
                <div className="item">
                  <p>{t("은행명")}</p>
                  <div className="text-[14px]">{userAccount?.bankname}</div>
                </div>
                <div className="item">
                  <p>{t("계좌번호")}</p>
                  <div className="text-[14px]">{userAccount?.accountno}</div>
                </div>
                <h3>{t("주문확인 알림 설정")}</h3>
                {[
                  { name: "orderConfirmBuy", label: t("매수주문 확인") },
                  { name: "orderConfirmSell", label: t("매도주문 확인") },
                  { name: "orderConfirmModify", label: t("정정주문 확인") },
                  { name: "orderConfirmCancel", label: t("취소주문 확인") },
                ].map((item) => (
                  <div className="item" key={item.name}>
                    <p>{item.label}</p>
                    <Toggle
                      className="setting-toggle [&_.react-toggle-thumb]:!border-none [&_.react-toggle-track]:bg-gray-300 [&_.react-toggle-track]:w-[38px] [&_.react-toggle-track]:h-[20px] [&_.react-toggle-thumb]:w-[18px] [&_.react-toggle-thumb]:h-[18px]"
                      // checked={copyTrader.isActivated}
                      checked={setting[item.name] || false}
                      icons={false}
                      name={item.name}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <h3>{t("주문체결 알림 설정")}</h3>
                {[
                  { name: "orderFilledBuy", label: t("매수주문 체결시") },
                  { name: "orderFilledSell", label: t("매도주문 체결시") },
                  { name: "orderRejected", label: t("주문 거부시") },
                ].map((item) => (
                  <div className="item" key={item.name}>
                    <p>{item.label}</p>
                    <Toggle
                      className="setting-toggle [&_.react-toggle-thumb]:!border-none [&_.react-toggle-track]:bg-gray-300 [&_.react-toggle-track]:w-[38px] [&_.react-toggle-track]:h-[20px] [&_.react-toggle-thumb]:w-[18px] [&_.react-toggle-thumb]:h-[18px]"
                      // checked={copyTrader.isActivated}
                      checked={setting[item.name] || false}
                      icons={false}
                      name={item.name}
                      onChange={handleChange}
                    />
                  </div>
                ))}

                <h3>{t("입출금 관련 알림")}</h3>
                <div className="item">
                  <p>{t("입출금 관련")}</p>
                  <Toggle
                    className="setting-toggle [&_.react-toggle-thumb]:!border-none [&_.react-toggle-track]:bg-gray-300 [&_.react-toggle-track]:w-[38px] [&_.react-toggle-track]:h-[20px] [&_.react-toggle-thumb]:w-[18px] [&_.react-toggle-thumb]:h-[18px]"
                    // checked={copyTrader.isActivated}
                    checked={setting.depositWithdrawal || false}
                    icons={false}
                    name="depositWithdrawal"
                    onChange={handleChange}
                  />
                </div>
                <h3>{t("일반 설정")}</h3>
                <div className="item more more_popup" onClick={openChgPwModal}>
                  <p>{t("접속 비밀번호 변경")}</p>
                  <div className="more"></div>
                </div>

                <h3>{t("기타")}</h3>
                <div className="item more">
                  <p>{t("테마 설정")}</p>
                  <div className="flex gap-3 items-center">
                    <label className="flex gap-2 cursor-pointer items-center">
                      <input
                        id="light"
                        type="radio"
                        name="theme"
                        value="light"
                        checked={mode === "light"}
                        onChange={toggleTheme}
                        className="accent-primary w-[16px] h-[16px] cursor-pointer"
                      />
                      <div className="text-[1.2rem]">{t("화이트테마")}</div>
                    </label>
                    <label className="flex gap-2 cursor-pointer items-center">
                      <input
                        type="radio"
                        id="dark"
                        name="theme"
                        value="dark"
                        checked={mode === "dark"}
                        onChange={toggleTheme}
                        className="accent-primary w-[16px] h-[16px] cursor-pointer"
                      />
                      <div className="text-[1.2rem]">{t("다크테마")}</div>
                    </label>
                  </div>
                </div>
                <div className="item more">
                  <p>{t("언어 설정")}</p>
                  <div className="flex gap-3 items-center">
                    <label className="flex gap-2 cursor-pointer items-center">
                      <input
                        id="light"
                        type="radio"
                        name="language"
                        value="light"
                        checked={i18n.language === "ko"}
                        onChange={() => {
                          localStorage.setItem("i18nextLng", "ko");
                          i18n.changeLanguage("ko");
                        }}
                        className="accent-primary w-[16px] h-[16px] cursor-pointer"
                      />
                      <div className="text-[1.2rem]">{t("한국어")}</div>
                    </label>
                    <label className="flex gap-2 cursor-pointer items-center">
                      <input
                        type="radio"
                        id="dark"
                        name="language"
                        value="dark"
                        checked={i18n.language === "en"}
                        onChange={() => {
                          localStorage.setItem("i18nextLng", "en");
                          i18n.changeLanguage("en");
                        }}
                        className="accent-primary w-[16px] h-[16px] cursor-pointer"
                      />
                      <div className="text-[1.2rem]">{t("영어")}</div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal_footer">
            <div className="btn_wrap">
              <button className="btn" onClick={logout}>
                {t("로그아웃")}
              </button>
              <button
                className="btn"
                onClick={() => {
                  setSetting(defaultSettings);
                  setTheme(`${siteName}-light`);
                }}
              >
                {t("설정 초기화")}
              </button>
              <button
                className="btn primary !bg-primary !border-primary"
                onClick={handleSave}
              >
                {t("설정 저장")}
              </button>
            </div>
          </div>
        </div>
      </div>

      <RealtimeAlrimModal isOpen={alrimModal} onClose={closeAlrimModal} />
      <ChangePwModal isOpen={chgPwModal} onClose={closeChgPwModal} />
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}
