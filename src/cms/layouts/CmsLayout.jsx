import { useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";
import {
  LayoutDashboard, Image, Package, MessageSquare, Tag,
  Mail, LogOut, Menu, X, Sun, Moon, ChevronRight,
  Bell, Search, ExternalLink,
} from "lucide-react";

const navItems = [
  { path: "/cms", label: "Dashboard", icon: LayoutDashboard, end: true },
  { path: "/cms/hero", label: "Hero Section", icon: Image },
  { path: "/cms/products", label: "Products", icon: Package },
  { path: "/cms/testimonials", label: "Testimonials", icon: MessageSquare },
  { path: "/cms/promotions", label: "Promotions", icon: Tag },
  { path: "/cms/newsletter", label: "Newsletter", icon: Mail },
];

const pageTitles = {
  "/cms": "Dashboard",
  "/cms/hero": "Hero Section",
  "/cms/products": "Products Showcase",
  "/cms/testimonials": "Testimonials",
  "/cms/promotions": "Promotions",
  "/cms/newsletter": "Newsletter",
};

const CmsLayout = () => {
  const { user, logout } = useAuth();
  const { darkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const currentTitle = pageTitles[location.pathname] || "CMS";
  const initials = (user?.name || user?.email || "A").slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0a0a0f] flex font-sans" style={{ fontFamily: "'Outfit', sans-serif" }}>

      {/* ── Sidebar ── */}
      <aside
        className={`fixed top-0 left-0 h-full z-40 flex flex-col bg-white dark:bg-[#111118] border-r border-gray-100 dark:border-white/5 transition-all duration-300 shadow-sm ${
          sidebarOpen ? "w-64" : "w-[68px]"
        }`}
      >
        {/* Brand row */}
        <div className={`flex items-center h-16 border-b border-gray-100 dark:border-white/5 shrink-0 ${sidebarOpen ? "px-5 gap-3" : "justify-center px-0"}`}>
          {sidebarOpen && (
            <>
              <div className="w-8 h-8 rounded-lg bg-amber-400 flex items-center justify-center shrink-0">
                <LayoutDashboard className="h-4 w-4 text-gray-900" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-gray-900 dark:text-white leading-none">Arch CMS</p>
                <p className="text-[10px] text-gray-400 mt-0.5">Content Manager</p>
              </div>
            </>
          )}
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`p-1.5 rounded-md text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors ${!sidebarOpen ? "mx-auto" : ""}`}
          >
            {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-0.5 px-2.5 overflow-y-auto">
          {!sidebarOpen && <div className="h-2" />}
          {sidebarOpen && (
            <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest px-3 mb-3">Navigation</p>
          )}
          {navItems.map(({ path, label, icon: Icon, end }) => (
            <NavLink
              key={path}
              to={path}
              end={end}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group ${
                  isActive
                    ? "bg-amber-400 text-gray-900"
                    : "text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                } ${!sidebarOpen ? "justify-center" : ""}`
              }
              title={!sidebarOpen ? label : undefined}
            >
              <Icon className="h-4 w-4 shrink-0" />
              {sidebarOpen && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* Bottom */}
        <div className={`px-2.5 py-4 border-t border-gray-100 dark:border-white/5 space-y-0.5 shrink-0`}>
          <button
            onClick={toggleTheme}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white transition-colors ${!sidebarOpen ? "justify-center" : ""}`}
            title={!sidebarOpen ? (darkMode ? "Light Mode" : "Dark Mode") : undefined}
          >
            {darkMode ? <Sun className="h-4 w-4 shrink-0" /> : <Moon className="h-4 w-4 shrink-0" />}
            {sidebarOpen && <span>{darkMode ? "Light Mode" : "Dark Mode"}</span>}
          </button>
          <button
            onClick={handleLogout}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-red-400 hover:bg-red-50 dark:hover:bg-red-500/10 hover:text-red-500 transition-colors ${!sidebarOpen ? "justify-center" : ""}`}
            title={!sidebarOpen ? "Sign Out" : undefined}
          >
            <LogOut className="h-4 w-4 shrink-0" />
            {sidebarOpen && <span>Sign Out</span>}
          </button>

          {/* User chip */}
          {sidebarOpen && (
            <div className="mt-3 flex items-center gap-3 px-3 py-2.5 rounded-lg bg-gray-50 dark:bg-white/5">
              <div className="w-7 h-7 rounded-full bg-gray-900 dark:bg-amber-400 flex items-center justify-center text-[10px] font-bold text-white dark:text-gray-900 shrink-0">
                {initials}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{user?.name || "Admin"}</p>
                <p className="text-[10px] text-gray-400 truncate">{user?.email}</p>
              </div>
            </div>
          )}
        </div>
      </aside>

      {/* ── Main ── */}
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-[68px]"}`}>

        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-[#111118] border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="font-medium text-gray-500 dark:text-gray-400">CMS</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-semibold text-gray-900 dark:text-white">{currentTitle}</span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            <NavLink
              to="/"
              className="flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400 hover:text-amber-500 transition-colors px-3 py-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Storefront
            </NavLink>
            <button className="relative p-2 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Bell className="h-4 w-4" />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 bg-amber-400 rounded-full" />
            </button>
            <div className="w-8 h-8 rounded-full bg-gray-900 dark:bg-amber-400 flex items-center justify-center text-[11px] font-bold text-white dark:text-gray-900">
              {initials}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default CmsLayout;
