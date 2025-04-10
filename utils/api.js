const API_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/v1`;

export async function apiRequest(endpoint, options = {}, retry = false) {
  const headers = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  // localStorage에서 토큰 가져오기
  const accessToken = localStorage.getItem("accessToken");
  if (accessToken) {
    headers["Authorization"] = `Bearer ${accessToken}`;
  }

  const response = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers,
    credentials: "include",
  });

  if (!response.ok) {
    if (response.status === 403 && !retry) {
      console.warn("❗ 403 Forbidden - 토큰 갱신 시도");

      const refreshed = await refreshAccessToken();
      if (refreshed) {
        console.log("🔁 재시도 중...");
        return apiRequest(endpoint, options, true);
      } else {
        console.error("❌ 토큰 갱신 실패, 로그아웃 처리");
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        throw new Error("Forbidden: Token refresh failed.");
      }
    }

    const errorText = await response.text();
    throw {
      status: response.status,
      message: JSON.parse(errorText)?.message || errorText || "API 오류",
    };
  }

  const contentType = response.headers.get("content-type");
  if (contentType?.includes("application/json")) {
    return await response.json();
  } else {
    return await response.text();
  }
}

async function refreshAccessToken() {
  const refreshToken = localStorage.getItem("refreshToken");
  console.log("📦 refreshToken:", refreshToken);

  if (!refreshToken) {
    return false;
  }

  try {
    const response = await fetch(`${API_URL}/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refreshToken }),
    });

    const text = await response.text();
    if (!response.ok) {
      console.error("❌ refresh 응답 실패:", text);
      return false;
    }

    const data = JSON.parse(text);
    console.log("✅ refresh 성공:", data);

    // localStorage 업데이트
    localStorage.setItem("accessToken", data.accessToken);
    localStorage.setItem("refreshToken", data.refreshToken);

    return true;
  } catch (error) {
    console.error("❌ refresh 요청 오류:", error);
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
  return apiRequest("/user/getPnt", { method: "GET" });
}

export async function getExc() {
  return apiRequest("/user/exc", { method: "GET" });
}

export async function join(data) {
  return apiRequest("/join", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getChats() {
  return apiRequest("/user/chat/search", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
  });
}

export async function getUserAccount() {
  return apiRequest("/user/userAccount", { method: "GET" });
}

export async function getUser() {
  return apiRequest("/user", { method: "GET" });
}

export async function updatePassword({ currentPassword, newPassword }) {
  return apiRequest("/user/password", {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ currentPassword, newPassword }),
  });
}

export default apiRequest;
