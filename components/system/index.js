import SystemOcbc from "./systemOcbc";
import SystemPnc from "./systemPnc";
import { useRouter } from "next/navigation";
import userStore from "store/user";
import { getSiteName } from "@utils/common";

export default function CompanyIntro() {
  const router = useRouter();
  const { userInfo, isLoading } = userStore();

  if (userInfo?.userid) {
    router.push("/orders");
  }

  if (isLoading || userInfo?.userid) {
    return <></>;
  }

  const siteName = getSiteName();

  if (siteName === "ocbc") {
    return <SystemOcbc />;
  }

  if (siteName === "pnc") {
    return <SystemPnc />;
  }

  return <></>;
}
