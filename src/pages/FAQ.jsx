import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Search, HelpCircle, Package, RefreshCw, CreditCard, Truck, User } from "lucide-react";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const categories = [
  { id: "orders", label: "Orders & Shipping", icon: Truck },
  { id: "returns", label: "Returns & Exchanges", icon: RefreshCw },
  { id: "products", label: "Products & Sizing", icon: Package },
  { id: "payment", label: "Payment & Billing", icon: CreditCard },
  { id: "account", label: "Account & Profile", icon: User },
  { id: "general", label: "General", icon: HelpCircle },
];

const faqs = [
  // Orders & Shipping
  {
    category: "orders",
    question: "How long does shipping take?",
    answer:
      "Standard shipping takes 5–7 business days. Express shipping (2–3 business days) and overnight options are available at checkout. International orders typically arrive within 10–14 business days depending on the destination country.",
  },
  {
    category: "orders",
    question: "How do I track my order?",
    answer:
      "Once your order ships, you'll receive a confirmation email with a tracking number. You can use this number on our website or the carrier's site to monitor your delivery in real time.",
  },
  {
    category: "orders",
    question: "Can I change or cancel my order after placing it?",
    answer:
      "Orders can be modified or cancelled within 1 hour of placement. After that, the order enters our fulfillment process and changes may not be possible. Please contact our support team immediately if you need to make changes.",
  },
  {
    category: "orders",
    question: "Do you offer free shipping?",
    answer:
      "Yes! We offer free standard shipping on all orders over $75 within the US. International orders qualify for free shipping on orders over $150.",
  },
  // Returns & Exchanges
  {
    category: "returns",
    question: "What is your return policy?",
    answer:
      "We accept returns within 30 days of delivery. Items must be unworn, unwashed, and in their original packaging with all tags attached. Sale items are final sale and cannot be returned.",
  },
  {
    category: "returns",
    question: "How do I start a return or exchange?",
    answer:
      "Log into your account, navigate to your order history, and select the item you'd like to return. Follow the prompts to generate a prepaid return label. Exchanges can be initiated the same way — simply select your new size or color.",
  },
  {
    category: "returns",
    question: "How long does a refund take?",
    answer:
      "Once we receive your return, we process it within 3–5 business days. Refunds are issued to your original payment method and may take an additional 5–10 business days to appear on your statement.",
  },
  // Products & Sizing
  {
    category: "products",
    question: "How do I find my size?",
    answer:
      "Each product page includes a detailed size guide with measurements in both US and EU sizing. We recommend measuring yourself and comparing to the chart rather than going by your usual size, as fits can vary by style.",
  },
  {
    category: "products",
    question: "Are your products true to size?",
    answer:
      "Most of our products run true to size. However, some styles are designed with a relaxed or slim fit. Check the product description for fit notes, and read customer reviews for real-world sizing feedback.",
  },
  {
    category: "products",
    question: "What materials do you use?",
    answer:
      "We use a range of premium materials including organic cotton, recycled polyester, merino wool, and proprietary performance fabrics. Full material composition is listed on each product page.",
  },
  // Payment & Billing
  {
    category: "payment",
    question: "What payment methods do you accept?",
    answer:
      "We accept Visa, Mastercard, American Express, PayPal, Apple Pay, Google Pay, and Klarna (buy now, pay later). All transactions are secured with 256-bit SSL encryption.",
  },
  {
    category: "payment",
    question: "Is my payment information secure?",
    answer:
      "Absolutely. We never store your full card details on our servers. All payment processing is handled by PCI-DSS compliant payment partners. Your security is our top priority.",
  },
  {
    category: "payment",
    question: "Do you offer buy now, pay later?",
    answer:
      "Yes, we partner with Klarna to offer flexible payment plans. You can split your purchase into 4 interest-free payments or choose a longer-term financing option at checkout.",
  },
  // Account
  {
    category: "account",
    question: "How do I create an account?",
    answer:
      "Click 'Sign Up' in the top navigation. You can register with your email address or sign in with Google. Creating an account lets you track orders, save addresses, and access exclusive member benefits.",
  },
  {
    category: "account",
    question: "I forgot my password. How do I reset it?",
    answer:
      "Click 'Login' then 'Forgot Password'. Enter your email address and we'll send you a reset link within a few minutes. Check your spam folder if you don't see it in your inbox.",
  },
  // General
  {
    category: "general",
    question: "Do you have physical stores?",
    answer:
      "Yes! We have flagship stores in New York, Los Angeles, London, Paris, and Tokyo. Visit our Store Locator page to find the nearest location, hours, and contact information.",
  },
  {
    category: "general",
    question: "How can I stay updated on new releases?",
    answer:
      "Subscribe to our newsletter for early access to new drops, exclusive offers, and behind-the-scenes content. You can also follow us on Instagram and Twitter for real-time updates.",
  },
];

const AccordionItem = ({ faq, isOpen, onToggle }) => (
  <div className="border-b border-gray-200 dark:border-gray-800 last:border-0">
    <button
      onClick={onToggle}
      className="w-full flex items-center justify-between py-5 text-left gap-4 group"
      aria-expanded={isOpen}
    >
      <span className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base group-hover:text-amber-500 transition-colors">
        {faq.question}
      </span>
      <ChevronDown
        className={`h-5 w-5 text-gray-400 shrink-0 transition-transform duration-300 ${
          isOpen ? "rotate-180 text-amber-500" : ""
        }`}
      />
    </button>
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="content"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <p className="pb-5 text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
            {faq.answer}
          </p>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

const FAQ = () => {
  const [activeCategory, setActiveCategory] = useState("orders");
  const [openIndex, setOpenIndex] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = searchQuery.trim()
    ? faqs.filter(
        (f) =>
          f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          f.answer.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : faqs.filter((f) => f.category === activeCategory);

  const handleToggle = (i) => setOpenIndex(openIndex === i ? null : i);

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-gray-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 30% 60%, #f59e0b 0%, transparent 50%), radial-gradient(circle at 80% 10%, #f59e0b 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Help Center
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Frequently Asked
            <br />
            <span className="italic font-light text-amber-300">Questions</span>
          </motion.h1>
          <motion.p
            className="mt-5 text-white/60 text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Find quick answers to the most common questions.
          </motion.p>

          {/* Search */}
          <motion.div
            className="mt-8 relative max-w-lg mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setOpenIndex(null);
              }}
              className="w-full pl-12 pr-5 py-4 rounded-full bg-white/10 border border-white/20 text-white placeholder-white/40 text-sm focus:outline-none focus:border-amber-400 focus:bg-white/15 transition-all"
            />
          </motion.div>
        </div>
      </section>

      {/* ── Content ── */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {!searchQuery && (
          <motion.div
            className="flex flex-wrap gap-3 mb-12"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  setOpenIndex(null);
                }}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold border transition-all duration-200 ${
                  activeCategory === cat.id
                    ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900 border-gray-900 dark:border-white"
                    : "bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 border-gray-200 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white hover:text-gray-900 dark:hover:text-white"
                }`}
              >
                <cat.icon className="h-4 w-4" />
                {cat.label}
              </button>
            ))}
          </motion.div>
        )}

        <div className="grid lg:grid-cols-3 gap-12">
          {/* FAQ List */}
          <motion.div
            className="lg:col-span-2"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            {searchQuery && (
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-6">
                {filteredFaqs.length} result{filteredFaqs.length !== 1 ? "s" : ""} for &quot;{searchQuery}&quot;
              </p>
            )}

            {filteredFaqs.length === 0 ? (
              <div className="text-center py-20">
                <HelpCircle className="h-12 w-12 text-gray-300 dark:text-gray-700 mx-auto mb-4" />
                <h3 className="text-lg font-bold text-gray-900 dark:text-white">No results found</h3>
                <p className="text-gray-500 mt-2 text-sm">Try a different search term or browse by category.</p>
              </div>
            ) : (
              <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg px-6">
                {filteredFaqs.map((faq, i) => (
                  <AccordionItem
                    key={i}
                    faq={faq}
                    isOpen={openIndex === i}
                    onToggle={() => handleToggle(i)}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
          >
            {/* Still need help */}
            <div className="bg-gray-950 text-white rounded-lg p-7 relative overflow-hidden">
              <div className="absolute -top-8 -right-8 w-32 h-32 bg-amber-400/20 rounded-full blur-2xl" />
              <h3 className="font-bold text-lg mb-2 relative z-10">Still need help?</h3>
              <p className="text-white/60 text-sm mb-5 relative z-10">
                Our support team is available Monday through Friday, 9am–6pm EST.
              </p>
              <Link
                to="/contact"
                className="relative z-10 inline-flex items-center gap-2 bg-amber-400 text-gray-900 font-semibold px-6 py-2.5 rounded-full text-sm hover:bg-amber-300 transition-colors"
              >
                Contact Support
              </Link>
            </div>

            {/* Popular topics */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Popular Topics</h3>
              <ul className="space-y-2">
                {[
                  { label: "Track my order", cat: "orders" },
                  { label: "Start a return", cat: "returns" },
                  { label: "Find my size", cat: "products" },
                  { label: "Payment options", cat: "payment" },
                  { label: "Reset password", cat: "account" },
                ].map((item) => (
                  <li key={item.label}>
                    <button
                      onClick={() => {
                        setActiveCategory(item.cat);
                        setSearchQuery("");
                        setOpenIndex(null);
                      }}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors w-full text-left"
                    >
                      <ChevronDown className="h-3.5 w-3.5 -rotate-90 shrink-0" />
                      {item.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default FAQ;
