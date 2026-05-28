import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { X, ShoppingBag, ArrowUpRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

const SIZES = ["XS", "S", "M", "L", "XL"];
const CLOTHING_CATEGORIES = ["men's clothing", "women's clothing"];

const QuickViewModal = ({ product, onClose }) => {
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(null);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  const handleAdd = () => {
    addToCart({ ...product, size: selectedSize });
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      <motion.div
        className="relative z-10 bg-white dark:bg-gray-900 rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-gray-100 dark:bg-white/10 hover:bg-amber-400 hover:text-gray-900 transition-all duration-200"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="grid sm:grid-cols-2 gap-0">
          <div className="bg-gray-50 dark:bg-gray-800 rounded-t-3xl sm:rounded-l-3xl sm:rounded-tr-none flex items-center justify-center p-8 min-h-64">
            <img src={product.image} alt={product.title} className="h-56 object-contain" />
          </div>

          <div className="p-6 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold">{product.category}</p>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white leading-snug">{product.title}</h2>
            <p className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed line-clamp-3 text-justify">
              {product.description}
            </p>

            {CLOTHING_CATEGORIES.includes(product.category) && (
              <div>
                <p className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 mb-2">
                  Select Size
                </p>
                <div className="flex gap-2 flex-wrap">
                  {SIZES.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`w-10 h-10 rounded-xl text-sm font-semibold border transition-all duration-200 ${
                        selectedSize === size
                          ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                          : "border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500"
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2 mt-auto pt-2">
              <button
                onClick={handleAdd}
                className={`flex items-center justify-center gap-2 w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                  added
                    ? "bg-green-500 text-white"
                    : "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-amber-400 hover:text-gray-900"
                }`}
              >
                <ShoppingBag className="h-4 w-4" />
                {added ? "Added to Cart!" : "Add to Cart"}
              </button>
              <Link
                to={`/products/${product.id}`}
                onClick={onClose}
                className="flex items-center justify-center gap-1 w-full py-3 rounded-full font-semibold border border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 transition-all duration-200 text-sm"
              >
                View Full Details <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default QuickViewModal;
