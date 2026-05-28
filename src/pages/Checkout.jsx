import { useState } from "react";
import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronRight,
  Lock,
  CreditCard,
  Truck,
  CheckCircle2,
  ShoppingBag,
  ArrowLeft,
} from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";
import { useCart } from "../context/CartContext";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.08, ease: "easeOut" },
  }),
};

const STEPS = ["Shipping", "Payment", "Review"];

const InputField = ({ label, required, ...props }) => (
  <div>
    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
      {label} {required && <span className="text-red-500">*</span>}
    </label>
    <input
      required={required}
      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
      {...props}
    />
  </div>
);

const Checkout = () => {
  const { cart } = useCart();
  const navigate = useNavigate();
  const [step, setStep] = useState(0);
  const [placed, setPlaced] = useState(false);

  // Only include items that were selected in cart (passed via location state or all items)
  const selectedItems = cart;

  const subtotal = selectedItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = subtotal > 75 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const [shipping_info, setShippingInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    apartment: "",
    city: "",
    state: "",
    zip: "",
    country: "United States",
  });

  const [payment, setPayment] = useState({
    cardNumber: "",
    cardName: "",
    expiry: "",
    cvv: "",
  });

  const [shippingMethod, setShippingMethod] = useState("standard");

  const handleShippingChange = (e) =>
    setShippingInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePaymentChange = (e) =>
    setPayment((prev) => ({ ...prev, [e.target.name]: e.target.value }));

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    setPlaced(true);
  };

  if (selectedItems.length === 0 && !placed) {
    return (
      <MainLayout>
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4 py-20">
          <ShoppingBag className="h-16 w-16 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your cart is empty</h2>
          <p className="text-gray-500 mt-2 mb-6">Add some items before checking out.</p>
          <Link to="/products">
            <Button className="rounded-full">Browse Products</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  if (placed) {
    return (
      <MainLayout>
        <div className="min-h-[70vh] flex items-center justify-center px-4">
          <motion.div
            className="text-center max-w-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <div className="w-20 h-20 rounded-full bg-green-100 dark:bg-green-400/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="h-10 w-10 text-green-500" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">Order Placed!</h2>
            <p className="text-gray-500 dark:text-gray-400 mt-3 leading-relaxed">
              Thank you for your purchase. You'll receive a confirmation email shortly with your order details and tracking information.
            </p>
            <p className="mt-4 text-sm font-semibold text-amber-500">
              Order #ORD-{Math.floor(100000 + Math.random() * 900000)}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-3 justify-center">
              <Link to="/products">
                <Button className="rounded-full">Continue Shopping</Button>
              </Link>
              <Link to="/profile">
                <Button variant="secondary" className="rounded-full">View Orders</Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 pt-28">
        {/* Back to cart */}
        <Link
          to="/cart"
          className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors mb-8"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Cart
        </Link>

        {/* Step indicator */}
        <motion.div
          className="flex items-center gap-0 mb-12 max-w-sm"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          {STEPS.map((s, i) => (
            <div key={s} className="flex items-center">
              <div className="flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                    i < step
                      ? "bg-green-500 text-white"
                      : i === step
                      ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-400"
                  }`}
                >
                  {i < step ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </div>
                <span
                  className={`text-xs mt-1.5 font-medium ${
                    i === step
                      ? "text-gray-900 dark:text-white"
                      : "text-gray-400"
                  }`}
                >
                  {s}
                </span>
              </div>
              {i < STEPS.length - 1 && (
                <div
                  className={`h-px w-16 mx-2 mb-5 transition-colors duration-300 ${
                    i < step ? "bg-green-500" : "bg-gray-200 dark:bg-gray-700"
                  }`}
                />
              )}
            </div>
          ))}
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-10">
          {/* ── Left: Form ── */}
          <div className="lg:col-span-2">
            {/* Step 0: Shipping */}
            {step === 0 && (
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-7">
                  <Truck className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Shipping Information</h2>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(1);
                  }}
                  className="space-y-5"
                >
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="First Name"
                      required
                      name="firstName"
                      value={shipping_info.firstName}
                      onChange={handleShippingChange}
                      placeholder="John"
                    />
                    <InputField
                      label="Last Name"
                      required
                      name="lastName"
                      value={shipping_info.lastName}
                      onChange={handleShippingChange}
                      placeholder="Doe"
                    />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Email"
                      required
                      type="email"
                      name="email"
                      value={shipping_info.email}
                      onChange={handleShippingChange}
                      placeholder="john@example.com"
                    />
                    <InputField
                      label="Phone"
                      type="tel"
                      name="phone"
                      value={shipping_info.phone}
                      onChange={handleShippingChange}
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>
                  <InputField
                    label="Street Address"
                    required
                    name="address"
                    value={shipping_info.address}
                    onChange={handleShippingChange}
                    placeholder="123 Main Street"
                  />
                  <InputField
                    label="Apartment, suite, etc. (optional)"
                    name="apartment"
                    value={shipping_info.apartment}
                    onChange={handleShippingChange}
                    placeholder="Apt 4B"
                  />
                  <div className="grid sm:grid-cols-3 gap-5">
                    <InputField
                      label="City"
                      required
                      name="city"
                      value={shipping_info.city}
                      onChange={handleShippingChange}
                      placeholder="New York"
                    />
                    <InputField
                      label="State"
                      required
                      name="state"
                      value={shipping_info.state}
                      onChange={handleShippingChange}
                      placeholder="NY"
                    />
                    <InputField
                      label="ZIP Code"
                      required
                      name="zip"
                      value={shipping_info.zip}
                      onChange={handleShippingChange}
                      placeholder="10001"
                    />
                  </div>

                  {/* Shipping method */}
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-3">
                      Shipping Method
                    </label>
                    <div className="space-y-3">
                      {[
                        { id: "standard", label: "Standard Shipping", sub: "5–7 business days", price: subtotal > 75 ? "Free" : "$9.99" },
                        { id: "express", label: "Express Shipping", sub: "2–3 business days", price: "$19.99" },
                        { id: "overnight", label: "Overnight Shipping", sub: "Next business day", price: "$34.99" },
                      ].map((method) => (
                        <label
                          key={method.id}
                          className={`flex items-center justify-between p-4 rounded-lg border cursor-pointer transition-all duration-200 ${
                            shippingMethod === method.id
                              ? "border-amber-400 bg-amber-50 dark:bg-amber-400/5"
                              : "border-gray-200 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-500"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <input
                              type="radio"
                              name="shippingMethod"
                              value={method.id}
                              checked={shippingMethod === method.id}
                              onChange={() => setShippingMethod(method.id)}
                              className="accent-amber-400"
                            />
                            <div>
                              <p className="text-sm font-semibold text-gray-900 dark:text-white">{method.label}</p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">{method.sub}</p>
                            </div>
                          </div>
                          <span className="text-sm font-bold text-gray-900 dark:text-white">{method.price}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="rounded-full w-full sm:w-auto">
                    Continue to Payment
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>
              </motion.div>
            )}

            {/* Step 1: Payment */}
            {step === 1 && (
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <div className="flex items-center gap-3 mb-7">
                  <CreditCard className="h-5 w-5 text-amber-500" />
                  <h2 className="text-xl font-bold text-gray-900 dark:text-white">Payment Details</h2>
                </div>

                <div className="flex items-center gap-2 mb-6 text-xs text-gray-500 dark:text-gray-400">
                  <Lock className="h-3.5 w-3.5 text-green-500" />
                  <span>Your payment information is encrypted and secure.</span>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    setStep(2);
                  }}
                  className="space-y-5"
                >
                  <InputField
                    label="Card Number"
                    required
                    name="cardNumber"
                    value={payment.cardNumber}
                    onChange={handlePaymentChange}
                    placeholder="1234 5678 9012 3456"
                    maxLength={19}
                  />
                  <InputField
                    label="Name on Card"
                    required
                    name="cardName"
                    value={payment.cardName}
                    onChange={handlePaymentChange}
                    placeholder="John Doe"
                  />
                  <div className="grid sm:grid-cols-2 gap-5">
                    <InputField
                      label="Expiry Date"
                      required
                      name="expiry"
                      value={payment.expiry}
                      onChange={handlePaymentChange}
                      placeholder="MM / YY"
                      maxLength={7}
                    />
                    <InputField
                      label="CVV"
                      required
                      name="cvv"
                      value={payment.cvv}
                      onChange={handlePaymentChange}
                      placeholder="123"
                      maxLength={4}
                      type="password"
                    />
                  </div>

                  {/* Accepted cards */}
                  <div className="flex items-center gap-2 pt-1">
                    <span className="text-xs text-gray-500">We accept:</span>
                    {["VISA", "MC", "AMEX", "PAYPAL"].map((m) => (
                      <div
                        key={m}
                        className="px-2 py-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded text-[10px] font-bold text-gray-600 dark:text-gray-400"
                      >
                        {m}
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-3 flex-wrap">
                    <button
                      type="button"
                      onClick={() => setStep(0)}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </button>
                    <Button type="submit" size="lg" className="rounded-full">
                      Review Order
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 2: Review */}
            {step === 2 && (
              <motion.div variants={fadeUp} initial="hidden" animate="show">
                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-7">Review Your Order</h2>

                {/* Shipping summary */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 mb-5">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <Truck className="h-4 w-4 text-amber-500" /> Shipping To
                    </h3>
                    <button
                      onClick={() => setStep(0)}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {shipping_info.firstName} {shipping_info.lastName}
                    <br />
                    {shipping_info.address}
                    {shipping_info.apartment && `, ${shipping_info.apartment}`}
                    <br />
                    {shipping_info.city}, {shipping_info.state} {shipping_info.zip}
                    <br />
                    {shipping_info.country}
                  </p>
                </div>

                {/* Payment summary */}
                <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-5 mb-8">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white flex items-center gap-2">
                      <CreditCard className="h-4 w-4 text-amber-500" /> Payment
                    </h3>
                    <button
                      onClick={() => setStep(1)}
                      className="text-xs font-semibold text-amber-500 hover:text-amber-600 transition-colors"
                    >
                      Edit
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Card ending in {payment.cardNumber.slice(-4) || "••••"}
                    <br />
                    {payment.cardName}
                  </p>
                </div>

                <form onSubmit={handlePlaceOrder} className="flex gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </button>
                  <Button type="submit" size="lg" className="rounded-full">
                    <Lock className="h-4 w-4" />
                    Place Order — ${total.toFixed(2)}
                  </Button>
                </form>
              </motion.div>
            )}
          </div>

          {/* ── Right: Order Summary ── */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0.2}
            className="h-fit"
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6 sticky top-28">
              <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-5">
                Order Summary
              </h3>

              {/* Items */}
              <div className="space-y-4 mb-5 max-h-64 overflow-y-auto pr-1">
                {selectedItems.map((item) => (
                  <div key={item.id} className="flex gap-3 items-center">
                    <div className="relative shrink-0">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-14 h-14 object-contain rounded-md bg-gray-50 dark:bg-gray-800 border border-gray-100 dark:border-gray-700 p-1"
                      />
                      <span className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold rounded-full flex items-center justify-center">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-semibold text-gray-900 dark:text-white line-clamp-2 leading-tight">
                        {item.title}
                      </p>
                    </div>
                    <p className="text-sm font-bold text-gray-900 dark:text-white shrink-0">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-100 dark:border-gray-800 pt-4 space-y-3">
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? "text-green-500 font-medium" : ""}>
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400">
                  <span>Tax (8%)</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-100 dark:border-gray-800 pt-3 flex justify-between font-bold text-gray-900 dark:text-white text-base">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>

              {subtotal < 75 && (
                <p className="mt-4 text-xs text-center text-gray-500 dark:text-gray-400 bg-amber-50 dark:bg-amber-400/5 border border-amber-200 dark:border-amber-400/20 rounded-md px-3 py-2">
                  Add <span className="font-bold text-amber-600">${(75 - subtotal).toFixed(2)}</span> more for free shipping
                </p>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Checkout;
