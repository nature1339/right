import Head from "next/head";
import { act, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import clsx from "clsx";

export default function CompanyIntroPnc() {
  const sections = ["인사말", "사업소개", "연혁"];
  const [activeSection, setActiveSection] = useState("인사말");

  return (
    <>
      <Head>
        <title>회사소개: OCBC</title>
        <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
      </Head>
      <div className="h-[625px] relative bg-[url('/images/ocbc/about/main.png')] bg-no-repeat bg-cover max-md:h-[298px]">
        <div className="bg-[rgba(0,0,0,.4)] w-full h-full absolute flex justify-center items-center">
          <div className="flex flex-col gap-[25px] justify-center">
            <div className="flex items-center justify-center gap-4">
              <p className="text-[#B1B1B1] font-medium max-md:text-[14px]">
                HOME
              </p>
              <IoIosArrowForward className="text-[#B1B1B1]" />
              <p className="text-white font-medium max-md:text-[14px]">
                회사소개
              </p>
            </div>
            <p className="font-bold text-[48px] text-white max-md:text-[32px]">
              회사소개
            </p>
          </div>
          <div className="absolute bottom-0 w-full bg-[rgba(0,0,0,0.35)] px-[260px] py-4 flex justify-center gap-3 max-md:px-[40px]">
            <div
              className={clsx(
                "w-[180px] cursor-pointer text-[18px] font-semibold h-[66px] flex justify-center items-center rounded-[100px] max-md:h-[40px] max-md:w-[100px]",
                { "bg-[#ED1C24] text-white": activeSection === "인사말" }
              )}
              onClick={() => setActiveSection("인사말")}
            >
              인사말
            </div>
            <div
              className={clsx(
                "w-[180px] cursor-pointer text-[18px] font-semibold h-[66px] flex justify-center items-center rounded-[100px] max-md:h-[40px] max-md:w-[100px]",
                { "bg-[#ED1C24] text-white": activeSection === "사업소개" }
              )}
              onClick={() => setActiveSection("사업소개")}
            >
              사업소개
            </div>
            <div
              className={clsx(
                "w-[180px] cursor-pointer text-[18px] font-semibold h-[66px] flex justify-center items-center rounded-[100px] max-md:h-[40px] max-md:w-[100px]",
                { "bg-[#ED1C24] text-white": activeSection === "연혁" }
              )}
              onClick={() => setActiveSection("연혁")}
            >
              연혁
            </div>
          </div>
        </div>
      </div>
      {activeSection === "인사말" && (
        <div className="py-[100px] bg-white max-md:py-[60px]">
          <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
            <p className="text-[18px] mb-[24px] font-bold text-[#ED1C24] text-center max-md:text-[15px] max-md:mb-[16px]">
              인사말
            </p>
            <p className="text-[32px] mb-[24px] font-bold text-black text-center max-md:text-[24px] max-md:mb-[16px]">
              존경하는 고객여러분, 반갑습니다
            </p>
            <p className="font-medium text-[20px] mb-[44px] text-center max-md:text-[16px] max-md:mb-[32px]">
              먼저 OCBC 금융 투자그룹에 많은 사랑과 성원을{" "}
              <br className="max-md:block hidden" />
              보내주시는 <br className="max-md:hidden" />
              고객 여러분께 깊은 감사 말씀을 드립니다.
            </p>
            <div className="w-full h-[432px] max-md:h-[286px] rounded-[12px] bg-[url('/images/ocbc/about/about-intro.png')] mb-[44px] max-md:mb-[32px] flex justify-center items-center bg-no-repeat bg-cover bg-center">
              <img src="/images/logo_ocbckr.com_red.svg" alt="logo" />
            </div>
            <div className="flex gap-[70px] justify-between max-md:flex-col max-md:gap-[12px]">
              <div className="w-1/2 flex flex-col gap-[18px] max-md:w-full max-md:gap-[12px]">
                <p className="text-justify">
                  OCBC 금융 투자그룹은 자본 시장 국내, 외 선물을 통한 성장
                  발전을 지원하며 <br className="max-md:hidden" />
                  차별화된 자산 관리 서비스를 제공해 드리는 금융 투자
                  회사입니다.
                </p>
                <p className="text-justify">
                  저희 OCBC 금융 투자는 국내 파생상품 시장 내 주축으로서 자리를
                  매김하고 있으며 <br className="max-md:hidden" />
                  지난 10여 년 동안 글로벌 경제의 성장과 더불어
                  <br className="max-md:hidden" /> 국내외 파생상품 시장에서
                  지속적으로 성장, 발전하고 있습니다.
                </p>
                <p className="text-justify">
                  또한 오랜 해를 걸치며 파생상품 시장에서 영업 노하우를 축적함과
                  동시에 <br className="max-md:hidden" />
                  파생 상품 시장의 성장 잠재력에 대한 이해와 리스크 관리의
                  중요성을 인지하고 있으며 고객 친화적이고 고객 중심적인
                  서비스를 제공하기 위하여 심혈을 기울이고 있습니다.
                </p>
              </div>
              <div className="w-1/2 flex flex-col gap-[18px] max-md:w-full max-md:gap-[12px]">
                <p className="text-justify">
                  당사는 고객 여러분들께 한국거래소(KRX)에 상장된 상품뿐만
                  아니라
                  <br className="max-md:hidden" />
                  다양한 해외 파생상품을 보다 신뢰할 수 있는 거래 환경에서
                  제공하기 위하여 <br className="max-md:hidden" />
                  최선의 노력을 다할 것입니다. 또한 고객님의 니즈를 정확하게
                  파악하고, <br className="max-md:hidden" />
                  그에 따른 최적의 상품과 서비스로 모시겠습니다.
                </p>
                <p className="text-justify">
                  향후의 경제 환경은 불확실성으로 가득하지만 OCBC 금융투자는
                  신뢰감을 겸비한 <br className="max-md:hidden" />
                  전문가적 경험과 역량으로 무장하고, 올바른 윤리의식을 갖춘
                  금융인으로서 <br className="max-md:hidden" />
                  책임과 의무를 다할 것을 약속드립니다.
                </p>
                <p className="text-justify">
                  고객님들의 변함없는 성원과 관심에 다시 한 번 감사 드리며,{" "}
                  <br className="max-md:hidden" />
                  하시는 모든 일에 행운이 함께 하기를 진심으로 기원합니다.
                </p>
                <p>감사합니다.</p>
              </div>
            </div>
          </div>
        </div>
      )}
      {activeSection === "사업소개" && (
        <div className="bg-[url('/images/ocbc/about/about-area.png')] bg-no-repeat bg-cover">
          <div className="py-[100px] bg-[rgba(0,0,0,.4)] max-md:py-[60px]">
            <div className="w-[1144px] mx-auto max-md:px-[20px] max-md:w-full">
              <p className="text-[#ED1C24] text-[18px] font-bold mb-[24px] max-md:mb-[16px] max-md:text-[15px]">
                사업영역
              </p>
              <p className="font-bold text-[32px] text-white mb-[60px] max-md:text-[24px] max-md:mb-[32px]">
                OCBC의 사업영역을 소개합니다.
              </p>
              <div className="grid grid-cols-2 max-md:grid-cols-1 gap-[28px] mb-[60px] max-md:gap-[12px] max-md:mb-[32px]">
                <div className="rounded-[12px] w-full h-[320px] max-md:h-[320px] overflow-hidden relative">
                  <img
                    src="/images/ocbc/about/about-area1.png"
                    alt="사업영역1"
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[rgba(0,0,0,0.51)] w-full absolute bottom-0 py-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px]">
                    <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px] max-md:mb-[8px]">
                      국내선물/옵션 중개업무
                    </p>
                    <p className="text-white leading-[22px]">
                      선물/옵션 거래등의 수탁, 중개,
                      <br />
                      주선, 대리, 결제, 정산 업무
                    </p>
                  </div>
                </div>
                <div className="rounded-[12px] w-full h-[320px] max-md:h-[320px] overflow-hidden relative">
                  <img
                    src="/images/ocbc/about/about-area2.png"
                    alt="사업영역2"
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[rgba(0,0,0,0.51)] w-full absolute bottom-0 py-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px]">
                    <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px] max-md:mb-[8px]">
                      해외선물거래 중개업무
                    </p>
                    <p className="text-white leading-[22px]">
                      해외선물거래의 수탁, 중개, 주선, 대리
                      <br />
                      선물/옵션 거래등의 결제, 정산 업무
                    </p>
                  </div>
                </div>
                <div className="rounded-[12px] w-full h-[320px] max-md:h-[320px] overflow-hidden relative">
                  <img
                    src="/images/ocbc/about/about-area3.png"
                    alt="사업영역3"
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[rgba(0,0,0,0.51)] w-full absolute bottom-0 py-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px]">
                    <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px] max-md:mb-[8px]">
                      HTS 고객응대 업무
                    </p>
                    <p className="text-white leading-[22px]">
                      HTS 프로그램 오류 및<br />
                      이용방법 등 문의 응대업무
                    </p>
                  </div>
                </div>
                <div className="rounded-[12px] w-full h-[320px] max-md:h-[320px] overflow-hidden relative">
                  <img
                    src="/images/ocbc/about/about-area4.png"
                    alt="사업영역4"
                    className="w-full h-full object-cover"
                  />
                  <div className="bg-[rgba(0,0,0,0.51)] w-full absolute bottom-0 py-[40px] px-[28px] max-md:px-[20px] max-md:py-[24px]">
                    <p className="text-white font-semibold text-[24px] mb-[10px] max-md:text-[18px] max-md:mb-[8px]">
                      전자자금 이체업무
                    </p>
                    <p className="text-white leading-[22px]">
                      외국환업무 및 전자자금 이체업무
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/images/ocbc/about/about-area-bottom.png"
                  alt="사업영역하단이미지"
                  className="max-md:hidden"
                />
                <img
                  src="/images/ocbc/about/about-area-bottom-mo.png"
                  alt="사업영역하단이미지"
                  className="max-md:block hidden w-[80%]"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {activeSection === "연혁" && (
        <div className="py-[100px] max-md:py-[60px] bg-white">
          <div className="w-[1144px] mx-auto max-md:px-[20px] max-md:w-full">
            <p className="text-[18px] mb-[24px] font-bold text-[#ED1C24] text-center max-md:text-[15px] max-md:mb-[16px]">
              회사 비전
            </p>
            <p className="text-[32px] mb-[60px] font-bold text-black text-center max-md:text-[24px] max-md:mb-[32px]">
              Our Vision for a Stronger Future
            </p>
            <img
              src="/images/ocbc/about/about-vision-main.png"
              alt="비전이미지"
              className="mb-[60px] max-md:hidden"
            />
            <img
              src="/images/ocbc/about/about-vision-main-mo.png"
              alt="비전이미지"
              className="mb-[60px] hidden max-md:block max-md:mx-auto"
            />
            <div className="grid grid-cols-3 gap-5 max-md:grid-cols-1">
              <div className="bg-[#FCF4F4] py-[40px] rounded-[16px] flex flex-col items-center">
                <div className="w-[112px] aspect-square rounded-full bg-white flex justify-center items-center mb-[32px] max-md:w-[100px] max-md:mb-[24px]">
                  <img
                    src="/images/ocbc/about/about-vision1.png"
                    alt="비전아이콘"
                  />
                </div>
                <p className="text-[20px] mb-3 font-bold text-black text-center max-md:text-[18px] max-md:gap-2">
                  모니터링
                </p>
                <p className="text-center text-[18px] leading-[26px] text-[#524C4C] max-md:text-[15px] max-md:leading-[22px]">
                  오류의 유/무
                  <br />
                  신속히 검토 후 대응
                </p>
              </div>
              <div className="bg-[#FCF4F4] py-[40px] rounded-[16px] flex flex-col items-center">
                <div className="w-[112px] aspect-square rounded-full bg-white flex justify-center items-center mb-[32px]">
                  <img
                    src="/images/ocbc/about/about-vision2.png"
                    alt="비전아이콘"
                  />
                </div>
                <p className="text-[20px] mb-3 font-bold text-black text-center">
                  신뢰
                </p>
                <p className="text-center text-[18px] leading-[26px] text-[#524C4C]">
                  윤리 경영 바탕
                  <br />
                  대고객 신뢰관계 고양
                </p>
              </div>
              <div className="bg-[#FCF4F4] py-[40px] rounded-[16px] flex flex-col items-center">
                <div className="w-[112px] aspect-square rounded-full bg-white flex justify-center items-center mb-[32px]">
                  <img
                    src="/images/ocbc/about/about-vision3.png"
                    alt="비전아이콘"
                  />
                </div>
                <p className="text-[20px] mb-3 font-bold text-black text-center">
                  고객중심
                </p>
                <p className="text-center text-[18px] leading-[26px] text-[#524C4C]">
                  고객 니즈에 능동적이고 선대적인 대응
                  <br />
                  고객 맞춤형 거래 환경 + 경쟁력 있는 시스템
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="bg-[#212121] py-[62px] max-md:py-[40px]">
        <div className="w-[1144px] mx-auto max-md:px-[20px] max-md:w-full">
          <div className="text-[18px] mb-5 w-fit font-bold text-white px-[22px] py-[8px] rounded-[36px] bg-[rgba(0,0,0,0.16)] max-md:mb-3">
            투자유의사항
          </div>
          <p className="leading-[24px] text-white text-justify">
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
