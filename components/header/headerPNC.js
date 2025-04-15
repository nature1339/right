import React from "react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 w-full pt-0 md:pt-4 z-50">
      <div className="w-full max-w-[1180px] mx-auto px-4 py-4 bg-white md:rounded-full shadow-md">
        <div className="flex items-center justify-between">
          {/* 왼쪽: 로고 + 메뉴 */}
          <div className="flex items-center gap-4">
            <img src="/assets/logo_header.png" alt="PNC Logo" className="h-6" />
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
              <span>KO</span>
            </div>

            <button className="hidden sm:inline-block h-[32px] px-4 text-sm border border-gray-300 rounded-full hover:bg-gray-100">
              로그인
            </button>

            <button className="hidden sm:flex h-[32px] px-4 text-sm bg-[#2C3E94] text-white rounded-full items-center gap-1 hover:opacity-90">
              <img
                src="/assets/ic.png"
                alt="회원가입 아이콘"
                className="w-4 h-4"
              />
              회원가입
            </button>

            {/* 햄버거 버튼 (모바일 전용) */}
            <button className="lg:hidden flex items-center justify-center w-8 h-8">
              <img
                src="/assets/ic_search.png"
                alt="Search"
                className="w-6 h-6"
              />
            </button>
            <button className="lg:hidden flex items-center justify-center w-8 h-8">
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
  );
};

export default Header;
