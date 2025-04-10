// 토스트 팝업 훅
import { useState } from "react";

const useToast = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [message, setMessage] = useState("");

  const showToast = (msg) => {
    setMessage(msg);
    setIsVisible(true);

    setTimeout(() => {
      setIsVisible(false);
    }, 3000); // 3초 후에 Toast 숨기기
  };

  return {
    isVisible,
    message,
    showToast,
  };
};

export default useToast;
