import React from "react";

const Notices = () => {
  return (
    <section className="my-[32px]">
      <div className="w-full max-w-[1180px] mx-auto px-[16px] md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-[24px]">
          {/* 공지사항 */}
          <div className="bg-white md:rounded-xl md:shadow md:border md:border-[#E3E3E3] md:p-[24px]">
            <div className="flex justify-between items-center mb-[16px]">
              <h2 className="text-[18px] font-bold">공지사항</h2>
              <a href="#" className="text-[14px] text-blue-600 hover:underline">
                더보기
              </a>
            </div>
            <ul className="space-y-[8px] text-[16px] md:text-[14px]">
              <li className="flex justify-between gap-[16px]">
                <span className="truncate">
                  (구)MTS 서비스 종료 사전안내 (4/30(수))
                </span>
                <span className="text-gray-400">25.03.08</span>
              </li>
              <li className="flex justify-between gap-[16px]">
                <span className="truncate">
                  대체거래소(ATS) 오픈! 무엇이 바뀌는지 확인해 보세요!
                </span>
                <span className="text-gray-400">25.03.08</span>
              </li>
              <li className="flex justify-between gap-[16px]">
                <span className="truncate">
                  금융사기 피해 예방을 위한 「금융거래목적확인제도」 안내
                </span>
                <span className="text-gray-400">25.03.08</span>
              </li>
            </ul>
          </div>

          {/* 고객센터 */}
          <div className="md:bg-white md:rounded-xl md:shadow md:border md:border-[#E3E3E3] md:p-[24px]">
            <h2 className="text-[18px] font-bold mb-[16px]">고객센터</h2>
            <div className="grid grid-cols-5 gap-[16px] text-center text-[16px] md:text-[14px]">
              <div>
                <img
                  src="/assets/image_42.png"
                  alt="모의투자신청"
                  className="mx-auto w-[24px] h-[24px] mb-[4px]"
                />
                <p className="whitespace-nowrap">모의투자신청</p>
              </div>
              <div>
                <img
                  src="/assets/image_39.png"
                  alt="FAQ"
                  className="mx-auto w-[24px] h-[24px] mb-[4px]"
                />
                <p>FAQ</p>
              </div>
              <div>
                <img
                  src="/assets/image_38.png"
                  alt="이벤트"
                  className="mx-auto w-[24px] h-[24px] mb-[4px]"
                />
                <p>이벤트</p>
              </div>
              <div>
                <img
                  src="/assets/image_41.png"
                  alt="원격신청"
                  className="mx-auto w-[24px] h-[24px] mb-[4px]"
                />
                <p>원격신청</p>
              </div>
              <div>
                <img
                  src="/assets/image_44.png"
                  alt="거래수수료"
                  className="mx-auto w-[24px] h-[24px] mb-[4px]"
                />
                <p>거래수수료</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Notices;
