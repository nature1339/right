import Head from "next/head";

export default function HeadPublicKr({ title }) {
  return (
    <Head>
      <title>{`${title} : Public`}</title>
      <link rel="shortcut icon" href="favicon.ico" />
    </Head>
  );
}
