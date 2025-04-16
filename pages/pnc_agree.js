import React, { useEffect, useState } from "react";
import Checkbox from "../components/pnc/ui/Checkbox";

const Agreement = () => {
  const [agreed, setAgreed] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f7] px-4 py-20 md:py-40">
      <div className="w-full max-w-[580px] px-4">
        <h2 className="text-[44px] font-bold text-center mb-3">약관동의</h2>
        <div className="flex justify-center items-center gap-5 mb-16">
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
          <p className="text-[18px] text-[#636363] text-center">
            개인정보 수집 및 이용 동의
          </p>
          <div className="bg-[#E3E3E3] h-px w-full flex-1"></div>
        </div>

        <div className="border border-gray-300 rounded-md p-8 h-[400px] overflow-y-auto text-sm text-[#636363] whitespace-pre-wrap mb-4 bg-white leading-snug">
          본사는 고객님의 회원가입과 효율적인 서비스 제공을 위해 아래와 같이
          개인정보를 수집/이용하고자 합니다.
          {"\n\n"}
          수집 목적: 서비스 제공 및 회원 관리, 고지사항 전달 등{"\n"}
          수집 항목: 이름, 연락처, 이메일 등{"\n"}
          보유 기간: 회원 탈퇴 시까지 또는 관계 법령에 따른 기간{"\n"}
          {"\n"}※ 귀하는 동의를 거부할 권리가 있으며, 미동의 시 서비스 이용에
          제한이 있을 수 있습니다.
          <div className="text-base text-[#131313] font-bold mt-5 mb-4">
            수집하는 개인정보 항목
          </div>
          본사는 고객님의 회원가입과 효율적인 서비스 제공을 위해 아래와 같이
          개인정보를 수집/이용하고자 합니다.
          {"\n\n"}
          수집 목적: 서비스 제공 및 회원 관리, 고지사항 전달 등{"\n"}
          수집 항목: 이름, 연락처, 이메일 등{"\n"}
          보유 기간: 회원 탈퇴 시까지 또는 관계 법령에 따른 기간{"\n"}
          {"\n"}※ 귀하는 동의를 거부할 권리가 있으며, 미동의 시 서비스 이용에
          제한이 있을 수 있습니다.
        </div>

        <div className="flex items-center mb-16 pt-3">
          {/* <input
            type="checkbox"
            id="agree"
            checked={agreed}
            onChange={(e) => setAgreed(e.target.checked)}
            className="mr-2"
          /> */}

          <Checkbox id="agree" onChange={(e) => setAgreed(e.target.checked)} />

          <label htmlFor="agree" className="text-base text-[#131313] ml-2">
            약관을 내용을 읽고 동의합니다.
          </label>
        </div>

        <button
          type="button"
          disabled={!agreed}
          className={`w-full text-[20px] text-white py-[17px] font-semibold rounded-md transition ${
            agreed
              ? "bg-[#324580] hover:bg-indigo-900"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          동의하기
        </button>
      </div>
    </div>
  );
};

export default Agreement;
