export const formatCurrency = (value) => {
  if (typeof value !== "number") return value; // 숫자가 아니면 그대로 반환
  return new Intl.NumberFormat("ko-KR", {
    maximumFractionDigits: 0, // 소수점 제거
  }).format(Math.floor(value)); // 소수점 버림
};

export const getSiteName = () => {
  if (typeof window === "undefined") {
    return;
  }

  // 퍼블릭
  if (
    window.location.hostname.includes("publickr.com") ||
    window.location.hostname.includes("public")
  ) {
    return "public";
  }

  // 메타5
  if (
    window.location.hostname.includes("meta5kr.com") ||
    window.location.hostname.includes("meta5it.com") ||
    window.location.hostname.includes("m-trader5.com") ||
    window.location.hostname.includes("meta")
  ) {
    return "meta5";
  }

  // 오씨비씨
  if (
    window.location.hostname.includes("ocbckr.com") ||
    window.location.hostname.includes("ocbckr.net") ||
    window.location.hostname.includes("ocbc")
  ) {
    return "ocbc";
  }

  // 피엔씨
  if (
    window.location.hostname.includes("pnc.com") ||
    window.location.hostname.includes("pnc.net") ||
    window.location.hostname.includes("pnc")
  ) {
    return "pnc";
  }

  // 개발
  if (window.location.hostname.includes("89.187.28.65")) {
    return "pnc";
  }

  // 로컬
  if (window.location.hostname.includes("localhost")) {
    return "pnc";
  }
};
