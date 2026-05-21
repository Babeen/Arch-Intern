import { NavLink } from "react-router-dom";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Products", path: "/products" },
];

const NavLinks = ({ mobile = false, onClick }) => {
  return (
    <div
      className={`flex ${
        mobile ? "flex-col gap-6" : "items-center gap-8"
      }`}
    >
      {navItems.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          onClick={onClick}
          className={({ isActive }) =>
            `font-medium transition duration-300 ${
              isActive
                ? "text-blue-600"
                : "text-gray-700 dark:text-gray-200 hover:text-blue-500"
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