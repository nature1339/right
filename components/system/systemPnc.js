import Head from "next/head";
import { IoIosArrowForward } from "react-icons/io";
import InvestmentNotice from "@components/pnc/investmentNotice";

export default function SystemPnc() {
  const info = [
    {
      h4: "강력한 거래 소프트웨어",
      p: "강력한 기능과 도구가 구비된 일체화 금융거래 소프트 웨어를 체험하고, 풍부한 투자 종목을 원클릭 조작.",
    },
    {
      h4: "영활한 거래시스템",
      p: "계좌의 전체 거래 주문 유형을 지원하므로 모든 거래에쉽게 대처할 수 있고 어떠한 거래 기회도 포착가능.",
    },
    {
      h4: "미래를 향한 기술분석",
      p: "38가지 기술 지표와 44가지 그래픽 대상의 전체 분석방식제공. 전반적인 시장 분석제공 및 가격동향 예측.",
    },
    {
      h4: "맞춤형 거래주의보",
      p: "이메일, 휴대전화 알림 등을 통해 주요 거래사건정보를 받을 수 있습니다.",
    },
  ];

  const services = [
    {
      img: "/assets/service_mts.png",
      title: "MTS",
      desc: "Mobile Trading System",
    },
    {
      img: "/assets/service_hts.png",
      title: "HTS",
      desc: "Home Trading System",
    },
    {
      img: "/assets/service_wts.png",
      title: "WTS",
      desc: "Web Trading System",
    },
  ];

  return (
    <>
      <Head>
        <title>거래시스템: PNC</title>
        <link rel="shortcut icon" href="favicon_pnckr.com.ico" />
      </Head>
      <div className="w-full">
        {/* 헤더 배경 섹션 */}
        <div
          className="relative h-[266px] md:h-[428px] w-full bg-cover bg-center flex items-end justify-center mb-[32px] md:mb-[64px]"
          style={{
            backgroundImage: `url('/assets/bg-sys.jpg')`,
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
              거래시스템
            </h1>
          </div>
        </div>
        <div className="max-w-[1212px] px-[16px] mx-auto text-[#131313]">
          <div className="mt-[32px] md:mt-[112px] text-[24px] md:text-[48px] font-semibold text-center">
            차세대 거래 플랫폼 원클릭 글로벌 투자
          </div>
          <div className="mt-[16px] text-[18px] md:text-[24px] text-center">
            언제 어디서든 간편하고 신속하게 공간의 제약을 받지 않고 거래
          </div>
          <div className="p-[28px] md:p-[64px] md:border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-auto md:mt-[96px]">
            <h3 className="hidden md:block mt-[8px] md:mt-auto font-semibold md:font-extrabold text-[24px] md:text-[40px] text-center">
              모든 매매시스템 지원
            </h3>
            <div className="mt-auto md:mt-[48px] -mx-[28px] md:-mx-[64px] flex items-start md:items-center">
              {services.map((item, idx) => (
                <div
                  key={idx}
                  className="flex-1 flex flex-col justify-center md:items-center gap-[4px] border-l border-[#E3E3E3] first:border-l-0"
                >
                  <img
                    src={item.img}
                    alt={item.title}
                    className="block max-w-[101px] md:max-w-[180px] w-full h-auto mx-auto md:mx-0"
                  />
                  <div className="text-center">
                    <h3 className="text-[24px] font-semibold">{item.title}</h3>
                    <p className="mt-[8px] text-[16px] text-[#A3A3A3] px-[16px]">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="p-[28px] md:p-[64px] md:border border-[#E3E3E3] rounded-3xl text-[#131313] text-[18px] mt-auto md:mt-[96px]">
            <h3 className="mt-[8px] md:mt-auto font-semibold md:font-extrabold text-[24px] md:text-[40px] text-center">
              주요 특징
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
                      backgroundImage: "url(/assets/syi-" + (idx + 1) + ".png)",
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
