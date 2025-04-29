import React, { useState } from "react";

const slides = [1, 2, 3];

const Hero = () => {
  const [index, setIndex] = useState(0);

  const handleNext = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const handlePrev = () => {
    setIndex((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative [@media(max-width:767px)]:h-[437px] h-[934px] bg-black text-white overflow-hidden flex items-end">
      <video
        autoPlay
        loop
        muted
        playsInline
        // className="absolute top-0 left-0 w-full h-full object-cover z-1"
        className={`${
          index === 0 ? "opacity-100" : "opacity-0"
        } transition absolute w-full h-full top-0 left-0 object-cover`}
      >
        <source src={`/pnc/pnc_slider_video0.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        // className="absolute top-0 left-0 w-full h-full object-cover z-1"
        className={`${
          index === 1 ? "opacity-100" : "opacity-0"
        } transition absolute w-full h-full top-0 left-0 object-cover`}
      >
        <source src={`/pnc/pnc_slider_video1.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <video
        autoPlay
        loop
        muted
        playsInline
        // className="absolute top-0 left-0 w-full h-full object-cover z-1"
        className={`${
          index === 2 ? "opacity-100" : "opacity-0"
        } transition absolute w-full h-full top-0 left-0 object-cover`}
      >
        <source src={`/pnc/pnc_slider_video2.mp4`} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="relative z-10 w-full max-w-[1180px] mx-auto text-center sm:text-left md:pb-[32px]">
        {/* 데스크탑 타이틀 */}
        <div className="hidden sm:block mb-[16px]">
          <h1 className="font-bold text-[50px] leading-tight md:pl-[16px]">
            <span className="text-white">P</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>
              ittsburgh{" "}
            </span>
            <span className="text-white">N</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>ational </span>
            <br />
            <span className="text-white">C</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>
              orporation
            </span>
          </h1>
        </div>

        {/* 모바일 타이틀 */}
        <div className="block sm:hidden text-left mb-[40px] px-[16px]">
          <h1 className="font-bold text-[26px] leading-snug max-w-[330px]">
            <span className="text-white">P</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>
              ittsburgh{" "}
            </span>
            <br />
            <span className="text-white">N</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>ational </span>
            <br />
            <span className="text-white">C</span>
            <span style={{ color: "rgba(255, 255, 255, 0.78)" }}>
              orporation
            </span>
          </h1>
        </div>

        {/* 슬라이드 박스 */}
        <div className="hidden sm:flex items-center justify-between rounded-xl h-[104px] bg-black/70 px-[24px]">
          <div className="flex items-center gap-[24px] text-[14px]">
            <div className="flex items-center gap-[8px] font-medium">
              {slides.map((num, i) => (
                <div key={i} className="flex items-center gap-[8px]">
                  <span
                    className={`transition-colors duration-300 ${
                      i === index ? "text-red-500" : "text-white/60"
                    }`}
                  >
                    {num}
                  </span>
                  <div
                    className={`${
                      i === index ? "w-[24px]" : "w-0"
                    } h-px bg-gray-500 transition-all`}
                  />
                </div>
              ))}
            </div>
            <p className="text-white/90 max-w-[700px] leading-relaxed">
              PNC 투자그룹은 싱가포르에 본사를 둔 개인 및 기업 금융, 자산관리
              디지털 솔루션 분야에서 포괄적인 서비스를 제공하는 선도적인
              금융기관입니다.
            </p>
          </div>

          <div className="flex gap-[8px]">
            <button
              onClick={handlePrev}
              className="w-[32px] h-[32px] flex items-center justify-center hover:opacity-80"
            >
              <img
                src="/assets/btn_left.png"
                alt="이전 슬라이드"
                className="w-[32px] h-[32px]"
              />
            </button>
            <button
              onClick={handleNext}
              className="w-[32px] h-[32px] flex items-center justify-center hover:opacity-80"
            >
              <img
                src="/assets/btn_right.png"
                alt="다음 슬라이드"
                className="w-[32px] h-[32px]"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
