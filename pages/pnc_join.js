import React, { useEffect, useState } from "react";
import { CiCircleInfo } from "react-icons/ci";
import SelectBox from "../components/pnc/ui/SelectBox";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { apiRequest } from "utils/api";

const SignupForm = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({
    userid: "",
    password: "",
    confirmPassword: "",
    name: "",
    phone: "",
    bank: "",
    account: "",
    referral: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", form);
    // 여기에 유효성 검사 및 API 연동 로직 추가 가능
  };

  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [banksList, setBanksList] = useState([]);
  useEffect(() => {
    const fetchBanksList = async () => {
      try {
        const res = await apiRequest("/banks/", { method: "GET" });
        setBanksList(res);
        setIsError(false);
      } catch (error) {
        console.error("은행 리스트를 불러오는 데 실패했습니다.", error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBanksList();
  }, []);

  return (
    <div className="min-h-screen py-20 md:py-40 flex items-center justify-center bg-[#f3f5f7] p-4">
      <div className="w-full max-w-[580px] px-4">
        <h2 className="text-[44px] font-bold text-center mb-3">회원가입</h2>
        <div className="flex justify-center items-center gap-5 mb-16">
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          <p className="text-[18px] text-[#636363] text-center">
            회원가입을 위한 정보를 입력해주세요.
          </p>
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              name="userid"
              value={form.userid}
              onChange={handleChange}
              type="text"
              placeholder="사용할 아이디를 입력하세요. (4자 이상)"
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
            <div className="flex gap-2 mt-1">
              <CiCircleInfo size={18} className="mt-1" />
              <p className="text-[18px] text-[#636363]">
                가입 후에는 사용자 아이디를 변경할 수 없습니다.
                <br />
                아이디 분실 시 자산 손실의 위험이 있으니 주의하시기 바랍니다.
              </p>
            </div>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호를 입력하세요. (8자 이상)"
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호를 한 번 더 입력하세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              이름
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="이름(실명)을 입력해주세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              전화번호
            </label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="숫자만 입력해주세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 계좌정보 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              계좌번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <input
                name="account"
                value={form.account}
                onChange={handleChange}
                type="text"
                placeholder="계좌번호 (숫자만 입력 가능)"
                className="w-2/3 px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
              />
              {/* <select
                name="bank"
                value={form.bank}
                onChange={handleChange}
                className="w-1/3 px-3 py-4 font-light h-auto border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
              >
                <option value="">은행선택</option>
                <option value="국민은행">국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="우리은행">우리은행</option>
              </select> */}
              {isLoading && (
                <div className="flex items-center justify-between w-full px-3 font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default">
                  {t("로딩 중...")}
                </div>
              )}
              {isError && (
                <div className="flex items-center justify-between w-full px-3 font-light h-[64px] border rounded-md focus:outline-none bg-white placeholder-[#A3A3A3] cursor-default">
                  {t("은행 불러오기 실패")}
                </div>
              )}
              {banksList && (
                <SelectBox
                  name="bank"
                  className="w-1/3"
                  value={form.bank}
                  onChange={handleChange}
                  option={[
                    {
                      name: "은행선택",
                      value: "",
                    },
                    ...banksList.map((bank) => {
                      return {
                        name: bank.name,
                        value: bank.id,
                      };
                    }),
                  ]}
                />
              )}
            </div>
          </div>
          <div>
            <input
              id="accountname"
              type="text"
              placeholder="예금주를 입력하세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 가입코드 */}
          <div>
            <label className="block text-[19px] font-semibold mb-2 text-[#131313]">
              가입코드
            </label>
            <input
              name="referral"
              value={form.referral}
              onChange={handleChange}
              type="text"
              // placeholder="(선택 사항)"
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          {/* 버튼 */}
          <div>
            <button
              type="submit"
              className="mt-16 w-full bg-[#324580] text-[20px] text-white py-[17px] font-semibold rounded-md hover:bg-indigo-900 transition"
            >
              회원가입
            </button>
          </div>
        </form>

        <div className="flex justify-center items-center gap-5 my-7">
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          <p className="text-[18px] text-[#636363] text-center">
            이미 회원이시면 로그인 해주세요.
          </p>
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
        </div>
        <div className="w-[200px] mx-auto border border-[#C3C3C3] rounded-md">
          <Link
            href="/login"
            className="block text-center bg-white text-[20px] py-[17px] font-semibold rounded-md transition"
          >
            로그인
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
