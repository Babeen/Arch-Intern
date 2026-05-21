import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-950 transition-colors duration-300">
      <Navbar />

      <main className="max-w-7xl mx-auto px-6 py-10 text-gray-800 dark:text-white transition-colors duration-300">
        {children}
      </main>
    </div>
  );
};

export default MainLayout;