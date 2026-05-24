import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const { darkMode, toggleTheme } = useTheme();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  const isTransparent = transparent && !scrolled;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isTransparent
          ? "bg-white/10 backdrop-blur-sm shadow-none"
          : "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md shadow-md"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">

          {/* Logo */}
          <h1 className={`text-2xl font-bold transition-colors duration-300 ${
            isTransparent ? "text-white" : "text-gray-900 dark:text-white"
          }`}>
            Arch-Intern
          </h1>

          {/* Desktop Navigation */}
          <div className={`hidden md:flex transition-colors duration-300 ${
            isTransparent ? "text-white" : ""
          }`}>
            <NavLinks transparent={isTransparent} />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <Link to="/cart" className="relative">
              <ShoppingCart className={`w-6 h-6 transition-colors duration-300 ${
                isTransparent ? "text-white" : "text-gray-700 dark:text-white"
              }`} />
              <span className="absolute -top-2 -right-2 bg-amber-400 text-gray-900 text-xs px-1.5 py-0.5 rounded-full font-semibold">
                {cartCount}
              </span>
            </Link>

            {/* Auth */}
            {user ? (
              <button onClick={logout} className="text-sm font-medium text-red-500">
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isTransparent ? "text-white/90 hover:text-white" : "text-gray-700 dark:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`text-sm font-semibold px-5 py-2 rounded-full transition-all duration-300 ${
                    isTransparent
                      ? "bg-white text-gray-900 hover:bg-amber-400"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-amber-400 hover:text-gray-900"
                  }`}
                >
                  Signup
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
              {isOpen ? (
                <X className={`w-7 h-7 ${isTransparent ? "text-white" : ""}`} />
              ) : (
                <Menu className={`w-7 h-7 ${isTransparent ? "text-white" : ""}`} />
              )}
            </button>

          </div>
        </div>

        {/* Mobile Menu */}
        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} />
      </nav>
    </header>
  );
};

export default Navbar;