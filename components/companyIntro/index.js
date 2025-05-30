import { getSiteName } from "@utils/common";
import CompanyIntroOcbc from "./companyIntroOcbc";
import CompanyIntroPnc from "./companyIntroPnc";

import { useRouter } from "next/navigation";
import userStore from "store/user";

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
    return <CompanyIntroOcbc />;
  }

  if (siteName === "pnc") {
    return <CompanyIntroPnc />;
  }

  return <></>;
}
