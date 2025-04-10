import React, { useEffect, useState } from "react";
import NoticeDetailModal from "./noticeDetailModal";
import apiRequest from "../utils/api";
import { useTranslation } from "react-i18next";

export default function noticeModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  const { t } = useTranslation();

  // 상세 공지사항 모달
  const [noticeDetailModalOpen, setNoticeDetailModalOpen] = useState(false);
  const [selectedNoticeId, setSelectedNoticeId] = useState(null); // 선택된 공지사항 ID 저장
  const [noticeList, setNoticeList] = useState([]);

  const openNoticeDetailModal = (id) => {
    setSelectedNoticeId(id); // 선택된 ID 저장
    setNoticeDetailModalOpen(true); // 상세 모달 열기
  };

  const closeNoticeDetailModal = () => {
    setNoticeDetailModalOpen(false); // 상세 모달 닫기
    setSelectedNoticeId(null); // 선택된 ID 초기화
  };

  useEffect(() => {
    if (isOpen) {
      getNoticeList();
    }
  }, [isOpen]);

  const getNoticeList = async () => {
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await apiRequest("/user/notice", options);
      setNoticeList(response || []);
    } catch (error) {
      console.error("공지사항 목록 조회 실패:", error);
      setNoticeList([]); // 에러 발생 시 빈 배열 설정
    }
  };

  return (
    <>
      <div className="modal_wrap" id="modal_notice">
        <div className="modal">
          <div className="modal_header">
            <h2>{t("공지사항")}</h2>
            <div className="close" onClick={() => onClose()}></div>
          </div>
          <div className="modal_body">
            <div className="table_wrap">
              <table>
                <colgroup>
                  <col style={{ width: "20%" }} />
                  <col style={{ width: "80%" }} />
                </colgroup>
                <thead>
                  <tr>
                    <th>{t("일자")}</th>
                    <th>{t("공지사항")}</th>
                  </tr>
                </thead>
                <tbody id="noticeTitle">
                  {noticeList.map((noti, index) => {
                    const formatDate = (dateString) => {
                      const date = new Date(dateString);
                      return date.toISOString().split("T")[0]; // 'YYYY-MM-DD' 형식으로 변환
                    };

                    return (
                      <tr
                        onClick={() => openNoticeDetailModal(noti.id)}
                        key={index}
                      >
                        <td>{formatDate(noti.add_time)}</td>
                        <td className="notice-title">{noti.subject}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <NoticeDetailModal
        isOpen={noticeDetailModalOpen}
        onClose={closeNoticeDetailModal}
        noticeId={selectedNoticeId}
      />
    </>
  );
}
