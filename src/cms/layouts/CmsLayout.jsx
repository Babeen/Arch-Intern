import { useState } from "react";
import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  LayoutDashboard, Image, Package, MessageSquare, Tag,
  Mail, LogOut, Menu, X, Sun, Moon, ChevronRight,
} from "lucide-react";

const navItems = [
  { path: "/cms", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/cms/hero", label: "Hero Section", icon: Image },
  { path: "/cms/products", label: "Products Showcase", icon: Package },
  { path: "/cms/testimonials", label: "Testimonials", icon: MessageSquare },
  { path: "/cms/promotions", label: "Promotions", icon: Tag },
  { path: "/cms/newsletter", label: "Newsletter", icon: Mail },
];

const CmsLayout = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 transition-all duration-300 ${
          sidebarOpen ? "w-60" : "w-16"
        }`}
      >
        {/* Logo row */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-100 dark:border-gray-800 shrink-0">
          {sidebarOpen && (
            <span className="text-sm font-bold text-gray-900 dark:text-white tracking-wide">
              CMS Panel
            </span>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-1.5 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors ml-auto"
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav items */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                    : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                }`
              }
            >
              <Icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom: theme + logout */}
        <div className="px-2 py-4 border-t border-gray-100 dark:border-gray-800 space-y-1 shrink-0">
          <button
            onClick={toggleTheme}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white transition-colors"
          >
            {darkMode ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            {sidebarOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors"
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>
        </div>
      </aside>

      {/* ── Main content ── */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-60" : "ml-16"}`}>
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 flex items-center justify-between px-6 shrink-0">
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span>CMS</span>
            <ChevronRight className="h-3 w-3" />
            <span className="text-gray-700 dark:text-gray-200 font-medium">Content Manager</span>
          </div>
          <div className="flex items-center gap-3">
            <NavLink
              to="/"
              className="text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors"
            >
              ← View Storefront
            </NavLink>
            <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-white flex items-center justify-center text-[11px] font-bold text-white dark:text-gray-900">
              {(user?.name || user?.email || "A").slice(0, 2).toUpperCase()}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CmsLayout;
