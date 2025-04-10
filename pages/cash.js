import { useEffect, useState } from "react";
import apiRequest, { getExc } from "../utils/api";
import useToast from "hooks/toast";
import ToastModal from "@components/toastModal";
import moment from "moment";
import { useQuery } from "@tanstack/react-query";
import Head from "@components/head";
import { useTranslation } from "react-i18next";

export default function Cash() {
  const { t } = useTranslation();
  const { isVisible, message, showToast } = useToast(); //토스트

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiRequest("/user/settings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
  });

  //탭
  const [tabNum, setTabNum] = useState("con_01");
  const handleTab = (name) => {
    setTabNum(name);
  };

  //환율
  const [exchangeRate, setExchangeRate] = useState({
    usd: null,
    hkd: null,
    update_time: null,
  });

  //입출금 값
  const [depoValue, setDepoValue] = useState(0);
  const [withdrawValue, setWithdrawValue] = useState(0);

  //입출금 리스트
  const [cashList, setCashList] = useState([]); // 체결 미체결 리스트

  // 환율 정보 가져오기
  useEffect(() => {
    fetchExchangeRate();
    getCashList();
  }, []); // 빈 배열을 넣어 최초 1회 실행

  const getCashList = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await apiRequest("/user/cash", options);

      // 응답이 없으면 빈 배열로 설정
      setCashList(response || []);
    } catch (error) {
      console.error("Failed to fetch cash list:", error);
      setCashList([]); // 에러 발생 시 빈 배열 설정
    }
  };

  const fetchExchangeRate = async () => {
    try {
      const response = await getExc();
      setExchangeRate({
        usd: response.usd,
        hkd: response.hkd,
        update_time: new Date(response.update_time).toLocaleDateString("ko-KR"),
      });
    } catch (error) {
      console.error("Failed to fetch exchange rate:", error);
    }
  };

  //입출금 버튼 이벤트
  // 숫자 포맷 함수 (원 단위 컴마 추가)
  const formatCurrency = (value) => {
    return Number(value).toLocaleString("ko-KR");
  };

  // 버튼 클릭 이벤트 핸들러
  const handleButtonClick = (value, setValue) => {
    if (value === "reset") {
      setValue(0); // 리셋 시 0으로 설정
    } else {
      setValue((prev) => prev + Number(value)); // 기존 값에 버튼 값 추가
    }
  };

  // 신청 버튼 클릭 핸들러
  const handleRequest = async (gbn, setValue) => {
    if (depoValue % 10000 !== 0) {
      showToast("입출금은 만 원 단위로만 가능합니다.");
      return;
    }

    const commonBody = {
      gubun: gbn,
    };
    let additionalBody = {};
    let amount = 0;
    if (gbn === 1) {
      //입금신청
      amount = depoValue;
      additionalBody = { req_amount: depoValue };
    } else {
      //출금신청
      amount = withdrawValue;
      additionalBody = { req_amount: withdrawValue };
    }

    // 금액이 0원인 경우
    if (amount < 10000) {
      showToast("10,000원은 이하는 신청할 수 없습니다.");
      return;
    }

    try {
      // 요청 전송
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commonBody, ...additionalBody }),
      };

      const response = await apiRequest("/user/cash", options);
      if (settings.depositWithdrawal) {
        showToast(response); // 신청 완료 메시지
      }

      setValue(0); // 신청 후 값 초기화
      await getCashList(); // 신청 후 캐시 리스트 갱신
    } catch (error) {
      console.error("Failed to process request:", error);
      showToast("신청 중 오류가 발생했습니다."); // 에러 메시지
    }
  };

  return (
    <>
      <Head title={t("입출금")} />
      <main>
        <section className="trading_table sub_page_section h_auto">
          <ul className="table_tab_menu">
            <li
              className={
                tabNum == "con_01" && "on !border-primary !text-primary"
              }
              id="con_01"
              onClick={() => handleTab("con_01")}
            >
              {t("입금신청")}
            </li>
            <li
              id="con_02"
              className={
                tabNum == "con_02" && "on !border-primary !text-primary"
              }
              onClick={() => handleTab("con_02")}
            >
              {t("출금신청")}
            </li>
          </ul>
          {tabNum === "con_01" ? (
            <div className="contents_wrap pt-0" id="contents_01">
              <div className="content-text-wrap">
                <h3>{t("입금안내")}</h3>
                <ol className="content-list">
                  <li className="send-item">
                    {t("입금 전용계좌는 수시로 변경될 수 있습니다.")}
                  </li>
                  <li className="send-item">
                    {t(
                      "입금 전 '전용계좌 문의'를 통해 입금 전용계좌 확인 바랍니다."
                    )}
                  </li>
                  <li className="send-item">
                    {t(
                      "정상적으로 입금 후 입금 신청을 하셨다면 5분 이내 승인 됩니다."
                    )}
                  </li>
                  <li className="send-item">
                    {t(
                      "입금신청 후 20분 이내에 입금이 되지 않는 경우에는 신청 내용이 자동 삭제 처리되며 선 입금 후 입금신청을 하시면 더욱 빠른 입금이 가능합니다."
                    )}
                  </li>
                  <li className="send-item">
                    {t("문제가 있을 시 고객센터 1:1문의를 통해 문의 바랍니다.")}
                  </li>
                </ol>
                <h3 className="marginTop">{t("주의사항")}</h3>
                <ul className="content-list">
                  <li className="notice-item">
                    {t(
                      "입금 시 등록된 출금계좌와 동일한 명의의 계좌에서 입금하셔야만 입금이 가능합니다."
                    )}
                  </li>
                  <li className="notice-item">
                    {t(
                      "토스뱅크,증권계좌,카카오페이 등 오픈뱅킹 이용 불가합니다."
                    )}
                  </li>
                  <li className="notice-item">
                    {t(
                      "타행, 타명의 입금, 수표 입금시 전환 처리되지 않습니다."
                    )}
                  </li>
                </ul>
                <h3 className="marginTop" id="depo_update_time">
                  {t("실시간 환율정보")}({exchangeRate.update_time})
                </h3>
                <div className="content-text">
                  <p id="depo_dollar">
                    {t("달러")} : {exchangeRate.usd || "불러오는 중..."}
                  </p>
                  <p id="depo_hkdollar">
                    {t("홍콩달러")} : {exchangeRate.hkd || "불러오는 중..."}
                  </p>
                </div>
              </div>
              <div className="num-button-wrap">
                <a
                  href="/counseling"
                  className="check-btn !bg-primary"
                  id="depoChk"
                >
                  {t("입금 전용계좌 확인")}
                </a>
                <div className="num-button">
                  <input
                    style={{ minWidth: "170px", cursor: "text" }}
                    type="text"
                    id="depo_point"
                    className="active"
                    placeholder="0"
                    value={formatCurrency(depoValue)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, ""); // 쉼표 제거
                      setDepoValue(Number(rawValue.replace(/\D/g, "") || 0));
                    }}
                  />
                  <button
                    onClick={() => handleButtonClick(100000, setDepoValue)}
                  >
                    100,000원
                  </button>
                  <button
                    onClick={() => handleButtonClick(1000000, setDepoValue)}
                  >
                    1,000,000원
                  </button>
                  <button
                    onClick={() => handleButtonClick(10000000, setDepoValue)}
                  >
                    10,000,000원
                  </button>
                  <button
                    onClick={() => handleButtonClick("reset", setDepoValue)}
                  >
                    {t("리셋")}
                  </button>
                  <button onClick={() => handleRequest(1, setDepoValue)}>
                    {t("입금신청")}
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="contents_wrap pt-0" id="contents_02">
              <div className="content-text-wrap">
                <h3>{t("출금안내")}</h3>
                <ol className="content-list">
                  <li className="send-item">
                    {t(
                      "09시부터 17시까지(주말 휴무) 업무시간 내 자유롭게 전환 및 출금이 가능합니다."
                    )}
                  </li>

                  <li className="send-item">
                    {t(
                      "최근 달러의 심각한 등락과 더불어 불법 환율 차익 거래를 방지하고자 1회 전환 출금 금액을 제한합니다."
                    )}
                  </li>
                </ol>
                <h3 className="marginTop" id="update_time">
                  {t("실시간 환율정보")}({exchangeRate.update_time})
                </h3>
                <div className="content-text">
                  <p id="dollar">
                    {t("달러")} : {exchangeRate.usd || "불러오는 중..."}
                  </p>
                  <p id="hkdollar">
                    {t("홍콩달러")} : {exchangeRate.hkd || "불러오는 중..."}
                  </p>
                </div>
              </div>
              <div className="num-button-wrap">
                <div className="num-button">
                  <input
                    style={{ minWidth: "170px", cursor: "text" }}
                    type="text"
                    id="numberInput"
                    className="active"
                    placeholder="0"
                    value={formatCurrency(withdrawValue)}
                    onChange={(e) => {
                      const rawValue = e.target.value.replace(/,/g, ""); // 쉼표 제거
                      setWithdrawValue(
                        Number(rawValue.replace(/\D/g, "") || 0)
                      );
                    }}
                  />
                  <button
                    onClick={() => handleButtonClick(100000, setWithdrawValue)}
                  >
                    100,000
                  </button>
                  <button
                    onClick={() => handleButtonClick(1000000, setWithdrawValue)}
                  >
                    1,000,000
                  </button>
                  <button
                    onClick={() =>
                      handleButtonClick(10000000, setWithdrawValue)
                    }
                  >
                    10,000,000
                  </button>
                  <button
                    onClick={() => handleButtonClick("reset", setWithdrawValue)}
                  >
                    {t("리셋")}
                  </button>
                  <button onClick={() => handleRequest(2, setWithdrawValue)}>
                    {t("출금신청")}
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="table_wrap_box">
            <h3 className="pl-40">{t("입/출금 내역")}</h3>
            <div className="table_wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("신청일시")}</th>
                    <th>{t("처리일시")}</th>
                    <th>{t("이벤트종류")}</th>
                    <th>{t("이전금액")}</th>
                    <th>{t("신청금액")}</th>
                    <th>{t("이후잔고")}</th>
                    <th>{t("처리상태")}</th>
                  </tr>
                </thead>
                <tbody id="cashList">
                  {[...cashList] // 원본 배열 복사
                    .sort((a, b) => new Date(b.add_time) - new Date(a.add_time))
                    .map((cash, index) => (
                      <tr key={index}>
                        <td>
                          {cash.add_time
                            ? moment(cash.add_time).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : "-"}
                        </td>
                        <td>
                          {cash.add_time
                            ? moment(cash.proc_time).format(
                                "YYYY-MM-DD HH:mm:ss"
                              )
                            : "-"}
                        </td>
                        <td>{cash.gubun == 1 ? t("입금") : t("출금")}</td>
                        <td>{cash.prevBalance.toLocaleString("ko-KR")}</td>
                        <td>{cash.req_amount.toLocaleString("ko-KR")}</td>
                        <td>{cash.postBalance.toLocaleString("ko-KR")}</td>
                        <td>
                          {cash.status === 0
                            ? t("요청중")
                            : cash.status === 1
                            ? t("처리완료")
                            : cash.status === 2
                            ? t("불능")
                            : t("알 수 없음")}
                        </td>
                      </tr>
                    ))}

                  {/*                                {cashList.map((cash, index) => (
                                    <tr key={index}>
                                        <td>{cash.add_time}</td>
                                        <td>{cash.proc_time}</td>
                                        <td>{cash.gubun == 1 ? "입금" : "출금"}</td>
                                        <td>{cash.prevBalance.toLocaleString("ko-KR")}</td>
                                        <td>{cash.req_amount.toLocaleString("ko-KR")}</td>
                                        <td>{cash.postBalance.toLocaleString("ko-KR")}</td>
                                        <td>{cash.status === 0 ? "요청중"
                                            : cash.status === 1
                                                ? "처리중"
                                                : cash.status === 2
                                                    ? "불능"
                                                    : "알 수 없음"}
                                        </td>
                                    </tr>
                                ))}*/}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>

      {/* 토스트 팝업 */}
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}
