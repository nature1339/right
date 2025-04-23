import { getSiteName } from "@utils/common";
import NoticePnc from "./noticePnc";

import { useRouter } from "next/navigation";
import userStore from "store/user";

export default function CompanyIntro() {
  const router = useRouter();
  const { userInfo, isLoading } = userStore();

  if (isLoading || userInfo?.userid) {
    return <></>;
  }

  const siteName = getSiteName();

  if (siteName === "pnc") {
    return <NoticePnc />;
  }

  return <></>;
}
