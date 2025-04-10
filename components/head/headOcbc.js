import Head from "next/head";

export default function HeadOcbc({ title }) {
  return (
    <Head>
      <title>{`${title} : OCBC`}</title>
      <link rel="shortcut icon" href="favicon_ocbckr.com.ico" />
    </Head>
  );
}
