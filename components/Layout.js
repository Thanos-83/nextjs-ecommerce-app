import NavBar from './Header/NavBar';
import Footer from './Footer';
export default function Layout({ children }) {
  return (
    <div className='body_container'>
      <NavBar />
      <main className='main_content'>{children}</main>
      <Footer />
    </div>
  );
}
