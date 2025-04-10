import DomesticFuturesOcbc from "./domesticFuturesOcbc";
import { useRouter } from "next/navigation";
import userStore from "store/user";
import { getSiteName } from "@utils/common";

export default function domesticFutures() {
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
    return <DomesticFuturesOcbc />;
  }

  return <></>;
}
