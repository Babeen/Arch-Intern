import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import SectionHeader from "../components/ui/SectionHeader";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";

// Matches the shared fadeUp variant across all pages
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
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <MainLayout>
      <PageWrapper>
        {/* Header — whileInView matches Home section headers */}
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
        >
          <SectionHeader label="Your Bag" title="Shopping Cart" />
        </motion.div>

        {cart.length === 0 ? (
          // Empty state — animated in like Home sections
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
              <Button className="rounded-full">Browse Products <ArrowRight className="h-4 w-4" /></Button>
            </Link>
          </motion.div>
        ) : (
          <div className="mt-10 lg:grid lg:grid-cols-3 lg:gap-10 space-y-6 lg:space-y-0">
            {/* Cart items — staggered whileInView */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item, i) => (
                <motion.div
                  key={item.id}
                  variants={fadeUp}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-40px" }}
                  custom={i * 0.5}
                  className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 flex gap-5 items-center"
                >
                  <img src={item.image} alt={item.title} className="w-20 h-20 object-contain shrink-0" />
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 dark:text-white line-clamp-1">{item.title}</h3>
                    <p className="text-amber-500 font-bold mt-1">${item.price}</p>
                  </div>

                  {/* Quantity controls */}
                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={() => decreaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 font-bold transition-all duration-200"
                    >−</button>
                    <span className="w-6 text-center font-semibold text-gray-900 dark:text-white">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => increaseQuantity(item.id)}
                      className="w-8 h-8 rounded-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 hover:bg-amber-400 hover:border-amber-400 hover:text-gray-900 font-bold transition-all duration-200"
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

            {/* Order summary — whileInView with slight delay */}
            <motion.div
              className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 h-fit space-y-5"
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={1}
            >
              <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order Summary</h3>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Subtotal ({cart.length} items)</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-500 dark:text-gray-400 text-sm">
                <span>Shipping</span>
                <span className="text-green-500 font-medium">Free</span>
              </div>
              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 flex justify-between font-bold text-gray-900 dark:text-white text-lg">
                <span>Total</span>
                <span>${total.toFixed(2)}</span>
              </div>
              <Button fullWidth size="lg">Checkout</Button>
            </motion.div>
          </div>
        )}
      </PageWrapper>
    </MainLayout>
  );
};

export default Cart;
