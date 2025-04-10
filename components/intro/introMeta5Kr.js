import { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import FooterMeta5Kr from "@components/footer/footerMeta5Kr";
import useWebSocket from "react-use-websocket";
import userStore from "store/user";

export default function introMeta5Kr() {
  const { userInfo, isLoading } = userStore();
  const router = useRouter();

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

  const { lastMessage } = useWebSocket(
    `${process.env.NEXT_PUBLIC_CG_SOCKET_URL}/ws/cg`
  );

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

    // 천연가스
    if (key === "SIH25" && index && ng !== index) {
      setNg(index);
      return;
    }
    if (tr_cd === "OVC" && key === "SIH25" && ngChrate !== chgrate) {
      setNgChrate(chgrate);
      return;
    }

    // 금
    if (key === "GCG25" && index && gold !== index) {
      setGold(index);
      return;
    }
    if (tr_cd === "OVC" && key === "GCG25" && goldChrate !== chgrate) {
      setGoldChrate(chgrate);
      return;
    }

    // 항셍
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

    // 크루드오일
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
        <title>Meta5</title>
        <link rel="shortcut icon" href="favicon_meta5kr.com.ico" />
      </Head>
      <div className="w-full h-full pt-[76px] max-md:pt-[57px]">
        <div className="main-wrap">
          <section className="section1">
            <div className="section1-wrap">
              <div className="section1-content">
                <h2>
                  당신의 새로운
                  <br />
                  포트폴리오를 만나보세요.
                </h2>
                <p>
                  주식, 채권, 옵션, 암호화폐 등에 투자하세요.
                  <br />
                  <span>
                    AI-powered 기반으로 정보에 관한 투자 결정이 가능합니다.{" "}
                  </span>
                </p>
                {!isLoading && (
                  <a
                    href={userInfo?.accessToken ? "/orders" : "/login"}
                    className="gradient_btn"
                    id="started"
                  >
                    시작하기
                  </a>
                )}
              </div>
            </div>
          </section>
          <div className="bottomBox">
            <div className="bottomBox-wrap">
              <span className="text1">
                글로벌 표준 거래소 메타트레이더5를 통해
              </span>
              <span className="text2">
                입출금 수수료 및 최저 수수료까지 모두 챙겨가세요!
              </span>
              <a href="/join">회원가입 바로가기</a>
            </div>
          </div>
          <section className="section2">
            <div className="section2-wrap">
              <h2>선물 시세</h2>
              <div className="section2-content">
                <ul className="content-list">
                  <li className="list-item">
                    <div className="item-wrap">
                      <img
                        src="/images/intro/hang-seng--big.svg"
                        alt="항셍지수"
                      />
                      <div className="item-text">
                        <h6>항셍지수</h6>
                        <b id="HS">{hangSengIndex}</b>
                        <span
                          className={
                            parseFloat(hangSengIndexChrate) >= 0
                              ? "txt_orange"
                              : "txt_blue"
                          }
                          id="HSrate"
                        >
                          {hangSengIndexChrate && `${hangSengIndexChrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>

                  <li className="list-item">
                    <div className="item-wrap">
                      <img
                        src="/images/intro/hang-seng--big.svg"
                        alt="미니항셍지수"
                      />
                      <div className="item-text">
                        <h6>미니항셍지수</h6>
                        <b id="HM"></b>
                        <span className="" id="HMrate"></span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img
                        src="/images/intro/kospi-200--big.svg"
                        alt="kospi200"
                      />
                      <div className="item-text">
                        <h6>KOSPI200</h6>
                        <b id="kos">{kospi2000}</b>
                        <span
                          className={
                            parseFloat(kospi2000Chrate) >= 0
                              ? "txt_orange"
                              : "txt_blue"
                          }
                          id="kosrate"
                        >
                          {kospi2000Chrate && `${kospi2000Chrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img src="/images/intro/US--big.svg" alt="Micro나스닥" />
                      <div className="item-text">
                        <h6>Micro나스닥</h6>
                        <b id="MN"></b>
                        <span id="MNrate" className=""></span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img src="/images/intro/US--big.svg" alt="나스닥100" />
                      <div className="item-text">
                        <h6>나스닥100</h6>
                        <b id="NQ">{nasdq100}</b>
                        <span
                          id="NQrate"
                          className={
                            parseFloat(nasdq100Chrate) >= 0
                              ? "txt_orange"
                              : "txt_blue "
                          }
                        >
                          {nasdq100Chrate && `${nasdq100Chrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img src="/images/intro/gold--big.svg" alt="nasdaq" />
                      <div className="item-text">
                        <h6>금</h6>
                        <b id="GC">{gold}</b>
                        <span
                          id="GCrate"
                          className={
                            parseFloat(goldChrate) >= 0
                              ? "txt_orange"
                              : "txt_blue"
                          }
                        >
                          {goldChrate && `${goldChrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img
                        src="/images/intro/natural-gas--big.svg"
                        alt="천연가스"
                      />
                      <div className="item-text">
                        <h6>천연가스</h6>
                        <b id="NG">{ng}</b>
                        <span
                          id="NGrate"
                          className={
                            parseFloat(ngChrate) >= 0
                              ? "txt_orange"
                              : "txt_blue"
                          }
                        >
                          {ngChrate && `${ngChrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                  <li className="list-item">
                    <div className="item-wrap">
                      <img
                        src="/images/intro/crude-oil--big.svg"
                        alt="크루드오일"
                      />
                      <div className="item-text">
                        <h6>크루드오일</h6>
                        <b id="CL">{cl}</b>
                        <span
                          id="CLrate"
                          className={
                            parseFloat(clChrate) >= 0
                              ? "txt_orange"
                              : "txt_blue"
                          }
                        >
                          {clChrate && `${clChrate}%`}
                        </span>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>
          <section className="section3">
            <h2>편리한 입출금 및 실시간 가격지원</h2>
            <p>입출금 수수료 없이 입금 후 딜레이 없는 빠른 거래 가능!</p>
            <p>
              회원가입후 즉시 선물거래가 가능한 메타트레이더5에서 여러분의
              자산을 보다 쉽고 빠르게 늘려보세요.
            </p>
          </section>
          <section className="section4">
            <div className="section4-wrap">
              <ul className="section4-list">
                <li className="list-item">
                  <img src="/images/intro/intro_icon_01.png" alt="" />
                  <h6>자유로운 거래</h6>
                  <p>
                    국내종목 및 다양한 해외종목으로 자유로운 수익실현 <br />
                    100+ 개의주식투자로 원하는 주식에 배팅가능
                  </p>
                </li>
                <li className="list-item">
                  <img src="/images/intro/intro_icon_02.png" alt="" />
                  <h6>글로벌 거래소와 동일한 플랫폼</h6>
                  <p>
                    메타트레이더5에 존재하는 모든 선물 주식 동일하게 거래 가능
                  </p>
                </li>
                <li className="list-item">
                  <img src="/images/intro/intro_icon_03.png" alt="" />
                  <h6>우수한 고객 서비스</h6>
                  <p>고객 응대 및 원격을 통한 문의 지원</p>
                </li>
              </ul>
            </div>
          </section>
        </div>
      </div>
      <FooterMeta5Kr />
    </>
  );
}
