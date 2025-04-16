import React, {useEffect, useState} from "react";

const LoginForm = () => {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
        <div className="w-full max-w-md bg-white p-8 rounded-lg shadow">
          <h2 className="text-2xl font-bold text-center mb-6">로그인</h2>
  
          <form>
            <div className="mb-4">
              <label htmlFor="username" className="block text-sm font-semibold mb-1">
                아이디
              </label>
              <input
                id="username"
                type="text"
                placeholder="아이디를 입력하세요."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <div className="mb-4">
              <label htmlFor="password" className="block text-sm font-semibold mb-1">
                비밀번호
              </label>
              <input
                id="password"
                type="password"
                placeholder="비밀번호를 입력하세요."
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
  
            <div className="mb-6 flex items-center">
              <input type="checkbox" id="remember" className="mr-2" />
              <label htmlFor="remember" className="text-sm">
                아이디 저장
              </label>
            </div>
  
            <button
              type="submit"
              className="w-full bg-indigo-800 text-white py-2 rounded-md hover:bg-indigo-900 transition"
            >
              로그인
            </button>
          </form>
  
          <div className="flex justify-between text-sm text-gray-600 mt-6">
            <a href="#" className="hover:underline">
              회원가입
            </a>
            <div className="space-x-2">
              <a href="#" className="hover:underline">
                아이디 찾기
              </a>
              <span>|</span>
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
