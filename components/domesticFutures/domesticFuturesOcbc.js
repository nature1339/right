import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";

export default function DomesticFuturesOcbc() {
  return (
    <>
      <Head>
        <title>국내선물: OCBC</title>
        <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
      </Head>
      <div className="h-[625px] relative bg-[url('/images/ocbc/domestic/background.png')] bg-no-repeat bg-cover max-md:h-[298px]">
        <div className="bg-[rgba(0,0,0,.4)] w-full h-full absolute flex justify-center items-center">
          <div className="flex flex-col gap-[25px] justify-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-[#B1B1B1] font-medium max-md:text-[14px]">
                HOME
              </p>
              <IoIosArrowForward className="text-[#B1B1B1]" />
              <p className="text-white font-medium max-md:text-[14px]">
                국내선물
              </p>
            </div>
            <p className="font-bold text-[48px] text-white max-md:text-[32px]">
              국내선물
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white pt-[100px] pb-[80px] max-md:py-[60px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <p className="text-[32px] font-bold text-black mb-3 max-md:text-[24px]">
            <b className="text-[#ED1C24]">미래를 예측</b>하는 새로운{" "}
            <br className="max-md:block hidden" />
            투자수단을 찾고 있다면!
          </p>
          <p className="mb-[60px] text-[22px] font-medium text-black max-md:mb-[40px] max-md:text-[18px]">
            코스피지수, 달려원, 채권 등 <br className="max-md:block hidden" />
            현물 선물 옵션 거래 가능
          </p>
          <div className="w-full h-[432px] rounded-[12px] overflow-hidden bg-black relative max-md:h-[344px]">
            <img
              src="/images/ocbc/domestic/domestic-banner.jpeg"
              alt="배너이미지"
              className="h-full"
            />
            <div className="w-[480px] absolute top-1/2 -translate-y-1/2 left-1/2 max-md:w-[calc(100%-48px)] max-md:h-fit max-md:-translate-x-1/2 max-md:-translate-y-0 max-md:top-auto max-md:bottom-[20px]">
              <p className="text-[24px] font-bold text-white mb-[24px] max-md:mb-[14px] max-md:text-[22px]">
                국내선물이란?
              </p>
              <p className="text-[18px] leading-[27px] text-white max-md:leading-[22px] max-md:text-[15px] break-keep">
                한국거래소(KRX)에 상장된 지수, 통화, 금리, 주식,
                상품(금,돈육)등을 기초자산으로 하는 파생상품으로서, 미래
                일정시점에 특정 상품을 현재 합의한 가격으로, 미리 사거나 파는
                계약을 통하여 새로운 투자 기회와 위험회피수단을 제공해주는
                상품입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[80px] bg-white max-md:pb-[60px] ">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="pl-[24px] border-l-8 border-r-0 border-t-0 border-b-0 border-solid border-[#ED1C24] mb-[44px] text-[24px] font-bold max-md:pl-[16px] max-md:text-[20px] max-md:mb-[32px]">
            국내 선물 거래 상품
          </div>
          <div className="flex gap-[28px] max-md:flex-col max-md:gap-[12px]">
            <div className="rounded-[12px] w-full h-[492px] overflow-hidden relative max-md:h-[360px]">
              <img
                src="/images/ocbc/domestic/domestic-item1.png"
                alt="국내 선물 거래 상품"
                className="w-full h-full object-cover"
              />
              <div className="bg-[rgba(0,0,0,0.51)] w-full absolute min-h-[220px] bottom-0 py-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px] max-md:min-h-[auto]">
                <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px]">
                  KOSPI200
                </p>
                <p className="text-white leading-[22px] break-keep ">
                  금융투자회사에서 국내선물 거래할 수 있도록 제공해드리는 상품은
                  <br className="max-md:hidden" />
                  KOSP1200 단 하나로 진행 드리고 있습니다.
                  <br className="max-md:hidden" /> 추후 더욱 성장하며 많은
                  상품들을 제공 해드릴 수 있도록 노력하고 있으니
                  <br className="max-md:hidden" /> 당사에 많은 관심과 기대
                  부탁드립니다.
                </p>
              </div>
            </div>
            <div className="rounded-[12px] w-full h-[492px] overflow-hidden relative max-md:h-[360px]">
              <img
                src="/images/ocbc/domestic/domestic-item2.png"
                alt="국내 선물 거래 상품"
                className="w-full h-full object-cover"
              />
              <div className="bg-[rgba(0,0,0,0.51)] w-full absolute min-h-[220px] bottom-0 pt-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px] max-md:min-h-[auto]">
                <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px]">
                  코스피200 선물
                </p>
                <p className="text-white leading-[22px] break-keep">
                  코스피 200 선물은 유가증권시장본부에 상장된 주권 200 종목의
                  <br className="max-md:hidden" />
                  시가총액 기준으로 산출된 코스피 200 지수
                  <br className="max-md:hidden" /> (산출기준시점 1990.01.03)를
                  거래대상으로 하는 상품입니다.
                  <br className="max-md:hidden" /> 이처럼 코스피 200 선물은
                  주가지수를 거래대상으로 하고 있어
                  <br className="max-md:hidden" /> 최종결제방법으로 현금결제를
                  채택하고 있습니다.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[80px] bg-white max-md:pb-[60px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="pl-[24px] border-l-8 border-r-0 border-t-0 border-b-0 border-solid border-[#ED1C24] mb-[44px] text-[24px] font-bold max-md:pl-[16px] max-md:text-[20px] max-md:mb-[32px]">
            국내 선물 주요 특징
          </div>
          <div className="grid grid-cols-3 gap-3 max-md:grid-cols-1">
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon1.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  다양한 상품에
                  <br />
                  <b className="text-[#ED1C24]">직접 투자</b> 가능
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  환율, 주가지수, 금리를
                  <br /> 포함한 금융선물 및 개별주식
                  <br /> 선물까지 거래 가능
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[29px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon2.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  <b className="text-[#ED1C24]">전략적인</b> 투자 가능
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  현물에 대한 헤지 목적 거래는
                  <br /> 기본, 선물과 옵션을 활용한
                  <br /> 합성 전략도 가능
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon3.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  <b className="text-[#ED1C24]">레버리지</b> 활용 가능
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  상품 계약 크기 대비
                  <br /> 적은 금액으로 거래
                </p>
                <p className="text-[#FF000A] text-[12px] font-medium leading-[17px]">
                  * 레버리지 사용으로
                  <br /> 원금 초과손실 위험이 있습니다.
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon4.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  투자자보호제도 완화
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  사전교육/모의거래
                  <br /> 시간 단축 및 기본예탁금
                  <br /> 축소로 접근성 상승
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon5.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  <b className="text-[#ED1C24]">야간</b> 연계거래 지원
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  해외거래소와 한국거래소
                  <br /> 연계로 야간시간에도
                  <br /> 해외 이슈 대응 가능
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[28px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img src="/images/ocbc/domestic/icon6.png" alt="아이콘" />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px]">
                  <b className="text-[#ED1C24]">모의거래</b> 제공
                </p>
                <p className="text-[#524C4C] leading-[23px] text-justify">
                  실거래 계좌가 없어도
                  <br /> 실제와 유사한 데이터로
                  <br /> 투자전략 사전 연습 기회 제공
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-[#212121] py-[62px] max-md:py-[40px]">
        <div className="w-[1144px] mx-auto max-md:px-[20px] max-md:w-full">
          <div className="text-[18px] mb-5 w-fit font-bold text-white px-[22px] py-[8px] rounded-[36px] bg-[rgba(0,0,0,0.16)] max-md:mb-3">
            투자유의사항
          </div>
          <p className="leading-[24px] text-white">
            당사는 금융투자상품에 관하여 충분히 설명할 의무가 있으며, 투자자는
            투자에 앞서 그러한 설명을 충분히 들으시기 바랍니다. <br />
            금융투자상품은 운용결과 투자원금의 손실이 발생 할 수 있으며 그
            손실은 투자자에게 귀속됩니다.
          </p>
        </div>
      </div>
    </>
  );
}
