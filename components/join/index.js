import JoinCommon from "@components/join/joinCommon";
import JoinPNC from "@components/join/joinPNC";
import { getSiteName } from "@utils/common";

export default function Intro() {
  const siteName = getSiteName();

  if (siteName === "pnc") {
    return <JoinPNC />;
  }

  return <JoinCommon />;
}
