import React from 'react';

const Notices = () => {
  return (
    <section className="my-8">
      <div className="w-full max-w-[1180px] mx-auto px-4 md:px-0">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* 공지사항 */}
          <div className="bg-white md:rounded-xl md:shadow md:border md:border-[#E3E3E3] md:p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-bold">공지사항</h2>
              <a href="#" className="text-sm text-blue-600 hover:underline">더보기</a>
            </div>
            <ul className="space-y-2 text-base md:text-sm">
              <li className="flex justify-between gap-4">
                <span className="truncate">(구)MTS 서비스 종료 사전안내 (4/30(수))</span>
                <span className="text-gray-400">25.03.08</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="truncate">대체거래소(ATS) 오픈! 무엇이 바뀌는지 확인해 보세요!</span>
                <span className="text-gray-400">25.03.08</span>
              </li>
              <li className="flex justify-between gap-4">
                <span className="truncate">금융사기 피해 예방을 위한 「금융거래목적확인제도」 안내</span>
                <span className="text-gray-400">25.03.08</span>
              </li>
            </ul>
          </div>

          {/* 고객센터 */}
          <div className="md:bg-white md:rounded-xl md:shadow md:border md:border-[#E3E3E3] md:p-6">
            <h2 className="text-lg font-bold mb-4">고객센터</h2>
            <div className="grid grid-cols-5 gap-4 text-center text-base md:text-sm">
              <div>
                <img src="/assets/image_42.png" alt="모의투자신청" className="mx-auto w-6 h-6 mb-1" />
                <p className="whitespace-nowrap">모의투자신청</p>
              </div>
              <div>
                <img src="/assets/image_39.png" alt="FAQ" className="mx-auto w-6 h-6 mb-1" />
                <p>FAQ</p>
              </div>
              <div>
                <img src="/assets/image_38.png" alt="이벤트" className="mx-auto w-6 h-6 mb-1" />
                <p>이벤트</p>
              </div>
              <div>
                <img src="/assets/image_41.png" alt="원격신청" className="mx-auto w-6 h-6 mb-1" />
                <p>원격신청</p>
              </div>
              <div>
                <img src="/assets/image_44.png" alt="거래수수료" className="mx-auto w-6 h-6 mb-1" />
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
