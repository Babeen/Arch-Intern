import { Link } from "react-router-dom";
import { Mail } from "lucide-react";
import logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="py-12 grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          
          <div className="col-span-2 md:col-span-4 lg:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <img src={logo} alt="Logo" style={{ height: "56px" }} className="w-auto object-contain" />
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed mb-6 max-w-sm">
              Premium fashion and lifestyle products for the modern individual. Quality you can trust, style you can own.
            </p>
            <div className="space-y-3">
              <p className="text-xs font-semibold text-gray-900 dark:text-white uppercase tracking-wide">
                Stay Updated
              </p>
              <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-3 py-2 text-sm border border-gray-300 dark:border-gray-700 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-md hover:bg-amber-400 hover:text-gray-900 transition-colors text-sm font-medium"
                >
                  <Mail className="h-4 w-4" />
                </button>
              </form>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Shop</h3>
            <ul className="space-y-2.5">
              {[
                { label: "All Products", path: "/products" },
                { label: "Men's Clothing", path: "/products?category=men's clothing" },
                { label: "Women's Clothing", path: "/products?category=women's clothing" },
                { label: "Electronics", path: "/products?category=electronics" },
                { label: "Jewelry", path: "/products?category=jewelery" },
              ].map((link) => (
                <li key={link.label}>
                  <Link to={link.path} className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Support</h3>
            <ul className="space-y-2.5">
              {["Contact Us", "Shipping Info", "Returns", "Size Guide", "Track Order"].map((label) => (
                <li key={label}>
                  <Link to="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wide mb-4">Company</h3>
            <ul className="space-y-2.5">
              {["About Us", "Careers", "Sustainability", "Privacy Policy", "Terms of Service"].map((label) => (
                <li key={label}>
                  <Link to="#" className="text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="py-6 border-t border-gray-200 dark:border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            © {currentYear} Arch-Intern. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Twitter" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"/></svg>
            </a>
            <a href="#" aria-label="YouTube" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
            </a>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-gray-400">We accept:</span>
            <div className="flex gap-1.5">
              {["VISA", "MC", "AMEX", "PAYPAL"].map((method) => (
                <div key={method} className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-bold text-gray-600 dark:text-gray-400">
                  {method}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
