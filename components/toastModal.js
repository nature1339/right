import React from 'react'

// 토스트 컴포넌트 공통
export default function toastModal({ message, isVisible }) {
  if (!isVisible) return null;

  return (
    <>
      <div id="toast" className="toast">{message}</div>
    </>
  );
}