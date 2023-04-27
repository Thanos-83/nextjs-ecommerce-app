import '../../styles/build.css';
// import '../globals.css';
import Providers from './Providers';

import Header from './Header';
import Footer from './Footer';
import SidebarCart from '../components/SidebarCart';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body className='root_layout flex flex-col min-h-screen'>
        <Providers>
          <Header />
          <main className='flex-1 bg-[#F1F1F1]'>{children}</main>
          <Footer />
          <SidebarCart />
        </Providers>
      </body>
    </html>
  );
}
