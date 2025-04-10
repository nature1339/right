import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";

export default function SystemOcbc() {
  return (
    <>
      <Head>
        <title>거래시스템: OCBC</title>
        <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
      </Head>
      <div className="h-[625px] relative bg-[url('/images/ocbc/system/background.png')] bg-no-repeat bg-cover max-md:h-[298px]">
        <div className="bg-[rgba(0,0,0,.7)] w-full h-full absolute flex justify-center items-center">
          <div className="flex flex-col gap-[25px] justify-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-[#B1B1B1] font-medium max-md:text-[14px]">
                HOME
              </p>
              <IoIosArrowForward className="text-[#B1B1B1]" />
              <p className="text-white font-medium max-md:text-[14px]">
                거래시스템
              </p>
            </div>
            <p className="font-bold text-[48px] text-white max-md:text-[32px]">
              거래시스템
            </p>
          </div>
        </div>
      </div>
      <div className="pt-[100px] pb-[80px] bg-white max-md:pt-[60px] max-md:pb-[40px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <p className="font-bold text-[32px] leading-[38px] text-black mb-[48px] max-md:text-[24px] max-md:leading-[28px] max-md:mb-[40px]">
            차세대 거래 플랫폼 <br className="hidden max-md:block" />
            <b className="text-[#ED1C24]">원클릭 글로벌 투자</b>
          </p>
          <div className="flex gap-[80px] items-center max-md:flex-col max-md:gap-[24px]">
            <div className="w-full rounded-[12px] h-[354px] overflow-hidden max-md:h-[238px]">
              <img
                src="/images/ocbc/system/system-banner.png"
                alt="이미지"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="w-full">
              <p className="text-[28px] text-black font-bold mb-[8px] max-md:text-[22px]">
                모든 매매시스템 지원
              </p>
              <p className="text-black font-medium text-[18px] mb-[40px] max-md:text-[16px] max-md:mb-[18px]">
                언제 어디서든 간편하고 신속하게공간에 제약을
                <br className="hidden max-md:block" /> 받지않고 거래
              </p>
              <div className="flex flex-col gap-[16px]">
                <div className="flex items-center gap-[10px]">
                  <div className="bg-[#838383] rounded-[100px] w-[95px] h-[40px] flex justify-center items-center text-white font-medium">
                    WTS
                  </div>
                  <p className="font-medium">Web Trading System</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="bg-[#5E5E5E] rounded-[100px] w-[95px] h-[40px] flex justify-center items-center text-white font-medium">
                    HTS
                  </div>
                  <p className="font-medium">Home Trading System</p>
                </div>
                <div className="flex items-center gap-[10px]">
                  <div className="bg-[#3D3D3D] rounded-[100px] w-[95px] h-[40px] flex justify-center items-center text-white font-medium">
                    MTS
                  </div>
                  <p className="font-medium">Mobile Trading System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="pb-[80px] bg-white max-md:pb-[60px]">
        <div className="grid grid-cols-2 gap-5 max-md:grid-cols-1 max-md:gap-[12px] w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
            <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
              <img
                src="/images/ocbc/system/icon1.png"
                alt="아이콘"
                className="w-[60px]"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                강력한 거래 소프트웨어
              </p>
              <p className="text-[#524C4C] leading-[23px]">
                강력한 기능과 도구가 구비된 일체화
                <br className="hidden max-md:block" /> 금융거래
                <br className="max-md:hidden" />
                소프트 웨어를 체험하고,
                <br className="hidden max-md:block" /> 풍부한 투자 종목을 원클릭
                조작.
              </p>
            </div>
          </div>
          <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
            <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
              <img
                src="/images/ocbc/system/icon2.png"
                alt="아이콘"
                className="w-[60px]"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                영활한 거래시스템
              </p>
              <p className="text-[#524C4C] leading-[23px]">
                한 계좌의 전체 거래 주문 유형을
                <br className="hidden max-md:block" /> 지원하므로 모든 거래에
                <br className="max-md:hidden" />
                쉽게 대처할 수 있고
                <br className="hidden max-md:block" /> 어떠한 거래 기회도
                포착가능.
              </p>
            </div>
          </div>
          <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
            <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
              <img
                src="/images/ocbc/system/icon3.png"
                alt="아이콘"
                className="w-[60px]"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                미래를 향한 기술분석
              </p>
              <p className="text-[#524C4C] leading-[23px]">
                38가지 기술 지표와 44가지 그래픽 대상의
                <br className="hidden max-md:block" /> 전체 분석{" "}
                <br className="max-md:hidden" />
                방식제공.
                <br className="hidden max-md:block" /> 전반적인 시장 분석제공 및
                가격동향 예측.
              </p>
            </div>
          </div>
          <div className="border-[1px] flex gap-[32px] items-center border-solid border-[#E7E7E7] w-full rounded-[16px] px-[30px] py-[40px] max-md:py-[32px] max-md:flex-col max-md:items-start max-md:gap-[26px]">
            <div className="bg-[#FCF4F4] w-[100px] h-[100px] rounded-full flex justify-center items-center">
              <img
                src="/images/ocbc/system/icon4.png"
                alt="아이콘"
                className="w-[60px]"
              />
            </div>
            <div className="flex-1">
              <p className="font-bold mb-[12px] text-[20px] text-black max-md:text-[18px] max-md:mb-[8px]">
                맞춤형 거래주의보
              </p>
              <p className="text-[#524C4C] leading-[23px]">
                이메일, 휴대전화 알림 등을 통해 주요 거래
                <br className="hidden max-md:block" />
                사건
                <br className="max-md:hidden" />
                정보를 받을 수 있습니다.
              </p>
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
            투자에 앞서 그러한 설명을 충분히 들으시기 바랍니다.{" "}
            <br className="max-md:hidden" />
            금융투자상품은 운용결과 투자원금의 손실이 발생 할 수 있으며 그
            손실은 투자자에게 귀속됩니다.
          </p>
        </div>
      </div>
    </>
  );
}
