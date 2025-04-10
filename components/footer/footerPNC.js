import React from "react";

const FooterPNC = () => {
  return (
    <footer className="bg-[#F9F9F9] py-8 border-t border-gray-200">
      <div className="w-full max-w-[1180px] mx-auto px-4 text-sm text-gray-600">
        <div className="flex flex-col md:flex-row justify-between items-start gap-6">
          {/* 왼쪽: 회사 정보 */}
          <div>
            <img
              src="/assets/logo_pnc.png"
              alt="PNC"
              className="h-8 mb-4 grayscale opacity-60"
            />

            <nav className="mb-2 flex flex-wrap gap-2">
              <a href="#" className="font-semibold">
                회사소개
              </a>
              <span>·</span>
              <a href="#" className="font-semibold">
                개인정보처리방침
              </a>
              <span>·</span>
              <a href="#" className="font-semibold">
                고객정보취급방침
              </a>
              <span>·</span>
              <a href="#" className="font-semibold">
                상품공시실
              </a>
              <span>·</span>
              <a href="#" className="font-semibold">
                투자권유대행인
              </a>
            </nav>

            <p>
              63 Chulia Street, Floor 10, PNC Centre, Singapore, Singapore,
              049514
            </p>

            <p className="mt-4 text-gray-400 text-xs">
              Copyright © PNC. All rights reserved
            </p>
          </div>

          {/* 오른쪽: 관련사이트 드롭다운 */}
          <div className="relative inline-block order-last md:order-none">
            <select
              className="border border-gray-300 rounded text-sm appearance-none bg-white pl-3 pr-10 py-2"
              style={{ width: "152px" }}
            >
              <option>관련사이트</option>
            </select>
            <img
              src="/assets/Footer_dropdown.png"
              alt="dropdown"
              className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterPNC;
