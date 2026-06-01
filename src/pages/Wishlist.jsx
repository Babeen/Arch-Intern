import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Trash2, ShoppingBag, ArrowRight, Star, Share2 } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";
import { useToast } from "../context/ToastContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.5, delay: i * 0.07, ease: "easeOut" },
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

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const toast = useToast();

  const handleMoveToCart = (product) => {
    addToCart(product);
    removeFromWishlist(product.id);
  };

  const handleMoveAllToCart = () => {
    wishlist.forEach((p) => addToCart(p));
    clearWishlist();
    toast.success(`${wishlist.length} items moved to cart`);
  };

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    toast.info("Wishlist link copied to clipboard");
  };

  return (
    <MainLayout>
      {/* ── Page header ── */}
      <div className="bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-white/5 pt-24 pb-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div variants={fadeUp} initial="hidden" animate="show">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-500 font-semibold mb-2">
              My Account
            </p>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white leading-none flex items-center gap-4">
                  Wishlist
                  <Heart className="h-10 w-10 text-red-400 fill-red-400" />
                </h1>
                <p className="mt-3 text-gray-500 dark:text-gray-400">
                  {wishlist.length === 0
                    ? "Your wishlist is empty."
                    : `${wishlist.length} item${wishlist.length !== 1 ? "s" : ""} saved`}
                </p>
              </div>

              {wishlist.length > 0 && (
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleShare}
                    className="flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-gray-600 dark:text-gray-400 border border-gray-200 dark:border-gray-700 rounded-full hover:border-gray-400 dark:hover:border-gray-500 transition-colors"
                  >
                    <Share2 className="h-4 w-4" />
                    Share
                  </button>
                  <button
                    onClick={handleMoveAllToCart}
                    className="flex items-center gap-2 px-5 py-2.5 text-sm font-bold bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                  >
                    <ShoppingBag className="h-4 w-4" />
                    Move All to Cart
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {wishlist.length === 0 ? (
          /* ── Empty state ── */
          <motion.div
            className="text-center py-28 space-y-6"
            variants={fadeUp}
            initial="hidden"
            animate="show"
          >
            <div className="relative inline-block">
              <div className="w-28 h-28 rounded-full bg-red-50 dark:bg-red-400/10 flex items-center justify-center mx-auto">
                <Heart className="h-14 w-14 text-red-300 dark:text-red-400/50" />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-amber-400 flex items-center justify-center">
                <span className="text-gray-900 font-bold text-sm">0</span>
              </div>
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Nothing saved yet</h2>
              <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                Browse our collection and tap the heart icon on any product to save it here.
              </p>
            </div>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold px-8 py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 group"
            >
              Browse Products
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        ) : (
          /* ── Wishlist grid ── */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence mode="popLayout">
              {wishlist.map((product, i) => (
                <motion.div
                  key={product.id}
                  layout
                  variants={fadeUp}
                  initial="hidden"
                  animate="show"
                  exit={{ opacity: 0, scale: 0.9, transition: { duration: 0.2 } }}
                  custom={i}
                  className="group bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl overflow-hidden hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/30 hover:-translate-y-1 transition-all duration-300 flex flex-col"
                >
                  {/* Image */}
                  <div className="relative overflow-hidden bg-gray-50 dark:bg-gray-800/50 aspect-square flex items-center justify-center p-8">
                    <Link to={`/products/${product.id}`}>
                      <img
                        src={product.image}
                        alt={product.title}
                        className="h-full w-full object-contain transition-transform duration-700 group-hover:scale-110"
                      />
                    </Link>

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 dark:group-hover:bg-black/30 transition-colors duration-300 pointer-events-none" />

                    {/* Category badge */}
                    <span className="absolute top-3 left-3 text-[10px] font-bold uppercase tracking-wider bg-white/90 dark:bg-gray-900/90 text-gray-700 dark:text-gray-300 px-2.5 py-1 rounded-full backdrop-blur-sm">
                      {product.category}
                    </span>

                    {/* Remove button */}
                    <button
                      onClick={() => removeFromWishlist(product.id)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white dark:bg-gray-900 shadow-md flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-1 group-hover:translate-y-0 transition-all duration-300 hover:bg-red-50 dark:hover:bg-red-500/10 hover:scale-110"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="h-3.5 w-3.5 text-red-400" />
                    </button>
                  </div>

                  {/* Body */}
                  <div className="p-5 flex flex-col gap-3 flex-1">
                    {product.rating && (
                      <StarRating rating={product.rating.rate} count={product.rating.count} />
                    )}

                    <Link to={`/products/${product.id}`}>
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm leading-snug hover:text-amber-500 transition-colors">
                        {product.title}
                      </h3>
                    </Link>

                    <div className="flex items-center justify-between mt-auto pt-3 border-t border-gray-100 dark:border-gray-800">
                      <span className="text-xl font-bold text-gray-900 dark:text-white">
                        ${product.price}
                      </span>
                      <button
                        onClick={() => handleMoveToCart(product)}
                        className="flex items-center gap-1.5 text-xs font-bold px-4 py-2.5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 rounded-xl hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
                      >
                        <ShoppingBag className="h-3.5 w-3.5" />
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* ── Bottom CTA ── */}
        {wishlist.length > 0 && (
          <motion.div
            className="mt-16 text-center"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <p className="text-gray-500 dark:text-gray-400 text-sm mb-4">
              Want to keep browsing?
            </p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 text-sm font-bold text-gray-900 dark:text-white hover:text-amber-500 transition-colors group"
            >
              Continue Shopping
              <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </motion.div>
        )}
      </div>
    </MainLayout>
  );
};

export default Wishlist;
