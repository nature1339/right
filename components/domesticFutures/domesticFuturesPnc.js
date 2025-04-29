import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";
import InvestmentNotice from "@components/pnc/investmentNotice";

export default function DomesticFuturesPnc() {
  const info = [
    {
      h4: "다양한 상품에 직접 투자 가능",
      p: "환율, 주가지수, 금리를 포함한 금융선물 및 개별주식 선물까지 거래 가능",
    },
    {
      h4: "전략적인 투자 가능",
      p: "현물에 대한 헷지 목적 거래는 기본, 선물과 옵션을 활용한 합성 전략도 가능",
    },
    {
      h4: "투자자보호제도 완화",
      p: "사전교육/모의거래 시간 단축 및 기본예탁금 축소로 접근성 상승",
    },
    {
      h4: "레버리지 활용 가능",
      p: "상품 계약 크기 대비 적은 금액으로 거래",
    },
    {
      h4: "모의거래 제공",
      p: "실거래 계좌가 없어도 실제와 유사한 데이터로 투자전략 사전 연습 기회 제공",
    },
    {
      h4: "야간 연계거래 지원",
      p: "해외거래소와 한국거래소 연계로 야간시간에도 해외 이슈 대응 가능",
    },
  ];
  return (
    <>
      <Head>
        <title>국내선물: PNC</title>
        <link rel="shortcut icon" href="favicon_pnckr.com.ico" />
      </Head>
      <div className="w-full">
        {/* 헤더 배경 섹션 */}
        <div
          className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-[32px] md:mb-[64px]"
          style={{
            backgroundImage: `url('/assets/bg-domestic-futures.jpg')`,
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
              국내선물
            </h1>
          </div>
        </div>
        <div className="max-w-[1212px] px-[16px] mx-auto text-[#131313]">
          <div className="mt-[32px] md:mt-[112px] text-[24px] md:text-[48px] font-semibold text-center">
            미래를 예측하는 새로운 투자수단을 찾고 있다면!
          </div>
          <div className="mt-[8px] text-[18px] md:text-[24px] text-center">
            코스피지수, 달려원, 채권 등 현물 선물 옵션 거래 가능
          </div>
          <div className="mt-[96px] bg-[#F9F9F9] rounded-2xl p-[40px] flex flex-col md:flex-row items-center gap-[40px] md:gap-[80px]">
            <div className="flex-1 w-full md:w-auto">
              <div
                className="w-full md:w-[400px] h-[114px] bg-cover bg-center rounded-2xl"
                style={{
                  backgroundImage: `url('/assets/bg-domestic-futures.jpg')`,
                }}
              ></div>
            </div>
            <div className="flex-auto">
              <div className="text-[24px] font-semibold">국내선물이란?</div>
              <p className="mt-[8px] text-[18px] text-[#636363]">
                한국거래소(KRX)에 상장된 지수, 통화, 금리, 주식,
                상품(금,돈육)등을 기초자산으로 하는 파생상품으로서, 미래
                일정시점에 특정 상품을 현재 합의한 가격으로, 미리 사거나 파는
                계약을 통하여 새로운 투자 기회와 위험회피수단을 제공해주는
                상품입니다.
              </p>
            </div>
          </div>
          <div className="p-[16px] md:p-[64px] border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-[48px]">
            <h3 className="mt-[8px] md:mt-auto font-semibold md:font-extrabold text-[24px] md:text-[40px] text-center">
              국내선물 거래 상품
            </h3>
            <div className="pt-[20px] pb-[40px] md:pt-[40px] md:pb-[80px] flex flex-col md:flex-row-reverse items-center gap-[32px] md:gap-[80px] border-b border-[#ECECF4]">
              <div className="flex-1 w-full md:w-auto">
                <div
                  className="w-full md:w-[400px] h-[210px] bg-cover bg-center rounded-2xl"
                  style={{
                    backgroundImage: `url('/assets/dfv-1.jpg')`,
                  }}
                ></div>
              </div>
              <div className="flex-auto md:text-right">
                <div className="text-[20px] md:text-[32px] font-bold">
                  KOSPI200
                </div>
                <p className="mt-[16px] text-[16px] md:text-[18px] text-[#636363]">
                  금융투자회사에서 국내선물 거래할 수 있도록 제공해드리는 상품은
                  KOSP1200 단 하나로 진행 드리고 있습니다. 추후 더욱 성장하며
                  많은 상품들을 제공 해드릴 수 있도록 노력하고 있으니 당사에
                  많은 관심과 기대 부탁드립니다.
                </p>
              </div>
            </div>
            <div className="pt-[40px] md:py-[80px] pb-[8px] md:pb-0 md:pb-[40px] flex flex-col md:flex-row items-center gap-[32px] md:gap-[80px]">
              <div className="flex-1 w-full md:w-auto">
                <div
                  className="w-full md:w-[400px] h-[210px] bg-cover bg-center rounded-2xl"
                  style={{
                    backgroundImage: `url('/assets/dfv-2.jpg')`,
                  }}
                ></div>
              </div>
              <div className="flex-auto">
                <div className="text-[20px] md:text-[32px] font-bold">
                  코스피200 선물
                </div>
                <p className="mt-[16px] text-[16px] md:text-[18px] text-[#636363]">
                  코스피 200 선물은 유가증권시장본부에 상장된 주권 200 종목의
                  시가총액 기준으로 산출된 코스피 200 지수(산출기준시점
                  1990.01.03)를 거래대상으로 하는 상품입니다.
                  <br />
                  <br />
                  이처럼 코스피 200 선물은 주가지수를 거래대상으로 하고 있어
                  최종결제방법으로 현금결제를 채택하고 있습니다.
                </p>
              </div>
            </div>
          </div>
          <div className="p-[28px] md:p-[64px] md:border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-auto md:mt-[96px]">
            <h3 className="mt-[16px] md:mt-auto font-semibold md:font-extrabold text-[24px] md:text-[40px] text-center">
              국내선물 주요 특징
            </h3>
            {info.map((item, idx) => (
              <div className="mt-[24px] md:mt-[56px] flex justify-center items-center gap-[20px] md:gap-[48px] w-full">
                <div className="hidden md:block font-extrabold text-[100px] text-[#E3E3E3]">
                  {idx + 1}
                </div>
                <div>
                  <div
                    className="w-[112px] h-[112px] md:w-[300px] md:h-[300px] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                    style={{
                      backgroundImage: "url(/assets/dfi-" + (idx + 1) + ".png)",
                      backgroundSize: "65% auto",
                    }}
                  ></div>
                </div>
                <div className="flex-1 md:flex-auto max-w-[396px] w-full">
                  <div className="text-[18px] md:text-[32px] font-medium md:font-bold">
                    {item.h4}
                  </div>
                  <p className="mt-[8px] md:mt-[16px] text-[14px] md:text-[16px] md:text-[18px] text-[#636363]">
                    {item.p}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <InvestmentNotice />
        </div>
      </div>
    </>
  );
}
