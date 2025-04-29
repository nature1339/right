import React from "react";

const data = [
  {
    flag: "🇨🇳",
    label: "항셍지수",
    value: "2,610.69",
    change: "▼ 44.73 -1.73%",
    changeColor: "text-red-500",
    chart: "/assets/chart-hangseng.png",
    bg: "bg-[#fef6f6]",
  },
  {
    flag: "🇯🇵",
    label: "상해종합",
    value: "978.74",
    change: "▼ 0.84 -0.01%",
    changeColor: "text-blue-500",
    chart: "/assets/chart-shanghai.png",
    bg: "bg-[#f0f7ff]",
  },
  {
    flag: "🇺🇸",
    label: "다우존스",
    value: "38,610.69",
    change: "▲ 210.43 +0.55%",
    changeColor: "text-green-500",
    chart: "/assets/chart-dow.png",
    bg: "bg-[#fef6f6]",
  },
];

const Market = () => {
  return (
    <section className="pt-[24px] pb-[40px]">
      <div className="w-full max-w-[1180px] mx-auto px-[16px] md:px-0">
        {/* 헤더: 지수 + 날짜 + 버튼 */}
        <div className="flex items-center justify-between mb-[16px]">
          {/* 왼쪽: 지수 + 날짜/시간 */}
          <div className="flex items-center gap-[8px]">
            <h2 className="text-[20px] font-bold">지수</h2>
            <span className="text-[14px] text-gray-500">2025.03.08</span>
            <span className="text-[14px] text-gray-500">16:51</span>
          </div>

          {/* 오른쪽: 버튼 */}
          <div className="flex gap-[8px]">
            <button className="p-[4px] border rounded hover:bg-gray-100">
              <img
                src="/assets/arrow_left.png"
                alt="이전"
                className="w-[16px] h-[16px] object-contain"
              />
            </button>
            <button className="p-[4px] border rounded hover:bg-gray-100">
              <img
                src="/assets/arrow_right.png"
                alt="다음"
                className="w-[16px] h-[16px] object-contain"
              />
            </button>
          </div>
        </div>

        {/* 카드 리스트 */}
        <div className="flex md:grid md:grid-cols-3 gap-[16px] overflow-x-auto snap-x snap-mandatory scroll-smooth scrollbar-hide">
          {data.map((item, idx) => (
            <div
              key={idx}
              className={`w-[160px] h-[173px] shrink-0 md:w-auto md:h-auto ${item.bg} p-[16px] rounded-xl shadow-sm flex flex-col snap-start`}
            >
              {/* 상단: 지표명 + 국기 */}
              <div className="flex justify-between items-center text-[14px] font-semibold text-gray-800">
                <span>{item.label}</span>
                <div className="w-[24px] h-[24px] bg-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-base">{item.flag}</span>
                </div>
              </div>

              {/* 숫자 */}
              <p className="text-[18px] font-bold mt-[4px]">{item.value}</p>

              {/* 증감률 */}
              <p
                className={`text-[14px] font-semibold mt-[4px] ${item.changeColor}`}
              >
                {item.change}
              </p>

              {/* 차트 */}
              <img
                src={item.chart}
                alt={`${item.label} 차트`}
                className="mt-[8px] w-full h-[50px] object-contain"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Market;
