import { useEffect, useRef, useState } from "react";
import CommonList from "@components/commonList";
//import {getUserPnt} from "../utils/api";
import apiRequest, { getExc, getUserPnt } from "../utils/api";
import { useWebSocket } from "../utils/WebSocketProvider";
import { useOrderWebSocket } from "../utils/OrderWebSocketProvider";
import useCommonStore from "../store/useCommon";
import useToast from "hooks/toast";
import ToastModal from "@components/toastModal";
import StopLoseModal from "@components/stopLoseModal";
import RunListModal from "@components/runListModal";
import ChartBox from "@components/tradingChart"; // 새 컴포넌트 import
import { useQuery } from "@tanstack/react-query";
import moment from "moment";
import Head from "@components/head";
import { GrLineChart } from "react-icons/gr";
import ChartIcon from "@components/icons/chartIcon";
import { useTranslation } from "react-i18next";

export default function Main() {
  const { t } = useTranslation();

  const { myPoint, fetchMyPoint } = useCommonStore();

  const { isVisible, message, showToast } = useToast(); //토스트

  //const [myPoint, setMyPoint] = useState(0);
  const [tabOrders01, setTabOrders01] = useState(0);
  const [tabOrders01sub, setTabOrders01sub] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [stockInfo, setStockInfo] = useState("");
  const [stockList, setStockList] = useState([]);
  const [stockCode, setStockCode] = useState("");
  const [stockCodeModal, setStockCodeModal] = useState("");
  const [stock, setStock] = useState([]);
  const [isListOpen, setIsListOpen] = useState(false);
  const [webSocketData, setWebSocketData] = useState({});
  const [currentPrice, setCurrentPrice] = useState(null); // 체결가 (현재가)
  const offerListRef = useRef(null); // 매도 리스트 DOM 참조
  const bidListRef = useRef(null); // 매수 리스트 DOM 참조
  const { stockDataMap, odrSocket, allStockSocket } = useWebSocket();
  const { odrMessages } = useOrderWebSocket();
  const processedMessages = useRef(new Set()); // 이미 처리한 메시지 추적
  const [prevStockDataMap, setPrevStockDataMap] = useState({}); // 이전 상태 저장
  const [stockDataMapState, setStockDataMapState] = useState({});
  const updateStockDataMap = (newData) => {
    setStockDataMapState((prevData) => ({ ...prevData, ...newData }));
  };
  const [limitQuantity, setLimitQuantity] = useState(1);
  const [limitPrice, setLimitPrice] = useState("");

  const fetchDataFromApiRef = useRef(null);

  //환율
  const [exchangeRate, setExchangeRate] = useState({
    usd: null,
    hkd: null,
    update_time: null,
  });

  const limitPriceRef = useRef(null);
  const currentPriceRef = useRef(null);

  const [orderList, setOrderList] = useState([]); // 체결 미체결 리스트
  // 미체결 목록 조회 팝업
  const [runWaitModalOpen, setRunWaitModalOpen] = useState(false);
  /*const openRunWaitingModal = () => setRunWaitModalOpen(true);*/

  const [buyWidth, setBuyWidth] = useState(50); // 초기 BUY 비율
  const [sellWidth, setSellWidth] = useState(50); // 초기 SELL 비율

  useEffect(() => {
    let timerId;

    const updateGage = () => {
      const randomBuy = Math.random() * 100; // 0~100 사이의 랜덤 값
      const randomSell = 100 - randomBuy; // BUY와 SELL의 합은 100%

      setBuyWidth(randomBuy.toFixed(1)); // 소수점 1자리까지
      setSellWidth(randomSell.toFixed(1)); // 소수점 1자리까지

      // 랜덤한 초(0.5초 ~ 5초)로 다음 업데이트 설정
      const randomInterval = Math.random() * 4500 + 500; // 500ms ~ 5000ms
      clearTimeout(timerId); // 기존 타이머 클리어
      timerId = setTimeout(updateGage, randomInterval);
    };

    updateGage(); // 최초 호출

    return () => clearTimeout(timerId); // 컴포넌트 언마운트 시 타이머 정리
  }, []);

  const openRunWaitingModal = () => {
    if (!runWaitModalOpen) {
      setRunWaitModalOpen(true);
      setStockCodeModal((prev) => prev || stockCode); // 기존 값이 있으면 그대로 유지
    }
  };

  const closeRunWaitingModal = () => setRunWaitModalOpen(false);

  const triggerFetch = useCommonStore((state) => state.triggerFetch);

  const [executeOrder, setExecuteOrder] = useState(null);

  //선택된 미체결 데이터
  const handleConfirm = (selectedOrder) => {
    setExecuteOrder(selectedOrder);
    //console.log(selectedOrder)
  };

  // 환율 정보 가져오기
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

  // 스탑로스 컨펌 모달
  const [SLModalOpen, setSLModalOpen] = useState(false);

  const [pendingOrder, setPendingOrder] = useState(null); // 확인 대기 중인 주문 정보

  //스탑로스 갯수 가격 주문코드 구분
  const [stopQuantity, setStopQuantity] = useState(0);
  const [stopPrice, setStopPrice] = useState("");
  const [stopOrderCd, setStopOrderCd] = useState("");
  const [StopOrderGbn, setStopOrderGbn] = useState("");

  //스탑로스 이익 손실 틱
  const [profitValue, setProfitValue] = useState(1);
  const [lossValue, setLossValue] = useState(1);
  // 값 증가/감소 함수
  const handleIncrease = (setter) => {
    setter((prevValue) => Number(prevValue) + 1);
  };

  const handleDecrease = (setter) => {
    setter((prevValue) => (prevValue > 1 ? prevValue - 1 : prevValue)); // 최소값 제한 (1)
  };

  const initStop = () => {
    //S/L예약주문
    const matchingOrders = orderList.filter(
      (order) => order.jongmok === stockCode && order.status === 2
    );

    if (matchingOrders.length > 0) {
      const order = matchingOrders[0]; //어차피 하나만 나올것임

      // React 상태를 사용하여 값을 설정
      setStopQuantity(order.order_cnt || 0);
      setStopPrice(order.order_sise || "0");
      setStopOrderCd(order.order_cd || "");
      setStopOrderGbn(order.gubun || 0);
    } else {
      setStopQuantity(0);
      setStopPrice(0);
      setStopOrderCd("");
      setStopOrderGbn(0);
    }
  };

  const handleTab01 = (nbr) => {
    setTabOrders01(nbr);
    if (nbr == 1) {
      initStop();
    }
  };

  const handleTab01sub = (nbr) => {
    setTabOrders01sub(nbr);

    if (nbr === 1 && currentPrice) {
      setLimitPrice(currentPrice); // 현재가 값을 상태에 설정
    }
  };

  useEffect(() => {
    if (tabOrders01 == 1) {
      initStop();
    }
  }, [stockInfo]);

  const handlePriceChange = (isIncrement) => {
    // stockInfo의 st_code를 가져와 stockList에서 같은 st_code를 찾음
    const stock = stockList.find((item) => item.stCode === stockCode);

    if (stock) {
      const { st_tsize } = stock;

      // 계산: 1 / st_tsize 값
      const step = 1 / st_tsize;

      // step의 소수점 자리수 계산
      const decimalPlaces = step.toString().split(".")[1]?.length || 1;

      // 새로운 값 계산
      const newPrice =
        parseFloat(limitPrice || 0) + (isIncrement ? step : -step);

      // 상태 업데이트 (step의 소수점 자리수만큼 맞춤)
      setLimitPrice(newPrice.toFixed(decimalPlaces));
    }
  };

  // 주문 수정
  const modifyOrder = async (orderData) => {
    try {
      const response = await apiRequest("/user/order/modify", {
        method: "POST",
        body: JSON.stringify({
          orderCd: orderData.orderCd,
          stockCode: orderData.stockCode,
          price: orderData.price,
          quantity: orderData.quantity,
          gbn: orderData.gbn,
          orderIp: orderData.orderIp,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      //showToast(response);
      // fetchDataFromApi 호출하여 갱신
      if (fetchDataFromApiRef.current) {
        fetchDataFromApiRef.current();
      }
      return response; // 수정 성공 결과 반환
    } catch (error) {
      console.error("Error modifying order:", error);
      showToast(error.message);
      throw error; // 에러 발생 시 예외를 던짐
    }
  };

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiRequest("/user/settings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
  });

  // 주문 취소
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
      if (settings?.orderConfirmCancel) {
        showToast(response);
      }
      // fetchDataFromApi 호출하여 갱신
      if (fetchDataFromApiRef.current) {
        fetchDataFromApiRef.current();
      }

      return response; // 취소 성공 결과 반환
    } catch (error) {
      showToast(error.message);
      //console.error("Error canceling order:", error);
      throw error; // 에러 발생 시 예외를 던짐
    }
  };

  const handleOrderPriceChange = (isIncrement) => {
    const stock = stockList.find((item) => item.stCode === stockCode);

    if (stock) {
      const { st_tsize } = stock; // 증감 단위 정보

      // 계산: 1 / st_tsize 값
      const step = 1 / st_tsize;

      // step의 소수점 자리수 계산
      const decimalPlaces = step.toString().split(".")[1]?.length || 1;

      // 기존 가격을 가져오고 없으면 기본값 0
      const currentPrice = parseFloat(executeOrder?.order_sise || 0);

      // 새로운 가격 계산
      const newPrice = currentPrice + (isIncrement ? step : -step);

      // 상태 업데이트 (step의 소수점 자리수만큼 맞춤)
      setExecuteOrder({
        ...executeOrder,
        order_sise: newPrice.toFixed(decimalPlaces), // 업데이트된 가격
      });
    }
  };

  const handlePriceClick = (nbr) => {
    const price = nbr.target.textContent;
    setTabOrders01sub(1);
    setLimitPrice(price); // 클릭된 가격으로 지정가 설정
  };

  const decrementValue = () => {
    if (tabOrders01sub === 0) {
      setQuantity((prev) => Math.max(prev - 1, 1)); // tabOrders01sub이 0이면 setQuantity 업데이트
    } else if (tabOrders01sub === 1) {
      setLimitQuantity((prev) => Math.max(prev - 1, 1)); // tabOrders01sub이 1이면 setLimitQuantity 업데이트
    }
  };
  const incrementValue = () => {
    if (tabOrders01sub === 0) {
      setQuantity((prev) => prev + 1); // tabOrders01sub이 0이면 setQuantity 업데이트
    } else if (tabOrders01sub === 1) {
      setLimitQuantity((prev) => prev + 1); // tabOrders01sub이 1이면 setLimitQuantity 업데이트
    }
  };

  const setValue = (value) => {
    if (tabOrders01sub === 0) {
      setQuantity(value); // tabOrders01sub이 0이면 setQuantity 업데이트
    } else if (tabOrders01sub === 1) {
      setLimitQuantity(value); // tabOrders01sub이 1이면 setLimitQuantity 업데이트
    }
  };

  // 보유 자산 정보 가져오기
  /*    const fetchMyPoint = async () => {
        try {
            const response = await getUserPnt();
            setMyPoint(response.toLocaleString()); // API 응답에서 myPoint 값을 설정
        } catch (error) {
            console.error("자산 정보를 불러오는 데 실패했습니다.", error);
        }
    };*/

  useEffect(() => {
    fetchMyPoint();
  }, []);

  //전체종목 리스트 가져오기
  useEffect(() => {
    const fetchStockList = async () => {
      try {
        const res = await apiRequest("/user/stocklist", { method: "GET" });
        setStockList(res);

        if (res.length > 0) {
          const now = new Date();
          const hour = now.getHours();

          // 오전 10시부터 오후 6시 사이면 0번째, 아니면 2번째
          const selectedIndex = hour >= 10 && hour < 18 ? 0 : 1;

          if (res[selectedIndex]) {
            setStockInfo(res[selectedIndex].stName); // 선택된 종목 이름
            setStockCode(res[selectedIndex].stCode); // 선택된 종목 코드
            setStockCodeModal(res[selectedIndex].stCode);
            handleStockSelect(res[selectedIndex]);
            const defaultStockData =
              stockDataMap[res[selectedIndex].stCode] || null; // 선택된 종목 데이터
          } else {
            console.warn("Selected index is out of bounds:", selectedIndex);
          }
        }
      } catch (error) {
        console.error("종목 리스트를 불러오는 데 실패했습니다.", error);
      }
    };

    fetchStockList();
  }, []);

  const handleStockInfoClick = () => {
    setIsListOpen((prev) => !prev); // 리스트 열림/닫힘 토글
  };

  const handleStockSelect = (stock) => {
    setStockInfo(stock.stName); // 선택된 종목 이름 업데이트
    setStockCode(stock.stCode); // 선택된 종목 코드 업데이트
    setIsListOpen(false); // 리스트 닫기
    stock.st_ccode = stock.stCode.includes("HS")
      ? "HKD"
      : stock.stCode.includes("101")
      ? "KRW"
      : "USD";
    stock.st_tvalue = parseFloat(stock.st_tvalue).toFixed(2);

    setStock(stock);
  };
  useEffect(() => {
    if (stockCode && stockDataMap[stockCode]) {
      // 체결가 업데이트
      setCurrentPrice(stockDataMap[stockCode].cg);

      // DOM 업데이트
      const { hg } = stockDataMap[stockCode];

      // 합계 계산 함수
      function calculateTotal(prefix, count) {
        let total = 0;
        for (let i = 1; i <= count; i++) {
          total += parseFloat(hg[`${prefix}${i}`]) || 0; // 숫자로 변환, 값이 없으면 0
        }
        return total;
      }

      // 합계 계산
      const offernoTotal = calculateTotal("offerno", 5);
      const offerremTotal = calculateTotal("offerrem", 5);
      const bidnoTotal = calculateTotal("bidno", 5);
      const bidremTotal = calculateTotal("bidrem", 5);

      // 호가 데이터 (매도)

      // 매도 호가 데이터 (offerno, offerrem은 5까지만 처리)
      for (let i = 1; i <= 5; i++) {
        const offernoValue = parseFloat(hg[`offerno${i}`]) || 0;
        const offerremValue = parseFloat(hg[`offerrem${i}`]) || 0;
        const offernoPercent =
          offernoTotal > 0 ? (offernoValue / offernoTotal) * 100 : 0;
        const offerremPercent =
          offerremTotal > 0 ? (offerremValue / offerremTotal) * 100 : 0;

        // offerno 스타일 업데이트
        const offernoElement = document.querySelector(`#offerno${i} i`);
        if (offernoElement) {
          offernoElement.style.width = `${offernoPercent}%`;
        }

        // offerrem 스타일 업데이트
        const offerremElement = document.querySelector(`#offerrem${i} i`);
        if (offerremElement) {
          offerremElement.style.width = `${offerremPercent}%`;
        }

        // 텍스트 업데이트
        document.querySelector(`#offerno${i} em.barText`).innerText =
          hg[`offerno${i}`] || "0";
        document.querySelector(`#offerrem${i} em.barText`).innerText =
          hg[`offerrem${i}`] || "0";
      }

      // 매도 호가 가격 데이터 (offerho는 7까지 처리)
      for (let i = 1; i <= 7; i++) {
        document.getElementById(`offerho${i}`).innerText =
          hg[`offerho${i}`] || "0";
      }

      // 매수 호가 데이터 (bidno, bidrem은 5까지만 처리)
      for (let i = 1; i <= 5; i++) {
        const bidnoValue = parseFloat(hg[`bidno${i}`]) || 0;
        const bidremValue = parseFloat(hg[`bidrem${i}`]) || 0;
        const bidnoPercent =
          bidnoTotal > 0 ? (bidnoValue / bidnoTotal) * 100 : 0;
        const bidremPercent =
          bidremTotal > 0 ? (bidremValue / bidremTotal) * 100 : 0;

        // bidno 스타일 업데이트
        const bidnoElement = document.querySelector(`#bidno${i} i`);
        if (bidnoElement) {
          bidnoElement.style.width = `${bidnoPercent}%`;
        }

        // bidrem 스타일 업데이트
        const bidremElement = document.querySelector(`#bidrem${i} i`);
        if (bidremElement) {
          bidremElement.style.width = `${bidremPercent}%`;
        }

        // 텍스트 업데이트
        document.querySelector(`#bidno${i} em.barText`).innerText =
          hg[`bidno${i}`] || "0";
        document.querySelector(`#bidrem${i} em.barText`).innerText =
          hg[`bidrem${i}`] || "0";
      }

      // 매수 호가 가격 데이터 (bidho는 7까지 처리)
      for (let i = 1; i <= 7; i++) {
        document.getElementById(`bidho${i}`).innerText = hg[`bidho${i}`] || "0";
      }

      let signSymbol = "";
      let color = "";
      let curColor = "";

      signSymbol = stockDataMap[stockCode].signval == "2" ? "▲" : "▼";
      color = stockDataMap[stockCode].signval == "2" ? "col_red" : "col_blue";
      curColor =
        stockDataMap[stockCode].signval == "2" ? "txt_orange" : "txt_blue";

      // 현재가 업데이트
      const curprElement = document.getElementById("curpr");
      curprElement.innerText = stockDataMap[stockCode].cg || 0;
      curprElement.className = "price"; // 기본 클래스 설정
      curprElement.classList.add(curColor); // 조건에 따라 색상 클래스 추가

      // 전일 대비 업데이트
      const subHeadYdprElement = document.getElementById("subHeadYdpr");
      subHeadYdprElement.innerText = `${signSymbol} ${
        stockDataMap[stockCode].ydpr || 0
      }`;
      subHeadYdprElement.className = color; // 조건에 따라 색상 클래스 추가

      // 등락률 업데이트
      const subHeadChRateElement = document.getElementById("subHeadChRate");
      subHeadChRateElement.innerText = `${stockDataMap[stockCode].rate || 0}%`;
      subHeadChRateElement.className = color; // 조건에 따라 색상 클래스 추가

      // 특정 가격 업데이트
      const stcPriceElement = document.getElementById("stcPrice");
      stcPriceElement.innerText = stockDataMap[stockCode].cg || 0;
      stcPriceElement.className = color; // 조건에 따라 색상 클래스 추가
    }
  }, [stockCode, stockDataMap]);

  // S/L 모달 열기
  const openSLModal = (orderData) => {
    //setPendingOrder(orderData); // 주문 데이터를 저장
    //
    setSLModalOpen(true);
  };

  // S/L 모달 닫기
  const closeSLModal = () => {
    //setPendingOrder(null); // 주문 데이터 초기화
    //cancelOrder(orderData.order_cd)
    setSLModalOpen(false);
  };

  // S/L 주문 실행
  const executeStopLossOrder = async () => {
    order("stoploss", "execute");
    await fetchMyPoint();
    await triggerFetch();
    //showToast(`스탑로스 주문 접수 완료`);
    closeSLModal();
  };

  // S/L 주문 취소
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
      //fetchDataFromApi();
      await fetchMyPoint();
      await triggerFetch();
      return response; // 취소 성공 결과 반환
    } catch (error) {
      console.error("Error canceling order:", error);
      showToast(error.message);
      throw error; // 에러 발생 시 예외를 던짐
    }
  };

  const order = async (type, action) => {
    try {
      // 임시 항생 주문 불가 처리
      if (stockCode === "HSIF25") {
        const today = moment().format("YYYY-MM-DD"); // 오늘 날짜
        const targetDate = "2024-12-31"; // 2024-12-31 날짜

        const currentTime = moment(); // 현재 시간
        const targetTime = moment("2024-12-31 13:00", "YYYY-MM-DD HH:mm"); // 2024년 12월 31일 13:00

        // 오늘이 2024-12-31
        if (today === targetDate && currentTime.isAfter(targetTime)) {
          // 2024년 12월 31이고 13시 이후
          showToast("현재 해당종목은 주문가능시간이 아닙니다.");
          return;
        }
      }

      // 공통 옵션 설정
      const commonBody = {
        stockCode: stockCode,
      };

      let endpoint = "";
      let additionalBody = {};

      // 주문 유형별 처리
      if (type === "market") {
        const marketQuantity = document.getElementById("market-quantity").value;
        endpoint = "/user/order/marketOrder";
        additionalBody = { quantity: marketQuantity, gbn: action };
      } else if (type === "limit") {
        const limitPrice = document.getElementById("limit-price").value;
        // 입력값 검증
        if (!limitPrice || !limitQuantity) {
          console.error("가격과 수량을 입력하세요.");
          return;
        }

        endpoint = "/user/order/placeOrder";
        additionalBody = {
          price: limitPrice,
          quantity: limitQuantity,
          gbn: action,
        };
      } else if (type === "stoploss") {
        endpoint = "/user/order/placeStopOrder";
        additionalBody = {
          orderCode: stopOrderCd,
          price: stopPrice,
          quantity: stopQuantity,
          gbn: StopOrderGbn,
          profitAmount: profitValue,
          lossAmount: lossValue,
        };
      } else {
        console.error("지원되지 않는 주문 유형입니다:", type);
        return;
      }

      // 요청 전송
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...commonBody, ...additionalBody }),
      };

      const response = await apiRequest(endpoint, options);

      // 토스트 메시지 표시
      const orderTypeMessage =
        type === "market"
          ? "시장가"
          : type === "limit"
          ? "지정가"
          : type === "stoploss"
          ? "스탑로스"
          : "";
      // showToast(`${orderTypeMessage} 주문이 접수되었습니다.`);

      // 포인트 갱신
      await fetchMyPoint();
      //체결 미체결 갱신
      await triggerFetch();
    } catch (error) {
      console.error("주문 처리 중 오류 발생:", error);

      if (error.status === 400) {
        showToast(error.message);
      }
    }
  };

  const onToggleChart = () => {
    const chartBox = document.querySelector(".chart_box");
    if (chartBox) {
      chartBox.classList.toggle("show"); // 'show' 클래스를 추가/제거
    }
  };

  const onClickOutSide = () => {
    setIsListOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isListOpen) {
      document.addEventListener("click", onClickOutSide);
    } else {
      document.removeEventListener("click", onClickOutSide);
    }

    return () => {
      document.removeEventListener("click", onClickOutSide);
    };
  }, [isListOpen]);

  return (
    <>
      <Head title={t("통합주문")} />
      <main>
        <div className="sub_page_section h_auto">
          <div className="flex_row">
            <section className="main_chart">
              <div className="main_chart_info">
                <div className="stock_dropdown">
                  {/* 선택된 종목 */}
                  <div
                    className="stock_info"
                    id="stockInfo"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStockInfoClick();
                    }}
                  >
                    <h2>{t(stockInfo) || "KOSPI200"}</h2>
                  </div>

                  {/* 종목 리스트 */}
                  <ul
                    className="options"
                    id="stockList"
                    style={{ display: isListOpen ? "block" : "none" }}
                  >
                    {stockList.map((stock) => (
                      <li
                        key={stock.id}
                        onClick={() => handleStockSelect(stock)}
                        className="option_item"
                      >
                        {t(stock.stName)} ({stock.stCode})
                      </li>
                    ))}
                  </ul>
                </div>

                {stock.length !== 0 && (
                  <div className="chart_top_info_wrap">
                    <div className="dp_flex">
                      <p className="col_blue" id="stcPrice">
                        -
                      </p>
                      <p className="col_blue" id="subHeadYdpr">
                        -
                      </p>
                      <p className="col_blue" id="subHeadChRate">
                        -
                      </p>
                    </div>
                    <div className="dp_block">
                      <p>
                        <span className="">{t("틱사이즈")}</span>
                        <span id="subHeadRate" className="">
                          {1 / stock.st_tsize + " " + stock.st_ccode}
                        </span>
                      </p>
                      <p>
                        <span className="">{t("틱가치")}(tv)</span>
                        <span id="subHeadTv" className="">
                          {stock.st_tvalue + " " + stock.st_ccode}
                        </span>
                      </p>
                    </div>
                    <div className="dp_block">
                      <p>
                        <span className="">{t("만료일")}</span>
                        <span id="subHeadExpDate" className="">
                          {stock.stDate ? stock.stDate.split(" ")[0] : ""}
                        </span>
                      </p>
                      <p>
                        <span className="">{t("최소 담보금")}</span>
                        <span id="subHeadReamExp" className="">
                          300,000원
                        </span>
                      </p>
                    </div>
                  </div>
                )}
                <button
                  className="toggleChart btn arrow !border-primary !text-primary"
                  onClick={onToggleChart}
                >
                  {t("차트")}
                  <ChartIcon className="text-primary w-[19px] h-[19px] [&_path]:fill-primary" />
                </button>
              </div>
              {/*                            <div className="chart_box">
                                <div className="tradingview-widget-container" style={{height: "100%", width: "100%"}}>
                                    <div id="tradingview_chart" style={{height: '100%', width: '100%'}}></div>
                                </div>
                            </div>*/}
              <ChartBox stockList={stockList} stock={stock} />
            </section>
            <section className="order_book">
              <h3>{t("오더북")}</h3>
              <div className="order_table_wrap">
                <ul className="header">
                  <li>{t("건수")}</li>
                  <li>{t("호가")}</li>
                  <li>{t("잔량")}</li>
                </ul>

                <div className="order_table_body">
                  <div className="table_wrap orange_wrap">
                    <ul>
                      <li id="offerno7">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho7" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem7">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno6"></li>
                      <li id="offerho6" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem6">
                        <em>0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno5" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho5" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem5" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno4" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho4" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem4" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno3" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho3" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem3" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno2" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho2" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem2" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="offerno1" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="offerho1" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="offerrem1" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                  </div>
                  <div className="price txt_orange" id="curpr"></div>
                  <div className="table_wrap blue_wrap">
                    <ul>
                      <li id="bidno1" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="bidho1" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem1" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno2" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="bidho2" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem2" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno3" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="bidho3" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem3" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno4" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="bidho4" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem4" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno5" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                      <li id="bidho5" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem5" className="barBox">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno6"></li>
                      <li id="bidho6" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem6">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                    <ul>
                      <li id="bidno7"></li>
                      <li id="bidho7" onClick={handlePriceClick}>
                        0
                      </li>
                      <li id="bidrem7">
                        <i></i>
                        <em className="barText">0</em>
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="bar_chart">
                  <div className="buy" style={{ width: `${buyWidth}%` }}>
                    <span>{buyWidth}%</span>
                    <i>BUY</i>
                  </div>
                  <div className="sell" style={{ width: `${sellWidth}%` }}>
                    <span>{sellWidth}%</span>
                  </div>
                </div>
              </div>
            </section>
            <div className="assets-all">
              <section className="assets_wrap assets-height">
                <div className="assets_header">
                  <h3>{t("보유자산")}</h3>
                  <div className="price">
                    <b id="myPoint">{myPoint}</b>
                    <span>KRW</span>
                  </div>
                </div>

                <ul className="tabmenu">
                  <li
                    className={`item item01 ${
                      tabOrders01 === 0 && "on !border-primary !text-primary"
                    }`}
                    id="tabCon_01"
                    onClick={() => handleTab01(0)}
                  >
                    {t("주문")}
                  </li>
                  <li
                    className={`item item02 ${
                      tabOrders01 === 1 && "on !border-primary !text-primary"
                    }`}
                    id="tabCon_02"
                    onClick={() => handleTab01(1)}
                  >
                    {t("S/L예약주문")}
                  </li>
                  <li
                    className={`item item03 ${
                      tabOrders01 === 2 && "on !border-primary !text-primary"
                    }`}
                    id="tabCon_03"
                    onClick={() => handleTab01(2)}
                  >
                    {t("정정/취소")}
                  </li>
                </ul>

                <div className="tab_contents">
                  {tabOrders01 === 0 && (
                    <div className="tab_contents_wrap" id="tab_contents_01">
                      <ul className="sub_tabmenu">
                        <li
                          className={`item sub_item01 ${
                            tabOrders01sub === 0 && "on"
                          }`}
                          onClick={() => handleTab01sub(0)}
                          id="sub_tabCon_01"
                        >
                          {t("시장가")}
                        </li>
                        <li
                          className={`item sub_item02 ${
                            tabOrders01sub === 1 && "on"
                          }`}
                          onClick={() => handleTab01sub(1)}
                          id="sub_tabCon_02"
                        >
                          {t("지정가")}
                        </li>
                      </ul>

                      {tabOrders01sub === 0 && (
                        <div
                          className="tab_sub_contents_wrap"
                          id="subtab_contents_01"
                        >
                          <div className="content-wrap">
                            <div className="input-container">
                              <div className="input_wrap">
                                <label className="label-1">
                                  {t("주문수량")}
                                </label>
                                <div className="input_number">
                                  <input
                                    type="text"
                                    id="market-quantity"
                                    value={quantity}
                                    onChange={(e) =>
                                      setQuantity(Number(e.target.value))
                                    }
                                  />
                                  <div className="btn_change_box">
                                    <em
                                      className="minus"
                                      onClick={decrementValue}
                                    ></em>
                                    <em
                                      className="plus"
                                      onClick={incrementValue}
                                    ></em>
                                  </div>
                                </div>
                              </div>
                              <div className="input_wrap">
                                <div className="input_button">
                                  {[1, 3, 5, 10].map((value) => (
                                    <button
                                      key={value}
                                      onClick={() => setValue(value)}
                                    >
                                      {value}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="input_wrap input_2">
                                <label>{t("주문가격")}</label>
                                <div className="input_number">
                                  <input
                                    readOnly
                                    type="text"
                                    value={t("시장가")}
                                  />
                                  <div className="btn_change_box">
                                    <em className="minus"></em>
                                    <em className="plus"></em>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="btn_wrap">
                              <button
                                className="btn orange"
                                onClick={() => order("market", 2)}
                              >
                                {t("매수")}
                              </button>
                              <button
                                className="btn blue"
                                onClick={() => order("market", 1)}
                              >
                                {t("매도")}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}

                      {tabOrders01sub === 1 && (
                        <div
                          className="tab_sub_contents_wrap"
                          id="subtab_contents_02"
                        >
                          <div className="content-wrap">
                            <div className="input-container">
                              <div className="input_wrap">
                                <label>{t("주문수량")}</label>
                                <div className="input_number">
                                  <input
                                    type="text"
                                    id="limit-quantity"
                                    value={limitQuantity} // 상태로 관리
                                    onChange={(e) =>
                                      setLimitQuantity(e.target.value)
                                    } // 상태 업데이트
                                  />
                                  <div className="btn_change_box">
                                    <em
                                      className="minus"
                                      onClick={decrementValue}
                                    ></em>
                                    <em
                                      className="plus"
                                      onClick={incrementValue}
                                    ></em>
                                  </div>
                                </div>
                              </div>
                              <div className="input_wrap">
                                <div className="input_button">
                                  {[1, 3, 5, 10].map((value) => (
                                    <button
                                      key={value}
                                      onClick={() => setValue(value)}
                                    >
                                      {value}
                                    </button>
                                  ))}
                                </div>
                              </div>
                              <div className="input_wrap">
                                <label>{t("주문가격")}</label>
                                <div className="input_number">
                                  <input
                                    type="text"
                                    id="limit-price"
                                    value={limitPrice} // 상태 값으로 바인딩
                                    onChange={(e) =>
                                      setLimitPrice(e.target.value)
                                    }
                                  />
                                  <div className="btn_change_box">
                                    <em
                                      className="minus"
                                      id="limit-m"
                                      onClick={() => handlePriceChange(false)} // 마이너스 클릭
                                    ></em>
                                    <em
                                      className="plus"
                                      id="limit-p"
                                      onClick={() => handlePriceChange(true)} // 플러스 클릭
                                    ></em>
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="btn_wrap">
                              <button
                                className="btn orange"
                                onClick={() => order("limit", 2)}
                              >
                                {t("매수")}
                              </button>
                              <button
                                className="btn blue"
                                onClick={() => order("limit", 1)}
                              >
                                {t("매도")}
                              </button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {tabOrders01 === 1 && (
                    <div className="tab_contents_wrap" id="tab_contents_02">
                      <div className="content-wrap">
                        <div className="input-container">
                          <div className="input_wrap">
                            <label>{t("주문수량")}</label>
                            <input
                              className="inputHight"
                              id="stoploss-quantity"
                              type="text"
                              value={stopQuantity}
                              readOnly
                            />
                          </div>
                          <div className="input_wrap">
                            <label>{t("주문가격")}</label>
                            <input
                              className="inputHight"
                              id="slvalue"
                              type="text"
                              value={stopPrice}
                              readOnly
                            />
                          </div>
                          <div className="input_wrap">
                            <label>{t("청산조건(이익)")}</label>
                            <div className="input_number">
                              <input
                                type="text"
                                id="sl-p-val"
                                value={profitValue}
                                onChange={(e) => setProfitValue(e.target.value)}
                              />
                              <div className="btn_change_box">
                                <em
                                  className="minus"
                                  id="sl-p-m"
                                  onClick={() => handleDecrease(setProfitValue)}
                                ></em>
                                <em
                                  className="plus"
                                  id="sl-p-p"
                                  onClick={() => handleIncrease(setProfitValue)}
                                ></em>
                              </div>
                            </div>
                          </div>
                          <div className="input_wrap">
                            <label>{t("청산조건(손실)")}</label>
                            <div className="input_number">
                              <input
                                type="text"
                                id="sl-m-val"
                                value={lossValue}
                                onChange={(e) => setLossValue(e.target.value)}
                              />
                              <div className="btn_change_box">
                                <em
                                  className="minus"
                                  id="sl-m-m"
                                  onClick={() => handleDecrease(setLossValue)}
                                ></em>
                                <em
                                  className="plus"
                                  id="sl-m-p"
                                  onClick={() => handleIncrease(setLossValue)}
                                ></em>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="btn_wrap">
                          <button
                            className="btn blue_border reset"
                            onClick={() => cancelStopOrder(stopOrderCd)}
                          >
                            {t("S/L취소")}
                          </button>
                          <button
                            className="btn blue"
                            onClick={() => openSLModal("execute")}
                          >
                            {t("S/L집행")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}

                  {tabOrders01 === 2 && (
                    <div className="tab_contents_wrap" id="tab_contents_03">
                      <div className="content-wrap">
                        <div className="input-container">
                          <div className="input_wrap">
                            <label>{t("주문번호")}</label>
                            <div className="input_btn">
                              <input
                                id="orderNumber"
                                className="inputHight"
                                type="text"
                                value={executeOrder?.order_cd || ""}
                                readOnly
                              />
                              <button
                                className="btn noSave"
                                onClick={() => openRunWaitingModal()}
                              >
                                {t("미체결")}
                              </button>
                            </div>
                          </div>
                          <div className="input_wrap">
                            <label>{t("주문수량")}</label>
                            <input
                              id="modifycancel-quantity"
                              className="inputHight"
                              type="text"
                              value={executeOrder?.order_cnt || ""}
                              readOnly
                            />
                            <input
                              id="modifycancel-gubun"
                              className="inputHight"
                              value={executeOrder?.order_cd || ""}
                              type="hidden"
                              readOnly
                            />
                          </div>
                          <div className="input_wrap">
                            <label>{t("주문가격")}</label>
                            <div className="input_number">
                              <input
                                id="orderPrice"
                                type="text"
                                value={executeOrder?.order_sise || ""}
                              />
                              <div className="btn_change_box">
                                <em
                                  className="minus"
                                  id="modi-m"
                                  onClick={() => handleOrderPriceChange(false)}
                                ></em>
                                <em
                                  className="plus"
                                  id="modi-p"
                                  onClick={() => handleOrderPriceChange(true)}
                                ></em>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="btn_wrap">
                          <button
                            onClick={() => cancelOrder(executeOrder.order_cd)}
                            className="btn skyblue_border reset"
                          >
                            {t("취소주문")}
                          </button>
                          <button
                            onClick={() =>
                              modifyOrder({
                                orderCd: executeOrder.order_cd,
                                stockCode: stockCode,
                                price: executeOrder.order_sise,
                                quantity: executeOrder.order_cnt,
                                gbn: executeOrder.gubun,
                                orderIp: "127.0.0.1",
                              })
                            }
                            className="btn skyblue save"
                          >
                            {t("정정주문")}
                          </button>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              <section className="assets_wrap2">
                <div className="info-wrap">
                  <p className="info-title">{t("자산현황")}</p>
                  <div className="table-wrap">
                    <table>
                      <tbody>
                        <tr>
                          <th className="bg-none">{t("평가 예탁금")}</th>
                        </tr>
                        <tr>
                          <td id="evalDepo"></td>
                        </tr>
                        <tr>
                          <th className="bg-none">{t("총 평가손익")}</th>
                        </tr>
                        <tr>
                          <td id="gainLoss"></td>
                        </tr>
                        <tr>
                          <th className="bg-none">{t("현종목 평가손익")}</th>
                        </tr>
                        <tr>
                          <td id="crntValuePaL"></td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </section>
            </div>
          </div>

          {/* <!--하단 리스트  --> */}
          <div className="flex_row m-0">
            <section className="trading_table main_st">
              {/*<CommonList/>*/}
              <CommonList
                orderList={orderList}
                setOrderList={setOrderList}
                stockDataMap={stockDataMap}
                stockList={stockList}
                stockCode={stockCode}
                fetchMyPoint={fetchMyPoint}
                exposeFetchData={(fetchFunction) =>
                  (fetchDataFromApiRef.current = fetchFunction)
                }
              />
            </section>
          </div>
        </div>
      </main>
      <div className="table_wrap" style={{ display: "none" }}>
        <table>
          <thead>
            <tr id="stCgDataHd"></tr>
          </thead>
          <tbody>
            <tr id="stCgData" style={{ textAlign: "center" }}></tr>
          </tbody>
        </table>
      </div>

      {/* 토스트 팝업 */}
      <ToastModal message={message} isVisible={isVisible} />

      {/* S/L 컨펌 팝업 */}
      <StopLoseModal
        isOpen={SLModalOpen}
        onClose={closeSLModal}
        onConfirm={executeStopLossOrder}
      />

      {/* 미체결 조회 팝업 */}
      <RunListModal
        isOpen={runWaitModalOpen}
        onClose={closeRunWaitingModal}
        stockCodeModal={stockCode}
        onConfirm={handleConfirm}
      />
    </>
  );
}
