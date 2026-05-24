import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children, transparentNav = false }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950 transition-colors duration-300">
      <Navbar transparent={transparentNav} />
      <main className="text-gray-800 dark:text-white transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;