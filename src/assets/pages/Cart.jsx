import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import SectionHeader from "../components/ui/SectionHeader";
import { useCart } from "../context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07 } }),
};

const Cart = () => {
  const { cart, increaseQuantity, decreaseQuantity, removeFromCart } = useCart();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <PageWrapper>
        <SectionHeader label="Your Bag" title="Shopping Cart" />

        {cart.length === 0 ? (
          <div className="text-center py-28 space-y-4">
            <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto" />
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
            <p className="text-gray-500">Looks like you haven't added anything yet.</p>
            <Link
              to="/products"
              className="inline-flex items-center gap-2 mt-4 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-7 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300"
            >
              Browse Products <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-10 space-y-6 lg:space-y-0">
            {/* Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp} initial="hidden" animate="show" custom={i}
                  className="bg-white dark:bg-gray-900 rounded-2xl p-5 flex gap-5 items-center shadow-sm"
                >
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-contain shrink-0" />

                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                    <p className="text-amber-500 font-bold mt-1">${item.price}</p>
                  </div>

                  {/* Qty */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-400 hover:text-gray-900 font-bold transition-colors"
                    >−</button>
                    <span className="w-6 text-center font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-800 hover:bg-amber-400 hover:text-gray-900 font-bold transition-colors"
                    >+</button>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </motion.div>
              ))}
            </div>

            {/* Summary */}
            <motion.div
              className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm h-fit space-y-5"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-500">Free</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <button className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300">
                Checkout
              </button>
            </motion.div>
          </div>
        )}
      </PageWrapper>
    </MainLayout>
  );
};

export default Cart;
