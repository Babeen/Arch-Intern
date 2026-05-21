import { useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import Button from "../ui/Button";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../../context/ThemeContext";


const Navbar = () => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const { cart } = useCart();
  const cartCount = cart.reduce(
  (sum, item) => sum + item.quantity,
  0
  );
  const { darkMode, toggleTheme } =
  useTheme();

  return (
    <header className="sticky top-0 z-50 bg-white dark:bg-gray-900 shadow-md transition-colors duration-300">
      <nav className="max-w-7xl mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          
          {/* Logo */}
          <h1 className="text-2xl font-bold text-blue-600 dark:text-blue-400">
            Arch-Intern
          </h1>

          {/* Desktop Navigation */}
          <div className="hidden md:flex">
            <NavLinks />
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-4">

            {/* Cart */}
            <Link to="/cart" className="relative">
              
              <ShoppingCart className="w-6 h-6 text-gray-700 dark:text-white" />

              <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs px-1.5 py-0.5 rounded-full">
                {cartCount}
              </span>

            </Link>

            {/* Auth */}
            {user ? (
              <button
                onClick={logout}
                className="text-sm font-medium text-red-500"
              >
                Logout
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-4">
                
                <Link
                  to="/login"
                  className="text-sm font-medium text-gray-700 dark:text-white"
                >
                  Login
                </Link>

                <Link to="/signup">
                  <Button className="px-4 py-2">
                    Signup
                  </Button>
                </Link>
                <button onClick={toggleTheme}>
                  {darkMode ? (
                    <Sun className="w-6 h-6" />
                  ) : (
                    <Moon className="w-6 h-6" />
                  )}
                </button>

              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="w-7 h-7" />
              ) : (
                <Menu className="w-7 h-7" />
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