import HeadPublicKr from "@components/head/headPublicKr";
import HeadMeta5Kr from "@components/head/headMeta5Kr";
import HeadOcbc from "@components/head/headOcbc";
import { getSiteName } from "@utils/common";

export default function Head({ title }) {
  const siteName = getSiteName();

  if (siteName === "public") {
    return <HeadPublicKr title={title} />;
  }

  if (siteName === "meta5") {
    return <HeadMeta5Kr title={title} />;
  }

  if (siteName === "ocbc") {
    return <HeadOcbc title={title} />;
  }

  // others
  return <HeadPublicKr title={title} />;
}
