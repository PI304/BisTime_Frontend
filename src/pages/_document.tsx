import MetaHeadContent from '@components/MetaHedaContent';
import { Html, Main, NextScript, Head } from 'next/document';

export default function Document() {
  return (
    <Html>
      <Head>
        <MetaHeadContent />
      </Head>
      <body className="text-16">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
