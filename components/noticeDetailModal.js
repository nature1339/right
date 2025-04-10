import React, { useEffect, useState } from "react";
import apiRequest from "../utils/api";

export default function NoticeDetailModal({ isOpen, onClose, noticeId }) {
  const [noticeDetail, setNoticeDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (isOpen && noticeId) {
      getNoticeDetail();
    }
  }, [isOpen, noticeId]);

  const getNoticeDetail = async () => {
    setIsLoading(true); // 로딩 상태 시작
    const options = {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    };

    try {
      const response = await apiRequest(`/user/notice/${noticeId}`, options);
      console.log(response);
      setNoticeDetail(response || {}); // 응답 데이터를 저장
    } catch (error) {
      console.error("공지사항 상세 조회 실패:", error);
      setNoticeDetail(null); // 에러 발생 시 초기화
    } finally {
      setIsLoading(false); // 로딩 상태 종료
    }
  };

  if (!isOpen) return null;

  return (
    <div className="modal_wrap" id="modal_notice_detail">
      <div className="modal">
        <div className="modal_header">
          <h2 className="left">
            {isLoading ? "" : noticeDetail?.subject || ""}
          </h2>
          <div className="close" onClick={() => onClose()}></div>
        </div>
        <div className="modal_body">
          {isLoading ? (
            ""
          ) : noticeDetail?.contents ? (
            <div
              dangerouslySetInnerHTML={{
                __html: noticeDetail.contents.replace(/\n/g, "<br />"),
              }}
            />
          ) : (
            "공지사항 내용이 없습니다."
          )}
        </div>
      </div>
    </div>
  );
}
