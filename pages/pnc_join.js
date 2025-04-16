import React, { useState } from 'react';

const SignupForm = () => {
  const [form, setForm] = useState({
    userid: '',
    password: '',
    confirmPassword: '',
    name: '',
    phone: '',
    bank: '',
    account: '',
    referral: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', form);
    // 여기에 유효성 검사 및 API 연동 로직 추가 가능
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 px-4">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
        <h2 className="text-2xl font-bold text-center">회원가입</h2>
        <p className="text-sm text-center text-gray-500 mb-6">
          회원가입을 위한 정보를 입력해주세요.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* 아이디 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              아이디 <span className="text-red-500">*</span>
            </label>
            <input
              name="userid"
              value={form.userid}
              onChange={handleChange}
              type="text"
              placeholder="사용할 아이디를 입력하세요. (4자 이상)"
              className="w-full px-4 py-2 border rounded-md"
            />
            <p className="text-xs text-gray-500 mt-1">
              가입 완료 후, 아이디는 변경할 수 없습니다. <br />
              아이디 입력 시 자동 중복 체크가 진행됩니다.
            </p>
          </div>

          {/* 비밀번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              비밀번호 <span className="text-red-500">*</span>
            </label>
            <input
              name="password"
              value={form.password}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호를 입력하세요. (8자 이상)"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* 비밀번호 확인 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              비밀번호 확인 <span className="text-red-500">*</span>
            </label>
            <input
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              type="password"
              placeholder="비밀번호를 한 번 더 입력하세요."
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* 이름 */}
          <div>
            <label className="block text-sm font-medium mb-1">이름</label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              type="text"
              placeholder="이름(실명)을 입력해주세요."
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* 전화번호 */}
          <div>
            <label className="block text-sm font-medium mb-1">전화번호</label>
            <input
              name="phone"
              value={form.phone}
              onChange={handleChange}
              type="text"
              placeholder="숫자만 입력해주세요."
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* 계좌정보 */}
          <div>
            <label className="block text-sm font-medium mb-1">
              계좌번호 <span className="text-red-500">*</span>
            </label>
            <div className="flex space-x-2">
              <select
                name="bank"
                value={form.bank}
                onChange={handleChange}
                className="w-1/2 px-4 py-2 border rounded-md"
              >
                <option value="">은행선택</option>
                <option value="국민은행">국민은행</option>
                <option value="신한은행">신한은행</option>
                <option value="우리은행">우리은행</option>
                {/* 필요시 추가 */}
              </select>
              <input
                name="account"
                value={form.account}
                onChange={handleChange}
                type="text"
                placeholder="계좌번호"
                className="w-1/2 px-4 py-2 border rounded-md"
              />
            </div>
          </div>

          {/* 가입코드 */}
          <div>
            <label className="block text-sm font-medium mb-1">가입코드</label>
            <input
              name="referral"
              value={form.referral}
              onChange={handleChange}
              type="text"
              placeholder="(선택 사항)"
              className="w-full px-4 py-2 border rounded-md"
            />
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            className="w-full bg-indigo-800 text-white py-2 rounded-md hover:bg-indigo-900 transition"
          >
            회원가입
          </button>
        </form>

        <div className="text-sm text-center mt-4 text-gray-600">
          이미 회원이시라면{' '}
          <a href="#" className="text-indigo-600 hover:underline font-medium">
            로그인
          </a>
        </div>
      </div>
    </div>
  );
};

export default SignupForm;
