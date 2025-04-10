import React, { useEffect, useState } from "react";
import apiRequest from "../utils/api";

export default function RunListModal({
  isOpen,
  onClose,
  stockCodeModal,
  onConfirm,
}) {
  const [exeOrderList, setExeOrderList] = useState([]);
  const [selectedRowIndex, setSelectedRowIndex] = useState(null);
  const [isDisabled, setIsDisabled] = useState(false);

  useEffect(() => {
    const fetchUnexecutedOrders = async () => {
      if (isOpen && stockCodeModal) {
        try {
          // 쿼리 파라미터 추가
          const query = new URLSearchParams({
            jongmok: stockCodeModal,
          }).toString();

          const res = await apiRequest(
            `/user/order/find/un-executed?${query}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          );
          console.log(res);
          setExeOrderList(res);
        } catch (error) {
          console.error("Error fetching unexecuted orders:", error);
        }
      }
    };

    fetchUnexecutedOrders();
  }, [isOpen, stockCodeModal]); // isOpen과 stockCodeModal이 변경될 때마다 실행

  const handleRowClick = (index) => {
    setSelectedRowIndex(index);
  };

  const handleConfirm = () => {
    if (isDisabled) return; // 더블클릭 방지

    setIsDisabled(true); // 클릭 시 비활성화

    if (selectedRowIndex !== null) {
      const selectedOrder = exeOrderList[selectedRowIndex];
      onConfirm(selectedOrder); // 부모에 선택된 주문 전달
    }

    // 팝업 닫고 2초 후 다시 활성화
    setTimeout(() => {
      setIsDisabled(false);
      onClose();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="custom_popup tapCon_04_popup2">
        <div className="popup1_wrap">
          <p className="title">미체결 조회</p>
          <p className="pop_btn_close" onClick={onClose}></p>

          {exeOrderList.length === 0 ? (
            <p className="text">미체결 주문이 없습니다</p>
          ) : (
            <div className="table-wrap">
              <table id="unsuccessfulOrderTable">
                <thead>
                  <tr>
                    <th>거래종목</th>
                    <th>구분</th>
                    <th>주문량</th>
                    <th>주문가</th>
                    <th>미체결</th>
                  </tr>
                </thead>
                <tbody>
                  {exeOrderList.map((order, index) => (
                    <tr
                      key={index}
                      onClick={() => handleRowClick(index)}
                      style={{
                        backgroundColor:
                          selectedRowIndex === index
                            ? "#4fbcdd"
                            : "transparent",
                        cursor: "pointer",
                      }}
                    >
                      <td>{order.jongmok}</td>
                      <td>{order.gubun === 1 ? "매도" : "매수"}</td>
                      <td>{order.order_cnt}</td>
                      <td>{order.order_sise}</td>
                      <td>{order.status}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
          <button
            className={`!bg-primary ${
              isDisabled ? "opacity-50 cursor-not-allowed" : ""
            }`}
            onClick={handleConfirm}
            disabled={isDisabled}
          >
            확인
          </button>
        </div>
      </div>
    </>
  );
}
