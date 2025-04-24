import Link from "next/link";
import React, { useState, useEffect } from "react";
import userStore from "store/user";
import themeStore from "store/theme";
import { GrLanguage } from "react-icons/gr";
import { LiaTimesSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";
import useScrollPosition from "@react-hook/window-scroll";
import NoticeModal from "@components/noticeModal";
import SettingModal from "@components/settingModal";

const Header = () => {
  const { t, i18n } = useTranslation();
  const router = useRouter();
  const [menuActive, setMenuActive] = useState(false);
  const { userInfo } = userStore();

  // 내비게이션 목록
  const gnbList = userInfo.userid
    ? [
        { path: "orders", txt: t("통합주문") },
        { path: "cash", txt: t("입/출금") },
        { path: "history", txt: t("거래내역") },
        { path: "ovnight", txt: t("오버나잇") },
        { path: "counseling", txt: t("상담센터") },
        // { path: "copy-trading", txt: "카피트레이딩", icon: OrderIcon },
      ]
    : [
        { path: "company-intro", txt: t("회사소개") },
        { path: "domestic-futures", txt: t("국내선물") },
        { path: "foreign-futures", txt: t("해외선물") },
        { path: "system", txt: t("거래 시스템") },
        { path: "counseling", txt: t("고객센터") },
        { path: "notice", txt: t("공지사항") },
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
      <header className="fixed top-0 left-0 w-full pt-0 md:pt-4 z-50 text-[25.6px]">
        <div className="w-full max-w-[1180px] mx-auto px-[16px] py-[16px] bg-white md:rounded-full shadow-md">
          <div className="flex items-center justify-between">
            {/* 왼쪽: 로고 + 메뉴 */}
            <div className="flex items-center gap-[16px]">
              <img
                src="/assets/logo_header.png"
                alt="PNC Logo"
                className="w-[81px] h-[24px]"
              />
              <ul className="hidden lg:flex gap-[24px] text-[14px] font-medium text-gray-800">
                {gnbList.map((item, idx) => (
                  <li key={idx} className={"hover:text-blue-600 list-none"}>
                    <a href={"/" + item.path}>{item.txt}</a>
                  </li>
                ))}
                {userInfo.userid && (
                  <li className={"hover:text-blue-600 list-none"}>
                    <button onClick={() => openNoticeModal()}>
                      {t("공지사항")}
                    </button>
                  </li>
                )}
                {/* <button type="button" className="hover:text-blue-600">
                  회사소개
                </button>
                <button type="button" className="hover:text-blue-600">
                  국내선물
                </button>
                <button type="button" className="hover:text-blue-600">
                  해외선물
                </button>
                <button type="button" className="hover:text-blue-600">
                  고객센터
                </button>
                <button type="button" className="hover:text-blue-600">
                  거래시스템
                </button>
                <button type="button" className="hover:text-blue-600">
                  공지사항
                </button> */}
              </ul>
            </div>

            {/* 오른쪽: 검색 / 언어 / 로그인 / 회원가입 / 햄버거 */}
            <div className="flex items-center gap-[8px]">
              <div className="hidden sm:flex w-[74px] h-[24px] items-center justify-between px-2 text-sm text-gray-800">
                <img
                  src="/assets/ic_search.png"
                  alt="Search"
                  className="w-[16px] h-[16px]"
                />
                <div className="w-px h-[12px] bg-gray-300"></div>
                <span
                  className="cursor-pointer text-[14px]"
                  onClick={() => {
                    localStorage.setItem("i18nextLng", "ko");
                    i18n.changeLanguage("ko");
                  }}
                >
                  KO
                </span>
              </div>

              {userInfo.userid ? (
                <>
                  {/* 로그인했을 때 */}
                  {router.pathname != "/" && (
                    <div className="mode" id="header-mode">
                      <div className="switch_wrap flex items-center">
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
                    </div>
                  )}
                  <div className="pl-[32px] bg-no-repeat bg-left bg-[url('/images/user.svg')] flex items-center text-[16px]">
                    {userInfo.userid}
                  </div>
                  <div
                    className="w-[48px] h-[48px] text-transparent text-0 bg-no-repeat bg-center bg-[url('/images/setting.svg')] cursor-pointer"
                    onClick={() => openSettingModal()}
                  >
                    setting
                  </div>
                </>
              ) : (
                <>
                  {/* 로그인 전 */}
                  <a
                    href="/login"
                    className="hidden sm:flex items-center h-[32px] px-[16px] text-sm border border-gray-300 rounded-full hover:bg-gray-100"
                  >
                    {t("로그인")}
                  </a>
                  <a
                    href="/join"
                    className="hidden sm:flex h-[32px] px-[16px] text-sm bg-[#2C3E94] text-white rounded-full items-center gap-1 hover:opacity-90"
                  >
                    <img
                      src="/assets/ic.png"
                      alt="회원가입 아이콘"
                      className="w-[16px] h-[16px]"
                    />
                    {t("회원가입")}
                  </a>
                </>
              )}

              {/* 햄버거 버튼 (모바일 전용) */}
              <button className="lg:hidden flex items-center justify-center w-[32px] h-[32px]">
                <img
                  src="/assets/ic_search.png"
                  alt="Search"
                  className="w-[24px] h-[24px]"
                />
              </button>
              <button
                className="lg:hidden flex items-center justify-center w-[32px] h-[32px]"
                onClick={() => {
                  setMenuActive(true);
                }}
              >
                <img
                  src="/assets/menu_mobile.png"
                  alt="모바일 메뉴"
                  className="w-[24px] h-[24px]"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* 모바일 메뉴 */}
      {menuActive && (
        <div className="w-full h-screen fixed bg-white z-50">
          <div className="pl-[20px] pr-[8px] flex items-center justify-between h-[60px] border border-[#E3E3E3]">
            <div className="flex gap-[20px] items-center">
              <GrLanguage size={24} />
              <div className="flex items-center gap-[12px]">
                <Link
                  href="#"
                  className="text-[20px] font-bold"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("i18nextLng", "ko");
                    i18n.changeLanguage("ko");
                  }}
                >
                  KR
                </Link>
                <div className="w-px h-[18px] bg-[#E3E3E3]"></div>
                <Link
                  href="#"
                  className="text-[20px] font-bold text-[#C3C3C3]"
                  onClick={(e) => {
                    e.preventDefault();
                    localStorage.setItem("i18nextLng", "en");
                    i18n.changeLanguage("en");
                  }}
                >
                  EN
                </Link>
              </div>
            </div>
            <div
              className="p-[8px] cursor-pointer"
              onClick={() => {
                setMenuActive(false);
              }}
            >
              <LiaTimesSolid />
            </div>
          </div>
          <div className="flex h-full">
            <ul className="p-[16px] h-full w-3/5">
              {gnbList.map((item, idx) => (
                <li key={idx} className={"p-[8px]"}>
                  <Link
                    href={"/" + item.path}
                    className="font-medium text-[24px]"
                  >
                    {item.txt}
                  </Link>
                </li>
              ))}
              {userInfo.userid && (
                <li className={"p-[8px]"}>
                  <button
                    onClick={() => openNoticeModal()}
                    className="font-medium text-[24px]"
                  >
                    {t("공지사항")}
                  </button>
                </li>
              )}
            </ul>

            <div className="w-2/5 flex items-center flex-col border-l border-[#E3E3E3] pt-[32px]">
              {userInfo.userid ? (
                <>
                  {/* 로그인했을 때 */}
                  {router.pathname != "/" && (
                    <div className="mode" id="header-mode">
                      <div className="switch_wrap flex items-center pb-[16px]">
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
                    </div>
                  )}
                  <div className="pl-[32px] bg-no-repeat bg-left bg-[url('/images/user.svg')] flex items-center text-[16px]">
                    {userInfo.userid}
                  </div>
                  <div
                    className="w-[48px] h-[48px] text-transparent text-0 bg-no-repeat bg-center bg-[url('/images/setting.svg')] cursor-pointer"
                    onClick={() => openSettingModal()}
                  >
                    setting
                  </div>
                </>
              ) : (
                <>
                  <a
                    href="/login"
                    className="flex justify-center items-center text-base font-semibold w-[108px] h-[48px] border border-[#C3C3C3] rounded-full"
                  >
                    {t("로그인")}
                  </a>
                  <a
                    href="/join"
                    className="mt-[8px] flex justify-center items-center gap-[4px] text-base text-white font-semibold w-[108px] h-[48px] border border-[#324580] rounded-full bg-[#324580]"
                  >
                    <img
                      src="/assets/ic.png"
                      alt="회원가입 아이콘"
                      className="w-[16px] h-[16px]"
                    />
                    {t("회원가입")}
                  </a>
                </>
              )}
            </div>
          </div>
        </div>
      )}
      {/* 공지사항 모달 */}
      <NoticeModal isOpen={noticeModalOpen} onClose={closeNoticeModal} />
      {/* 설정 모달 */}
      <SettingModal isOpen={settingModalOpen} onClose={closeSettingModal} />
    </>
  );
};

export default Header;
