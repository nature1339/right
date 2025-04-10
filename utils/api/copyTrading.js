import apiRequest from "../api";

// 트레이더 통계 정보 조회
export async function getCopyTraderInfo() {
  const response = apiRequest("/user/trade/follow/info", {
    method: "GET",
  });
  return response;
}

// 트레이더 전체 조회
export async function getCopyTraders() {
  const response = apiRequest("/user/trade/follow", {
    method: "GET",
  });
  return response;
}

// 트레이더 팔로우
export async function followCopyTrader(traderId) {
  const response = apiRequest("/user/trade/follow", {
    method: "POST",
    body: JSON.stringify({
      traderId,
    }),
  });
  return response;
}

// 트레이더 언팔로우
export async function unfollowCopyTrader(traderId) {
  const response = apiRequest(`/user/trade/follow?traderId=${traderId}`, {
    method: "DELETE",
  });
  return response;
}

// 트레이더 활성화
export async function activateCopyTrader(traderId) {
  const response = apiRequest(
    `/user/trade/follow/activate?traderId=${traderId}`,
    {
      method: "PUT",
    }
  );
  return response;
}
