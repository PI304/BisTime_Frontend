import '../styles/globals.css';

import store from '@features/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { QueryClient, QueryClientProvider } from 'react-query';

import type { AppProps } from 'next/app';
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      refetchInterval: 1000,
    },
  },
});

const persistor = persistStore(store);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <div className="font-Gmarket font-medium mx-auto w-full max-w-[375px]">
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Component {...pageProps} />
          </PersistGate>
        </Provider>
      </div>
    </QueryClientProvider>
  );
}

export { queryClient };
