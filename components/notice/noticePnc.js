import React, { useState } from "react";
import InvestmentNotice from "@components/pnc/investmentNotice";

const NoticePnc = () => {
  const [activeTap, setActiveTap] = useState(1);
  return (
    <div className="w-full">
      {/* 헤더 배경 섹션 */}
      <div
        className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-8 md:mb-16"
        style={{
          backgroundImage: `url('/assets/companyIntroduce_bg_img.png')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-[30px] md:text-[48px] font-bold">
            공지사항
          </h1>
        </div>
      </div>
    </div>
  );
};

export default NoticePnc;
