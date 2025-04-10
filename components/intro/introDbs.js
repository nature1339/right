import Head from "next/head";
import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import userStore from "store/user";
import { MdKeyboardArrowRight } from "react-icons/md";
import clsx from "clsx";
import { useRouter } from "next/router";
import Footer from "@components/footer";
import { RiArrowDownSFill, RiArrowUpSFill } from "react-icons/ri";

export default function IntroDbs() {
  const { userInfo, isLoading } = userStore();
  const router = useRouter();

  const { lastMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_CG_SOCKET_URL}/ws/cg`
  );

  const [kospi2000, setKospi2000] = useState("");
  const [nasdq100, setNasdq100] = useState("");
  const [hangSengIndex, setHangSengIndex] = useState("");
  const [gold, setGold] = useState("");
  const [ng, setNg] = useState("");
  const [cl, setCl] = useState("");
  const [kospi2000Chrate, setKospi2000Chrate] = useState("");
  const [nasdq100Chrate, setNasdq100Chrate] = useState("");
  const [hangSengIndexChrate, setHangSengIndexChrate] = useState("");
  const [goldChrate, setGoldChrate] = useState("");
  const [ngChrate, setNgChrate] = useState("");
  const [clChrate, setClChrate] = useState("");

  useEffect(() => {
    if (!lastMessage?.data) {
      return;
    }

    const data = JSON.parse(lastMessage?.data);

    const tr_cd = data.header.tr_cd.trim();
    const key = data.header.tr_key.trim();
    const index = data.body.bidho1;
    const chgrate = data.body.chgrate;
    const drate = data.body.drate;

    // 코스피
    if (key === "101W3000" && index && kospi2000 !== index) {
      setKospi2000(index);
      return;
    }
    if (tr_cd === "FC0" && key === "101W3000" && kospi2000Chrate !== drate) {
      setKospi2000Chrate(drate);
      return;
    }

    // 나스닥100
    if (key === "NQZ24" && index && nasdq100 !== index) {
      setNasdq100(index);
      return;
    }
    if (tr_cd === "OVC" && key === "NQZ24" && nasdq100Chrate !== chgrate) {
      setNasdq100Chrate(chgrate);
      return;
    }

    if (key === "SIH25" && index && ng !== index) {
      setNg(index);
      return;
    }
    if (tr_cd === "OVC" && key === "SIH25" && ngChrate !== chgrate) {
      setNgChrate(chgrate);
      return;
    }

    if (key === "GCG25" && index && gold !== index) {
      setGold(index);
      return;
    }
    if (tr_cd === "OVC" && key === "GCG25" && goldChrate !== chgrate) {
      setGoldChrate(chgrate);
      return;
    }

    if (key === "HSIZ24" && index && hangSengIndex !== index) {
      setHangSengIndex(index);
      return;
    }
    if (
      tr_cd === "OVC" &&
      key === "HSIZ24" &&
      hangSengIndexChrate !== chgrate
    ) {
      setHangSengIndexChrate(chgrate);
      return;
    }

    if (key === "CLF25" && index && cl !== index) {
      setCl(index);
      return;
    }
    if (tr_cd === "OVC" && key === "CLF25" && clChrate !== chgrate) {
      setClChrate(chgrate);
      return;
    }
  }, [lastMessage]);

  if (userInfo?.userid) {
    router.push("/orders");
  }

  if (isLoading || userInfo?.userid) {
    return <></>;
  }

  const [isHover, setIsHover] = useState(false);

  return (
    <>
      <Head>
        <title>DBS</title>
        <link rel="shortcut icon" href="favicon_dbs.ico" />
      </Head>
      {/* <div className="w-full h-full pt-[76px] max-md:pt-[57px]"> */}
      <div className="w-full h-full ">
        <div className="main-wrap">
          <section className="max-md:flex-col flex w-full overflow-hidden max-h-[660px] aspect-[1440/860] max-md:max-h-[525px] max-md:aspect-[375/525] ">
            <div className="h-full bg-[url('/images/dbs/intro/background.png')] flex-[790] max-md:flex-[375] bg-no-repeat bg-cover flex justify-center items-center flex-col">
              <div className="text-white font-bold text-[36px] max-md:text-[28px]">
                GLOBAL SINGAPORE DBS
              </div>
              <div className="text-white font-bold text-[18px] max-md:text-[16px]">
                KOREA BRANCH
              </div>
            </div>
            <div className="h-full bg-[url('/images/dbs/intro/background2.png')] flex-[653] max-md:flex-[150]  bg-no-repeat bg-cover flex items-center justify-center">
              {!isLoading && (
                <a
                  href={userInfo?.accessToken ? "/orders" : "/login"}
                  className="bg-[#D71B1B] text-white rounded-[25px] w-[260px] h-[69px] flex items-center justify-center text-[26px] font-bold hover:bg-[#17223A] max-md:text-[20px] max-md:w-[200px] max-md:h-[50px]"
                >
                  START TRADING
                </a>
              )}
            </div>
          </section>
          <section className="h-[350px] items-center flex flex-col max-md:h-[260px] max-md:flex-col-reverse">
            <div className="bg-[#17223A] text-white flex items-center justify-center w-[220px] h-[80px] rounded-[25px] flex-col  mt-[41px] hover:bg-[#D71B1B]  max-md:w-[200px] max-md:h-[50px]">
              <div className="font-bold text-[20px] max-md:text-[20px]">
                상담센터
              </div>
              <div className="font-normal text-[16px] max-md:text-[8px]">
                Counseling Center
              </div>
            </div>
            <div>
              <div className="text-black text-center font-normal text-[18px] mt-[34px] max-md:text-[13px] max-md:px-[25px]">
                싱가포르 최대 다국적 은행금융거래 서비스기업{" "}
                <span className="font-bold">DBS VISKERS</span> 의
                <br className="block max-md:hidden" /> 안전한 플랫폼,{" "}
                <span className="font-bold">SG 플랫폼</span>을 통한{" "}
                <br className="hidden max-md:block" /> 차별화 된 고품격 거래
                주문 시스템
              </div>
              <div className="text-black text-[26px] font-bold mt-[8px] max-md:text-[18px] text-center">
                한국 지사를 통하여 거래를 시작해 보세요!
              </div>
            </div>
          </section>
          <section className="h-[680px] items-center flex flex-col justify-center max-md:hidden">
            <div className="flex w-[1240px] gap-[30px]">
              <div
                className={clsx(
                  "group flex flex-col items-center justify-center bg-[url('/images/dbs/intro/hover-bg.jpg')] bg-no-repeat bg-cover rounded-[25px] transition-width duration-1000 ease-in-out bg-center",
                  isHover ? "flex-1" : "w-[570px] flex-none"
                )}
              >
                <div
                  className={clsx(
                    "font-bold text-black text-[34px]",
                    isHover ? "hidden" : "block"
                  )}
                >
                  더 나은 세상을 위하여
                </div>
                <div
                  className={clsx(
                    "text-black font-medium text-[20px]",
                    isHover ? "hidden" : "block"
                  )}
                >
                  DBS는 Euromoney의 기업 책임 부문 세계 최고
                  <br /> 은행으로 선정되었습니다.
                </div>
              </div>
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="group flex flex-col items-center justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg2.jpg')] h-[575px] bg-no-repeat bg-cover rounded-[25px] hover:w-[570px] hover:flex-none transition-width duration-1000 ease-in-out bg-center"
              >
                <div className="font-bold text-black text-[34px] hidden group-hover:block">
                  세계최고의 은행이
                  <br /> 다시한번...
                </div>
                <div className="text-black font-medium text-[20px] hidden group-hover:block">
                  글로벌 파이낸스에서 2022년 세계 최고 은행으로
                  <br /> 선정되었습니다.
                </div>
              </div>
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="group flex flex-col items-center justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg3.jpg')] h-[575px] bg-no-repeat bg-cover rounded-[25px] hover:w-[570px] hover:flex-none transition-width duration-1000 ease-in-out bg-center"
              >
                <div className="font-bold text-black text-[34px] hidden group-hover:block">
                  글로벌 파이낸스 세계에서
                  <br /> 가장 안전한 상업은행
                </div>
                <div className="text-black font-medium text-[20px] hidden group-hover:block">
                  DBS는 은행의 선도 빛으로 빛난다
                </div>
              </div>
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="group flex flex-col items-center justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg4.jpg')] h-[575px] bg-no-repeat bg-cover rounded-[25px] hover:w-[570px] hover:flex-none transition-width duration-1000 ease-in-out bg-center"
              >
                <div className="font-bold text-white text-[34px] hidden group-hover:block">
                  다시 한번 세계 최고
                </div>
                <div className="text-white font-medium text-[20px] hidden group-hover:block">
                  Euromoney의 Global Awards for Excellence
                  <br /> 2021에서 인정을 받아 영광 입니다.
                </div>
              </div>
              <div
                onMouseEnter={() => setIsHover(true)}
                onMouseLeave={() => setIsHover(false)}
                className="group flex flex-col items-center justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg5.jpg')] h-[575px] bg-no-repeat bg-cover rounded-[25px] hover:w-[570px] hover:flex-none transition-width duration-1000 ease-in-out bg-center"
              >
                <div className="font-bold text-black text-[34px] hidden group-hover:block">
                  디지털 뱅킹에서 가장 혁신적
                </div>
                <div className="text-black font-medium text-[20px] hidden group-hover:block">
                  DBS가 디지털 뱅킹 부문에서 가장 혁신적인 글로벌 상을
                  <br />
                  수상했습니다.
                </div>
              </div>
            </div>
          </section>
          <section className="items-center flex-col justify-center max-md:flex hidden">
            <div className="grid grid-cols-2 px-[25px] gap-[5px] w-full py-[48px]">
              <div
                className={clsx(
                  "aspect-square flex flex-col gap-2 items-center max-md:px-[0px] justify-center bg-[url('/images/dbs/intro/hover-bg.jpg')] bg-no-repeat bg-cover rounded-[25px]"
                )}
              >
                <div
                  className={clsx(
                    "font-bold text-black text-[16px] text-center"
                  )}
                >
                  더 나은 세상을 <br /> 위하여
                </div>
                <div
                  className={clsx(
                    "text-black font-medium text-[10px] text-center"
                  )}
                >
                  DBS는 Euromoney의 기업 책임
                  <br /> 부문 세계 최고 은행으로
                  <br /> 선정되었습니다.
                </div>
              </div>
              <div className="aspect-square flex flex-col gap-2 items-center max-md:px-[0px] justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg2.jpg')] bg-no-repeat bg-cover rounded-[25px]">
                <div className="font-bold text-black text-[16px] text-center">
                  세계최고의
                  <br /> 은행이 다시한번...
                </div>
                <div className="text-black font-medium text-[10px] text-center">
                  DBS는 Euromoney의 기업 책임 <br />
                  부문 세계 최고 은행으로
                  <br /> 선정되었습니다.
                </div>
              </div>
              <div className="aspect-square flex flex-col gap-2 items-center max-md:px-[0px] justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg3.jpg')] bg-no-repeat bg-cover rounded-[25px]">
                <div className="font-bold text-black text-[16px] text-center">
                  글로벌 파이낸스
                  <br /> 세계에서 가장 안전한
                  <br /> 상업은행
                </div>
                <div className="text-black font-medium text-[10px] text-center">
                  DBS는 은행의 선도 빛으로 빛난다
                </div>
              </div>
              <div className="aspect-square flex flex-col gap-2 items-center max-md:px-[0px] justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg4.jpg')] bg-no-repeat bg-cover rounded-[25px]">
                <div className="font-bold text-white text-[16px] text-center">
                  다시 한번 세계
                  <br /> 최고
                </div>
                <div className="text-white font-medium text-[10px] text-center">
                  Euromoney의 Global Awards
                  <br /> for Excellence 2021에서 인정
                  <br />을 받아 영광 입니다.
                </div>
              </div>
              <div className="aspect-[2/1] flex flex-col gap-2 items-center justify-center flex-1 bg-[url('/images/dbs/intro/hover-bg5.jpg')] bg-no-repeat bg-cover rounded-[25px] col-span-2">
                <div className="font-bold text-black text-[16px] text-center">
                  디지털 뱅킹에서 가장 혁신적
                </div>
                <div className="text-black font-medium text-[10px] text-center">
                  DBS가 디지털 뱅킹 부문에서 가장 혁신적인 글로벌 상을
                  수상했습니다.
                </div>
              </div>
            </div>
          </section>
          <section className="flex flex-col items-center justify-center bg-[rgba(23,34,58,1)] px-[100px] pb-[90px] pt-[60px] max-md:px-[25px] max-md:pb-[57px] max-md:pt-[45px]">
            <img
              src={"/images/dbs/intro/logo.png"}
              alt="logo"
              className="mb-[30px] w-[130px] aspect-[180/52] max-md:w-[99px] max-md:h-[29px]"
            />
            <p className="mb-[50px] text-center text-[32px] font-extrabold text-white max-md:text-[13px]">
              세계 최대규모의 다국적 금융거래망과 독자적인 SG 시스템
            </p>
            <div className="grid w-full grid-cols-2 gap-[50px] max-md:grid-cols-1">
              <div className="flex h-[250px] w-full flex-col items-center justify-center gap-3 rounded-[25px] bg-[rgba(65,60,92,1)] text-center text-white max-md:h-[80px] px-[12px] ">
                <p className="text-[30px] font-bold max-md:text-[16px]">
                  글로벌 거래 전산망 구축
                </p>
                <p className="max-w-[480px] text-[16px] font-medium max-md:text-[10px]">
                  전 세계 18개국의 글로벌 시장에서 280여개 이상의
                  <br className="hidden max-md:block" /> 지사와 세계 최고의
                  글로벌 구축망 형성
                </p>
              </div>
              <div className="flex h-[250px] w-full flex-col items-center justify-center gap-3 rounded-[25px] bg-[rgba(65,60,92,1)] text-center text-white max-md:h-[80px] px-[12px] ">
                <p className="text-[30px] font-bold max-md:text-[16px]">
                  글로벌 최대 금융 전산보안 (SG)
                </p>
                <p className="max-w-[480px] text-[16px] font-medium max-md:text-[10px]">
                  글로벌 전산 시스템을 통하여 보안성 강화,
                  <br className="hidden max-md:block" /> 등록된 정보에 한해서만
                  모든형태의 통합거래 지원
                </p>
              </div>
              <div className="flex h-[250px] w-full flex-col items-center justify-center gap-3 rounded-[25px] bg-[rgba(65,60,92,1)] text-center text-white max-md:h-[80px] px-[12px] ">
                <p className="text-[30px] font-bold max-md:text-[16px]">
                  글로벌 거래소간의 파이낸스 협약 체결
                </p>
                <p className="max-w-[480px] text-[16px] font-medium max-md:text-[10px]">
                  CME거래소 및 7개의 안전한 거래소와 글로벌 파이낸스 협약
                </p>
              </div>
              <div className="flex h-[250px] w-full flex-col items-center justify-center gap-3 rounded-[25px] bg-[rgba(65,60,92,1)] text-center text-white max-md:h-[80px] px-[12px] ">
                <p className="text-[30px] font-bold max-md:text-[16px]">
                  통합 원클릭 거래 주문 시스템
                </p>
                <p className="max-w-[480px] text-[16px] font-medium max-md:text-[10px]">
                  투자자들의 다양성을 위한 간편한 거래시스템으로 글로벌
                  <br className="hidden max-md:block" /> 거래에 쉽게 대처할 수
                  있고 정밀한 자동화 거래 제공
                </p>
              </div>
            </div>
          </section>
          <section className="bg-white px-[100px] pb-[60px] pt-[104px] max-md:px-[25px] max-md:pb-[23px] max-md:pt-[38px]">
            <div className="mb-9 flex items-center justify-between">
              <p className="text-[28px] font-bold text-black max-md:text-[16px]">
                실시간 선물시세
              </p>
              <img
                src={"/images/dbs/intro/logo-black.png"}
                alt="logo"
                width={92}
                height={26}
                className="w-[92px] h-[26px] max-md:w-[56px] max-md:h-[16px]"
              />
            </div>
            <div className="grid gap-[10px] grid-cols-4 max-md:gap-[2px] max-md:grid-cols-[1.4fr,1fr,1fr,1fr]">
              <div className="flex h-[73px] max-md:h-[35px] items-center justify-center rounded-tl-[50px] bg-[rgba(52,43,61,1)] text-[18px] max-md:text-[12px] font-semibold text-white">
                종목
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center justify-center bg-[rgba(52,43,61,1)] text-[18px] max-md:text-[12px] font-semibold text-white">
                가격
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center justify-center bg-[rgba(52,43,61,1)] text-[18px] max-md:text-[12px] font-semibold text-white">
                지수
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center justify-center rounded-tr-[50px] bg-[rgba(52,43,61,1)] text-[18px] max-md:text-[12px] font-semibold text-white">
                일
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-white px-5 max-md:px-3 text-[18px] max-md:text-[12px] font-semibold text-black">
                <img
                  src={"/images/dbs/intro/icon-hangseng.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">항생지수</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowDownSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                -0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-hangseng.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">미니항생지수</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(183,255,186,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(7,126,19,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowUpSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(7,126,19,1)]">
                +0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-kospi.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">KOSPI200</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowDownSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                -0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-us.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">Micro나스닥</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(183,255,186,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(7,126,19,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowUpSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(7,126,19,1)]">
                +0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-us.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">나스닥100</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowDownSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                -0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-gold.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">금</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowDownSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                -0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-gas.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">천연가스</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                <p className="text-[16px] max-md:text-[12px]">0.36</p>
                <RiArrowDownSFill className="h-10 w-10" />
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-white px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-[rgba(215,27,27,1)]">
                -0.02%
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center gap-10 max-md:gap-[2px] bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-bold text-black">
                <img
                  src={"/images/dbs/intro/icon-oil.png"}
                  alt="icon"
                  class="w-[42px] h-[42px] max-md:w-[16px] max-md:h-[16px]"
                />
                <p className="text-[16px] max-md:text-[12px]">크루드오일</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] text-black">
                23832541
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-black">
                <p className="text-[16px] max-md:text-[12px]">0</p>
              </div>
              <div className="flex h-[73px] max-md:h-[35px] items-center bg-[rgba(217,244,255,1)] px-5 max-md:px-3 text-[16px] max-md:text-[12px] font-medium text-black">
                0.0%
              </div>
            </div>
          </section>
          <section className="flex h-[450px] max-md:h-[191px] flex-col items-center justify-center bg-[url('/images/dbs/intro/bottombanner.jpg')] bg-cover bg-no-repeat">
            <p className="mb-16 text-center text-[24px] font-bold text-white max-md:text-[12px]">
              글로벌 맞춤형 플랫폼은 원하는 모든 디바이스에 맞게 조정되었으며
              <br />
              Korea Branch와 함께 WTS 주문시스템으로 100% 원활하게
              <br className="hidden max-md:block" /> 전환 할 수 있습니다.
            </p>
            <div className="flex items-center gap-[30px]">
              <div className="flex h-[140px] w-[240px] max-md:h-[60px] max-md:w-[100px] flex-col items-center justify-center gap-[10px] rounded-[24px] border border-solid border-white">
                <img
                  src={"/images/dbs/intro/laptop.svg"}
                  alt="laptop"
                  className="w-[65px] h-[58px] max-md:w-[25px] max-md:h-[23px]"
                />
                <p className="text-[14px] max-md:text-[8px] font-semibold text-white">
                  WEB
                </p>
              </div>
              <div className="flex h-[140px] w-[240px] max-md:h-[60px] max-md:w-[100px] flex-col items-center justify-center gap-[10px] rounded-[24px] border border-solid border-white">
                <img
                  src={"/images/dbs/intro/apple.svg"}
                  alt="apple"
                  className="w-[56px] h-[66px] max-md:w-[22px] max-md:h-[26px]"
                />
                <p className="text-[14px] max-md:text-[8px] font-semibold text-white">
                  iOS (출시예정)
                </p>
              </div>
              <div className="flex h-[140px] w-[240px] max-md:h-[60px] max-md:w-[100px] flex-col items-center justify-center gap-[10px] rounded-[24px] border border-solid border-white">
                <img
                  src={"/images/dbs/intro/android.svg"}
                  alt="android"
                  className="w-[54px] h-[66px] ap max-md:w-[21px] max-md:h-[26px]"
                />
                <p className="text-[14px] max-md:text-[8px] font-semibold text-white">
                  Android (출시예정)
                </p>
              </div>
            </div>
          </section>
          <footer className="flex h-[200px] w-full items-center justify-between bg-[rgba(23,34,58,1)] px-[100px] max-md:px-[25px]">
            <div className="flex items-end gap-[10px] max-md:flex-col max-md:items-start">
              <img
                src={"/images/dbs/intro/logo.png"}
                alt="logo"
                className="w-[140px] max-md:w-[88px] max-md:h-[25px] aspect-[180/52]"
              />
              <p className="text-[14px] font-bold text-white max-md:text-[10px]">
                VICKERS SECURITIES
              </p>
            </div>
            <div className="text-[14px] text-white max-md:text-[10px]">
              <p>
                모든 콘텐츠 저작권은 DBS에 있으며, 무단 도용
                <br className="hidden max-md:block" /> 시 법적 불이익을 받을 수
                있습니다.
              </p>
              <p>Copyright © DBS. All rights reserved.</p>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}
