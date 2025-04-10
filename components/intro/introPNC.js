/////////🖥️
import Footer from "@components/footer/footerPNC";
import Header from "@components/header/headerPNC";
import Hero from "@components/pnc/hero";
import Services from "@components/pnc/services";
import Events from "@components/pnc/events";
import Market from "@components/pnc/market";
import Notices from "@components/pnc/notices";
import InvestmentNotice from "@components/pnc/investmentNotice";
/////////🖥️

export default function introPNC() {
  return (
    <>
      <Header />
      <Hero />
      <Services />
      <Events />
      <Market />
      <Notices />
      <InvestmentNotice />
      <Footer />
    </>
  );
}
