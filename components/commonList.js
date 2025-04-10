import React, { useEffect, useRef, useState } from "react";
import apiRequest, { getExc, getUserPnt } from "../utils/api";
import { onRefresh } from "next/dist/client/components/react-dev-overlay/pages/client";
import useCommonStore from "../store/useCommon";
import $ from "jquery"; // jQuery 가져오기
import moment from "moment"; // moment.js 가져오기
import "daterangepicker"; // daterangepicker JS 가져오기
import useToast from "../hooks/toast";
import ToastModal from "@components/toastModal";
import { useMutation } from "@tanstack/react-query";
import { useTranslation } from "react-i18next";

function commonList({
  orderList,
  setOrderList,
  stockDataMap,
  stockList,
  stockCode,
  // fetchMyPoint,
  exposeFetchData,
}) {
  const { t } = useTranslation();
  const { fetchMyPoint } = useCommonStore();
  // 탭
  const [tab, setTab] = useState(0);
  //const [userPoint, setUserPoint] = useState(0); // 사용자 포인트 상태
  const { isVisible, message, showToast } = useToast(); //토스트
  //const {isVisible, message, showToast} = useToast()//토스트

  // 데이터 상태
  //const [orderList, setOrderList] = useState([]);
  const [tranList, setTranList] = useState([]);
  const [slList, setSlList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const datePickerRef = useRef(null); // Ref 생성
  const [selectedPeriod, setSelectedPeriod] = useState(7); // 기본 값 7일
  const [exchangeRate, setExchangeRate] = useState({
    usd: null,
    hkd: null,
    update_time: null,
  });
  const [dateRange, setDateRange] = useState({
    startDate: moment().startOf("day").subtract(7, "days").format("YYYY-MM-DD"),
    endDate: moment().startOf("day").format("YYYY-MM-DD"),
  });

  useEffect(() => {
    const fetchExchangeRate = async () => {
      try {
        const response = await getExc();
        setExchangeRate({
          usd: response.usd,
          hkd: response.hkd,
          update_time: new Date(response.update_time).toLocaleDateString(
            "ko-KR"
          ),
        });
      } catch (error) {
        console.error("Failed to fetch exchange rate:", error);
      }
    };

    fetchExchangeRate();
  }, []); // 빈 배열을 넣어 최초 1회 실행

  useEffect(() => {
    const orderTable = document.getElementById("orderList"); // 체결 미체결 테이블
    const evalDepoElement = document.getElementById("evalDepo"); // 평가예탁금
    const gainLossElement = document.getElementById("gainLoss"); // 총 평가손익
    const crntValuePaLElement = document.getElementById("crntValuePaL"); // 현재 종목 평가손익

    let totalEvaluation = 0; // 평가손익 합계 초기화
    let currentStockEvaluation = 0; // 현재 종목 평가손익
    const currentStockCode2 = stockCode;

    orderList.forEach((order, index) => {
      const stCode = order.jongmok;
      const status = order.status;
      const odrprice = order.order_sise;
      const orderCnt = order.order_cnt;
      const orderGubun = order.gubun;

      const stockData = stockDataMap[stCode]; // stockDataMap에서 해당 종목 데이터 가져오기
      if (status == 2 && stockData && stockData.cg) {
        const matchingStock = stockList.find(
          (stock) => stock.stCode === stCode
        );
        const curpr = stockData.cg;
        const tsize = matchingStock.st_tsize;
        const tvalue = matchingStock.st_tvalue;
        const stFee = matchingStock.st_fee;
        let trgExchn = 0;
        if (stCode.includes("101")) {
          trgExchn = 1; // 한국 시세
        } else if (stCode.includes("HS")) {
          trgExchn = parseFloat(exchangeRate.hkd);
        } else {
          trgExchn = parseFloat(exchangeRate.usd);
        }
        const fee = stFee * orderCnt * trgExchn;
        let evaluation = 0;
        if (orderGubun === 2) {
          // 매수
          evaluation =
            (curpr - odrprice) * tsize * (tvalue * trgExchn) * orderCnt;
        } else {
          // 매도
          evaluation =
            (odrprice - curpr) * tsize * (tvalue * trgExchn) * orderCnt;
        }
        evaluation -= fee;
        // 현재 종목의 평가손익 계산
        if (stCode === currentStockCode2) {
          currentStockEvaluation += evaluation;
        }
        // 총 평가손익 합계
        totalEvaluation += evaluation;
        const formattedEvaluation =
          Math.floor(evaluation).toLocaleString("ko-KR");

        if (orderTable) {
          const targetTd = orderTable.querySelector(
            `tr[id="${order.id}"] td:nth-child(7)`
          );
          if (targetTd) {
            targetTd.textContent = formattedEvaluation;
            if (evaluation < 0) {
              targetTd.classList.add("col_blue");
              targetTd.classList.remove("col_red");
            } else {
              targetTd.classList.add("col_red");
              targetTd.classList.remove("col_blue");
            }
          }
        }
      }
    });

    const myPointElement = document.getElementById("myPoint");
    let mypnt = 0;

    if (myPointElement) {
      mypnt = parseFloat(myPointElement.textContent.replace(/,/g, "")) || 0; // , 제거 후 숫자로 변환
    }

    // 총 평가손익
    if (gainLossElement) {
      updateElement(gainLossElement, totalEvaluation);
    }

    // 평가예탁금;
    if (evalDepoElement) {
      updateElement(evalDepoElement, mypnt + totalEvaluation, mypnt);
    }

    // 현재 종목 평가손익
    if (crntValuePaLElement) {
      updateElement(crntValuePaLElement, currentStockEvaluation);
    }
  }, [stockDataMap]);

  // 소수점 제거 및 클래스 설정 함수
  const updateElement = (element, value, compareValue = null) => {
    const formattedValue = Math.floor(value).toLocaleString("ko-KR"); // 소수점 제거 및 포맷팅
    element.textContent = formattedValue;

    // 기본 설정: 양수와 음수에 따른 색상 변경
    if (compareValue === null) {
      element.classList.toggle("col_blue", value < 0); // 음수면 col_blue 추가
      element.classList.toggle("col_red", value > 0); // 양수면 col_red 추가
      if (value === 0) {
        element.classList.remove("col_blue", "col_red"); // 0일 경우 모든 클래스 제거
      }
    } else {
      // 비교값에 따른 색상 변경 (평가예탁금 전용)
      element.classList.toggle("col_red", value > compareValue); // value가 크면 col_red 추가
      element.classList.toggle("col_blue", value < compareValue); // value가 작거나 같으면 col_blue 추가
    }
  };

  useEffect(() => {
    const dateInput = $("#dateRangePicker"); // jQuery로 DOM 접근
    // 기존 daterangepicker 인스턴스 제거
    if (dateInput.data("daterangepicker")) {
      dateInput.data("daterangepicker").remove();
    }
    dateInput.daterangepicker(
      {
        locale: {
          format: "YYYY-MM-DD",
        },
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        autoApply: true,
      },
      function (start, end) {
        // 날짜 선택 시 상태 업데이트
        setDateRange({
          startDate: start.format("YYYY-MM-DD"),
          endDate: end.format("YYYY-MM-DD"),
        });
      }
    );
  }, [tab, dateRange]); // dateRange 변경 시 동기화
  // 날짜 범위 선택 핸들러
  const handlePeriodSelection = (days) => {
    setSelectedPeriod(days); // 선택된 기간 업데이트
    const startDate = moment()
      .startOf("day")
      .subtract(days - 1, "days")
      .format("YYYY-MM-DD");
    const endDate = moment().startOf("day").format("YYYY-MM-DD");
    setDateRange({ startDate, endDate });
  };

  const shouldFetchData = useCommonStore((state) => state.shouldFetchData);
  const resetFetch = useCommonStore((state) => state.resetFetch);

  const fetchDataFromApi = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const odrData = await apiRequest("/user/order/find/myodr", {
        method: "GET",
      });
      const traData = await apiRequest("/user/trade/search", {
        method: "POST",
        body: JSON.stringify({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const stData = await apiRequest("/user/stoploss/getMyTabData", {
        method: "POST",
        body: JSON.stringify({
          startDate: dateRange.startDate,
          endDate: dateRange.endDate,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      // stoploss가 1인 데이터를 stData와 매칭하여 출력
      odrData.forEach((order) => {
        if (order.stoploss === 1) {
          const matchingStoplossData = stData.find(
            (st) => st.orderCd === order.order_cd
          );
          if (matchingStoplossData) {
            console.log(
              `Matched Data for order_cd ${order.order_cd}:`,
              matchingStoplossData
            );
          } else {
            console.log(`No match found for order_cd ${order.order_cd}`);
          }
        }
      });

      setOrderList(odrData || []);
      setTranList(traData || []);
      setSlList(
        stData.sort(
          (a, b) => moment(b.add_time).valueOf() - moment(a.add_time).valueOf()
        ) || []
      );
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  // `exposeFetchData`로 `fetchDataFromApi`를 전달
  useEffect(() => {
    if (exposeFetchData) {
      exposeFetchData(fetchDataFromApi);
    }
  }, [exposeFetchData]);

  //스탑로스 주문취소
  const cancelStopOrder = async (orderCd) => {
    try {
      const response = await apiRequest("/user/order/cancelStopOrder", {
        method: "POST",
        body: JSON.stringify({
          orderCd: orderCd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //console.log("Order canceled successfully:", );
      fetchDataFromApi();
      return response; // 취소 성공 결과 반환
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error; // 에러 발생 시 예외를 던짐
    }
  };

  const cancelOrder = async (orderCd) => {
    try {
      const response = await apiRequest("/user/order/cancelOrder", {
        method: "POST",
        body: JSON.stringify({
          orderCd: orderCd,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Order canceled successfully:", response);
      fetchDataFromApi();
      console.log(fetchMyPoint);

      showToast(response);
      return response; // 취소 성공 결과 반환
    } catch (error) {
      console.error("Error canceling order:", error);
      throw error; // 에러 발생 시 예외를 던짐
    }
  };

  const { mutate: clearingOrderMutate, isPending: isPendingClearingOrder } =
    useMutation({
      mutationFn: (orderCd) =>
        apiRequest("/user/order/clearingOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderCd }),
        }),
      onSuccess: () => {
        fetchDataFromApi();
        fetchMyPoint();
      },
      onError: (error) => {
        if (error.status === 400) {
          showToast(error.message);
        }
      },
    });

  //주문 청산
  const clearingOrder = async (orderCd) => {
    clearingOrderMutate(orderCd);
  };

  // 컴포넌트 마운트 시 데이터 로드
  useEffect(() => {
    fetchDataFromApi();
    onRefresh && onRefresh(fetchDataFromApi);
  }, []);

  const handleTab = (nbr) => {
    setTab(nbr);
  };
  useEffect(() => {
    if (shouldFetchData) {
      fetchDataFromApi();
      resetFetch(); // 상태 초기화
    }
  }, [shouldFetchData]);

  const formatCurrency = (value) => {
    if (typeof value !== "number") return value; // 숫자가 아니면 그대로 반환
    return new Intl.NumberFormat("ko-KR", {
      maximumFractionDigits: 0, // 소수점 제거
    }).format(Math.floor(value)); // 소수점 버림
  };

  const handleSearch = () => {
    fetchDataFromApi(); // 검색 버튼 클릭 시 데이터 호출
  };

  const handleOrderAction = async (orderCd, status) => {
    if (status === 1) {
      await cancelOrder(orderCd);
    } else if (status === 2) {
      await clearingOrder(orderCd);
    }
  };

  return (
    <>
      <ul className="table_tab_menu">
        <li
          className={tab == 0 && "on !border-primary !text-primary"}
          onClick={() => handleTab(0)}
          id="con_01"
        >
          {t("체결/미체결")}
        </li>
        <li
          onClick={() => handleTab(1)}
          className={tab == 1 && "on !border-primary !text-primary"}
          id="con_02"
        >
          {t("거래내역")}
        </li>
        <li
          className={tab == 2 && "on !border-primary !text-primary"}
          onClick={() => handleTab(2)}
          id="con_03"
        >
          {t("S/L내역")}
        </li>
      </ul>

      {tab != 0 && (
        <div className="search_wrap">
          <div className="range">
            <div className="range_radio">
              <p>{t("기간선택")}</p>
              <span
                className={`item ${selectedPeriod === 1 ? "on" : ""}`}
                onClick={() => handlePeriodSelection(1)}
              >
                1{t("일")}
              </span>
              <span
                className={`item ${selectedPeriod === 7 ? "on" : ""}`}
                onClick={() => handlePeriodSelection(7)}
              >
                7{t("일")}
              </span>
              <span
                className={`item ${selectedPeriod === 30 ? "on" : ""}`}
                onClick={() => handlePeriodSelection(30)}
              >
                30{t("일")}
              </span>
            </div>
            <div className="range_date_picker">
              <p>{t("직접 입력")}</p>
              <input
                type="text"
                id="dateRangePicker"
                value={`${dateRange.startDate} - ${dateRange.endDate}`} // 상태값 표시
                readOnly
              />
            </div>
          </div>
          <div className="btn_wrap">
            <button
              className="btn gray"
              onClick={handleSearch}
              id="searchButton"
            >
              {t("조회")}
            </button>
          </div>
        </div>
      )}

      {tab == 0 && (
        <div className="contents_wrap" id="contents_01">
          <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("상태")}</th>
                  <th>{t("거래종목")}</th>
                  <th>{t("가격유형")}</th>
                  <th>{t("매매구분")}</th>
                  <th>{t("주문번호")}</th>
                  <th>{t("평단가/주문가")}</th>
                  <th>{t("평가손익")}</th>
                  <th>{t("정산/취소")}</th>
                </tr>
              </thead>
              <tbody id="orderList">
                {orderList.map((order, index) => {
                  // 오버나잇 제외
                  if (order.status === 4) {
                    return;
                  }

                  const matchingStoplossData =
                    order.stoploss === 1
                      ? slList.find((st) => st.orderCd === order.order_cd)
                      : null;
                  return (
                    <React.Fragment key={index}>
                      {/* 주문 행 */}
                      <tr id={order.id}>
                        <td>{order.status === 1 ? t("미체결") : t("체결")}</td>
                        <td>{t(order.stName)}</td>
                        <td>
                          {order.price_type === 1 ? t("시장가") : t("지정가")}
                        </td>
                        <td
                          className={order.gubun === 1 ? "col_blue" : "col_red"}
                        >
                          {order.gubun === 1 ? t("매도") : t("매수")}(
                          {order.order_cnt})
                        </td>
                        <td>{order.order_cd}</td>
                        <td>{order.order_sise}</td>
                        <td></td>
                        <td>
                          <button
                            style={{ display: "inline-block" }}
                            className="btn"
                            disabled={isPendingClearingOrder}
                            onClick={() =>
                              handleOrderAction(order.order_cd, order.status)
                            }
                          >
                            {order.status === 1 ? t("취소") : t("청산")}
                          </button>
                        </td>
                      </tr>

                      {/* Stoploss 정보 행 */}
                      {matchingStoplossData && (
                        <>
                          <tr key={`${index}-stoploss-1`}>
                            <td style={{ textAlign: "center", color: "red" }}>
                              {t("익절")}
                            </td>
                            <td>{t(matchingStoplossData.stName)}</td>
                            <td>S/L</td>
                            <td style={{ textAlign: "center", color: "red" }}>
                              {t("익절")}:{matchingStoplossData.profit_ticks}
                            </td>
                            <td>{matchingStoplossData.orderCd}</td>
                            <td>{matchingStoplossData.profit_price}</td>
                            <td>-</td>
                            <td>
                              <button
                                onClick={() =>
                                  cancelStopOrder(matchingStoplossData.orderCd)
                                }
                              >
                                {t("취소")}
                              </button>
                            </td>
                          </tr>
                          <tr key={`${index}-stoploss-2`}>
                            <td style={{ textAlign: "center", color: "blue" }}>
                              {t("손절")}
                            </td>
                            <td>{t(matchingStoplossData.stName)}</td>
                            <td>S/L</td>
                            <td style={{ textAlign: "center", color: "blue" }}>
                              {t("손절")}:{matchingStoplossData.loss_ticks}
                            </td>
                            <td>{matchingStoplossData.orderCd}</td>
                            <td>{matchingStoplossData.loss_price}</td>
                            <td>-</td>
                            <td>
                              <button
                                onClick={() =>
                                  cancelStopOrder(matchingStoplossData.orderCd)
                                }
                              >
                                {t("취소")}
                              </button>
                            </td>
                          </tr>
                        </>
                      )}
                    </React.Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab == 1 && (
        <div className="contents_wrap" id="contents_02">
          <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("거래종목")}</th>
                  <th>{t("매매구분")}</th>
                  <th>{t("주문번호")}</th>
                  <th>{t("주문량")}</th>
                  <th>{t("주문가격")}</th>
                  <th>{t("가격유형")}</th>
                  <th>{t("평균단가")}</th>
                  <th>{t("오버나잇")}</th>
                  <th>{t("수수료")}</th>
                  <th>{t("손익")}</th>
                  <th>{t("총손익")}</th>
                  <th>{t("접수상태")}</th>
                  <th>{t("체결량")}</th>
                  <th>{t("체결시간")}</th>
                  <th>{t("보유잔고")}</th>
                  <th>{t("평가금액")}</th>
                </tr>
              </thead>
              <tbody id="tranList">
                {tranList.map((order, index) => (
                  <tr key={index}>
                    <td>{t(order.stName)}</td>
                    <td className={order.gubun === 1 ? "col_blue" : "col_red"}>
                      {order.gubun === 1 ? t("매도") : t("매수")}
                    </td>
                    <td>{order.order_cd}</td>
                    <td>{order.order_cnt}</td>
                    <td>{order.order_sise}</td>
                    <td>{order.price_type == 1 ? t("시장가") : t("지정가")}</td>
                    <td>{order.average_price}</td>
                    <td>{order.overnight}</td>
                    <td>{formatCurrency(order.commission)}</td>
                    <td
                      className={order.profit_loss < 0 ? "col_blue" : "col_red"}
                    >
                      {formatCurrency(order.profit_loss)}
                    </td>
                    <td
                      className={
                        order.total_profit_loss < 0 ? "col_blue" : "col_red"
                      }
                    >
                      {formatCurrency(order.total_profit_loss)}
                    </td>
                    <td>{t(order.reception_status)}</td>
                    <td>{order.treaty_cnt}</td>
                    <td>{order.add_time}</td>
                    <td>{formatCurrency(order.balance)}</td>
                    <td>{formatCurrency(order.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {tab == 2 && (
        <div className="contents_wrap" id="contents_03">
          <div className="table_wrap">
            <table>
              <thead>
                <tr>
                  <th>{t("거래종목")}</th>
                  <th>{t("매매구분")}</th>
                  <th>{t("주문번호")}</th>
                  <th>{t("상태")}</th>
                  <th>{t("이익틱")}</th>
                  <th>{t("손실틱")}</th>
                  <th>{t("S/L여부")}</th>
                  <th>{t("스탑가격")}</th>
                  <th>{t("평균가격")}</th>
                  <th>{t("체결가격")}</th>
                  <th>{t("등록시간")}</th>
                  <th>{t("완료시간")}</th>
                </tr>
              </thead>

              <tbody id="slList">
                {slList.map((order, index) => (
                  <tr key={index}>
                    <td>{t(order.stName)}</td>
                    <td>{order.gubun == 1 ? t("매도") : t("매수")}</td>
                    <td>{order.orderCd}</td>
                    <td>
                      {order.status === 0
                        ? t("S/L집행")
                        : order.status === 1
                        ? t("고객해제")
                        : order.status === 2
                        ? t("고객청산")
                        : ""}
                    </td>
                    <td>{order.profit_ticks}</td>
                    <td>{order.loss_ticks}</td>
                    <td>S/L</td>
                    <td>{order.stop_price}</td>
                    <td>{order.avg_price}</td>
                    <td>{order.treaty_price}</td>
                    <td>
                      {order.add_time
                        ? moment(order.add_time).format("YYYY-MM-DD HH:mm:ss")
                        : "-"}
                    </td>
                    <td>
                      {order.complete_time
                        ? moment(order.complete_time).format(
                            "YYYY-MM-DD HH:mm:ss"
                          )
                        : "-"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}

export default commonList;
