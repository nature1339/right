import React from "react";

const ServerError = () => {
  return (
    <div className="server-error-container">
      <div className="server-error-card">
        <div className="server-error-header">시스템 점검 공지안내</div>
        <div className="server-error-text">
          시스템 점검으로 사이트 이용이
          <br />
          일시적으로 중단되오니 양해 부탁드립니다.
        </div>
        <div className="server-error-subtext">
          System check, use the site.
          <br />
          Please understand that it will be temporarily suspended.
        </div>
        <img
          className="server-error-image"
          src="/images/intro/intro_icon_02.png"
          alt="System Maintenance Icon"
        />
        <div className="server-error-text">
          서비스 이용에 불편을 드려 대단히 죄송하며,
          <br /> 보다 나은 서비스를 위해 최선을 다하겠습니다. 감사합니다.
        </div>
        <div className="server-error-subtext">
          We sincerely apologize for any inconvenience caused
          <br /> and will do our best to provide better service.
        </div>
      </div>
    </div>
  );
};

export default ServerError;
