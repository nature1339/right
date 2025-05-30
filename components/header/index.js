import HeaderPublicKr from "@components/header/headerPublicKr";
import HeaderMeta5Kr from "@components/header/headerMeta5Kr";
import HeaderOcbc from "@components/header/headerOcbc";
import HeaderPNC from "@components/header/headerPNC";
import { getSiteName } from "@utils/common";

export default function Header() {
  const siteName = getSiteName();

  if (siteName === "public") {
    return <HeaderPublicKr />;
  }

  if (siteName === "meta5") {
    return <HeaderMeta5Kr />;
  }

  if (siteName === "ocbc") {
    return <HeaderOcbc />;
  }

  if (siteName === "pnc") {
    return <HeaderPNC />;
  }

  return <HeaderPublicKr />;
}
