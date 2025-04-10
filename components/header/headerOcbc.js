import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import themeStore from "store/theme";
import userStore from "store/user";
import NoticeModal from "@components/noticeModal";
import SettingModal from "@components/settingModal";
import useScrollPosition from "@react-hook/window-scroll";
import clsx from "clsx";
import { CgMenuRightAlt, CgClose } from "react-icons/cg";
import { IoIosArrowForward } from "react-icons/io";
import CashIcon from "@components/icons/cashIcon";
import CounselingIcon from "@components/icons/counselingIcon";
import HistoryIcon from "@components/icons/historyIcon";
import OvernightIcon from "@components/icons/overnightIcon";
import OrderIcon from "@components/icons/orderIcon";
import Link from "next/link";
import { useTranslation } from "react-i18next";

export default function HeaderOcbc() {
  const { t } = useTranslation();
  const router = useRouter();
  const { userInfo } = userStore();

  // 내비게이션 목록
  const gnbList = userInfo.userid
    ? [
        { path: "orders", txt: t("통합주문"), icon: OrderIcon },
        { path: "cash", txt: t("입/출금"), icon: CashIcon },
        { path: "history", txt: t("거래내역"), icon: HistoryIcon },
        { path: "ovnight", txt: t("오버나잇"), icon: OvernightIcon },
        { path: "counseling", txt: t("상담센터"), icon: CounselingIcon },
        // { path: "copy-trading", txt: "카피트레이딩", icon: OrderIcon },
      ]
    : [
        { path: "company-intro", txt: t("회사소개") },
        { path: "domestic-futures", txt: t("국내선물") },
        { path: "foreign-futures", txt: t("해외선물") },
        { path: "system", txt: t("거래 시스템") },
        { path: "counseling", txt: t("고객센터") },
      ];

  // 테마 토글
  const { theme, toggleTheme } = themeStore();
  const [siteName, mode] = theme.split("-");

  // 공지사항 모달
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const openNoticeModal = () => {
    if (!userInfo.userid) {
      return;
    }
    setNoticeModalOpen(true);
  };
  const closeNoticeModal = () => setNoticeModalOpen(false);

  // 설정 모달
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const openSettingModal = () => setSettingModalOpen(true);
  const closeSettingModal = () => setSettingModalOpen(false);

  // 헤더 위치에따른 색상
  const [isSticky, setIsSticky] = useState(false);
  const scrollY = useScrollPosition(60);

  useEffect(() => {
    setIsSticky(scrollY > 0);
  }, [scrollY]);

  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const toggleOpenMenu = () => {
    setIsOpenMenu((prev) => !prev);
  };

  const isOnlyLightModePages = [
    "/",
    "/company-intro",
    "/domestic-futures",
    "/foreign-futures",
    "/system",
  ].includes(router.pathname);

  return (
    <>
      <div
        className={clsx(
          "dark:bg-[#181a20] dark:shadow-2xl bg-transparent shadow-none fixed z-40 w-full top-0",
          {
            "bg-white z-50 shadow-lg": isSticky || router.pathname !== "/",
          }
        )}
      >
        <div className="flex items-center h-[8rem] px-[40px] max-w-[1400px] mx-auto w-full justify-between gap-0 max-md:px-[20px] max-md:h-[64px]">
          <a href="/" className="shrink-0">
            <img
              objectFit
              src={
                mode === "light" || isOnlyLightModePages
                  ? `/images/logo_ocbckr.com_red.svg`
                  : `/images/dark_logo_ocbckr.com.png`
              }
              className="aspect-[179/47] w-[150px] max-md:w-[148px]"
            />
          </a>
          <nav className="flex-none max-md:hidden">
            <ul className="flex gap-[50px]">
              {gnbList.map((item, idx) => (
                <li
                  key={idx}
                  className={clsx("text-white text-[16px]", {
                    "!text-black dark:!text-white":
                      isSticky || router.pathname !== "/",
                  })}
                >
                  <a href={"/" + item.path}>{item.txt}</a>
                </li>
              ))}
              {userInfo.userid && (
                <li
                  className={clsx("text-white text-[16px]", {
                    "!text-black dark:!text-white":
                      isSticky || router.pathname !== "/",
                  })}
                >
                  <button onClick={() => openNoticeModal()}>
                    {t("공지사항")}
                  </button>
                </li>
              )}
            </ul>
          </nav>
          <ul className="flex gap-[8px] items-center">
            {userInfo.userid ? (
              <>
                {/* 로그인했을 때 */}
                {router.pathname != "/" && (
                  <li className="mode" id="header-mode">
                    <div className="switch_wrap">
                      <input
                        type="checkbox"
                        id="switch"
                        checked={mode === "dark"}
                        onChange={toggleTheme}
                      />
                      <label htmlFor="switch" className="switch_label">
                        <span className="onf_btn !bg-primary"></span>
                      </label>
                    </div>
                  </li>
                )}
                <li className="pl-12 bg-no-repeat bg-left bg-[url('/images/user.svg')] flex items-center">
                  {userInfo.userid}
                </li>
                <li
                  className="w-12 h-12 text-transparent text-0 bg-no-repeat bg-center bg-[url('/images/setting.svg')] cursor-pointer"
                  onClick={() => openSettingModal()}
                >
                  setting
                </li>
              </>
            ) : (
              <>
                {/* 로그인 전 */}
                <li>
                  <a
                    className="max-md:w-[64px] max-md:h-[32px] max-md:text-[12px] w-[120px] h-[45px] rounded-[100px] bg-white flex items-center font-medium text-[#524C4C] justify-center"
                    href="/login"
                  >
                    {t("로그인")}
                  </a>
                </li>
                <li>
                  <a
                    href="/join"
                    className="max-md:w-[64px] max-md:h-[32px] max-md:text-[12px] w-[120px] h-[45px] rounded-[100px] bg-[#ED1C24] flex items-center font-medium text-white justify-center"
                  >
                    {t("회원가입")}
                  </a>
                </li>
                <CgMenuRightAlt
                  className={`w-[30px] h-[30px] cursor-pointer hidden max-md:block ${
                    isSticky || router.pathname !== "/"
                      ? "text-black"
                      : "text-white"
                  }`}
                  onClick={toggleOpenMenu}
                />
              </>
            )}
          </ul>
        </div>
      </div>
      {userInfo.userid && (
        <div className="mobile_menu">
          <ul>
            {gnbList.map((item, idx) => {
              const Icon = item.icon;
              return (
                <li
                  key={idx}
                  className={` ${item.path} ${
                    router.pathname == `/${item.path}` ? "on !text-primary" : ""
                  }`}
                >
                  <Link
                    className="flex flex-col items-center justify-center gap-[5px] h-full"
                    href={`/${item.path}`}
                  >
                    <Icon
                      className={clsx("w-[2rem] h-[2rem]", {
                        "w-[2.5rem] h-[2.5rem]": item.txt === t("오버나잇"),
                        "[&_path]:fill-primary":
                          router.pathname == `/${item.path}` &&
                          item.txt !== t("오버나잇"),
                        "[&_path]:stroke-primary":
                          router.pathname == `/${item.path}` &&
                          item.txt === t("오버나잇"),
                      })}
                    />
                    {item.txt}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      {isOpenMenu && (
        <div className="hidden max-md:block fixed w-full top-0 left-0 h-screen z-[51]">
          <div
            className="absolute bg-[rgba(0,0,0,.6)] w-full h-full z-[52]"
            onClick={toggleOpenMenu}
          ></div>
          <nav className="bg-white w-[360px] h-full absolute right-0 px-[20px] py-[12px] z-[53]">
            <div className="flex justify-between items-center mb-[24px]">
              <a href="/" className="shrink-0">
                <img
                  objectFit
                  src={
                    mode === "light" || isOnlyLightModePages
                      ? `/images/logo_ocbckr.com_red.svg`
                      : `/images/dark_logo_ocbckr.com.png`
                  }
                  className="w-[179px] h-[48px] max-md:w-[148px]"
                />
              </a>
              <CgClose
                className="w-[26px] h-[26px] cursor-pointer text-black"
                onClick={toggleOpenMenu}
              />
            </div>
            <ul className="flex gap-[8px] w-full mb-[12px]">
              <li className="w-full">
                <a
                  className="w-full h-[45px] rounded-[100px] bg-white flex items-center font-medium text-[#524C4C] border-[#DCDCDC] border-[1px] border-solid justify-center"
                  href="/login"
                >
                  {t("로그인")}
                </a>
              </li>
              <li className="w-full">
                <a
                  href="/join"
                  className="w-full h-[45px] rounded-[100px] bg-[#ED1C24] flex items-center font-medium text-white justify-center"
                >
                  {t("회원가입")}
                </a>
              </li>
            </ul>
            <div>
              {gnbList.map((gnb) => (
                <a
                  href={gnb.path}
                  className="flex justify-between items-center h-[44px] border-[1px] border-t-0 border-x-0 border-solid border-[#DEDEDE] cursor-pointer"
                >
                  <p className="font-medium text-black">{gnb.txt}</p>
                  <IoIosArrowForward className="text-[#A5A5A5] w-[18px] h-[18px]" />
                </a>
              ))}
            </div>
          </nav>
        </div>
      )}
      {/* 공지사항 모달 */}
      <NoticeModal isOpen={noticeModalOpen} onClose={closeNoticeModal} />
      {/* 설정 모달 */}
      <SettingModal isOpen={settingModalOpen} onClose={closeSettingModal} />
    </>
  );
}
