import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import logo from "../../assets/images/logo.png";

const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");

const Navbar = ({ transparent = false }) => {
  const { user, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const navigate = useNavigate();

  useEffect(() => {
    if (!transparent) return;
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [transparent]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = () => {
    logout();
    setDropdownOpen(false);
    navigate("/");
  };

  const getNavbarBackground = () => {
    if (!transparent) {
      return "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800";
    }
    if (scrolled) {
      return "bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-b border-gray-200 dark:border-gray-800";
    }
    return "bg-transparent shadow-none";
  };

  const isLightMode = !transparent || scrolled;

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${getNavbarBackground()}`}>
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center shrink-0">
            <img
              src={logo}
              alt="Logo"
              style={{ height: "56px" }}
              className="w-auto object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </Link>

          <div className="hidden lg:flex">
            <NavLinks mobile={false} transparent={!isLightMode} />
          </div>

          <div className="flex items-center gap-4">
            <Link to="/cart" className="relative group">
              <ShoppingCart
                className={`w-5 h-5 transition-colors duration-300 ${
                  isLightMode ? "text-gray-700 dark:text-white" : "text-white"
                }`}
              />
              {cartCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-amber-400 text-gray-900 text-[10px] px-1.5 py-0.5 rounded-full font-bold min-w-[18px] text-center">
                  {cartCount}
                </span>
              )}
            </Link>

            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isLightMode ? "text-gray-700 dark:text-white" : "text-white"
                  }`}
                >
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-[11px] font-bold transition-colors ${
                      isLightMode
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "bg-white/20 text-white"
                    }`}
                  >
                    {getInitials(user?.name || user?.email)}
                  </div>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform duration-200 hidden sm:block ${
                      dropdownOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-lg shadow-xl border border-gray-200 dark:border-gray-800 overflow-hidden z-50">
                    <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">
                        {user?.name || "Account"}
                      </p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-amber-500 transition-colors"
                    >
                      <User className="h-4 w-4" /> My Profile
                    </Link>
                    <Link
                      to="/cms"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-amber-500 transition-colors border-t border-gray-100 dark:border-gray-800"
                    >
                      <LayoutDashboard className="h-4 w-4" /> CMS Panel
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center gap-2.5 px-4 py-3 text-sm text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
                    >
                      <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="hidden lg:flex items-center gap-3">
                <Link
                  to="/login"
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isLightMode
                      ? "text-gray-700 dark:text-white hover:text-gray-900"
                      : "text-white/90 hover:text-white"
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className={`text-sm font-semibold px-5 py-2 rounded-md transition-all duration-300 ${
                    isLightMode
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-amber-400 hover:text-gray-900"
                      : "bg-white text-gray-900 hover:bg-amber-400 hover:text-gray-900"
                  }`}
                >
                  Sign Up
                </Link>
              </div>
            )}

            <button
              className="lg:hidden"
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className={`w-6 h-6 ${isLightMode ? "text-gray-900 dark:text-white" : "text-white"}`} />
              ) : (
                <Menu className={`w-6 h-6 ${isLightMode ? "text-gray-900 dark:text-white" : "text-white"}`} />
              )}
            </button>
          </div>
        </div>

        <MobileMenu isOpen={isOpen} setIsOpen={setIsOpen} transparent={!isLightMode} />
      </nav>
    </header>
  );
};

export default Navbar;
