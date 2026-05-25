import { useState, useEffect, useRef } from "react";
import { Menu, X, ShoppingCart, User, LogOut, ChevronDown } from "lucide-react";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import logo from "../../images/logo.png";

// Generate initials from name — same helper as Profile.jsx
const getInitials = (name = "") =>
  name.trim().split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");

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

  // Close dropdown when clicking outside of it
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
          <Link to="/" className="flex items-center">
            <img 
              src={logo} 
              alt="Logo" 
              className="h-10 w-auto object-contain transition-opacity duration-300 hover:opacity-80"
            />
          </Link>

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
              // ── Avatar dropdown ──────────────────────────────────────────
              // useRef tracks the dropdown container so we can detect outside clicks.
              // dropdownOpen toggles the menu visibility.
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className={`flex items-center gap-2 transition-colors duration-300 ${
                    isTransparent ? "text-white" : "text-gray-700 dark:text-white"
                  }`}
                >
                  {/* Avatar circle with initials */}
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                    isTransparent
                      ? "bg-white/20 text-white"
                      : "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                  }`}>
                    {getInitials(user?.name || user?.email)}
                  </div>
                  <ChevronDown className={`h-3.5 w-3.5 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 top-full mt-2 w-48 bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-50">
                    {/* User info header */}
                    <div className="px-4 py-3 border-b border-gray-100 dark:border-white/10">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name || "Account"}</p>
                      <p className="text-xs text-gray-400 truncate mt-0.5">{user?.email}</p>
                    </div>
                    <Link
                      to="/profile"
                      onClick={() => setDropdownOpen(false)}
                      className="flex items-center gap-2.5 px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-amber-500 transition-colors"
                    >
                      <User className="h-4 w-4" /> My Profile
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