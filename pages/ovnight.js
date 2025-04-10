import apiRequest, { getExc } from "../utils/api";
import { useEffect, useState } from "react";
import useToast from "../hooks/toast";
import ToastModal from "@components/toastModal";
import { useWebSocket } from "utils/WebSocketProvider";
import { useQuery } from "@tanstack/react-query";
import Head from "@components/head";
import { useTranslation } from "react-i18next";

export default function Ovnight() {
  const { t } = useTranslation();
  const { isVisible, message, showToast } = useToast(); //토스트
  const [ovList, setOvList] = useState([]);
  const [ov, setOv] = useState(null);
  const [setting, setSetting] = useState(null);

  const { data: stockList } = useQuery({
    queryKey: ["stockList"],
    queryFn: () => apiRequest("/user/stocklist", { method: "GET" }),
  });

  const { data: exchangeRate } = useQuery({
    queryKey: ["exchangeRate"],
    queryFn: () => getExc(),
    select: (response) => ({
      usd: response.usd,
      hkd: response.hkd,
      update_time: new Date(response.update_time).toLocaleDateString("ko-KR"),
    }),
  });

  useEffect(() => {
    getOvList();
    getSetting();
  }, []);

  const getOvList = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await apiRequest("/user/order/ovlist", options);
      setOvList(response || []);
    } catch (error) {
      console.error("공지사항 목록 조회 실패:", error);
      setOvList([]); // 에러 발생 시 빈 배열 설정
    }
  };

  const getSetting = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await apiRequest("/user/settings", options);
      setSetting(response);
      setOv(response.autoOv || null);
    } catch (error) {
      console.error("공지사항 목록 조회 실패:", error);
      //setOvList([]); // 에러 발생 시 빈 배열 설정
    }
  };

  const handleToggleSwitch = async (newValue) => {
    if (!setting) return; // 초기 설정값이 없으면 실행 중지

    const updatedSetting = { ...setting, autoOv: newValue };
    setOv(newValue); // UI에서 즉시 반영
    setSetting(updatedSetting);

    const options = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedSetting), // 전체 설정 데이터 전송
    };

    try {
      const response = await apiRequest("/user/settings", options);
      showToast(response);
    } catch (error) {
      setOv(!newValue);
      setSetting({ ...setting, autoOv: !newValue });
    }
  };

  const { stockDataMap, odrSocket, allStockSocket } = useWebSocket();

  useEffect(() => {
    if (!stockDataMap || !stockList) {
      return;
    }

    const rows = document.querySelectorAll("tr[data-stcode]");

    rows.forEach((row) => {
      const stCode = row.getAttribute("data-stcode");
      const status = row.getAttribute("data-status");
      const odrprice = row.getAttribute("data-order-sise");
      const orderCnt = row.getAttribute("data-ordercnt");
      const orderGubun = row.getAttribute("data-gubun");

      console.log(stCode, status, odrprice, orderCnt, orderGubun);

      const stockData = stockDataMap[stCode]; // stockDataMap에서 해당 종목 데이터 가져오기

      if (status == 4 && stockData && stockData.cg) {
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
            (odrprice - curpr) * tsize * (tvalue * trgExchn) * orderCnt;
        } else {
          // 매도
          evaluation =
            (curpr - odrprice) * tsize * (tvalue * trgExchn) * orderCnt;
        }

        const totalEvaluation = evaluation - fee;

        const formattedEvaluation =
          Math.floor(evaluation).toLocaleString("ko-KR");

        const targetTd = row.querySelector("td:nth-child(5)");
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

        const formattedTotalEvaluation =
          Math.floor(totalEvaluation).toLocaleString("ko-KR");

        const totalTargetTd = row.querySelector("td:nth-child(6)");
        if (targetTd) {
          totalTargetTd.textContent = formattedTotalEvaluation;
          if (totalEvaluation < 0) {
            totalTargetTd.classList.add("col_blue");
            totalTargetTd.classList.remove("col_red");
          } else {
            totalTargetTd.classList.add("col_red");
            totalTargetTd.classList.remove("col_blue");
          }
        }
      }
    });
  }, [stockDataMap, stockList]);

  return (
    <>
      <Head title={t("오버나잇")} />
      <main>
        <section className="trading_table sub_page_section">
          <h2>{t("오버나잇")}</h2>
          <div className="overnight_table">
            <div className="inner">
              <h3>{t("오버나잇 가능 기준 (담보금액)")}</h3>
              <ul className="items">
                <li>
                  <p>{t("국내선물")}:</p>
                  <span>2,000,000원</span>
                </li>
                <li>
                  <p>{t("해외선물")}:</p>
                  <span>2,000,000원</span>
                </li>
                <li>
                  <p>{t("항셍선물")}:</p>
                  <span>2,000,000원</span>
                </li>
                <li>
                  <p>{t("Micro나스닥선물")}:</p>
                  <span>2,000,000원</span>
                </li>
                <li>
                  <p>{t("미니항셍선물")}:</p>
                  <span>2,000,000원</span>
                </li>
                <li className="desc">
                  *{t("보다 자세한 사항은 공지사항을 통해 확인해주십시오.")}
                </li>
              </ul>
            </div>
          </div>
          <div className="table_wrap_box">
            <div className="overnight_t_head">
              <h3>{t("세부내용")}</h3>
              <div className="overnight_switch_wrap">
                <span>{t("오버나잇 자동 적용")}</span>
                {/*<input type="checkbox" id="overnight_switch"/>*/}
                <input
                  type="checkbox"
                  id="overnight_switch"
                  checked={ov || false} // ov 값이 true/false에 따라 스위치 상태 변경
                  onChange={(e) => handleToggleSwitch(e.target.checked)} // 상태 변경 시 처리 함수 호출
                />
                <label
                  htmlFor="overnight_switch"
                  className="overnight_switch_label !bg-primary"
                >
                  <span className="on_off_btn"></span>
                </label>
              </div>
            </div>
            <div className="table_wrap">
              <table>
                <thead>
                  <tr>
                    <th>{t("거래종목")}</th>
                    <th>{t("매매구분")}</th>
                    <th>{t("체결갯수")}</th>
                    <th>{t("평균단가")}</th>
                    <th>{t("실현손익")}</th>
                    <th>{t("총실현손익")}</th>
                    <th>{t("주문번호")}</th>
                  </tr>
                </thead>
                <tbody id="orderList">
                  {ovList.map((ov, index) => (
                    <tr
                      key={index}
                      data-stcode={ov.jongmok}
                      data-status={ov.status}
                      data-order-sise={ov.order_sise}
                      data-ordercnt={ov.order_cnt}
                      data-gubun={ov.gubun}
                    >
                      <td>{t(ov.stName)}</td>
                      <td>{ov.gubun == 1 ? t("매도") : t("매수")}</td>
                      <td>{ov.order_cnt}</td>
                      <td>{ov.order_sise}</td>
                      <td></td>
                      <td></td>
                      <td>{ov.order_cd}</td>
                    </tr>
                  ))}
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
