import type { AppProps } from 'next/app';
import '../styles/globals.css';
import { Provider } from 'react-redux';
import store from '../features/store';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { SWRConfig } from 'swr';
// import instance from '@apis/_axios/instance';

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SWRConfig
    // value={{
    //   fetcher: (url: string) => instance.get(url).then((res) => res.data),
    // }}
    >
      <div className="mx-auto w-full max-w-[375px]">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </div>
    </SWRConfig>
  );
}
