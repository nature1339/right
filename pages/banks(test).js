// pages/banks(test).js
import { useEffect, useState } from "react";
import { apiRequest } from "utils/api";

export default function BanksTest() {
  const [banks, setBanks] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    apiRequest("/user/banks/", "GET")
      .then((res) => {
        console.log("✅ 은행 리스트:", res);
        setBanks(res);
      })
      .catch((err) => {
        console.error("❌ 에러 발생:", err);
        setError("은행 목록을 불러오지 못했습니다.");
      });
  }, []);

  return (
    <div style={{ padding: "2rem" }}>
      <h1>은행 리스트 (테스트용)</h1>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : (
        <ul>
          {banks.map((bank, idx) => (
            <li key={idx}>{bank.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
