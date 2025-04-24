import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";
import InvestmentNotice from "@components/pnc/investmentNotice";

export default function ForeignFuturesPnc() {
  const info = [
    {
      h4: "기본 예탁금 없이 거래 가능",
      p: "해외선물은 기본 예탁금 없이 상품별 위탁증거금 만으로 거래하실 수 있습니다.",
    },
    {
      h4: "양방향 거래 가능",
      p: "해외선물거래는 매수 진입과 매도 진입이 모두 가능한 상품으로 유연한 시장 대응이 가능합니다.",
    },
    {
      h4: "레버리지 효과",
      p: "적은 증거금만으로 거래가 가능하기 때문에(증거금제도) 투자금액에 비해 큰 폭의 손익이 발생할 수 있습니다.",
    },
    {
      h4: "23시간 거래",
      p: "OCBC에서 세공하는 시카고 상업거래소(CME) 시장은 23시간 열려 있어, 거의 수단 없는 거래가 가능합니다.",
    },
    {
      h4: "환전없이, 원화로 주문 가능",
      p: "해외거래소와 한국거래소 연계로 야간시간에도 해외 이슈 대응 가능",
    },
  ];
  return (
    <>
      <Head>
        <title>해외선물: PNC</title>
        <link rel="shortcut icon" href="favicon_pnckr.com.ico" />
      </Head>
      <div className="w-full">
        {/* 헤더 배경 섹션 */}
        <div
          className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-8 md:mb-16"
          style={{
            backgroundImage: `url('/assets/bg-ff.jpg')`,
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
              해외선물
            </h1>
          </div>
        </div>
        <div className="max-w-[1212px] px-[16px] mx-auto text-[#131313]">
          <div className="mt-24 bg-[#F9F9F9] rounded-2xl p-10 flex flex-col md:flex-row items-center gap-10 md:gap-20">
            <div className="flex-1 w-full md:w-auto">
              <div
                className="w-full md:w-[400px] h-[114px] bg-cover bg-center rounded-2xl"
                style={{
                  backgroundImage: `url('/assets/bg-ff.jpg')`,
                }}
              ></div>
            </div>
            <div className="flex-auto">
              <div className="text-[24px] font-semibold">해외선물이란?</div>
              <p className="mt-2 text-[18px] text-[#636363]">
                한국거래소(KRX) D에 상장된 지수, 통화, 금리, 주식, 상품(금,
                돈육)등을 기초자산으로 하는 파생상품으로서, 미래일정 시점에 특정
                상품을 현재 합의한 가격으로, 미리 사거나 파는 계약을 통하여
                새로운 투자 기회와 위험회피 수단을 제공해 주는 상품입니다.
              </p>
            </div>
          </div>
          <div className="p-7 md:p-16 md:border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-0 md:mt-24">
            <h3 className="mt-4 md:mt-0 font-semibold md:font-extrabold text-[24px] md:text-[40px] text-center">
              해외선물 주요 특징
            </h3>
            {info.map((item, idx) => (
              <div className="mt-6 md:mt-14 flex justify-center items-center gap-5 md:gap-12 w-full">
                <div className="hidden md:block font-extrabold text-[100px] text-[#E3E3E3]">
                  {idx + 1}
                </div>
                <div>
                  <div
                    className="w-[112px] h-[112px] md:w-[300px] md:h-[300px] rounded-full bg-[#EBBCBC33] bg-no-repeat bg-center bg-blend-darken	"
                    style={{
                      backgroundImage: "url(/assets/ffi-" + (idx + 1) + ".jpg)",
                      backgroundSize: "65% auto",
                    }}
                  ></div>
                </div>
                <div className="flex-1 md:flex-auto max-w-[396px] w-full">
                  <div className="text-[18px] md:text-[32px] font-medium md:font-bold">
                    {item.h4}
                  </div>
                  <p className="mt-2 md:mt-4 text-[14px] md:text-[16px] md:text-[18px] text-[#636363]">
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
