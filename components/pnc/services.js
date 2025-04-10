import React from 'react';

const services = [
  {
    img: '/assets/service_mts.png',
    title: 'MTS',
    desc: 'Mobile Trading System',
  },
  {
    img: '/assets/service_hts.png',
    title: 'HTS',
    desc: 'Home Trading System',
  },
  {
    img: '/assets/service_wts.png',
    title: 'WTS',
    desc: 'Web Trading System',
  },
];

const Services = () => {
  return (
    <section className="bg-white border-t border-b border-gray-200 h-[185px] relative overflow-hidden">
      {/* 경계선 (데스크탑) */}
      <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-[1180px] -translate-x-1/2 z-10 pointer-events-none">
        <div className="absolute inset-y-0 left-0 w-px bg-gray-200" />
        <div className="absolute inset-y-0 left-[33.33%] w-px bg-gray-200" />
        <div className="absolute inset-y-0 left-[66.66%] w-px bg-gray-200" />
        <div className="absolute inset-y-0 right-0 w-px bg-gray-200" />
      </div>

      {/* 경계선 (모바일) */}
      <div className="md:hidden absolute inset-y-0 left-[33.33%] w-px bg-gray-200" />
      <div className="md:hidden absolute inset-y-0 left-[66.66%] w-px bg-gray-200" />

      {/* 콘텐츠 */}
      <div className="w-full px-4">
        <div className="max-w-[1180px] mx-auto h-full flex md:grid md:grid-cols-3 items-center justify-end text-center gap-4 md:gap-0">
          {services.map((item, idx) => (
            <div key={idx} className="flex flex-col items-center gap-1">
              <img src={item.img} alt={item.title} className="h-16" />
              <h3 className="text-lg font-bold">{item.title}</h3>
              <p className="text-sm text-gray-500">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
