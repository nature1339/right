import Head from "next/head";
import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import userStore from "store/user";
import { MdArrowDropUp } from "react-icons/md";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useRouter } from "next/router";
import Footer from "@components/footer";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import { useTranslation } from "react-i18next";

export default function introOcbc() {
  const { userInfo, isLoading } = userStore();
  const router = useRouter();
  const swiperRef = useRef(null);

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

  return (
    <>
      <Head>
        <title>OCBC</title>
        <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
      </Head>
      <div className="w-full h-full pt-[76px] max-md:pt-[57px]">
        <div className="main-wrap">
          <section className="relative w-full overflow-hidden max-md:h-[562px] h-[849px] bg-[url('/images/ocbc/intro/background.png')] bg-no-repeat bg-cover -mt-[76px]">
            <div className="bg-black opacity-40 inset-0 absolute"></div>
            <div className="max-w-[1920px] w-full absolute flex pt-[200px] pl-[260px] mx-auto flex-col max-md:gap-[22px] gap-[25px] max-md:px-[20px] max-md:pt-[180px]">
              <p className="font-bold max-md:text-[24px] text-[42px] text-white">
                Oversea-Chinese Banking
                <br /> Corporation
                <span className="text-primary">(OCBC)</span>
              </p>
              <p className="text-white text-[17px] max-md:text-[15px] font-medium">
                OCBC 투자그룹은 싱가포르에 본사를 둔<br /> 개인 및 기업 금융,
                자산관리 디지털 솔루션 분야에서
                <br /> 포괄적인 서비스를 제공하는 선도적인 금융기관입니다.
              </p>
              <p className="text-white text-[17px] max-md:text-[15px] font-medium">
                언제나 고객님들을 위한 최상의 서비스를 제공드리겠습니다.
              </p>
            </div>
            <div className="absolute max-md:hidden bottom-0 left-0 w-full h-[130px] bg-opacity-50 bg-black blur-3xl flex items-center">
              <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px] flex items-center gap-[80px]">
                <p className="text-white text-[28px] font-bold whitespace-nowrap">
                  거래시스템
                </p>
                <div className="w-full flex gap-[28px]">
                  <div className="bg-white w-full h-[80px] rounded-[8px] p-4 flex items-center gap-[30px]">
                    <img src="/images/ocbc/intro/homeicon1.png" alt="아이콘" />
                    <div className="flex flex-col">
                      <p className="font-semibold text-[20px]">MTS</p>
                      <p>Mobil Trading System</p>
                    </div>
                  </div>
                  <div className="bg-white w-full h-[80px] rounded-[8px] p-4 flex items-center gap-[30px]">
                    <img src="/images/ocbc/intro/homeicon2.png" alt="아이콘" />
                    <div className="flex flex-col">
                      <p className="font-semibold text-[20px]">HTS</p>
                      <p>Home Trading System</p>
                    </div>
                  </div>
                  <div className="bg-white w-full h-[80px] rounded-[8px] p-4 flex items-center gap-[30px]">
                    <img src="/images/ocbc/intro/homeicon3.png" alt="아이콘" />
                    <div className="flex flex-col">
                      <p className="font-semibold text-[20px]">WTS</p>
                      <p>Web Trading System</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <div className="hidden max-md:flex flex-col px-[20px] py-[28px] w-full bg-opacity-50 bg-[#F1F1F1] blur-3xl gap-[24px]">
            <p className="text-black max-md:text-[24px] text-[28px] font-bold whitespace-nowrap">
              거래시스템
            </p>
            <div className="flex flex-col gap-[8px]">
              <div className="bg-white w-full h-[80px] rounded-[8px] py-4 flex items-center gap-[20px]">
                <div className="flex justify-center items-center w-[80px] h-[80px]">
                  <img src="/images/ocbc/intro/homeicon1.png" alt="아이콘" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[20px]">MTS</p>
                  <p>Mobil Trading System</p>
                </div>
              </div>
              <div className="bg-white w-full h-[80px] rounded-[8px] py-4 flex items-center gap-[20px]">
                <div className="flex justify-center items-center w-[80px] h-[80px]">
                  <img src="/images/ocbc/intro/homeicon2.png" alt="아이콘" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[20px]">HTS</p>
                  <p>Home Trading System</p>
                </div>
              </div>
              <div className="bg-white w-full h-[80px] rounded-[8px] py-4 flex items-center gap-[20px]">
                <div className="flex justify-center items-center w-[80px] h-[80px]">
                  <img src="/images/ocbc/intro/homeicon3.png" alt="아이콘" />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold text-[20px]">WTS</p>
                  <p>Web Trading System</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white py-[62px]">
        <div className="w-[1144px] mx-auto max-md:w-full max-md:px-[20px]">
          <div className="flex justify-between items-center mb-[32px]">
            <p className="font-bold text-[28px] max-md:text-[24px]">
              실시간 선물 시세
            </p>
            <div className="flex gap-[5px]">
              <div
                onClick={() => swiperRef.current?.slidePrev()}
                className="rounded-full w-[40px] h-[40px] border-[1px] border-solid border-[#E0E0E0] flex justify-center items-center cursor-pointer text-[#6F6F6F]"
              >
                <IoIosArrowBack />
              </div>
              <div
                onClick={() => swiperRef.current?.slideNext()}
                className="rounded-full w-[40px] h-[40px] bg-[#ED1C24] flex justify-center items-center cursor-pointer text-white"
              >
                <IoIosArrowForward />
              </div>
            </div>
          </div>
          <Swiper
            spaceBetween={12}
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            breakpoints={{
              0: { slidesPerView: 2 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 5 },
            }}
          >
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="bg-[#F8F8F8] p-5 rounded-[8px] flex flex-col gap-[4px]">
                <p>항셍지수</p>
                <p className="text-[20px] font-bold">23,477.92</p>
                <div className="flex text-[#ED1C24]">
                  <MdArrowDropUp className="w-10 h-10" />
                  <p>900.06 (3.98%)</p>
                </div>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
      <div className="bg-[#F8F8F8] py-[62px]">
        <div className="w-[1144px] mx-auto max-md:px-[20px] max-md:w-full">
          <p className="font-bold text-[28px] mb-[32px] max-md:text-[24px]">
            고객센터
          </p>
          <div className="grid grid-cols-4 gap-3 max-md:grid-cols-2">
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px]">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-notice.png" alt="공지사항" />
              </div>
              <p className="font-semibold">공지사항</p>
            </div>
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px]">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-faq.png" alt="FAQ" />
              </div>
              <p className="font-semibold">FAQ</p>
            </div>
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px] col-span-2 max-md:col-span-1">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-person.png" alt="원격신청" />
              </div>
              <p className="font-semibold">원격신청</p>
            </div>
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px] col-span-2 max-md:col-span-1">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-money.png" alt="이벤트" />
              </div>
              <p className="font-semibold">이벤트</p>
            </div>
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px]">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-fund.png" alt="모의투자신청" />
              </div>
              <p className="font-semibold">모의투자신청</p>
            </div>
            <div className="flex flex-col gap-2 py-5 items-center bg-white rounded-[8px]">
              <div className="rounded-full w-[80px] h-[80px] bg-[#FCF4F4] flex justify-center items-center">
                <img src="/images/ocbc/intro/cs-up.png" alt="거래수수료" />
              </div>
              <p className="font-semibold">거래수수료</p>
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
      <Footer />
    </>
  );
}
