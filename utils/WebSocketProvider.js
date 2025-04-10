/*
import React, {createContext, useContext, useEffect, useRef, useState} from 'react';
import userStore from "../store/user";
import apiRequest from "./api";
import useToast from "../hooks/toast"; // userStore 경로 수정
import ToastModal from '@components/toastModal';
// Context 생성
const WebSocketContext = createContext();

// WebSocket Provider
export const WebSocketProvider = ({children}) => {


const { isVisible, message, showToast } = useToast()//토스트
    const odrSocket = useRef(null); // 주문 WebSocket
    const allStockSocket = useRef(null); // 전체 종목 WebSocket
    const {userInfo} = userStore(); // Zustand의 userStore에서 상태 가져오기
    const [stockDataMap, setStockDataMap] = useState({}); // useState로 변경
    useEffect(() => {
        const initializeWebSockets = async () => {
            const userId = userInfo?.userid || "unknown";

            // 주문 WebSocket 설정
            const odrWsUrl = `ws://45.12.134.175/api/v1/ws/order?clientId=${userId}`;
            odrSocket.current = new WebSocket(odrWsUrl);

            odrSocket.current.onopen = () => {
                console.log("odrWebSocket 연결 성공");
            };

            odrSocket.current.onmessage = (event) => {
                const odrDataRs = JSON.parse(event.data);

                setOdrMessages((prev) => [...prev, odrDataRs]);

               if (odrDataRs.status === "completed") {
                    if (odrDataRs.gbn) {
                        switch (odrDataRs.gbn) {
                            case 'marketOrder':
                                showToast(`종목 - ${odrDataRs.stockName}\n 시장가 주문이 체결되었습니다.\n시장가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`);
                                break;
                            case 'limit':
                                showToast(`종목 - ${odrDataRs.stockName}\n 지정가 주문이 접수되었습니다.\n지정가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`);
                                break;
                            case 'stl':
                                showToast(`종목 - ${odrDataRs.stockName}\n 스탑로스 주문이 체결되었습니다.\n평단가 - ${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`);
                                break;
                            case 'losscut':
                                showToast(`로스컷 청산`);
                                break;
                            case 'clearing':
                                showToast(`종목 - ${odrDataRs.stockName}\n주문이 청산되었습니다.\n시장가 - 19447.0 수량 - 1`);
                                break;
                            case 'completed':
                                console.log(`종목 - ${odrDataRs.stockName} 주문이 체결되었습니다`);
                                break;
                            default:
                                console.log("알 수 없는 gbn 값:", odrDataRs.gbn);
                        }
                    }
                } else if (odrDataRs.status === "processed") {
                    console.log(odrDataRs);

                } else if (odrDataRs.status === "added") {
                    showToast(`종목 - ${odrDataRs.stockName}\n주문이 체결되었습니다.\n${odrDataRs.currentPrice} 수량 - ${odrDataRs.quantity}`);
                    console.log(odrDataRs);
                } else {
                    //console.log('주문 실패');
                }
            };

            odrSocket.current.onclose = () => {
                console.log("odrWebSocket 연결 종료");
            };

            odrSocket.current.onerror = (error) => {
                console.error("odrWebSocket 에러:", error);
            };


            // 전체 종목 데이터 가져오기
            const response = await apiRequest("/user/stocklist", {method: "GET"});

            // Ebest 데이터 WebSocket 연결
            ebestDataSocket(response);
        };

        initializeWebSockets();

        // 컴포넌트 언마운트 시 모든 WebSocket 닫기
        return () => {
            if (odrSocket.current) odrSocket.current.close();
            if (allStockSocket.current) allStockSocket.current.close();
        };
    }, [userInfo]);

    //전체종목 소켓데이터 가져오기 (이베스트)
    const ebestDataSocket = async (response) => {
        // API 요청으로 WebSocket URL 가져오기
        const ebestTkn = await apiRequest("/user/ebest/tkn", {method: "POST"});
        const wsUrl = `wss://${ebestTkn.url}9443/websocket`;

        // WebSocket 초기화
        allStockSocket.current = new WebSocket(wsUrl);

        allStockSocket.current.onopen = () => {
            console.log("allStockSocket 연결 성공");
            // 체결가 및 호가 요청
            response.forEach((stock) => {
                const tr_key = stock.stCode.padEnd(8, " ");
                const messages = [
                    {
                        header: {token: ebestTkn.accessToken, tr_type: "3"},
                        body: {tr_cd: stock.stTrchcd, tr_key},
                    },
                    {
                        header: {token: ebestTkn.accessToken, tr_type: "3"},
                        body: {tr_cd: stock.stTrhgcd, tr_key},
                    },
                ];

                messages.forEach((message) => {
                    if (allStockSocket.current.readyState === WebSocket.OPEN) {
                        allStockSocket.current.send(JSON.stringify(message));
                    }
                });
            });
        };

        allStockSocket.current.onmessage = (event) => {

            try {
                const data = JSON.parse(event.data);
                const stockCode = String(data.header.tr_key || "").trim();
                const body = data.body;

                if (!body || !stockCode) return;

                setStockDataMap((prev) => {
                    const updatedMap = {...prev};

                    if (!updatedMap[stockCode]) {
                        updatedMap[stockCode] = {cg: null, hg: {}};
                    }

                    const trCd = data.header.tr_cd;

                    // 체결가,기호와 대비 데이터 처리
                    if (["OVC", "FC0"].includes(trCd)) {
                        updatedMap[stockCode].cg = body.curpr || body.price || 0;
                        updatedMap[stockCode].ydpr = body.change || body.ydiffpr || 0;
                        updatedMap[stockCode].rate = body.drate || body.chgrate || 0;
                        updatedMap[stockCode].signval = body.sign || body.ydiffSign || 0;
                    }

                    // 호가 데이터 처리
                    if (["FH0", "OVH"].includes(trCd)) {
                        const hg = updatedMap[stockCode].hg;
                        for (let i = 1; i <= 5; i++) {
                            hg[`offerrem${i}`] = body[`offerrem${i}`] || null;
                            hg[`offerno${i}`] = body[`offerno${i}`] || body[`offercnt${i}`] || null;
                            hg[`offerho${i}`] = body[`offerho${i}`] || null;
                            hg[`bidrem${i}`] = body[`bidrem${i}`] || null;
                            hg[`bidno${i}`] = body[`bidno${i}`] || body[`bidcnt${i}`] || null;
                            hg[`bidho${i}`] = body[`bidho${i}`] || null;
                        }

                        const result = response.find(item => item.stCode === stockCode);
                        const diff = 1 / result.st_tsize;
                        const fix =diff.toString().split('.')[1]?.length || 1;

                        // 누락된 호가 계산 및 추가
                        if (hg.offerho4 && hg.offerho5) {
                            hg.offerho6 = parseFloat((parseFloat(hg.offerho5) + diff)).toFixed(fix);
                            hg.offerho7 = parseFloat((parseFloat(hg.offerho6) + diff)).toFixed(fix);
                        }

                        if (hg.bidho4 && hg.bidho5) {
                            hg.bidho6 = parseFloat((parseFloat(hg.bidho5) - diff)).toFixed(fix);
                            hg.bidho7 = parseFloat((parseFloat(hg.bidho6) - diff)).toFixed(fix);
                        }
                    }

                    return updatedMap;
                });
            } catch (error) {
                console.error("WebSocket 메시지 처리 에러:", error);
            }


            //console.log(stockDataMap);

        };


        allStockSocket.current.onclose = () => {
            console.log("allStockSocket 연결 종료");
        };

        allStockSocket.current.onerror = (error) => {
            console.error("WebSocket 에러:", error);
        };
    };

    return (
        <WebSocketContext.Provider value={{odrSocket, allStockSocket, stockDataMap}}>
            {children}
            <ToastModal message={message} isVisible={isVisible} />
        </WebSocketContext.Provider>


    );
};

export const useWebSocket = () => useContext(WebSocketContext);
*/

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import apiRequest from "./api";
import useToast from "../hooks/toast";
import ToastModal from "@components/toastModal";

const WebSocketContext = createContext();

export const WebSocketProvider = ({ children }) => {
  const { isVisible, message } = useToast(); // Toast 상태
  const allStockSocket = useRef(null); // WebSocket 연결 참조
  const [stockDataMap, setStockDataMap] = useState({}); // 종목 데이터 저장

  useEffect(() => {
    const initializeWebSocket = async () => {
      try {
        const stockListResponse = await apiRequest("/user/stocklist", {
          method: "GET",
        });
        await setupAllStockSocket(stockListResponse);
      } catch (error) {
        console.error("WebSocket 초기화 실패:", error);
      }
    };

    initializeWebSocket();

    // 컴포넌트 언마운트 시 WebSocket 종료
    return () => {
      closeWebSocket(allStockSocket);
    };
  }, []);

  // 전체 종목 WebSocket 설정
  const setupAllStockSocket = async (stockList) => {
    const ebestToken = await apiRequest("/user/ebest/tkn", { method: "POST" });
    const wsUrl = `${process.env.NEXT_PUBLIC_CG_SOCKET_URL}/ws/cg`;

    // WebSocket 초기화
    allStockSocket.current = new WebSocket(wsUrl);

    allStockSocket.current.onopen = () => {
      console.log("종목 데이터 WebSocket 연결 성공");
      requestStockData(stockList, ebestToken);
    };

    allStockSocket.current.onmessage = (event) =>
      handleStockMessage(event, stockList);

    allStockSocket.current.onclose = () => {
      console.log("종목 데이터 WebSocket 연결 종료");
    };

    allStockSocket.current.onerror = (error) => {
      console.error("종목 데이터 WebSocket 에러:", error);
    };
  };

  // 종목 데이터 요청
  const requestStockData = (stockList, ebestToken) => {
    stockList.forEach((stock) => {
      const trKey = stock.stCode.padEnd(8, " ");
      const messages = [
        {
          header: { token: ebestToken.accessToken, tr_type: "3" },
          body: { tr_cd: stock.stTrchcd, tr_key: trKey },
        },
        {
          header: { token: ebestToken.accessToken, tr_type: "3" },
          body: { tr_cd: stock.stTrhgcd, tr_key: trKey },
        },
      ];

      messages.forEach((message) => {
        if (allStockSocket.current.readyState === WebSocket.OPEN) {
          allStockSocket.current.send(JSON.stringify(message));
        }
      });
    });
  };

  // WebSocket 메시지 처리
  const handleStockMessage = (event, stockList) => {
    try {
      const data = JSON.parse(event.data);
      const stockCode = String(data.header.tr_key || "").trim();
      const body = data.body;

      if (!body || !stockCode) return;

      setStockDataMap((prev) => {
        const updatedMap = { ...prev };

        if (!updatedMap[stockCode]) {
          updatedMap[stockCode] = { cg: null, hg: {} };
        }

        const trCd = data.header.tr_cd;

        // 체결가 및 대비 데이터 처리
        if (["OVC", "FC0"].includes(trCd)) {
          updatedMap[stockCode].cg = body.curpr || body.price || 0;
          updatedMap[stockCode].ydpr = body.change || body.ydiffpr || 0;
          updatedMap[stockCode].rate = body.drate || body.chgrate || 0;
          updatedMap[stockCode].signval = body.sign || body.ydiffSign || 0;
        }

        // 호가 데이터 처리
        if (["FH0", "OVH"].includes(trCd)) {
          const hg = updatedMap[stockCode].hg;
          for (let i = 1; i <= 5; i++) {
            hg[`offerrem${i}`] = body[`offerrem${i}`] || null;
            hg[`offerno${i}`] =
              body[`offerno${i}`] || body[`offercnt${i}`] || null;
            hg[`offerho${i}`] = body[`offerho${i}`] || null;
            hg[`bidrem${i}`] = body[`bidrem${i}`] || null;
            hg[`bidno${i}`] = body[`bidno${i}`] || body[`bidcnt${i}`] || null;
            hg[`bidho${i}`] = body[`bidho${i}`] || null;
          }

          const result = stockList.find((item) => item.stCode === stockCode);
          const diff = 1 / result.st_tsize;
          const fix = diff.toString().split(".")[1]?.length || 1;

          // 누락된 호가 계산 및 추가
          if (hg.offerho4 && hg.offerho5) {
            hg.offerho6 = parseFloat(parseFloat(hg.offerho5) + diff).toFixed(
              fix
            );
            hg.offerho7 = parseFloat(parseFloat(hg.offerho6) + diff).toFixed(
              fix
            );
          }

          if (hg.bidho4 && hg.bidho5) {
            hg.bidho6 = parseFloat(parseFloat(hg.bidho5) - diff).toFixed(fix);
            hg.bidho7 = parseFloat(parseFloat(hg.bidho6) - diff).toFixed(fix);
          }
        }

        return updatedMap;
      });
    } catch (error) {
      console.error("WebSocket 메시지 처리 에러:", error);
    }
  };

  // WebSocket 종료
  const closeWebSocket = (socketRef) => {
    if (socketRef.current) {
      socketRef.current.close();
    }
  };

  return (
    <WebSocketContext.Provider value={{ stockDataMap }}>
      {children}
      <ToastModal message={message} isVisible={isVisible} />
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => useContext(WebSocketContext);
