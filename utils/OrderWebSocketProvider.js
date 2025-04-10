import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import userStore from "../store/user";
import apiRequest, { getUserPnt } from "../utils/api";
import useCommonStore from "../store/useCommon";
import useToast from "../hooks/toast";
import ToastModal from "@components/toastModal";
import { useQuery } from "@tanstack/react-query";

const OrderWebSocketContext = createContext();

export const OrderWebSocketProvider = ({ children }) => {
  const { userInfo } = userStore();
  const odrSocket = useRef(null);
  const [odrMessages, setOdrMessages] = useState([]);

  const triggerFetch = useCommonStore((state) => state.triggerFetch);
  const { fetchMyPoint } = useCommonStore();
  const { isVisible, message, showToast } = useToast(); // 토스트
  const reconnectInterval = useRef(null); // 재연결 타이머

  const { data: settings } = useQuery({
    queryKey: ["settings"],
    queryFn: () =>
      apiRequest("/user/settings", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      }),
  });

  const connectWebSocket = () => {
    const userId = userInfo?.userid || "unknown";
    const odrWsUrl = `${process.env.NEXT_PUBLIC_ORDER_SOCKET_URL}/api/v1/ws/order?clientId=${userId}`;
    //const odrWsUrl = `ws://127.0.0.1/api/v1/ws/order?clientId=${userId}`;

    odrSocket.current = new WebSocket(odrWsUrl);

    odrSocket.current.onopen = () => {
      console.log("Order WebSocket 연결 성공");
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current); // 재연결 타이머 중지
        reconnectInterval.current = null;
      }
    };

    odrSocket.current.onmessage = (event) => {
      const odrDataRs = JSON.parse(event.data);
      setOdrMessages((prev) => [...prev, odrDataRs]);

      if (odrDataRs.status === "completed") {
        if (odrDataRs.gbn) {
          switch (odrDataRs.gbn) {
            case "marketOrder":
              // (시장가 매수 && setting 매수 주문 체결시 알림 ON ) || (시장가 매도, setting 매수 주문 체결시 알림 ON)
              if (
                (odrDataRs.buySell === "2" && settings?.orderFilledBuy) ||
                (odrDataRs.buySell === "1" && settings?.orderFilledSell)
              ) {
                showToast(
                  `종목 - ${odrDataRs.stockName}\n주문이 체결되었습니다.\n${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
                );
              }
              break;
            case "limit":
              // (지정가 매수, setting 매수주문 확인 알림 ON) || (지정가 매도, setting 매수주문 확인 알림 ON)
              if (
                (odrDataRs.buySell === "2" && settings?.orderConfirmBuy) ||
                (odrDataRs.buySell === "1" && settings?.orderConfirmSell)
              ) {
                showToast(
                  `종목 - ${odrDataRs.stockName}\n 지정가 주문이 접수되었습니다.\n지정가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
                );
              }
              break;
            case "modify":
              // (정정, setting 정정 주문 알림 ON)
              if (odrDataRs.buySell === "2" && settings?.orderConfirmModify) {
                showToast(
                  `종목 - ${odrDataRs.stockName}\n 지정가 주문이 접수되었습니다.\n지정가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
                );
              }
              break;
            // 스탑로스
            case "stl_execute":
              showToast(
                `종목 - ${odrDataRs.stockName}\n 스탑로스 주문이 접수되었습니다.\n평단가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
              );
              break;
            case "stl":
              showToast(
                `종목 - ${odrDataRs.stockName}\n 스탑로스 주문이 집행되었습니다.\n평단가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
              );
              break;
            case "stl_cancel":
              showToast(
                `종목 - ${odrDataRs.stockName}\n 스탑로스 주문이 취소되었습니다.\n평단가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
              );
              break;
            // 청산
            case "clearing":
              showToast(
                `종목 - ${odrDataRs.stockName}\n주문이 청산되었습니다.\n시장가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
              );
              break;
            case "completed":
              console.log(
                `종목 - ${odrDataRs.stockName} 주문이 체결되었습니다`
              );
              break;
            case "losscut":
              showToast(
                `종목 - ${odrDataRs.stockName}\n주문이 로스컷 청산되었습니다.\ - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
              );
              break;
            default:
              console.log("알 수 없는 gbn 값:", odrDataRs.gbn);
          }
        }
      } else if (odrDataRs.status === "added") {
        if (
          (odrDataRs.buySell === "2" && settings?.orderFilledBuy) ||
          (odrDataRs.buySell === "1" && settings?.orderFilledSell)
        ) {
          showToast(
            `종목 - ${odrDataRs.stockName}\n주문이 체결되었습니다.\n${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`
          );
        }
      } else if (odrDataRs.status === "invalid") {
        // if (odrDataRs.gbn) {
        //   switch (odrDataRs.gbn) {
        //   }
        // }
      }

      triggerFetch();
      fetchMyPoint();
    };

    odrSocket.current.onclose = () => {
      console.log("Order WebSocket 연결 종료, 재연결 시도 중...");
      if (!reconnectInterval.current) {
        reconnectInterval.current = setInterval(connectWebSocket, 5000); // 5초 간격으로 재연결 시도
      }
    };

    odrSocket.current.onerror = (error) => {
      console.error("Order WebSocket 에러:", error);
      odrSocket.current.close(); // 에러 발생 시 WebSocket 닫기
    };
  };

  useEffect(() => {
    if (!settings || !userInfo) {
      return;
    }
    connectWebSocket();

    return () => {
      if (odrSocket.current) odrSocket.current.close();
      if (reconnectInterval.current) {
        clearInterval(reconnectInterval.current);
      }
    };
  }, [userInfo, settings]);

  return (
    <OrderWebSocketContext.Provider value={{ odrMessages }}>
      {children}
      <ToastModal message={message} isVisible={isVisible} />
    </OrderWebSocketContext.Provider>
  );
};

export const useOrderWebSocket = () => useContext(OrderWebSocketContext);
