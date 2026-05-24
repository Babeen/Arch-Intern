import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const NavLinks = ({ mobile = false, onClick, transparent = false }) => {
  return (
    <div className={`flex ${mobile ? "flex-col gap-6" : "items-center gap-8"}`}>
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={onClick}
          className={({ isActive }) =>
            `text-sm font-medium transition-colors duration-300 ${
              transparent
                ? isActive ? "text-amber-300" : "text-white/80 hover:text-white"
                : isActive ? "text-amber-500" : "text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
            }`
          }
        >
          {item.name}
        </NavLink>
      ))}
    </div>
  );
};

export default NavLinks;