import CountUp from "react-countup";
import { Swiper, SwiperSlide } from "swiper/react";
import { EffectCards, Autoplay, Pagination, Navigation } from "swiper/modules";
import { GoPeople } from "react-icons/go";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  activateCopyTrader,
  followCopyTrader,
  getCopyTraderInfo,
  getCopyTraders,
  unfollowCopyTrader,
} from "utils/api/copyTrading";
import clsx from "clsx";
import {
  MdClose,
  MdKeyboardArrowLeft,
  MdKeyboardArrowRight,
} from "react-icons/md";
import Modal from "react-modal";
import Footer from "@components/footer";
import CopyTradingRoiChart from "@components/copyTrading/copyTradingRoiChart";

import { useState } from "react";
import { termsAgree } from "@constants/copyTrading";
import Toggle from "react-toggle";
import themeStore from "store/theme";
import useToast from "hooks/toast";
import ToastModal from "@components/toastModal";
import moment from "moment";

import "swiper/css";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "react-toggle/style.css";

export default function CopyTrading() {
  const { theme } = themeStore();
  const [siteName, mode] = theme.split("-");

  const { isVisible, message, showToast } = useToast();
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [activeTraderId, setActiveTraderId] = useState("");
  const [isAgree, setIsAgree] = useState(false);

  const { data: copyTraderInfo } = useQuery({
    queryKey: ["copyTraderInfo"],
    queryFn: getCopyTraderInfo,
  });

  const { data: copyTraders, refetch: refetchCopyTraders } = useQuery({
    queryKey: ["copyTraders"],
    queryFn: getCopyTraders,
  });

  const { mutate: followCopyTraderMutate } = useMutation({
    mutationFn: followCopyTrader,
    onSuccess: () => {
      setActiveTraderId("");
      setIsOpenModal(false);
      refetchCopyTraders();
    },
    onError: (error) => {
      setActiveTraderId("");
      setIsOpenModal(false);
      showToast(error.message);
    },
  });

  const { mutate: unfollowCopyTraderMutate } = useMutation({
    mutationFn: unfollowCopyTrader,
    onSuccess: () => {
      refetchCopyTraders();
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const { mutate: activateCopyTraderMutate } = useMutation({
    mutationFn: activateCopyTrader,
    onSuccess: () => {
      refetchCopyTraders();
    },
    onError: (error) => {
      showToast(error.message);
    },
  });

  const onOpenCopyModal = (traderId) => {
    setIsOpenModal(true);
    setActiveTraderId(traderId);
  };

  const onCloseCopyModal = () => {
    setActiveTraderId("");
    setIsAgree(false);
  };

  const onFollow = () => {
    followCopyTraderMutate(activeTraderId);
  };

  const onUnFollow = (traderId) => {
    unfollowCopyTraderMutate(traderId);
  };

  const onToggleActive = (traderId) => {
    activateCopyTraderMutate(traderId);
  };

  return (
    <>
      <section className="bg-gray-100 dark:bg-[#2b3139]">
        <div className="max-w-[1400px] w-full h-[360px] flex justify-between mx-auto items-center px-[20px] max-md:flex-col max-md:justify-center max-md:gap-10">
          <div className="flex flex-col gap-16">
            <div className="font-bold text-7xl leading-relaxed text-gray-800 dark:text-gray-100 max-2xl:text-[36px] max-md:text-[20px]">
              현명한 투자, <br />
              카피 트레이딩으로 시작하세요!
            </div>
            <div className="flex gap-20 max-md:hidden">
              <div className="flex flex-col gap-4">
                <CountUp
                  className="font-bold text-4xl text-gray-800 dark:text-gray-100"
                  start={0}
                  end={copyTraderInfo?.totalTraders}
                  duration={2}
                  suffix="+"
                />
                <div className="text-2xl text-gray-400">전문가 트레이더</div>
              </div>
              <div className="flex flex-col gap-4">
                <CountUp
                  className="font-bold text-4xl text-gray-800 dark:text-gray-100"
                  start={0}
                  end={copyTraderInfo?.totalFollowers}
                  duration={2}
                  suffix="+"
                />
                <div className="text-2xl text-gray-400">팔로워</div>
              </div>
              <div className="flex flex-col gap-4">
                <CountUp
                  className="font-bold text-4xl text-gray-800 dark:text-gray-100"
                  start={0}
                  end={copyTraderInfo?.totalProfit}
                  duration={2}
                  prefix="₩"
                  suffix="+"
                />
                <div className="text-2xl text-gray-400">총수익금</div>
              </div>
            </div>
          </div>
          <div className="px-10">
            <Swiper
              effect={"cards"}
              grabCursor={true}
              navigation={{
                prevEl: ".card-swiper-prev",
                nextEl: ".card-swiper-next",
              }}
              modules={[EffectCards, Autoplay, Pagination, Navigation]}
              autoplay={{
                delay: 5000,
              }}
              loop
              className="w-[480px] h-[240px] relative max-2xl:w-[320px] max-2xl:h-[160px]"
            >
              <SwiperSlide className="bg-[#303030] rounded-2xl shadow-md"></SwiperSlide>
              <SwiperSlide className="bg-[#e0e3eb] rounded-2xl shadow-md"></SwiperSlide>
              <button className="absolute card-swiper-prev top-[50%] -left-[60px] max-2xl:-left-[26px] -translate-y-1/2 bg-primary w-[40px] h-[40px] max-2xl:w-[30px] max-2xl:h-[30px] rounded-full z-[1] text-white flex items-center justify-center">
                <MdKeyboardArrowLeft className="w-12 h-12 max-2xl:w-6 max-2xl:h-6" />
              </button>
              <button className="absolute card-swiper-next top-[50%] -right-[50px] max-2xl:-right-[26px] -translate-y-1/2 bg-primary w-[40px] h-[40px] max-2xl:w-[30px] max-2xl:h-[30px] rounded-full z-[1] text-white flex items-center justify-center">
                <MdKeyboardArrowRight className="w-12 h-12 max-2xl:w-6 max-2xl:h-6" />
              </button>
            </Swiper>
          </div>
          <div className="gap-16 flex md:hidden">
            <div className="flex flex-col gap-4">
              <CountUp
                className="font-bold text-2xl text-gray-800 dark:text-gray-100"
                start={0}
                end={copyTraderInfo?.totalTraders}
                duration={2}
                suffix="+"
              />
              <div className="text-2xl text-gray-400">전문가 트레이더</div>
            </div>
            <div className="flex flex-col gap-4">
              <CountUp
                className="font-bold text-2xl text-gray-800 dark:text-gray-100"
                start={0}
                end={copyTraderInfo?.totalFollowers}
                duration={2}
                suffix="+"
              />
              <div className="text-2xl text-gray-400">팔로워</div>
            </div>
            <div className="flex flex-col gap-4">
              <CountUp
                className="font-bold text-2xl text-gray-800 dark:text-gray-100"
                start={0}
                end={copyTraderInfo?.totalProfit}
                duration={2}
                prefix="₩"
                suffix="+"
              />
              <div className="text-2xl text-gray-400">총수익금</div>
            </div>
          </div>
        </div>
      </section>
      <section className="bg-white dark:bg-[#181a20] py-12">
        <div className="max-w-[1400px] w-full mx-auto px-[20px]">
          <div className="text-4xl text-gray-800 dark:text-gray-100 max-md:text-[20px] font-bold flex items-center gap-3">
            <img src="/images/copyTrading/hot.png" className="w-14" />
            최상위 인증 트레이더
          </div>
          <div className="mt-12 text-5xl font-bold text-gray-800 dark:text-gray-100 max-md:text-[20px]">
            프로 인증 트레이더
          </div>
          <div className="relative">
            <Swiper
              modules={[Navigation]}
              navigation={{
                prevEl: ".pro-trader-swiper-prev",
                nextEl: ".pro-trader-swiper-next",
              }}
              slidesPerView={1}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              breakpoints={{
                768: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
                1400: {
                  slidesPerView: 4,
                },
              }}
              className="mt-5 h-[500px] !py-4 relative"
            >
              {copyTraders?.map((copyTrader, index) => (
                <SwiperSlide
                  key={copyTrader.traderId}
                  className="border border-solid border-gray-200 rounded-2xl shadow-md  p-10"
                >
                  <div className="flex gap-5 items-center">
                    <img
                      // src={faker.image.avatar()}
                      src={
                        [
                          "https://avatars.githubusercontent.com/u/68588999",
                          "https://avatars.githubusercontent.com/u/27822895",
                          "https://avatars.githubusercontent.com/u/88975821",
                          "https://avatars.githubusercontent.com/u/20902255",
                          "https://avatars.githubusercontent.com/u/43137388",
                          "https://avatars.githubusercontent.com/u/72613460",
                          "https://avatars.githubusercontent.com/u/72613460",
                          "https://avatars.githubusercontent.com/u/1411653",
                          "https://avatars.githubusercontent.com/u/72210821",
                          "https://avatars.githubusercontent.com/u/32076244",
                        ][index % 10]
                      }
                      className="w-[60px] h-[60px] rounded-full max-md:w-[48px] max-md:h-[48px]"
                    />
                    <div className="flex flex-col gap-3 flex-1">
                      <div className="flex justify-between">
                        <div className="bg-[#303030] text-[12px] text-white rounded-full shadow-md  flex justify-center items-center px-4 py-[4px] self-start gap-2">
                          <img
                            src="/images/copyTrading/pro.png"
                            className="w-8"
                          />
                          ProTrader
                        </div>
                        <div className="flex items-center gap-1 text-[12px] text-gray-400">
                          <GoPeople />
                          {`${copyTrader.currentFollowerCount}/${copyTrader.totalFollowerCount}`}
                        </div>
                      </div>
                      <div className="text-3xl font-bold text-gray-800 dark:text-gray-100">
                        {copyTrader.traderId}
                      </div>
                    </div>
                  </div>
                  <div
                    className={clsx(
                      "mt-10 text-5xl font-extrabold max-md:text-[20px]",
                      copyTrader.roi > 0
                        ? "text-[#ff0000] dark:text-[#f44a57]"
                        : "text-[#4169e1] dark:text-[#00bfff]"
                    )}
                  >
                    {copyTrader.roi.toFixed(2)}%
                  </div>
                  <div className="text-[12px] mt-10 text-gray-400">
                    최근 한달 승률
                  </div>
                  <CopyTradingRoiChart
                    data={[
                      { createAt: "2025-01-22", profit: 40 },
                      { createAt: "2025-01-21", profit: 30 },
                      { createAt: "2025-01-20", profit: -10 },
                      { createAt: "2025-01-19", profit: 5 },
                      { createAt: "2025-01-18", profit: -20 },
                      { createAt: "2025-01-17.", profit: -25 },
                      { createAt: "2025-01-16", profit: 39 },
                    ]}
                  />
                  <div className="flex justify-between text-[14px] mt-10">
                    <div className="text-gray-500 dark:text-gray-400">
                      최근 한달 승률
                    </div>
                    <div className="text-gray-800 dark:text-gray-100 font-bold">
                      {copyTrader.roi.toFixed(2)}%
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] mt-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      최근 한달 수익
                    </div>
                    <div className="text-gray-800 dark:text-gray-100 font-bold">
                      ₩{copyTrader.totalProfit.toLocaleString()}
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] mt-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      총거래량
                    </div>
                    <div className="text-gray-800 dark:text-gray-100 font-bold">
                      {copyTrader.totalOrderCount}
                    </div>
                  </div>
                  <div className="flex justify-between text-[14px] mt-1">
                    <div className="text-gray-500 dark:text-gray-400">
                      트레이더 가입일
                    </div>
                    <div className="text-gray-800 dark:text-gray-100 font-bold">
                      {moment(copyTrader.registerTime).format("YYYY-MM-DD")}
                    </div>
                  </div>
                  {copyTrader.isFollow ? (
                    <div className="flex mt-10 items-center justify-between">
                      <button
                        onClick={() => onUnFollow(copyTrader.traderId)}
                        className="flex-[2] h-[40px] text-white border border-solid border-gray-200 rounded-full dark:border-none  dark:text-gray-100 font-medium bg-primary "
                      >
                        팔로우
                      </button>
                      <div className="flex-1 flex items-center justify-center">
                        <Toggle
                          className="[&_.react-toggle-thumb]:!border-none [&_.react-toggle-track]:bg-gray-300"
                          checked={copyTrader.isActivated}
                          icons={false}
                          onChange={() => onToggleActive(copyTrader.traderId)}
                        />
                      </div>
                    </div>
                  ) : (
                    <button
                      onClick={() => onOpenCopyModal(copyTrader.traderId)}
                      className="w-full h-[40px] border border-solid border-gray-200 rounded-full mt-10 text-gray-800 dark:text-gray-100 font-medium"
                    >
                      복사하기
                    </button>
                  )}
                </SwiperSlide>
              ))}
            </Swiper>
            <button className="absolute pro-trader-swiper-prev top-[50%] -left-[60px] max-2xl:-left-[16px] -translate-y-1/2 bg-primary  w-[40px] h-[40px] rounded-full text-white flex items-center justify-center z-[1] max-md:w-[30px] max-md:h-[30px]">
              <MdKeyboardArrowLeft className="w-12 h-12" />
            </button>
            <button className="absolute pro-trader-swiper-next top-[50%] -right-[60px] max-2xl:-right-[16px] -translate-y-1/2 bg-primary  w-[40px] h-[40px] rounded-full z-[1] text-white flex items-center justify-center max-md:w-[30px] max-md:h-[30px]">
              <MdKeyboardArrowRight className="w-12 h-12" />
            </button>
          </div>
        </div>
      </section>
      <Modal
        ariaHideApp={false}
        isOpen={isOpenModal}
        onAfterClose={onCloseCopyModal}
        overlayClassName="fixed inset-0 z-[100] bg-[#0009]"
        className={clsx(
          "w-[720px] h-[70vh] top-1/2 max-md:w-[90%] left-1/2 absolute outline-none p-[20px] overflow-auto -translate-x-1/2 -translate-y-1/2 rounded-md dark:bg-[#2b3139] border border-solid border-gray-200",
          mode === "light" ? "bg-white" : "bg-[#2b3139]",
          theme
        )}
      >
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-center">
            <div
              className={clsx(
                "font-bold text-4xl",
                mode === "light" ? "text-gray-800" : "text-gray-100"
              )}
            >
              카피트레이드 동의
            </div>
            <button onClick={() => setIsOpenModal(false)}>
              <MdClose
                className={clsx(
                  "w-[24px] h-[24px]",
                  mode === "light" ? "text-gray-800" : "text-gray-100"
                )}
              />
            </button>
          </div>
          <textarea
            className={clsx(
              "mt-10 flex-1 border-gray-200 resize-none rounded-md p-4",
              mode === "light" ? "bg-white" : "bg-gray-500 text-white"
            )}
            value={termsAgree}
            readOnly
          />
          <div className="flex gap-2 mt-10 justify-between">
            <label className="flex gap-2 items-center">
              <input
                className="w-7 h-7"
                type="checkbox"
                checked={isAgree}
                onChange={() => setIsAgree((prev) => !prev)}
              />
              <div
                className={clsx(
                  mode === "light" ? "text-gray-800" : "text-gray-100"
                )}
              >
                약관을 내용을 읽고 동의합니다.
              </div>
            </label>
            <button
              onClick={onFollow}
              disabled={!isAgree}
              className={clsx(
                "w-[80px] h-[40px] text-white rounded-[.4rem] bg-primary disabled:bg-gray-300"
              )}
            >
              확인
            </button>
          </div>
        </div>
      </Modal>
      <Footer />
      <ToastModal message={message} isVisible={isVisible} />
    </>
  );
}
