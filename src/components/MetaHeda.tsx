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
      <meta
        name="description"
        content="모임 시간을 잡는 손쉬운 방법, 비즈타임"
      />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="https://bistime.app" />
      <meta
        property="og:title"
        content="모임 시간을 잡는 손쉬운 방법, 비즈타임"
      />
      <meta property="og:image" content="/static/og-image.png" />
      <meta property="og:site_name" content="BISTIME" />
      <meta property="og:locale" content="en_US" />
    </Head>
  );
}
