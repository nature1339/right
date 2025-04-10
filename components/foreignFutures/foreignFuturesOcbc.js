import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";

export default function ForeignFuturesOcbc() {
  return (
    <>
      <Head>
        <title>해외선물: OCBC</title>
        <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
      </Head>
      <div className="h-[625px] relative bg-[url('/images/ocbc/overseas/background.jpeg')] bg-no-repeat bg-cover max-md:h-[298px]">
        <div className="bg-[rgba(0,0,0,.6)] w-full h-full absolute flex justify-center items-center">
          <div className="flex flex-col gap-[25px] justify-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-[#B1B1B1] font-medium max-md:text-[14px]">
                HOME
              </p>
              <IoIosArrowForward className="text-[#B1B1B1]" />
              <p className="text-white font-medium max-md:text-[14px]">
                해외선물
              </p>
            </div>
            <p className="font-bold text-[48px] text-white max-md:text-[32px]">
              해외선물
            </p>
          </div>
        </div>
      </div>
      <div className="bg-white pt-[100px] pb-[80px] max-md:pt-[60px] max-md:pb-[40px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="w-full h-[432px] rounded-[12px] overflow-hidden bg-black relative max-md:h-[344px]">
            <img
              src="/images/ocbc/overseas/overseas-banner.png"
              alt="배너이미지"
              className="h-full w-full"
            />
            <div className="w-[480px] absolute top-1/2 -translate-y-1/2 left-1/2 max-md:w-[calc(100%-40px)] max-md:top-auto max-md:translate-y-0 max-md:-translate-x-1/2 max-md:bottom-[20px]">
              <p className="text-[24px] font-bold text-white mb-[24px] max-md:text-[20px] max-md:mb-[14px]">
                해외선물이란?
              </p>
              <p className="break-keep text-[18px] leading-[27px] text-white max-md:text-[15px] max-md:leading-[22px] ">
                {/* 한국거래소(KRX)에 상장된 지수, 통화, 금리, 주식,
                상품(금,돈육)등을 기초자산으로 하는 파생상품으로서, 미래
                일정시점에 특정 상품을 현재 합의한 가격으로, 미리 사거나 파는
                계약을 통하여 새로운 투자 기회와 위험회피수단을 제공해주는
                상품입니다. */}
                한국거래소(KRX) D에 상장된
                <br className="max-md:hidden" /> 지수, 통화, 금리, 주식,
                상품(금, 돈육)등을 기초자산으로 하는
                <br className="max-md:hidden" /> 파생상품으로서, 미래일정 시점에
                특정 상품을
                <br className="max-md:hidden" /> 현재 합의한 가격으로, 미리
                사거나 파는 계약을 통하여
                <br className="max-md:hidden" />
                새로운 투자 기회와 위험회피 수단을 제공해 주는 상품입니다.
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[80px] bg-white max-md:pb-[60px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="pl-[24px] border-l-8 border-r-0 border-t-0 border-b-0 border-solid border-[#ED1C24] mb-[44px] text-[24px] font-bold max-md:pl-[16px] max-md:text-[20px] max-md:mb-[32px]">
            해외 선물 주요 특징
          </div>
          <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-[12px]">
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img
                  src="/images/ocbc/overseas/icon1.png"
                  alt="아이콘"
                  className="w-[50px]"
                />
              </div>
              <div className="flex-1 max-md:flex-auto">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                  <b className="text-[#ED1C24]">기본 예탁금 없이</b> 거래 가능
                </p>
                <p className="text-[#524C4C] leading-[23px]">
                  해외선물은 기본 예탁금 없이 상품별 <br />
                  위탁증거금 만으로 거래하실 수 있습니다.
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img
                  src="/images/ocbc/overseas/icon2.png"
                  alt="아이콘"
                  className="w-[50px]"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                  <b className="text-[#ED1C24]">양방향</b> 거래 가능
                </p>
                <p className="text-[#524C4C] leading-[23px]">
                  해외선물거래는 매수 진입과 매도 진입이
                  <br className="hidden max-md:block" /> 모두 가능한
                  <br className="max-md:hidden" /> 상품으로 유연한 시장 대응이
                  가능합니다.
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img
                  src="/images/ocbc/overseas/icon3.png"
                  alt="아이콘"
                  className="w-[50px]"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                  <b className="text-[#ED1C24]">레버리지</b> 효과
                </p>
                <p className="text-[#524C4C] leading-[23px]">
                  적은 증거금만으로 거래가 가능하기 <br />
                  때문에(증거금제도) 투자금액에 비해 <br />큰 폭의 손익이 발생할
                  수 있습니다.
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img
                  src="/images/ocbc/overseas/icon4.png"
                  alt="아이콘"
                  className="w-[50px]"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                  <b className="text-[#ED1C24]">23시간</b> 거래
                </p>
                <p className="text-[#524C4C] leading-[23px]">
                  OCBC에서 세공하는 시카고 상업거래소
                  <br className="hidden max-md:block" />
                  (CME) 시장은 <br className="max-md:hidden" />
                  23시간 열려 있어,
                  <br className="hidden max-md:block" /> 거의 수단 없는 거래가
                  가능합니다.
                </p>
              </div>
            </div>
            <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] col-span-2 max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px] max-md:col-span-1">
              <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
                <img
                  src="/images/ocbc/overseas/icon5.png"
                  alt="아이콘"
                  className="w-[50px]"
                />
              </div>
              <div className="flex-1">
                <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                  환전없이, <b className="text-[#ED1C24]">원화</b>로 주문 가능
                </p>
                <p className="text-[#524C4C] leading-[23px]">
                  해외거래소와 한국거래소 연계로
                  <br className="hidden max-md:block" />
                  <br className="max-md:hidden" />
                  야간시간에도 해외 이슈 대응 가능
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
