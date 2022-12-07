import NavBar from './NavBar';
import Footer from './Footer';
export default function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
