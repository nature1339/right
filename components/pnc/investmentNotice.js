import React from "react";

const InvestmentNotice = () => {
  return (
    <section className="my-[64px]">
      <div className="w-full max-w-[1180px] mx-auto px-[16px] md:px-0">
        <div className="bg-[#F9F9F9] rounded-xl grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">
          {/* 투자유의사항 텍스트 영역 */}
          <div className="p-[24px]">
            <h2 className="text-[18px] font-bold mb-[8px]">투자유의사항</h2>
            <p className="text-[14px] text-gray-500">
              당사는 금융투자상품에 관하여 충분히 설명할 의무가 있으며, 투자자는
              투자에 앞서 그러한 설명을 충분히 들으시기 바랍니다. 금융투자상품은
              운용 결과와 투자원금의 손실이 발생할 수 있으며 그 손실은
              투자자에게 귀속됩니다.
            </p>
            <a
              href="#"
              className="inline-block mt-[16px] text-[14px] font-semibold hover:underline"
            >
              자세히 보기 &gt;
            </a>
          </div>

          {/* 앱 다운로드 안내 영역 */}
          <div className="p-[24px] flex flex-col items-start relative">
            {/* 가운데 세로줄 (md 이상에서만 보이도록) */}
            <div className="hidden md:block absolute top-[24px] bottom-[24px] left-0 w-px bg-[#E3E3E3]"></div>

            <h3 className="font-bold">앱에서도 편리하게!</h3>
            <p className="text-[14px] text-gray-500 mb-[16px]">
              지금 다운로드하고 쉽고 빠른 거래를 해보세요!
            </p>

            {/* 다운로드 버튼 + QR */}
            <div className="flex gap-[16px] items-start">
              {/* Google Play + QR */}
              <div className="flex flex-col items-start">
                <button className="bg-black text-white px-[16px] py-[8px] rounded-md mb-[8px]">
                  Google Play
                </button>
                <img
                  src="/assets/qr.png"
                  alt="QR 코드"
                  className="w-[80px] h-[80px]"
                />
              </div>

              {/* Apple Store 버튼만 */}
              <button className="bg-black text-white px-[16px] py-[8px] rounded-md">
                Apple Store
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentNotice;
