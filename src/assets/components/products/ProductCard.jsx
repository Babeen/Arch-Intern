import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useCart } from "../../context/CartContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
    >
      <Link to={`/products/${product.id}`} className="block">
        <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6">
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="h-full object-contain group-hover:scale-105 transition duration-500"
          />
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
      </Link>

      <div className="p-5 mt-auto space-y-3">
        <Link to={`/products/${product.id}`}>
          <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-2 hover:text-amber-500 transition-colors">
            {product.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
          <button
            onClick={() => addToCart(product)}
            className="text-sm font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900 px-4 py-1.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
          >
            Add
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
