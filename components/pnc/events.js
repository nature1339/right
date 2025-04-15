import React from 'react';

const Events = () => {
  return (
    <section className="pt-6 pb-8 relative overflow-visible">
      <div className="w-full max-w-[1180px] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-y-3 md:gap-4 relative">

          {/* 카드 1 */}
          <div className="relative bg-[#3295EB] text-white rounded-xl p-4 md:p-6 flex items-center justify-between h-[282px] w-full">
            <div className="w-1/2 flex flex-col gap-2 px-3">
              <span className="bg-white text-blue-900 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                이벤트
              </span>
              <h3 className="text-[18px] md:text-[32px] font-bold leading-[1.2] font-gmarket whitespace-nowrap">
                증권사 주식계좌<br />개설 EVENT
              </h3>
              <p className="text-[14px] md:text-[18px] mt-2 font-normal leading-normal font-gmarket whitespace-nowrap">
              PNC 투자그룹에서 주식계좌를 개<br />설하고 다양한 혜택도 받으세요.
              </p>
              <p className="text-[14px] md:text-[18px] mt-2 font-normal leading-normal font-gmarket whitespace-nowrap">
              2025.03.01 ~ 공지전까지
              </p>
            </div>
            <div className="w-1/2 flex justify-end px-3">
              <img
                src="/assets/event.png"
                alt="이벤트 이미지"
                className="w-[176px] h-[176px] object-contain"
              />
            </div>

            {/* 오른쪽 하단 슬라이드 버튼 */}
            <div className="absolute bottom-2 right-3 flex gap-2">
              <button className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-40">
                <img
                  src="/assets/arrow_left.png"
                  alt="이전"
                  className="w-4 h-4 object-contain"
                />
              </button>
              <button className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-40">
                <img
                  src="/assets/arrow_right.png"
                  alt="다음"
                  className="w-4 h-4 object-contain"
                />
              </button>
            </div>
          </div>

          {/* 카드 2 */}
          <div className="relative bg-blue-900 text-white rounded-xl p-4 md:p-6 flex items-center justify-between h-[282px] w-full">
            <div className="w-1/2 flex flex-col gap-2 px-3">
              <span className="bg-white text-blue-900 text-xs font-semibold px-2 py-1 rounded-full w-fit">
                상품안내
              </span>
              <h3 className="text-[18px] md:text-[32px] font-bold leading-[1.2] font-gmarket whitespace-nowrap">
                PNC, 해외 채권<br />서비스<br />정식 출시
              </h3>
              <p className="text-[14px] md:text-[18px] mt-2 font-normal leading-normal font-gmarket whitespace-nowrap">
                주식처럼 손쉽게 사고파는<br />해외채권 정식출시!
              </p>
            </div>
            <div className="w-1/2 flex justify-end px-3">
              <img
                src="/assets/guide.png"
                alt="가이드 이미지"
                className="w-[176px] h-[176px] object-contain"
              />
            </div>

            {/* 오른쪽 하단 슬라이드 버튼 */}
            <div className="absolute bottom-2 right-3 flex gap-2">
              <button className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-40">
                <img
                  src="/assets/arrow_left.png"
                  alt="이전"
                  className="w-4 h-4 object-contain"
                />
              </button>
              <button className="p-1 bg-white bg-opacity-20 rounded hover:bg-opacity-40">
                <img
                  src="/assets/arrow_right.png"
                  alt="다음"
                  className="w-4 h-4 object-contain"
                />
              </button>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default Events;
