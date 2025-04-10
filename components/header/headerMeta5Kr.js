import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import themeStore from "store/theme";
import userStore from "store/user";
import NoticeModal from "@components/noticeModal";
import SettingModal from "@components/settingModal";
import { ImBullhorn } from "react-icons/im";
import useScrollPosition from "@react-hook/window-scroll";
import clsx from "clsx";
import CashIcon from "@components/icons/cashIcon";
import CounselingIcon from "@components/icons/counselingIcon";
import HistoryIcon from "@components/icons/historyIcon";
import OvernightIcon from "@components/icons/overnightIcon";
import OrderIcon from "@components/icons/orderIcon";
import { useTranslation } from "react-i18next";

export default function HeaderMeta5Kr() {
  const { t } = useTranslation();

  const router = useRouter();
  const { userInfo } = userStore();

  // 내비게이션 목록
  const gnbList = [
    { path: "orders", txt: t("통합주문"), icon: OrderIcon },
    { path: "cash", txt: t("입/출금"), icon: CashIcon },
    { path: "history", txt: t("거래내역"), icon: HistoryIcon },
    { path: "ovnight", txt: t("오버나잇"), icon: OvernightIcon },
    { path: "counseling", txt: t("상담센터"), icon: CounselingIcon },
    // { path: "copy-trading", txt: "카피트레이딩" },
  ];

  // 테마 토글
  const { theme, toggleTheme } = themeStore();
  const [siteName, mode] = theme.split("-");

  // 공지사항 모달
  const [noticeModalOpen, setNoticeModalOpen] = useState(false);
  const openNoticeModal = () => {
    if (!userInfo.userid) {
      return;
    }
    setNoticeModalOpen(true);
  };
  const closeNoticeModal = () => setNoticeModalOpen(false);

  // 설정 모달
  const [settingModalOpen, setSettingModalOpen] = useState(false);
  const openSettingModal = () => setSettingModalOpen(true);
  const closeSettingModal = () => setSettingModalOpen(false);

  // 헤더 위치에따른 색상
  const [isSticky, setIsSticky] = useState(false);
  const scrollY = useScrollPosition(60);

  useEffect(() => {
    setIsSticky(scrollY > 0);
  }, [scrollY]);

  return (
    <>
      <header className={clsx("bg-white", isSticky && "bg-opacity-90")}>
        <div className="header_wrap">
          <a href="/">
            <img
              src={
                mode === "light" || router.pathname === "/"
                  ? `/images/logo_meta5kr.com.svg`
                  : `/images/dark_logo_meta5kr.com.svg`
              }
              className="aspect-[300/81] w-[165px]"
            />
          </a>
          {userInfo.userid && (
            <nav className="gnb">
              <ul>
                {gnbList.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      router.pathname == "/" + item.path ? "on" : undefined
                    }
                  >
                    <Link href={"/" + item.path}>{item.txt}</Link>
                  </li>
                ))}
                <li className="hd_notice">
                  <button onClick={() => openNoticeModal()}>
                    {t("공지사항")}
                  </button>
                </li>
              </ul>
            </nav>
          )}
          <ul className="setting_wrap">
            {userInfo.userid ? (
              <>
                {/* 로그인했을 때 */}
                {router.pathname != "/" && (
                  <li className="mode" id="header-mode">
                    <div className="switch_wrap">
                      <input
                        type="checkbox"
                        id="switch"
                        checked={mode === "dark"}
                        onChange={toggleTheme}
                      />
                      <label htmlFor="switch" className="switch_label">
                        <span className="onf_btn !bg-primary"></span>
                      </label>
                    </div>
                  </li>
                )}

                <li className="user">{userInfo.userid}</li>
                <li className="notice">
                  <button onClick={() => openNoticeModal()}>
                    <ImBullhorn />
                  </button>
                </li>
                <li className="setting" onClick={() => openSettingModal()}>
                  setting
                </li>
              </>
            ) : (
              <>
                {/* 로그인 전 */}
                <li>
                  <Link className="btn login" href="/login">
                    {t("로그인")}
                  </Link>
                </li>
                <li>
                  <Link href="/join" className="btn signup">
                    {t("회원가입")}
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </header>
      {userInfo.userid && (
        <div className="mobile_menu">
          <ul>
            {gnbList.map((item, idx) => (
              <li
                key={idx}
                className={`${item.path}${
                  router.pathname == "/" + item.path ? " on" : ""
                }`}
              >
                <Link href={"/" + item.path}>{item.txt}</Link>
              </li>
            ))}
          </ul>
        </div>
      )}
      {/* 공지사항 모달 */}
      <NoticeModal isOpen={noticeModalOpen} onClose={closeNoticeModal} />
      {/* 설정 모달 */}
      <SettingModal isOpen={settingModalOpen} onClose={closeSettingModal} />
    </>
  );
}
