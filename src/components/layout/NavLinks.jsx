import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/", exact: true },
  { name: "Shop", path: "/products", exact: true },
  { name: "Men", path: "/products?category=men's clothing" },
  { name: "Women", path: "/products?category=women's clothing" },
  { name: "About", path: "/about", exact: true },
  { name: "Contact", path: "/contact", exact: true },
];

const NavLinks = ({ mobile = false, onClick, transparent = false }) => {
  const location = useLocation();
  const currentCategory = new URLSearchParams(location.search).get("category");

  const isActive = (item) => {
    if (item.exact) {
      if (item.path === "/") return location.pathname === "/";
      if (item.path === "/products") return location.pathname === "/products" && !currentCategory;
      // Other exact paths (about, contact, faq)
      return location.pathname === item.path;
    }
    // Category items: pathname must be /products AND category param must match
    const itemCategory = new URLSearchParams(item.path.split("?")[1] || "").get("category");
    return location.pathname === "/products" && currentCategory === itemCategory;
  };

  return (
    <div className={`flex ${mobile ? "flex-col gap-4" : "items-center gap-6"}`}>
      {navItems.map((item) => {
        const active = isActive(item);
        let classes = "text-sm font-medium transition-colors duration-200 relative";

        if (transparent) {
          classes += active ? " text-white" : " text-white/70 hover:text-white";
        } else {
          classes += active
            ? " text-gray-900 dark:text-white"
            : " text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white";
        }

        if (active && !mobile) {
          classes += transparent
            ? " after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-white"
            : " after:absolute after:bottom-[-4px] after:left-0 after:right-0 after:h-[2px] after:bg-amber-400";
        }

        return (
          <Link key={item.name} to={item.path} onClick={onClick} className={classes}>
            {item.name}
          </Link>
        );
      })}
    </div>
  );
};

export default NavLinks;
