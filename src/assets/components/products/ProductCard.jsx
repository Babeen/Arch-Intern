/**
 * ProductCard.jsx
 *
 * WHAT IS THIS?
 * The card component shown in the product grid. Each product gets one card.
 *
 * KEY CONCEPTS USED HERE:
 *
 * 1. useState for modal open/close
 *    - `showModal` is a boolean. false = modal hidden, true = modal visible.
 *    - Clicking "Quick View" sets it to true. Closing the modal sets it to false.
 *
 * 2. Image hover swap
 *    - The Fake Store API only gives us ONE image per product.
 *    - Real brand sites (Zara, ASOS) store a second image per product in their DB.
 *    - We simulate this by using a slightly different placeholder as the "hover image".
 *    - Both images are stacked (absolute positioned) in the same container.
 *    - The hover image has opacity-0 by default and opacity-100 on group-hover.
 *    - CSS transition makes it fade in smoothly.
 *    - When you connect a real backend, just replace `hoverImage` with product.images[1].
 *
 * 3. Size pills on the card
 *    - A row of S/M/L/XL buttons that appear on hover (opacity-0 → opacity-100).
 *    - Clicking a size sets `selectedSize` state.
 *    - e.preventDefault() stops the click from triggering the <Link> navigation.
 *    - e.stopPropagation() stops it bubbling further up the DOM.
 *
 * 4. AnimatePresence
 *    - Imported from framer-motion.
 *    - Wraps the QuickViewModal so it can animate OUT when showModal becomes false.
 *    - Without AnimatePresence, the modal would just disappear instantly with no exit animation.
 *    - The `key` prop on the modal tells React which element to animate.
 *
 * 5. group / group-hover (Tailwind CSS)
 *    - Adding `group` to a parent element lets child elements react to the parent's hover.
 *    - `group-hover:opacity-100` means: "when the GROUP (parent) is hovered, set MY opacity to 100".
 *    - This is how we show the Quick View button and hover image only when the card is hovered.
 */

import { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Eye } from "lucide-react";
import { useCart } from "../../context/CartContext";
import QuickViewModal from "./QuickViewModal";

const SIZES = ["S", "M", "L", "XL"];

// Size pills only make sense for clothing — not electronics or jewelery
const CLOTHING_CATEGORIES = ["men's clothing", "women's clothing"];

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();

  // Controls whether the Quick View modal is visible
  const [showModal, setShowModal] = useState(false);

  // Tracks which size pill is selected on the card
  const [selectedSize, setSelectedSize] = useState(null);

  // ── Simulated second image ─────────────────────────────────────────────────
  // The API gives one image. We create a slightly different version for the hover.
  // In a real project: const hoverImage = product.images?.[1] ?? product.image;
  const hoverImage = product.image + "?v=2";

  return (
    <>
      {/* ── The Card ──*/}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="group bg-white dark:bg-gray-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-500 flex flex-col h-full"
      >

        {/* ── Image Area ──*/}
        <div className="relative h-64 overflow-hidden bg-gray-50 dark:bg-gray-800 flex items-center justify-center p-6">

          {/* Primary image */}
          <img
            src={product.image}
            alt={product.title}
            loading="lazy"
            className="absolute h-52 object-contain transition-all duration-700 ease-in-out
                       group-hover:opacity-0 group-hover:scale-95"
          />

          {/* Hover image */}
          <img
            src={hoverImage}
            alt={product.title}
            loading="lazy"
            className="absolute h-52 object-contain opacity-0 scale-95 transition-all duration-700 ease-in-out
                       group-hover:opacity-100 group-hover:scale-100"
          />

          {/* Category badge — top left */}
          <span className="absolute top-3 left-3 bg-black/70 text-white text-xs px-2.5 py-1 rounded-full capitalize z-10">
            {product.category}
          </span>

          {/* ── Quick View Button ──*/}
          <button
            onClick={(e) => { e.stopPropagation(); setShowModal(true); }}
            className="absolute bottom-3 left-1/2 -translate-x-1/2 z-10
                       flex items-center gap-1.5 bg-white dark:bg-gray-900 text-gray-900 dark:text-white
                       text-xs font-semibold px-4 py-2 rounded-full shadow-lg
                       opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0
                       hover:bg-amber-400 hover:text-gray-900
                       transition-all duration-300 whitespace-nowrap"
          >
            <Eye className="h-3.5 w-3.5" />
            Quick View
          </button>
        </div>

        {/* ── Card Body ── */}
        <div className="p-4 flex flex-col gap-3 flex-1">

          {/* Product title*/}
          <Link to={`/products/${product.id}`}>
            <h2 className="font-semibold text-gray-900 dark:text-white line-clamp-2 text-sm
                           hover:text-amber-500 transition-colors leading-snug">
              {product.title}
            </h2>
          </Link>

          {/* ── Size Pills — only for clothing categories ──*/}
          {CLOTHING_CATEGORIES.includes(product.category) && (
            <div className="flex gap-1.5 flex-wrap">
              {SIZES.map((size) => (
                <button
                  key={size}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setSelectedSize(selectedSize === size ? null : size);
                  }}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-medium transition-all duration-200 ${
                    selectedSize === size
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                      : "border-gray-200 dark:border-white/10 text-gray-500 dark:text-gray-400 hover:border-amber-400 hover:text-amber-500"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          )}

          {/* Price + Add to Cart — pushed to bottom with mt-auto */}
          <div className="flex items-center justify-between mt-auto pt-1">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                addToCart({ ...product, size: selectedSize });
              }}
              className="text-xs font-semibold bg-gray-900 dark:bg-white text-white dark:text-gray-900
                         px-4 py-2 rounded-full hover:bg-amber-400 hover:text-gray-900
                         transition-all duration-300"
            >
              Add
            </button>
          </div>

        </div>
      </motion.div>

      {/* ── Quick View Modal ──*/}
      <AnimatePresence>
        {showModal && (
          <QuickViewModal
            key="quick-view"
            product={product}
            onClose={() => setShowModal(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;
