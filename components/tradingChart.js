import { useEffect, useRef, useState } from "react";
import useWebSocket from "react-use-websocket";
import { useQuery } from "@tanstack/react-query";

import apiRequest from "../utils/api";
import { configurationData, options } from "../constants/tradingChart";
import themeStore from "store/theme";
import { useTranslation } from "react-i18next";

export default function TradingChart({ stockList, stock }) {
  const { theme } = themeStore();
  const { i18n } = useTranslation();
  const [siteName, mode] = theme.split("-");

  const lastBarsCache = useRef(new Map());
  const channelToSubscription = useRef(new Map());

  const chartRef = useRef(null);

  // ebestTkn 조회
  const { data: ebestTkn } = useQuery({
    queryKey: ["ebestTkn"],
    queryFn: () =>
      apiRequest("/user/ebest/tkn", {
        method: "POST",
      }),
  });

  // ebest API 소켓연결
  const { sendMessage, lastMessage, readyState, getWebSocket } = useWebSocket(
    `${process.env.NEXT_PUBLIC_CG_SOCKET_URL}/ws/cg`
  );

  function getNextDailyBarTime(barTime) {
    const date = new Date(barTime * 1000);
    date.setDate(date.getDate() + 1);
    return date.getTime() / 1000;
  }

  useEffect(() => {
    if (!lastMessage) {
      return;
    }
    // 현재 시간을 밀리초 단위로 가져옵니다.
    const currentTimestampMillis = Date.now();

    /*const currentTimestampMillis = Date.now();
        const KST_OFFSET = 9 * 3600 * 1000; // 9시간을 밀리초로 변환
        const currentTimestampKSTMillis = currentTimestampMillis + KST_OFFSET;*/

    const receivedData = JSON.parse(lastMessage.data);

    let exchange = "";
    let fromSymbol = "";
    let toSymbol = "";
    if (receivedData.body) {
      exchange = receivedData.header.tr_key.trim();
      fromSymbol = receivedData.header.tr_cd;
      toSymbol = receivedData.header.tr_key.trim();
    }

    const channelString = `0~${exchange}~${fromSymbol}~${toSymbol}`;
    const subscriptionItem = channelToSubscription.current.get(channelString);
    if (subscriptionItem === undefined) {
      return;
    }

    let lastDailyBar = subscriptionItem.lastDailyBar;
    const nextDailyBarTime = getNextDailyBarTime(lastDailyBar.time);

    // 필요한 경우 시간 데이터 추출
    let kordate, kortm;

    if (receivedData.body.futcode) {
      const today = new Date();
      kordate = `${today.getFullYear()}${String(today.getMonth() + 1).padStart(
        2,
        "0"
      )}${String(today.getDate()).padStart(2, "0")}`;
      kortm = receivedData.body.chetime; // 예: "141640"
    } else {
      kordate = receivedData.body.kordate; // 예: "20230622"
      kortm = receivedData.body.kortm; // 예: "141640"
    }

    // 초를 버리고 분 단위까지만 유지
    const kortmMinutes = kortm.substring(0, 4); // "141640" -> "1416"

    // 날짜와 시간 문자열을 올바른 형식으로 변환
    const formattedDate = `${kordate.substring(0, 4)}-${kordate.substring(
      4,
      6
    )}-${kordate.substring(6, 8)}`;
    const formattedTime = `${kortmMinutes.substring(
      0,
      2
    )}:${kortmMinutes.substring(2, 4)}`;

    // 타임스탬프 생성 (한국 시간 기준)
    const timestampString = `${formattedDate}T${formattedTime}:00`; // 예: "2023-06-22T14:16:00"
    const dateObj = new Date(timestampString);
    const dataTimestampMillis = dateObj.getTime(); // 타임스탬프를 밀리초 단위로 변환

    let bar;
    if (receivedData.body != null) {
      if (receivedData.body.hasOwnProperty("futcode")) {
        bar = {
          time: currentTimestampMillis, // 현재 타임스탬프를 사용
          open: parseFloat(receivedData.body.price),
          high: parseFloat(receivedData.body.price),
          low: parseFloat(receivedData.body.price),
          close: parseFloat(receivedData.body.price),
          volume: parseFloat(receivedData.body.cvolume),
        };
      } else {
        bar = {
          time: currentTimestampMillis, // 현재 타임스탬프를 사용
          open: parseFloat(receivedData.body.curpr),
          high: parseFloat(receivedData.body.curpr),
          low: parseFloat(receivedData.body.curpr),
          close: parseFloat(receivedData.body.curpr),
          volume: parseFloat(receivedData.body.trdq),
        };
      }
    }

    // 마지막 바가 있는 경우, 이전 바와 현재 바의 시간을 비교하여 순서가 맞는지 확인합니다.
    if (lastDailyBar && bar.time <= lastDailyBar.time) {
      //console.error('Time order violation');
      return;
    }

    subscriptionItem.lastDailyBar = bar;
    subscriptionItem.handlers.forEach((handler) => handler.callback(bar));
  }, [lastMessage]);

  useEffect(() => {
    // ebest 데이터 요청
    if (!ebestTkn || stockList.length === 0 || readyState !== 1) {
      return;
    }
    const { accessToken } = ebestTkn;

    stockList.forEach((stock) => {
      let tr_key =
        stock.stCode.length !== 8 ? stock.stCode.padEnd(8, " ") : stock.stCode;

      const message = {
        header: {
          token: accessToken,
          tr_type: "3",
        },
        body: {
          tr_cd: stock.stTrchcd,
          tr_key,
        },
      };

      sendMessage(JSON.stringify(message));
    });
  }, [ebestTkn, stockList, readyState]);

  const symbols = stockList.map((stock) => ({
    symbol: stock.stCode,
    full_name: stock.stCode,
    description: stock.stName,
    exchange: stock.stTrchcd,
    tsize: stock.st_tsize,
    sttime: stock.st_sttime,
    entime: stock.st_endtime,
    type: "futures",
  }));

  function getDecimalPlaces(num) {
    const numStr = num.toString();
    const decimalIndex = numStr.indexOf(".");
    return decimalIndex === -1 ? 0 : numStr.length - decimalIndex - 1;
  }

  function onReadyCallback(callback) {
    setTimeout(() => callback(configurationData));
  }

  async function searchSymbolsCallback(
    userInput,
    exchange,
    symbolType,
    onResultReadyCallback
  ) {
    const newSymbols = symbols.filter((symbol) => {
      const isExchangeValid = exchange === "" || symbol.exchange === exchange;
      const isFullSymbolContainsInput =
        symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
      return isExchangeValid && isFullSymbolContainsInput;
    });
    onResultReadyCallback(newSymbols);
  }

  async function resolveSymbolCallback(
    symbolName,
    onSymbolResolvedCallback,
    onResolveErrorCallback
  ) {
    const symbolItem = symbols.find(
      ({ full_name }) => full_name === symbolName
    );
    if (!symbolItem) {
      onResolveErrorCallback("cannot resolve symbol");
      return;
    }

    let scale = 1 / symbolItem.tsize;
    let volume = getDecimalPlaces(scale);
    let prcscale = Math.pow(10, volume);

    let sttime = symbolItem.sttime.replace(/:/g, "").replace(/00$/, "");
    let entime = symbolItem.entime.replace(/:/g, "").replace(/00$/, "");
    if (!symbolItem.symbol.includes("101")) {
      // "101"이 포함되지 않은 경우, `sttime`에 `F`를 추가
      sttime = sttime + "F";
    }
    let ssin = sttime + "-" + entime;

    const symbolInfo = {
      ticker: symbolItem.full_name,
      name: symbolItem.symbol,
      description: symbolItem.description,
      type: symbolItem.type,
      session: "24x7",
      timezone: "Asia/Seoul",
      exchange: symbolItem.exchange,
      minmov: 1,
      pricescale: prcscale,
      has_intraday: true,
      has_no_volume: true,
      has_weekly_and_monthly: false,
      supported_resolutions: configurationData.supported_resolutions,
      intraday_multipliers: configurationData.intraday_multipliers,
      volume_precision: volume,
      data_status: "streaming",
      has_empty_bars: false,
    };
    onSymbolResolvedCallback(symbolInfo);
  }

  async function getBarsCallback(
    symbolInfo,
    resolution,
    periodParams,
    onHistoryCallback,
    onErrorCallback
  ) {
    const { from, to, firstDataRequest, countBack } = periodParams;
    console.log(
      "[getBars]: Method call",
      symbolInfo,
      resolution,
      from,
      to,
      countBack
    );
    let bars = [];

    // resolution에 따라 from 값 조정
    let adjustedFrom = from; // 기본적으로는 주어진 from 값을 사용합니다.

    // 주어진 인터벌에 따라 from 값을 조정
    switch (resolution) {
      case "1":
        // 1분 데이터 요청 시, 최근 6시간 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 6 * 60 * 60); // 6시간 전
        break;
      case "3":
        // 3분 데이터 요청 시, 최근 12시간 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 12 * 60 * 60); // 12시간 전
        break;
      case "5":
        // 5분 데이터 요청 시, 최근 24시간 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 24 * 60 * 60); // 24시간 전
        break;
      case "15":
        // 15분 데이터 요청 시, 최근 3일 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 3 * 24 * 60 * 60); // 3일 전
        break;
      case "30":
        // 30분 데이터 요청 시, 최근 7일 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 7 * 24 * 60 * 60); // 7일 전
        break;
      case "60":
        // 1시간 데이터 요청 시, 최근 15일 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 15 * 24 * 60 * 60); // 15일 전
        break;
      case "240":
        // 4시간 데이터 요청 시, 최근 3개월 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 3 * 30 * 24 * 60 * 60); // 3개월 전
        break;
      case "1D":
        // 하루치 데이터를 가져오려면, 적어도 6개월 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 6 * 30 * 24 * 60 * 60); // 6개월 전
        break;
      case "1W":
        // 주간 데이터를 가져오려면, 적어도 3년 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 3 * 365 * 24 * 60 * 60); // 3년 전
        break;
      case "1M":
        // 월간 데이터를 가져오려면, 적어도 10년 전의 데이터를 가져옵니다.
        adjustedFrom = Math.max(0, from - 10 * 365 * 24 * 60 * 60); // 10년 전
        break;
      default:
        console.error("Unknown resolution:", resolution);
        break;
    }

    try {
      let sym = symbolInfo.name.substring(0, 2);

      const bardata = await fetch(
        `${process.env.NEXT_PUBLIC_HISTORY_API_URL}?name=${sym}&from=${adjustedFrom}&to=${to}&limit=${countBack}&interval=${resolution}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      ).then((res) => res.json());

      bardata.reverse();

      if (Array.isArray(bardata)) {
        bardata.forEach((data) => {
          //if (data.timestamp >= from && data.timestamp < to) {
          bars.push({
            time: data.timestamp * 1000,
            low: data.low,
            high: data.high,
            open: data.open,
            close: data.curpr,
            volume: parseFloat(data.mdvolume),
          });
          //}
        });
      }

      if (firstDataRequest) {
        lastBarsCache.current.set(
          symbolInfo.name + ":" + symbolInfo.full_name,
          {
            ...bars[bars.length - 1],
          }
        );
      }

      console.log(`[getBars]: returned ${bars.length} bar(s)`);
      onHistoryCallback(bars, { noData: false });
    } catch (error) {
      console.log("[getBars]: Get error", error);
      onErrorCallback(error);
    }
  }

  function subscribeOnStream(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback,
    lastDailyBar
  ) {
    const jongmok = symbolInfo.full_name.split(":")[1];
    let exc = symbolInfo.full_name.split(":")[0];
    const channelString = `0~${jongmok}~${exc}~${jongmok}`;
    const handler = {
      id: subscriberUID,
      callback: onRealtimeCallback,
    };
    let subscriptionItem = channelToSubscription.current.get(channelString);
    if (subscriptionItem) {
      subscriptionItem.handlers.push(handler);
      return;
    }
    subscriptionItem = {
      subscriberUID,
      resolution,
      lastDailyBar,
      handlers: [handler],
    };
    channelToSubscription.current.set(channelString, subscriptionItem);
    console.log(
      "[subscribeBars]: Subscribe to streaming. Channel:",
      channelString
    );
  }

  function subscribeBarsCallback(
    symbolInfo,
    resolution,
    onRealtimeCallback,
    subscriberUID,
    onResetCacheNeededCallback
  ) {
    let dd = symbolInfo.full_name.split(":")[1];
    subscribeOnStream(
      symbolInfo,
      resolution,
      onRealtimeCallback,
      subscriberUID,
      onResetCacheNeededCallback,
      lastBarsCache.current.get(dd + ":" + symbolInfo.full_name)
    );
  }

  function unsubscribeFromStream(subscriberUID) {
    for (const channelString of channelToSubscription.current.keys()) {
      const subscriptionItem = channelToSubscription.current.get(channelString);
      const handlerIndex = subscriptionItem.handlers.findIndex(
        (handler) => handler.id === subscriberUID
      );

      if (handlerIndex !== -1) {
        subscriptionItem.handlers.splice(handlerIndex, 1);
        if (subscriptionItem.handlers.length === 0) {
          console.log(
            "[unsubscribeBars]: Unsubscribe from streaming. Channel:",
            channelString
          );
          channelToSubscription.current.delete(channelString);
          break;
        }
      }
    }
  }

  function unsubscribeBarsCallback(subscriberUID) {
    unsubscribeFromStream(subscriberUID);
  }

  useEffect(() => {
    if (!chartRef.current || !mode) {
      return;
    }

    chartRef.current.onChartReady(() => {
      chartRef.current?.changeTheme(mode).then(() => {
        chartRef.current?.chart().applyOverrides({
          "mainSeriesProperties.candleStyle.upColor": "#f44a57",
          "mainSeriesProperties.candleStyle.downColor": "#4f7ded",
          "mainSeriesProperties.candleStyle.borderUpColor": "#f44a57",
          "mainSeriesProperties.candleStyle.borderDownColor": "#4f7ded",
          "mainSeriesProperties.candleStyle.wickUpColor": "#f44a57",
          "mainSeriesProperties.candleStyle.wickDownColor": "#4f7ded",
        });
      });
    });
  }, [mode, chartRef.current]);

  useEffect(() => {
    if (chartRef.current || stock.length === 0) {
      return;
    }

    const loadWidget = async () => {
      const TradingView = await import(
        "../public/tv/charting_library/charting_library.esm.js"
      );

      window.trch = chartRef.current = new TradingView.widget({
        symbol: stock.stCode,
        datafeed: {
          onReady: onReadyCallback,
          searchSymbols: searchSymbolsCallback,
          resolveSymbol: resolveSymbolCallback,
          getBars: getBarsCallback,
          subscribeBars: subscribeBarsCallback,
          unsubscribeBars: unsubscribeBarsCallback,
        },
        container: "tradingview_chart",
        library_path: "tv/charting_library/",
        theme: mode,
        locale: i18n.language,
        ...options,
      });

      chartRef.current.onChartReady(() => {
        chartRef.current.chart().createStudy("Volume", false, false);
        chartRef.current?.chart().applyOverrides({
          "mainSeriesProperties.candleStyle.upColor": "#f44a57",
          "mainSeriesProperties.candleStyle.downColor": "#4f7ded",
          "mainSeriesProperties.candleStyle.borderUpColor": "#f44a57",
          "mainSeriesProperties.candleStyle.borderDownColor": "#4f7ded",
          "mainSeriesProperties.candleStyle.wickUpColor": "#f44a57",
          "mainSeriesProperties.candleStyle.wickDownColor": "#4f7ded",
        });
      });
    };

    loadWidget();

    return () => {
      if (chartRef.current != null) {
        chartRef.current.remove();
        chartRef.current = null;
      }
    };
  }, [stockList, i18n.language]);

  useEffect(() => {
    if (!chartRef.current || !stock) return;
    chartRef.current.setSymbol(
      stock.stCode,
      chartRef.current._options.interval
    );
  }, [stock]);

  return (
    <div className="chart_box">
      <div
        className="tradingview-widget-container"
        style={{ height: "100%", width: "100%" }}
      >
        <div
          id="tradingview_chart"
          style={{ height: "100%", width: "100%" }}
        ></div>
      </div>
    </div>
  );
}
