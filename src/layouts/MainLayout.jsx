import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import BackToTop from "../components/ui/BackToTop";
import ShippingBanner from "../components/ui/ShippingBanner";

const MainLayout = ({ children, transparentNav = false }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300 flex flex-col">
      {!transparentNav && <ShippingBanner />}
      <Navbar transparent={transparentNav} />
      <main className="text-gray-800 dark:text-white transition-colors duration-300 flex-1">
        {children}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default MainLayout;
