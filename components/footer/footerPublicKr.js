import { useTranslation } from "react-i18next";

export default function FooterPublic5Kr() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-wrap">
        <div className="info-wrap">
          <img className="footer-logo" src="/images/public_dark.png" alt="" />
          <div className="icon-wrap">
            <p>
              {t(
                "모든 컨텐츠 저작권은 Public에 있으며, 무단도용시 법적 불이익을 받습니다."
              )}
              <br />
              Copyright © {t("퍼블릭")}. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
