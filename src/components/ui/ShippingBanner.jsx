import { Truck, X } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const ShippingBanner = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        className="bg-amber-400 text-gray-900 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2.5 flex items-center justify-between gap-4">
          <div className="flex items-center justify-center gap-2 flex-1 text-sm font-semibold">
            <Truck className="h-4 w-4" />
            <span>Free Shipping on Orders Over $50 | Shop Now!</span>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="shrink-0 hover:opacity-70 transition-opacity"
            aria-label="Close banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ShippingBanner;
