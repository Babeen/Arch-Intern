import { Link, useLocation } from "react-router-dom";
import { ChevronRight, Home } from "lucide-react";

const Breadcrumbs = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  if (pathnames.length === 0) return null;

  const formatLabel = (str) =>
    str.split("-").map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(" ");

  return (
    <nav className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400 mb-6">
      <Link to="/" className="flex items-center gap-1 hover:text-gray-900 dark:hover:text-white transition-colors">
        <Home className="h-4 w-4" />
        <span>Home</span>
      </Link>
      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;
        return (
          <div key={name} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-gray-900 dark:text-white font-medium">{formatLabel(name)}</span>
            ) : (
              <Link to={routeTo} className="hover:text-gray-900 dark:hover:text-white transition-colors">
                {formatLabel(name)}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
};

export default Breadcrumbs;
