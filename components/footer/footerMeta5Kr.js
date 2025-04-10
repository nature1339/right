import { useTranslation } from "react-i18next";

export default function FooterMeta5Kr() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-wrap">
        <div className="info-wrap">
          <img
            className="aspect-[300/81] w-[200px] px-[20px]"
            src={`/images/dark_logo_meta5kr.com.svg`}
          />
          <div className="text-[12px] px-[20px]">
            <p>
              {t(
                "모든 컨텐츠 저작권은 Meta5에 있으며, 무단도용시 법적 불이익을 받습니다."
              )}
              <br />
              Copyright © {t("메타트레이더5")}. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
