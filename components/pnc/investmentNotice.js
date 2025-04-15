import React from 'react';

const InvestmentNotice = () => {
  return (
    <section className="my-8">
      <div className="w-full max-w-[1180px] mx-auto px-4 md:px-0">
        <div className="bg-[#F9F9F9] rounded-xl grid grid-cols-1 md:grid-cols-2 relative overflow-hidden">

          {/* 투자유의사항 텍스트 영역 */}
          <div className="p-6">
            <h2 className="text-lg font-bold mb-2">투자유의사항</h2>
            <p className="text-sm text-gray-500">
              당사는 금융투자상품에 관하여 충분히 설명할 의무가 있으며, 투자자는 투자에 앞서 그러한 설명을 충분히 들으시기 바랍니다. 금융투자상품은 운용 결과와 투자원금의 손실이 발생할 수 있으며 그 손실은 투자자에게 귀속됩니다.
            </p>
            <a href="#" className="inline-block mt-4 text-sm font-semibold hover:underline">
              자세히 보기 &gt;
            </a>
          </div>

          {/* 앱 다운로드 안내 영역 */}
          <div className="p-6 flex flex-col items-start relative">
            {/* 가운데 세로줄 (md 이상에서만 보이도록) */}
            <div className="hidden md:block absolute top-6 bottom-6 left-0 w-px bg-[#E3E3E3]"></div>

            <h3 className="font-bold">앱에서도 편리하게!</h3>
            <p className="text-sm text-gray-500 mb-4">
              지금 다운로드하고 쉽고 빠른 거래를 해보세요!
            </p>

            {/* 다운로드 버튼 + QR */}
            <div className="flex gap-4 items-start">
              {/* Google Play + QR */}
              <div className="flex flex-col items-start">
                <button className="bg-black text-white px-4 py-2 rounded-md mb-2">
                  Google Play
                </button>
                <img
                  src="/assets/qr.png"
                  alt="QR 코드"
                  className="w-[80px] h-[80px]"
                />
              </div>

              {/* Apple Store 버튼만 */}
              <button className="bg-black text-white px-4 py-2 rounded-md">
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
