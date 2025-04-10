import FooterPublicKr from "@components/footer/footerPublicKr";
import FooterMeta5Kr from "@components/footer/footerMeta5Kr";
import FooterOcbc from "@components/footer/footerOcbc";
import FooterPNC from "@components/footer/footerPNC";
import { getSiteName } from "@utils/common";

export default function Footer() {
  const siteName = getSiteName();

  if (siteName === "public") {
    return <FooterPublicKr />;
  }

  if (siteName === "meta5") {
    return <FooterMeta5Kr />;
  }

  if (siteName === "ocbc") {
    return <FooterOcbc />;
  }

  if (siteName === "pnc") {
    return <FooterPNC />;
  }

  return <FooterPublicKr />;
}
