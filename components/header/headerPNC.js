import Link from "next/link";
import React, { useState } from "react";
import { GrLanguage } from "react-icons/gr";
import { LiaTimesSolid } from "react-icons/lia";
import { useTranslation } from "react-i18next";

const Header = () => {
  const { t, i18n } = useTranslation();
  const [menuActive, setMenuActive] = useState(false);
  return (
    <>
      <header className="fixed top-0 left-0 w-full pt-0 md:pt-4 z-50">
        <div className="w-full max-w-[1180px] mx-auto px-4 py-4 bg-white md:rounded-full shadow-md">
          <div className="flex items-center justify-between">
            {/* 왼쪽: 로고 + 메뉴 */}
            <div className="flex items-center gap-4">
              <img
                src="/assets/logo_header.png"
                alt="PNC Logo"
                className="h-6"
              />
              <nav className="hidden lg:flex gap-6 text-sm font-medium text-gray-800">
                <button type="button" className="hover:text-blue-600">
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
                </button>
              </nav>
            </div>

            {/* 오른쪽: 검색 / 언어 / 로그인 / 회원가입 / 햄버거 */}
            <div className="flex items-center gap-2">
              <div className="hidden sm:flex w-[74px] h-[24px] items-center justify-between px-2 text-sm text-gray-800">
                <img
                  src="/assets/ic_search.png"
                  alt="Search"
                  className="w-4 h-4"
                />
                <div className="w-px h-3 bg-gray-300"></div>
                <span
                  className="cursor-pointer"
                  onClick={() => {
                    localStorage.setItem("i18nextLng", "ko");
                    i18n.changeLanguage("ko");
                  }}
                >
                  KO
                </span>
              </div>

              <Link
                href="/pnc_login"
                className="hidden sm:flex items-center h-[32px] px-4 text-sm border border-gray-300 rounded-full hover:bg-gray-100"
              >
                로그인
              </Link>
              <Link
                href="/pnc_join"
                className="hidden sm:flex h-[32px] px-4 text-sm bg-[#2C3E94] text-white rounded-full items-center gap-1 hover:opacity-90"
              >
                <img
                  src="/assets/ic.png"
                  alt="회원가입 아이콘"
                  className="w-4 h-4"
                />
                회원가입
              </Link>

              {/* 햄버거 버튼 (모바일 전용) */}
              <button className="lg:hidden flex items-center justify-center w-8 h-8">
                <img
                  src="/assets/ic_search.png"
                  alt="Search"
                  className="w-6 h-6"
                />
              </button>
              <button
                className="lg:hidden flex items-center justify-center w-8 h-8"
                onClick={() => {
                  setMenuActive(true);
                }}
              >
                <img
                  src="/assets/menu_mobile.png"
                  alt="모바일 메뉴"
                  className="w-6 h-6"
                />
              </button>
            </div>
          </div>
        </div>
      </header>
      {/* 모바일 메뉴 */}
      {menuActive && (
        <div className="w-full h-screen fixed bg-white z-50">
          <div className="pl-5 pr-2 flex items-center justify-between h-[60px] border border-[#E3E3E3]">
            <div className="flex gap-5 items-center">
              <GrLanguage />
              <div className="flex items-center gap-3">
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
              className="p-2 cursor-pointer"
              onClick={() => {
                setMenuActive(false);
              }}
            >
              <LiaTimesSolid />
            </div>
          </div>
          <div className="flex h-full">
            <ul className="p-4 h-full w-3/5">
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  회사소개
                </Link>
              </li>
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  국내선물
                </Link>
              </li>
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  해외선물
                </Link>
              </li>
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  고객센터
                </Link>
              </li>
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  거래시스템
                </Link>
              </li>
              <li className="p-2">
                <Link href="#" className="font-medium text-2xl">
                  공지사항
                </Link>
              </li>
            </ul>
            <div className="w-2/5 flex items-center flex-col border-l border-[#E3E3E3] pt-8">
              <Link
                href="/pnc_login"
                className="flex justify-center items-center text-base font-semibold w-[108px] h-[48px] border border-[#C3C3C3] rounded-full"
              >
                로그인
              </Link>
              <Link
                href="/pnc_join"
                className="mt-2 flex justify-center items-center gap-1 text-base text-white font-semibold w-[108px] h-[48px] border border-[#324580] rounded-full bg-[#324580]"
              >
                <img
                  src="/assets/ic.png"
                  alt="회원가입 아이콘"
                  className="w-4 h-4"
                />
                회원가입
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
