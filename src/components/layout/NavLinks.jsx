import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { ChevronDown } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", exact: true },
  { name: "Shop", path: "/products", exact: true },
  {
    name: "Clothing",
    dropdown: true,
    subItems: [
      { name: "Men", path: "/products?category=men's clothing" },
      { name: "Women", path: "/products?category=women's clothing" },
    ],
  },
  { name: "Jewelry", path: "/products?category=jewelery" },
  { name: "Electronics", path: "/products?category=electronics" },
  { name: "About", path: "/about", exact: true },
  { name: "Contact", path: "/contact", exact: true },
];

const NavLinks = ({ mobile = false, onClick, transparent = false }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState(null);
  const dropdownRef = useRef(null);
  const currentCategory = new URLSearchParams(location.search).get("category");

  // Close dropdown on route change
  useEffect(() => {
    setOpenDropdown(null);
  }, [location.pathname, location.search]);

  // Close dropdown when clicking outside (desktop only)
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(null);
      }
    };
    if (!mobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [mobile]);

  const isActive = (item) => {
    if (item.exact) {
      if (item.path === "/") return location.pathname === "/";
      if (item.path === "/products") return location.pathname === "/products" && !currentCategory;
      return location.pathname === item.path;
    }
    const itemCategory = new URLSearchParams(item.path.split("?")[1] || "").get("category");
    return location.pathname === "/products" && currentCategory === itemCategory;
  };

  const isSubItemActive = (subPath) => {
    const subCategory = new URLSearchParams(subPath.split("?")[1] || "").get("category");
    return location.pathname === "/products" && currentCategory === subCategory;
  };

  const handleDropdownToggle = (name) => {
    setOpenDropdown(openDropdown === name ? null : name);
  };

  const handleLinkClick = (callback) => {
    setOpenDropdown(null);
    if (callback) callback();
  };

  const linkClasses = (active, isDropdownTrigger = false) => {
    let base = "text-sm font-medium transition-colors duration-200 relative";
    if (transparent) {
      base += active ? " text-white" : " text-white/70 hover:text-white";
    } else {
      base += active
        ? " text-gray-900 dark:text-white"
        : " text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
    }
    if (active && !mobile && !isDropdownTrigger) {
      base += transparent
        ? " after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-white"
        : " after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-amber-400";
    }
    return base;
  };

  const renderDropdown = (item) => {
    const isOpen = openDropdown === item.name;
    const anySubActive = item.subItems.some(sub => isSubItemActive(sub.path));
    const triggerClasses = linkClasses(anySubActive, true);

    return (
      <div key={item.name} className="relative" ref={dropdownRef}>
        <button
          onClick={() => handleDropdownToggle(item.name)}
          className={`${triggerClasses} inline-flex items-center gap-1 cursor-pointer`}
        >
          {item.name}
          <ChevronDown className={`h-3 w-3 transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
        </button>
        {isOpen && (
          <div
            className={`${
              mobile
                ? "pl-4 mt-2"
                : "absolute top-full left-0 mt-2 bg-white dark:bg-gray-900 shadow-lg rounded-lg border border-gray-200 dark:border-gray-700 min-w-[160px] z-20"
            }`}
          >
            <div className={`${mobile ? "flex flex-col gap-3" : "py-2"}`}>
              {item.subItems.map((sub) => {
                const activeSub = isSubItemActive(sub.path);
                // Improved sub-item classes – fixed mobile hover background
                let subClass = "block text-sm px-4 py-2 transition-colors";
                if (mobile) {
                  // Mobile: use gray-100 for hover (much better than white)
                  subClass += activeSub
                    ? " text-gray-900 dark:text-white font-medium bg-gray-100 dark:bg-gray-800"
                    : " text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-gray-800";
                } else {
                  // Desktop dropdown
                  if (transparent) {
                    subClass += activeSub
                      ? " text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-800"
                      : " text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800";
                  } else {
                    subClass += activeSub
                      ? " text-gray-900 dark:text-white font-medium"
                      : " text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white hover:bg-gray-50 dark:hover:bg-gray-800";
                  }
                }
                return (
                  <Link
                    key={sub.name}
                    to={sub.path}
                    onClick={() => handleLinkClick(onClick)}
                    className={subClass}
                  >
                    {sub.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className={`flex ${mobile ? "flex-col gap-4" : "items-center gap-6"}`}>
      {navItems.map((item) => {
        if (item.dropdown) {
          return renderDropdown(item);
        }
        const active = isActive(item);
        return (
          <Link
            key={item.name}
            to={item.path}
            onClick={() => handleLinkClick(onClick)}
            className={linkClasses(active)}
          >
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;