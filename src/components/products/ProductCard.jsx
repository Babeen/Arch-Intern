import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag } from "lucide-react";
import { useCart } from "../../context/CartContext";
import QuickViewModal from "./QuickViewModal";

const SIZES = ["S", "M", "L", "XL"];
const CLOTHING_CATEGORIES = ["men's clothing", "women's clothing"];

// Matches the fadeUp variant used on Home and Products
const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();
  const [showModal, setShowModal] = useState(false);
  const [selectedSize, setSelectedSize] = useState(null);
  const hoverImage = product.image + "?v=2";

  return (
    <>
      {/* whileInView + stagger matches Home bestseller cards */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-60px" }}
        custom={index}
        className="group bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg overflow-hidden hover:shadow-lg hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-300 flex flex-col h-full"
      >
        {/* Image area */}
        <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6 border-b border-gray-100 dark:border-gray-800">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="absolute h-52 object-contain transition-all duration-700 ease-in-out group-hover:opacity-0 group-hover:scale-95"
          />
          <img
            src={hoverImage}
            alt={product.title}
            loading="lazy"
            className="absolute h-52 object-contain opacity-0 scale-95 transition-all duration-700 ease-in-out group-hover:opacity-100 group-hover:scale-100"
          />

          {/* Quick View — same hover reveal pattern as Home category cards */}
          <button
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10 flex items-center gap-1.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-semibold px-4 py-2 shadow-lg border border-gray-200 dark:border-gray-700 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900 transition-all duration-300 whitespace-nowrap rounded-full"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>

        {/* Card body */}
        <div className="p-4 flex flex-col gap-2.5 flex-1">
          <Link to={`/products/${product.id}`}>
            <h2 className="font-medium text-gray-900 dark:text-white line-clamp-2 text-sm hover:text-amber-500 transition-colors leading-snug">
              {product.title}
            </h2>
          </Link>

          {CLOTHING_CATEGORIES.includes(product.category) && (
            <div className="flex gap-1.5 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={(e) => { e.preventDefault(); e.stopPropagation(); setSelectedSize(selectedSize === size ? null : size); }}
                  className={`text-xs px-2.5 py-1 border rounded-lg font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "border-gray-300 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500 dark:hover:border-white dark:hover:text-white"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Price + Add to Cart — matches Home bestseller card layout */}
          <div className="flex items-center justify-between mt-auto pt-2 border-t border-gray-100 dark:border-gray-800">
            <span className="text-lg font-bold text-gray-900 dark:text-white">${product.price}</span>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 text-sm font-semibold px-4 py-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showModal && (
          <QuickViewModal key="quick-view" product={product} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
