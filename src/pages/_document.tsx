import MetaHead from '@components/MetaHeda';
import { Html, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html>
      <MetaHead />
      <body className="text-16">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
