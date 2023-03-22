import Head from 'next/head';

export default function MetaHead() {
  return (
    <Head>
      <link rel="shortcut icon" href="/static/favicon.ico" />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/static/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/static/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/static/favicon-16x16.png"
      />
      <link rel="manifest" href="/static/site.webmanifest" />
      <link
        rel="mask-icon"
        href="/static/safari-pinned-tab.svg"
        color="#5bbad5"
      />
      <meta name="msapplication-TileColor" content="#52B69A" />
      <meta name="theme-color" content="#ffffff"></meta>
      <title>BISTIME</title>
      <meta name="theme-color" content="#000000" />
      <meta
        name="viewport"
        content="initial-scale=1.0, width=device-width, maximum-scale=1.0, user-scalable=no"
      />
      <meta name="og:description" content="편리한 시간관리 도구, 비즈타임" />
      <meta property="og:title" content="BISTIME" />
      <meta property="og:type" content="website" />
    </Head>
  );
}
