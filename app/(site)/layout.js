import '../../styles/globals.css';
import Providers from './Providers';

import Header from './Header';
import Footer from './Footer';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='root_layout flex flex-col min-h-screen'>
        <Providers>
          <Header />
          <main className='flex-1'>{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}