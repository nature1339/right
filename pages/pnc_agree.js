import React, {useEffect, useState} from "react";


const Agreement = () => {
    const [agreed, setAgreed] = useState(false);
  
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center">약관동의</h2>
          <p className="text-sm text-gray-500 text-center mb-6">개인정보 수집 및 이용 동의</p>
  
          <div className="border border-gray-300 rounded-md p-4 h-60 overflow-y-auto text-sm whitespace-pre-wrap mb-4">
            본사는 고객님의 회원가입과 효율적인 서비스 제공을 위해 아래와 같이
            개인정보를 수집/이용하고자 합니다.
            {"\n\n"}
            수집 목적: 서비스 제공 및 회원 관리, 고지사항 전달 등{"\n"}
            수집 항목: 이름, 연락처, 이메일 등{"\n"}
            보유 기간: 회원 탈퇴 시까지 또는 관계 법령에 따른 기간{"\n"}
            {"\n"}
            ※ 귀하는 동의를 거부할 권리가 있으며, 미동의 시 서비스 이용에 제한이 있을 수 있습니다.
          </div>
  
          <div className="flex items-center mb-6">
            <input
              type="checkbox"
              id="agree"
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="agree" className="text-sm">
              약관 내용을 모두 숙지하였습니다.
            </label>
          </div>
  
          <button
            type="button"
            disabled={!agreed}
            className={`w-full py-2 rounded-md text-white transition ${
              agreed ? 'bg-indigo-800 hover:bg-indigo-900' : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            동의하기
          </button>
        </div>
      </div>
    );
  };
  
  export default Agreement;