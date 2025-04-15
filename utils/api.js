import React from "react";
import userStore from "store/user";
import useToast from "../hooks/toast";
//const API_URL = "http://localhost:9443/api/v1";
const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;
// const API_URL = `${window.location.origin}/api/v1`;

export async function apiRequest(endpoint, options = {}, retry = false) {
  const { userInfo, setUser, clearUser } = userStore.getState(); // Zustand에서 상태 가져오기

  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // accessToken이 있으면 Authorization 헤더에 추가
  if (userInfo.accessToken) {
    headers["Authorization"] = `Bearer ${userInfo.accessToken}`;
  }

  // try {
  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include", // 쿠키를 함께 전송할 경우 설정
  });

  if (!response.ok) {
    // 403 Forbidden 처리: 토큰 만료로 가정
    if (response.status === 403 && !retry) {
      console.log("403 Forbidden detected, attempting token refresh...");

      const refreshed = await refreshAccessToken(); // 토큰 갱신
      if (refreshed) {
        console.log("Token refresh successful, retrying original request...");
        return apiRequest(endpoint, options, true); // 요청 재시도
      } else {
        console.error("Token refresh failed, logging out user...");
        clearUser(); // 상태 초기화
        throw new Error("Forbidden: Token refresh failed.");
      }
    }

    // 다른 에러 처리
    throw {
      status: response.status,
      message: JSON.parse(await response.text())?.message || "",
    };
    // throw new Error(errorText || `API 요청 실패: ${response.status}`);
    // showToast(errorText);
  }

  // JSON 응답 처리
  const contentType = response.headers.get("content-type");
  if (contentType && contentType.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
  // } catch (error) {
  //   console.error("API Request Error:", error);
  //   throw error; // 에러 던지기
  // }
}

async function refreshAccessToken() {
  const { userInfo, setUser } = userStore.getState();

  try {
    const response = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: userInfo.refreshToken, // 현재 Refresh Token 사용
      }),
    });

    if (!response.ok) {
      console.error("토큰 갱신 실패:", await response.text());
      return false;
    }

    const data = await response.json();
    setUser(data.accessToken, data.refreshToken, userInfo.userid); // 새 토큰 저장
    return true;
  } catch (error) {
    console.error("토큰 갱신 중 오류:", error);
    return false;
  }
}

export async function loginApi(userid, password, method) {
  const data = { userid, password };
  return apiRequest("/login", {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getUserPnt() {
  return apiRequest("/user/getPnt", {
    method: "GET",
  });
}

export async function getExc() {
  return apiRequest("/user/exc", {
    method: "GET",
  });
}

export async function join(data) {
  return apiRequest("/join", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
}

export async function getChats() {
  return apiRequest("/user/chat/search", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
}

export async function getUserAccount() {
  return apiRequest("/user/userAccount", {
    method: "GET",
  });
}

export async function getUser() {
  return apiRequest("/user", {
    method: "GET",
  });
}

export async function updatePassword({ currentPassword, newPassword }) {
  const response = apiRequest("/user/password", {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
  return response;
}

export default apiRequest;