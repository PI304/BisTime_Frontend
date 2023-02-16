import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        {/* <meta
          httpEquiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        /> */}
      </Head>
      <body style={{ fontSize: '16px' }}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
