import React, { useState } from "react";
import InvestmentNotice from "@components/pnc/investmentNotice";
import { GiPaperClip } from "react-icons/gi";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";

const NoticePnc = () => {
  const [activeTap, setActiveTap] = useState(1);
  return (
    <div className="w-full bg-white">
      {/* 헤더 배경 섹션 */}
      <div
        className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-[32px] md:mb-[64px]"
        style={{
          backgroundImage: `url('/assets/bg-notice.jpg')`,
        }}
      >
        <div
          className="absolute inset-0 flex items-center justify-center"
          style={{
            background:
              "linear-gradient(180deg, rgba(0, 0, 0, 0.25) 0%, rgba(0, 0, 0, 0.75) 100%)",
          }}
        >
          <h1 className="text-white text-[30px] md:text-[48px] font-bold">
            공지사항
          </h1>
        </div>
      </div>
      <div className="max-w-[1212px] px-[16px] mx-auto">
        <h2 className="text-[24px] md:text-[36px] font-semibold md:font-bold">
          개인고객 공매도(유통대주) 거래 재개 및 업무개선 안내 (3/31)
        </h2>
        <div className="text-[16px] text-[#A3A3A3] mt-[16px]">2025-04-02</div>
        <div className="p-0 md:p-[48px] border-0 md:border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-[48px]">
          <div>
            <p className="">
              PNC을 이용해 주시는 고객님께 진심으로 감사드립니다. 금융위원회의
              공매도 제도개선 방안 및 금융투자업규정 개정에 따라 개인고객의
              공매도(유통대주) 거래 재개 및 업무개선 사항을 안내 드리오니 투자에
              참고하시기 바랍니다.
            </p>
            <div className="mt-[28px] mb-[4px] font-bold">개요</div>
            <ul className="list-disc pl-5">
              <li>
                신용거래 대주 란? 주가하락이 예상되는 종목을 매도한 후, 주가가
                하락했을 때 해당 종목을 다시 매수하여 상환 차익을 추구하는
                신용거래. 즉 개인 공매도 거래를 의미함
              </li>
              <li className="mt-[8px]">
                금융위원회의 공매도 제도가 개선되면서 신용거래대주 전용계좌(이하
                ‘대주전용계좌’)가 도입됨
              </li>
            </ul>
            <div className="mt-[28px] mb-[4px] font-bold">
              신용거래(담보대출/융자)계좌의 유통대주 매매 제한
            </div>
            <table className="mt-[8px] text-[16px] border-t border-[#434343]">
              <thead>
                <tr>
                  <th className="text-left pl-[24px] py-[4px] h-[45px]">
                    <div className="flex items-center h-[30px] border-r border-[#E3E3E3]">
                      구분
                    </div>
                  </th>
                  <th className="text-left pl-[24px] h-[45px]">변경 사항</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-left pl-[24px] h-[45px]">변경전</td>
                  <td className="text-left pl-[24px] h-[45px]">
                    유통대주 매매를 포함한 담보대출 및 신용융자거래 모두 가능
                  </td>
                </tr>
                <tr>
                  <td className="text-left pl-[24px] h-[45px]">변경후</td>
                  <td className="text-left pl-[24px] h-[45px]">
                    담보대출 및 신용거래 계좌에서 유통대주 매매 불가 (그외
                    기존과 동일함)
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="mt-[28px] mb-[4px] font-bold">시행일</div>
            <p className="mt-[8px]">2025년 3월 31일</p>
            <p className="mt-[28px]">
              ❖ 기타 자세한 문의사항은 영업점 또는 고객지원센터 080-851-816282
              16 (주문전용 080-851-8200, ARS 080-852-1234, 해외에서 이용 시
              82-6906-4201)로 문의해주시기 바랍니다.
            </p>
          </div>
          <div className="p-[24px] flex bg-[#F9F9F9] rounded-2xl mt-[32px]">
            <div className="w-[60px] md:w-[100px] font-bold">첨부</div>
            <ul>
              <li>
                <a href="#" className="flex gap-[8px] items-center">
                  <GiPaperClip />{" "}
                  <span className="text-[18px] text-[#324580]">
                    file-name.pdf
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex gap-[8px] items-center">
                  <GiPaperClip />{" "}
                  <span className="text-[18px] text-[#324580]">
                    file-name.pdf
                  </span>
                </a>
              </li>
              <li>
                <a href="#" className="flex gap-[8px] items-center">
                  <GiPaperClip />{" "}
                  <span className="text-[18px] text-[#324580]">
                    file-name.pdf
                  </span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <a
          href="#"
          className="flex items-center justify-center mx-auto my-[48px] w-[200px] h-[56px] bg-[#324580] text-white rounded-md text-[18px] font-semibold"
        >
          목록으로
        </a>
        <div className="p-8 border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] flex justify-between">
          <a href="#" className="block border-0 w-1/2 pr-[8px]">
            <div>
              <div className="flex items-center gap-[16px]">
                <HiChevronLeft />
                <span className="font-semibold text-[18px]">이전</span>
              </div>
              <div className="mt-[8px] text-[#636363] text-[18px] truncate">
                마이데이터 서비스 중단 안내
              </div>
            </div>
          </a>
          <a href="#" className="block border-0 w-1/2 pl-[8px]">
            <div>
              <div className="flex items-center gap-[16px] justify-end">
                <span className="font-semibold text-[18px]">다음</span>
                <HiChevronRight />
              </div>
              <div className="mt-[8px] text-[#636363] text-[18px] truncate">
                비대면 계좌 개설 중단 안내
              </div>
            </div>
          </a>
        </div>
        <InvestmentNotice />
      </div>
    </div>
  );
};

export default NoticePnc;
