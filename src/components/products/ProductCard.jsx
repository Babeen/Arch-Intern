import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, ShoppingBag, Star, Heart } from "lucide-react";
import { useCart } from "../../context/CartContext";
import { useWishlist } from "../../context/WishlistContext";
import QuickViewModal from "./QuickViewModal";

const SIZES = ["XS", "S", "M", "L", "XL"];
const CLOTHING_CATEGORIES = ["men's clothing", "women's clothing"];

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: "easeOut" },
  }),
};

const StarRating = ({ rating = 0, count = 0 }) => (
  <div className="flex items-center gap-1.5">
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((s) => (
        <Star
          key={s}
          className={`h-3 w-3 ${s <= Math.round(rating) ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}`}
          fill="currentColor"
        />
      ))}
    </div>
    {count > 0 && <span className="text-[10px] text-gray-400">({count})</span>}
  </div>
);

/* ── Grid Card ── */
const GridCard = ({ product, index, onQuickView }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(null);
  const isClothing = CLOTHING_CATEGORIES.includes(product.category);
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-40px" }}
      custom={index}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-400 flex flex-col"
    >
      {/* Image */}
      <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800/50 aspect-square flex items-center justify-center p-8">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-700 ease-out group-hover:scale-110"
        />

        {/* Overlay actions */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-300" />

        {/* Wishlist */}
        <button
          onClick={(e) => { e.preventDefault(); toggleWishlist(product); }}
          className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:scale-110"
          title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-3.5 w-3.5 transition-colors ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
        </button>

        {/* Category badge */}
        <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
          {product.category}
        </span>

        {/* Quick view */}
        <button
          onClick={(e) => { e.stopPropagation(); onQuickView(); }}
          className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-xs font-semibold px-5 py-2 rounded-full shadow-lg opacity-0 translate-y-3 group-hover:opacity-100 group-hover:translate-y-0 hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 whitespace-nowrap border border-gray-100 dark:border-gray-700"
        >
          <Eye className="h-3.5 w-3.5" />
          Quick View
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        {/* Rating */}
        {product.rating && <StarRating rating={product.rating.rate} count={product.rating.count} />}

        {/* Title */}
        <Link to={`/products/${product.id}`}>
          <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug hover:text-amber-500 transition-colors">
            {product.title}
          </h2>
        </Link>

        {/* Sizes */}
        {isClothing && (
          <div className="flex gap-1.5 flex-wrap">
            {SIZES.map((size) => (
              <button
                key={size}
                onClick={(e) => { e.preventDefault(); setSelectedSize(selectedSize === size ? null : size); }}
                className={`text-[10px] px-2.5 py-1 border rounded-lg font-semibold tracking-wide transition-all duration-200 ${
                  selectedSize === size
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                    : "border-gray-200 dark:border-gray-700 text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        )}

        {/* Price + CTA */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
          <div>
            <span className="text-xl font-bold text-gray-900 dark:text-white">${product.price}</span>
          </div>
          <button
            onClick={() => addToCart(product)}
            className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 group/btn"
          >
            <ShoppingBag className="h-3.5 w-3.5 group-hover/btn:scale-110 transition-transform" />
            Add to Cart
          </button>
        </div>
      </div>
    </motion.div>
  );
};

/* ── List Card ── */
const ListCard = ({ product, index, onQuickView }) => {
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const wishlisted = isWishlisted(product.id);

  return (
    <motion.div
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-20px" }}
      custom={index}
      className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-lg hover:shadow-black/5 dark:hover:shadow-black/20 transition-all duration-300 flex gap-0"
    >
      {/* Image */}
      <div className="relative w-40 sm:w-52 shrink-0 bg-gray-50 dark:bg-gray-800/50 flex items-center justify-center p-6 overflow-hidden">
        <img
          src={product.image}
          alt={product.title}
          loading="lazy"
          className="h-32 w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <span className="absolute top-2 left-2 text-[9px] font-bold uppercase tracking-wider bg-white/90 dark:bg-gray-900/90 text-gray-600 dark:text-gray-400 px-2 py-0.5 rounded-full">
          {product.category}
        </span>
      </div>

      {/* Content */}
      <div className="flex-1 p-5 flex flex-col justify-between min-w-0">
        <div className="space-y-2">
          {product.rating && <StarRating rating={product.rating.rate} count={product.rating.count} />}
          <Link to={`/products/${product.id}`}>
            <h2 className="font-semibold text-gray-900 dark:text-white text-base leading-snug hover:text-amber-500 transition-colors line-clamp-2">
              {product.title}
            </h2>
          </Link>
          <p className="text-xs text-gray-500 dark:text-gray-400 line-clamp-2 leading-relaxed">
            {product.description}
          </p>
        </div>
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
          <span className="text-2xl font-bold text-gray-900 dark:text-white">${product.price}</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => toggleWishlist(product)}
              className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-red-300 transition-colors"
              title={wishlisted ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart className={`h-4 w-4 ${wishlisted ? "text-red-500 fill-red-500" : "text-gray-400"}`} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); onQuickView(); }}
              className="w-9 h-9 rounded-xl border border-gray-200 dark:border-gray-700 flex items-center justify-center hover:border-amber-400 hover:text-amber-500 transition-colors text-gray-400"
            >
              <Eye className="h-4 w-4" />
            </button>
            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 text-sm font-bold px-5 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            >
              <ShoppingBag className="h-4 w-4" />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

/* ── Main export ── */
const ProductCard = ({ product, index = 0, viewMode = "grid" }) => {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {viewMode === "list"
        ? <ListCard product={product} index={index} onQuickView={() => setShowModal(true)} />
        : <GridCard product={product} index={index} onQuickView={() => setShowModal(true)} />
      }
      <AnimatePresence>
        {showModal && (
          <QuickViewModal key="quick-view" product={product} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
