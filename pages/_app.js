import '../styles/build.css';
import { SessionProvider } from 'next-auth/react';
import { store } from '../appStore/store';
import { Provider } from 'react-redux';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <SessionProvider session={pageProps.session}>
        <Component {...pageProps} />
      </SessionProvider>
    </Provider>
  );
}

export default MyApp;
