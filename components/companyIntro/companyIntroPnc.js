import React, { useState } from "react";
import InvestmentNotice from "@components/pnc/investmentNotice";

const CompanyIntroPnc = () => {
  const [activeTap, setActiveTap] = useState(1);
  return (
    <div className="w-full">
      {/* 헤더 배경 섹션 */}
      <div
        className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-[32px] md:mb-[64px]"
        style={{
          backgroundImage: `url('/assets/companyIntroduce_bg_img.png')`,
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-white text-[30px] md:text-[48px] font-bold">
            회사소개
          </h1>
        </div>
        <div className="relative z-10 w-full max-w-[1180px] flex text-white text-[18px] font-medium pb-[16px]">
          <div className={`relative flex-1 ${activeTap === 0 ? "z-10" : ""}`}>
            <button
              className={`cursor-pointer w-full h-[48px] md:h-[64px] bg-white/10 backdrop-blur-sm border-solid ${
                activeTap === 0
                  ? "border-2 border-white"
                  : "border border-white/40"
              }`}
              onClick={() => setActiveTap(0)}
            >
              인사말
            </button>
          </div>
          <div
            className={`relative flex-1 -mx-[1px] ${
              activeTap === 1 ? "z-10" : ""
            }`}
          >
            <button
              className={`cursor-pointer w-full h-[48px] md:h-[64px] bg-white/10 backdrop-blur-sm border-solid border ${
                activeTap === 1
                  ? "border-2 border-white"
                  : "border border-white/40"
              }`}
              onClick={() => setActiveTap(1)}
            >
              사업소개
            </button>
          </div>
          <div className={`relative flex-1 ${activeTap === 2 ? "z-10" : ""}`}>
            <button
              className={`cursor-pointer w-full h-[48px] md:h-[64px] bg-white/10 backdrop-blur-sm border-solid border ${
                activeTap === 2
                  ? "border-2 border-white"
                  : "border border-white/40"
              }`}
              onClick={() => setActiveTap(2)}
            >
              비전
            </button>
          </div>
        </div>
      </div>

      {activeTap === 0 && (
        <section className="max-w-[1180px] mx-auto px-[16px] md:px-0">
          <h2 className="text-[60px] md:text-[100px] font-extrabold text-[#F3F3F3] border-b border-[#E3E3E3] overflow-hidden h-[67px] md:h-[112px]">
            Greeting
          </h2>
          <div className="flex mt-[40px] md:mt-[80px] md:pb-[56px] flex-col md:flex-row">
            <div className="md:w-2/5 md:pl-[48px] md:pr-[96px] pb-[24px] md:pb-0">
              <h3 className="text-[24px] md:text-[36px] font-medium leading-snug">
                존경하는 고객여러분, 반갑습니다.
              </h3>
              <p className="text-[18px] text-[#636363] font-normal mt-[12px] md:mt-[24px] pr-[4px]">
                먼저 PNC 금융 투자그룹에 많은 사랑과 성원을 보내주시는 고객
                여러분께 깊은 감사 말씀을 드립니다.
              </p>
            </div>
            <div className="md:w-3/5 text-[18px] text-[#131313] flex flex-col gap-[16px] md:gap-[32px] md:pr-[48px]">
              <p>
                PNC 금융 투자그룹은 자본 시장 국내, 외 선물을 통한 성장 발전을
                지원하며 차별화된 자산 관리 서비스를 제공해 드리는 금융 투자
                회사입니다.
              </p>
              <p>
                저희 PNC 금융 투자는 국내 파생상품 시장 내 주축으로서 자리를
                매김하고 있으며 지난 10여 년 동안 글로벌 경제의 성장과 더불어
                국내외 파생상품 시장에서 지속적으로 성장, 발전하고 있습니다.
              </p>
              <p>
                또한 오랜 해를 걸치며 파생상품 시장에서 영업 노하우를 축적함과
                동시에 파생 상품 시장의 성장 잠재력에 대한 이해와 리스크 관리의
                중요성을 인지하고 있으며 고객 친화적이고 고객 중심적인 서비스를
                제공하기 위하여 심혈을 기울이고 있습니다.
              </p>
              <p>
                당사는 고객 여러분들께 한국거래소(KRX)에 상장된 상품뿐만 아니라
                다양한 해외 파생상품을 보다 신뢰할 수 있는 거래 환경에서
                제공하기 위하여 최선의 노력을 다할 것입니다. 또한 고객님의
                니즈를 정확하게 파악하고, 그에 따른 최적의 상품과 서비스로
                모시겠습니다.
              </p>
              <p>
                향후의 경제 환경은 불확실성으로 가득하지만 PNC 금융투자는
                신뢰감을 겸비한 전문가적 경험과 역량으로 무장하고, 올바른
                윤리의식을 갖춘 금융인으로서 책임과 의무를 다할 것을
                약속드립니다.
              </p>
              <p>
                고객님들의 변함없는 성원과 관심에 다시 한 번 감사 드리며, 하시는
                모든 일에 행운이 함께 하기를 진심으로 기원합니다.
              </p>
              <p>감사합니다.</p>
            </div>
          </div>
        </section>
      )}

      {activeTap === 1 && (
        <section className="max-w-[1180px] mx-auto px-[16px] md:px-0">
          <h2 className="text-[60px] md:text-[100px] font-extrabold text-[#F3F3F3] border-b border-[#E3E3E3] overflow-hidden h-[67px] md:h-[112px]">
            Business
          </h2>
          <div className="flex mt-[40px] md:mt-[80px] md:pb-[56px] flex-col md:flex-row">
            <div className="md:w-2/5 md:pl-[48px] md:pr-[96px] pb-[24px] md:pb-0">
              <h3 className="text-[24px] md:text-[36px] font-medium leading-snug">
                PNC의 사업영역을 <br />
                소개합니다.
              </h3>
            </div>
            <div className="relative md:w-3/5 flex flex-col gap-[16px] md:gap-[32px] md:pr-[48px]">
              <div
                className="relative rounded-2xl overflow-hidden h-[280px] md:h-[410px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/business-1.jpg)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full text-white flex flex-col justify-end p-[32px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  }}
                >
                  <h4 className="text-[20px] md:text-[32px] font-semibold md:font-bold leading-snug">
                    국내 선물 · 옵션
                    <br />
                    중개업무
                  </h4>
                  <p className="mt-[8px] text-[18px] md:text-[20px] font-normal md:font-medium">
                    선물 · 옵션 거래등의 수탁, 중개, 주선, 대리, 결제, 정산 업무
                  </p>
                </div>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden h-[280px] md:h-[410px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/business-2.jpg)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full text-white flex flex-col justify-end p-[32px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  }}
                >
                  <h4 className="text-[20px] md:text-[32px] font-semibold md:font-bold leading-snug">
                    해외 선물거래 <br />
                    중개업무
                  </h4>
                  <p className="mt-[8px] text-[18px] md:text-[20px] font-normal md:font-medium">
                    해외 선물거래의 수탁, 중개, 주선, 대리, 선물옵션 거래등의
                    결제, 정산업무
                  </p>
                </div>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden h-[280px] md:h-[410px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/business-3.jpg)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full text-white flex flex-col justify-end p-[32px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  }}
                >
                  <h4 className="text-[20px] md:text-[32px] font-semibold md:font-bold leading-snug">
                    HTS 고객응대 <br />
                    업무
                  </h4>
                  <p className="mt-[8px] text-[18px] md:text-[20px] font-normal md:font-medium">
                    HTS 프로그램 오류 및 이용방법 등 문의 응대업무
                  </p>
                </div>
              </div>
              <div
                className="relative rounded-2xl overflow-hidden h-[280px] md:h-[410px] w-full bg-cover bg-center"
                style={{
                  backgroundImage: "url(/assets/business-4.jpg)",
                }}
              >
                <div
                  className="absolute inset-0 w-full h-full text-white flex flex-col justify-end p-[32px]"
                  style={{
                    background:
                      "linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.5) 100%)",
                  }}
                >
                  <h4 className="text-[20px] md:text-[32px] font-semibold md:font-bold leading-snug">
                    전자자금 <br />
                    이체업무
                  </h4>
                  <p className="mt-[8px] text-[18px] md:text-[20px] font-normal md:font-medium">
                    외국환업무 및 전자자금 이체업무
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden md:flex flex-nowrap p-[48px] border border-[#E3E3E3] rounded-2xl justify-center mb-[64px]">
            <div className="w-[300px] text-center mx-[-20px]">
              <div
                className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                style={{
                  backgroundImage: "url(/assets/bus-img-1.png)",
                }}
              ></div>
              <div className="mt-[24px] font-semibold text-[24px]">Cost</div>
            </div>
            <div className="w-[300px] text-center mx-[-20px]">
              <div
                className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                style={{
                  backgroundImage: "url(/assets/bus-img-2.png)",
                }}
              ></div>
              <div className="mt-[24px] font-semibold text-[24px]">People</div>
            </div>
            <div className="w-[300px] text-center mx-[-20px]">
              <div
                className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                style={{
                  backgroundImage: "url(/assets/bus-img-3.png)",
                }}
              ></div>
              <div className="mt-[24px] font-semibold text-[24px]">System</div>
            </div>
            <div className="w-[300px] text-center mx-[-20px]">
              <div
                className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                style={{
                  backgroundImage: "url(/assets/bus-img-4.png)",
                }}
              ></div>
              <div className="mt-[24px] font-semibold text-[24px]">Service</div>
            </div>
          </div>
          <div className="md:hidden p-[48px]">
            <div className="flex flex-nowrap justify-center">
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/bus-img-1.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">Cost</div>
              </div>
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/bus-img-2.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">
                  People
                </div>
              </div>
            </div>
            <div className="flex flex-nowrap justify-center mt-[40px]">
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/bus-img-3.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">
                  System
                </div>
              </div>
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/bus-img-4.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">
                  Service
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {activeTap === 2 && (
        <section className="max-w-[1180px] mx-auto px-[16px] md:px-0">
          <h2 className="text-[60px] md:text-[100px] font-extrabold text-[#F3F3F3] border-b border-[#E3E3E3] overflow-hidden h-[67px] md:h-[112px]">
            Vision
          </h2>
          <div className="flex mt-[40px] md:mt-[8px]0 md:pb-[56px] flex-col md:flex-row">
            <div className="flex gap-[24px] flex-col md:flex-row">
              <div className="bg-[#F9F9F9] p-[32px] rounded-2xl">
                <div
                  className="w-full h-[180px] md:h-[316px] bg-center bg-cover rounded-2xl"
                  style={{
                    backgroundImage: "url(/assets/vision-1.jpg)",
                  }}
                ></div>
                <div className="mt-[24px] mb-[8px] text-[18px] md:text-[24px] font-semibold leading-snug">
                  바른 길을 걷는 투명한 경영
                </div>
                <p className="text-[18px] text-[#636363]">
                  백년 기업으로 발돋움 하기 위하여 공정하고 투명한 경영으로
                  사회적 정당성의 기반을 갖춥니다.
                </p>
              </div>
              <div className="bg-[#F9F9F9] p-[32px] rounded-2xl">
                <div
                  className="w-full h-[180px] md:h-[316px] bg-center bg-cover rounded-2xl"
                  style={{
                    backgroundImage: "url(/assets/vision-2.jpg)",
                  }}
                ></div>
                <div className="mt-[24px] mb-[8px] text-[18px] md:text-[24px] font-semibold leading-snug">
                  책임을 다 하는 기업
                </div>
                <p className="text-[18px] text-[#636363]">
                  모든 구성원이 회사의 방향과 사회적 규멈에 맞도록 각자의
                  위치에서 책임을 다하며 신의를 지키도록 합니다.
                </p>
              </div>
              <div className="bg-[#F9F9F9] p-[32px] rounded-2xl">
                <div
                  className="w-full h-[180px] md:h-[316px] bg-center bg-cover rounded-2xl"
                  style={{
                    backgroundImage: "url(/assets/vision-3.jpg)",
                  }}
                ></div>
                <div className="mt-[24px] mb-[8px] text-[18px] md:text-[24px] font-semibold leading-snug">
                  상생과 가치 창출
                </div>
                <p className="text-[18px] text-[#636363]">
                  모든 구성원이 회사의 방향과 사회적 규멈에 맞도록 각자의
                  위치에서 책임을 다하며 신의를 지키도록 합니다.
                </p>
              </div>
            </div>
          </div>
          {/* pc */}
          <div className="hidden md:block p-[48px] border border-[#E3E3E3] rounded-2xl mb-[64px]">
            <div className="font-extrabold text-[40px] mb-[48px]">
              Our Strategy
            </div>
            <div className="flex justify-center gap-[64px] flex-nowrap">
              <div className="w-[300px] text-center">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-1.png)",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">
                  모니터링
                </div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  오류의 유/무
                  <br />
                  신속히 검토 후 대응
                </p>
              </div>
              <div className="w-[300px] text-center">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-2.png)",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">신뢰</div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  윤리 경영 바탕
                  <br />
                  대고객 신뢰관계 고양
                </p>
              </div>
              <div className="w-[300px] text-center">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-3.png)",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[24px]">
                  고객중심
                </div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  고객 니즈에 능동적이고 선대적인 대응,
                  <br />
                  고객 맞춤형 거래 환경 + 경쟁력 있는 시스템
                </p>
              </div>
            </div>
          </div>
          {/* 모바일 */}
          <div className="md:hidden p-[48px]">
            <div className="flex flex-nowrap justify-center">
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-1.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[20px]">
                  모니터링
                </div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  오류의 유/무
                  <br />
                  신속히 검토 후 대응
                </p>
              </div>
              <div className="w-[300px] text-center mx-[-20px]">
                <div
                  className="max-w-[300px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-2.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[20px]">신뢰</div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  윤리 경영 바탕
                  <br />
                  대고객 신뢰관계 고양
                </p>
              </div>
            </div>
            <div className="flex flex-nowrap justify-center mt-[40px]">
              <div className="w-[200px] text-center mx-[-20px]">
                <div
                  className="max-w-[200px] pb-[100%] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                  style={{
                    backgroundImage: "url(/assets/vision-img-3.png)",
                    backgroundSize: "113px auto",
                  }}
                ></div>
                <div className="mt-[24px] font-semibold text-[20px]">
                  고객중심
                </div>
                <p className="text-[16px] text-[#A3A3A3] mt-[8px]">
                  고객 니즈에 능동적이고 선대적인 대응, 고객 맞춤형 거래 환경 +
                  경쟁력 있는 시스템
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      <InvestmentNotice />
    </div>
  );
};

export default CompanyIntroPnc;
