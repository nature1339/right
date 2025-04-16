import React, { useEffect, useState } from "react";
import Checkbox from "../components/pnc/ui/Checkbox";

const LoginForm = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f3f5f7] px-4 py-20 md:py-40">
      <div className="w-full max-w-[580px] px-4">
        <h2 className="text-[44px] font-bold text-center mb-16">로그인</h2>

        <form>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="block text-[19px] font-semibold mb-2 text-[#131313]"
            >
              아이디
            </label>
            <input
              id="username"
              type="text"
              placeholder="아이디를 입력하세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-[19px] font-semibold mb-2 text-[#131313]"
            >
              비밀번호
            </label>
            <input
              id="password"
              type="password"
              placeholder="비밀번호를 입력하세요."
              className="w-full px-3 font-light h-[64px] border rounded-md text-[18px] leading-none focus:outline-none focus:border-indigo-500 bg-white placeholder-[#A3A3A3]"
            />
          </div>

          <div className="mb-10 flex items-center">
            {/* <input type="checkbox" id="remember" className="mr-2" /> */}
            <Checkbox id="remember" />
            <label htmlFor="remember" className="text-base text-[#131313] ml-2">
              아이디 저장
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-[#324580] text-[20px] text-white py-[17px] font-semibold rounded-md hover:bg-indigo-900 transition"
          >
            로그인
          </button>
        </form>

        <div className="flex justify-center items-center text-base text-gray-600 mt-6">
          <a href="#" className="hover:underline">
            회원가입
          </a>
          <div className="mx-6 h-4 w-px bg-[#D9D9D9]"></div>
          <div className="space-x-2">
            <a href="#" className="hover:underline">
              아이디 찾기
            </a>
            <span>·</span>
            <a href="#" className="hover:underline">
              비밀번호 변경
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
