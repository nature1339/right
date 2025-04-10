import CommonList from "@components/commonList";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import apiRequest, { getUserPnt } from "utils/api";
import moment from "moment";
import { formatCurrency } from "utils/common";
import { useWebSocket } from "utils/WebSocketProvider";
import Head from "@components/head";
import { useTranslation } from "react-i18next";

export default function Orders() {
  const { t } = useTranslation();
  const [orderList, setOrderList] = useState([]); // 체결 미체결 리스트
  const { stockDataMap, odrSocket, allStockSocket } = useWebSocket();

  const { data: stockList } = useQuery({
    queryKey: ["stockList"],
    queryFn: () => apiRequest("/user/stocklist", { method: "GET" }),
  });

  const today = moment().format("YYYY-MM-DD");

  const { data: myPoint } = useQuery({
    queryKey: ["myPoint"],
    queryFn: getUserPnt,
  });

  const { data: trades } = useQuery({
    queryKey: ["trades", today, today],
    queryFn: () =>
      apiRequest("/user/trade/search", {
        method: "POST",
        body: JSON.stringify({
          startDate: today,
          endDate: today,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }),
  });

  const todayStartBalance =
    trades?.length > 0 ? trades[trades.length - 1].balance : 0;
  const todayTotalProfitLossSum =
    trades?.length > 0
      ? trades.reduce(
          (totalProfitLossSum, trade) =>
            totalProfitLossSum + trade.total_profit_loss,
          0
        )
      : 0;

  const todayProfitLossSum =
    trades?.length > 0
      ? trades.reduce(
          (todayProfitLossSum, trade) => todayProfitLossSum + trade.profit_loss,
          0
        )
      : 0;

  return (
    <>
      <Head title="거래내역" />
      <main>
        <section className="trading_table sub_page_section">
          <h2>{t("거래내역")}</h2>
          <div className="history_table">
            <div className="inner">
              <table>
                <tbody>
                  <tr>
                    <th className="bg-none">{t("예탁금")}</th>

                    <th className="bg-none line-b-dark"></th>
                    <th className="bg-none">{t("당일 시작예탁금")}</th>
                  </tr>
                  <tr className="line-b-0">
                    <td id="myPoint" className="font-13 line-b-dark">
                      {formatCurrency(myPoint)}
                    </td>
                    <td className=""></td>
                    <td id="odrEvalPoint" className="font-13 line-b-dark">
                      {formatCurrency(todayStartBalance)}
                    </td>
                  </tr>
                </tbody>
              </table>
              <table>
                <tbody>
                  <tr>
                    <th className="bg-none">{t("당일 총 손익")}</th>
                    <th className="bg-none line-b-dark"></th>
                    <th className="bg-none">{t("당일 실현손익")}</th>
                  </tr>
                  <tr className="line-b-0">
                    <td
                      id="totalPnL"
                      className={`font-13 line-b-dark ${
                        todayTotalProfitLossSum < 0 ? "col_blue" : "col_red"
                      }`}
                    >
                      {formatCurrency(todayTotalProfitLossSum)}
                    </td>
                    <td className=""></td>
                    <td
                      id="PnL"
                      className={`font-13 line-b-dark ${
                        todayProfitLossSum < 0 ? "col_blue" : "col_red"
                      }`}
                      style={{ color: todayProfitLossSum < 0 ? "blue" : "red" }}
                    >
                      {formatCurrency(todayProfitLossSum)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div className="table_wrap_box">
            <CommonList
              orderList={orderList}
              setOrderList={setOrderList}
              stockDataMap={stockDataMap}
              stockList={stockList}
            />
          </div>
        </section>
      </main>
    </>
  );
}
