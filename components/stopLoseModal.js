// S/L 컨펌 팝업
import React from "react";
import { useTranslation } from "react-i18next";

export default function stopLoseModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  const { t } = useTranslation();

  return (
    <div className="custom_popup" id="customPopup">
      <div className="custom_popup_wrap">
        <p className="custom_title">S/L</p>
        <p className="custom_text">{t("S/L 집행 하시겠습니까?")}</p>
        <div className="custom_button_container">
          <button
            className="custom_button cancel_button"
            onClick={() => onClose()}
          >
            {t("취소")}
          </button>
          <button
            className="custom_button confirm_button !bg-primary"
            onClick={onConfirm}
          >
            {t("확인")}
          </button>
        </div>
      </div>
    </div>
  );
}
