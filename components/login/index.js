import LoginCommon from "@components/login/LoginCommon";
import LoginPNC from "@components/login/LoginPNC";
import { getSiteName } from "@utils/common";

export default function Intro() {
  const siteName = getSiteName();

  if (siteName === "pnc") {
    return <LoginPNC />;
  }

  return <LoginCommon />;
}
