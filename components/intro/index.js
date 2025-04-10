import IntroPublicKr from "@components/intro/introPublicKr";
import IntroMeta5Kr from "@components/intro/introMeta5Kr";
import IntroOcbc from "@components/intro/introOcbc";
import IntroPNC from "@components/intro/introPNC";
import { getSiteName } from "@utils/common";

export default function Intro() {
  const siteName = getSiteName();
  if (siteName === "public") {
    return <IntroPublicKr />;
  }

  if (siteName === "meta5") {
    return <IntroMeta5Kr />;
  }

  if (siteName === "ocbc") {
    return <IntroOcbc />;
  }

  if (siteName === "pnc") {
    return <IntroPNC />;
  }

  return <IntroPublicKr />;
}
