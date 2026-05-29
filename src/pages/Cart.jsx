import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight, ShoppingCart } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  // Track which items are selected for checkout
  const [selectedIds, setSelectedIds] = useState(() => new Set(cart.map((item) => item.id)));

  const toggleItem = (id) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const allSelected = cart.length > 0 && selectedIds.size === cart.length;
  const toggleAll = () => {
    if (allSelected) {
      setSelectedIds(new Set());
    } else {
      setSelectedIds(new Set(cart.map((item) => item.id)));
    }
  };

  const selectedItems = cart.filter((item) => selectedIds.has(item.id));
  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const fullTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (selectedItems.length === 0) return;
    navigate("/checkout");
  };

  return (
    <MainLayout>
      <PageWrapper>
        {/* Header */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionHeader label="Your Bag" title="Shopping Cart" />
        </motion.div>

        {cart.length === 0 ? (
          <motion.div
            className="text-center py-28 space-y-4"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.5}
          >
            <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything yet.</p>
            <Link to="/products">
              <Button className="rounded-full mt-2">
                Browse Products <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-10 space-y-6 lg:space-y-0">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-4">
              {/* Select all row */}
              <motion.div
                className="flex items-center gap-3 px-1 pb-2 border-b border-gray-100 dark:border-gray-800"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <label className="flex items-center gap-2.5 cursor-pointer select-none group">
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={allSelected}
                      onChange={toggleAll}
                      className="sr-only"
                    />
                    <div
                      className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                        allSelected
                          ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                          : selectedIds.size > 0
                          ? "bg-amber-400 border-amber-400"
                          : "border-gray-300 dark:border-gray-600 group-hover:border-gray-500"
                      }`}
                    >
                      {allSelected && (
                        <svg className="w-3 h-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                        </svg>
                      )}
                      {!allSelected && selectedIds.size > 0 && (
                        <div className="w-2 h-0.5 bg-white rounded" />
                      )}
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Select All ({cart.length} items)
                  </span>
                </label>
                {selectedIds.size > 0 && selectedIds.size < cart.length && (
                  <span className="text-xs text-gray-400 ml-auto">
                    {selectedIds.size} of {cart.length} selected
                  </span>
                )}
              </motion.div>

              {cart.map((item, i) => {
                const isSelected = selectedIds.has(item.id);
                return (
                  <motion.div
                    key={item.id}
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-40px" }}
                    custom={i * 0.5}
                    className={`bg-white dark:bg-gray-900 border rounded-lg p-5 flex gap-4 items-center transition-all duration-200 ${
                      isSelected
                        ? "border-amber-400 shadow-sm"
                        : "border-gray-200 dark:border-gray-800 opacity-60"
                    }`}
                  >
                    {/* Checkbox */}
                    <label className="flex items-center cursor-pointer shrink-0">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => toggleItem(item.id)}
                          className="sr-only"
                        />
                        <div
                          className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200 ${
                            isSelected
                              ? "bg-gray-900 dark:bg-white border-gray-900 dark:border-white"
                              : "border-gray-300 dark:border-gray-600 hover:border-gray-500"
                          }`}
                        >
                          {isSelected && (
                            <svg className="w-3 h-3 text-white dark:text-gray-900" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </label>

                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-20 h-20 object-contain shrink-0"
                    />

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">
                        {item.title}
                      </h3>
                      <p className="text-amber-500 font-bold mt-1">${item.price}</p>
                      <p className="text-xs text-gray-400 mt-0.5">
                        Subtotal: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => decreaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 font-bold transition-all duration-200"
                      >
                        −
                      </button>
                      <span className="w-6 text-center font-semibold text-gray-900 dark:text-white">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => increaseQuantity(item.id)}
                        className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 font-bold transition-all duration-200"
                      >
                        +
                      </button>
                    </div>

                    <button
                      onClick={() => {
                        removeFromCart(item.id);
                        setSelectedIds((prev) => {
                          const next = new Set(prev);
                          next.delete(item.id);
                          return next;
                        });
                      }}
                      className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                      aria-label="Remove item"
                    >
                      <Trash2 className="h-5 w-5" />
                    </button>
                  </motion.div>
                );
              })}
            </div>

            {/* Order summary */}
            <motion.div
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-fit space-y-5 sticky top-28"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>

              {/* Selection info */}
              {selectedIds.size < cart.length && (
                <div className="bg-amber-50 dark:bg-amber-400/5 border border-amber-200 dark:border-amber-400/20 rounded-md px-3 py-2.5 text-xs text-amber-700 dark:text-amber-400">
                  {selectedIds.size === 0
                    ? "No items selected. Select items to checkout."
                    : `${selectedIds.size} of ${cart.length} items selected for checkout.`}
                </div>
              )}

              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>
                  Subtotal ({selectedItems.reduce((s, i) => s + i.quantity, 0)} items)
                </span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              {selectedIds.size < cart.length && cart.length > 0 && (
                <div className="flex justify-between text-gray-400 dark:text-gray-600 text-xs">
                  <span>Cart total (all items)</span>
                  <span>${fullTotal.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <Button
                fullWidth
                size="lg"
                onClick={handleCheckout}
                disabled={selectedIds.size === 0}
                className="rounded-full"
              >
                <ShoppingCart className="h-4 w-4" />
                {selectedIds.size === 0
                  ? "Select Items to Checkout"
                  : `Checkout (${selectedIds.size} item${selectedIds.size !== 1 ? "s" : ""})`}
              </Button>

              <Link
                to="/products"
                className="flex items-center justify-center gap-1 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
              >
                Continue Shopping <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          </div>
        )}
      </PageWrapper>
    </MainLayout>
  );
};

export default Cart;
