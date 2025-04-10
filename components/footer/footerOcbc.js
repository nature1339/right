import { useTranslation } from "react-i18next";

export default function FooterOcbc() {
  const { t } = useTranslation();

  return (
    <footer>
      <div className="footer-wrap">
        <div className="info-wrap">
          <img
            className="aspect-[145/39] w-[120px] max-md:w-[100px] max-md:ml-[20px] max-md:mb-[20px]"
            src={`/images/dark_logo_ocbckr.com.png`}
          />
          <div className="icon-wrap">
            <p>
              {t(
                "모든 컨텐츠 저작권은 Ocbc에 있으며, 무단도용시 법적 불이익을 받습니다."
              )}
              <br />
              Copyright © OCBC. All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
