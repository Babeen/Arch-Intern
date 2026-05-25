import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import { getSingleProduct } from "../services/productService";
import { useCart } from "../context/CartContext";
import { ShoppingBag, Star, ThumbsUp, Shield, Truck, RotateCcw } from "lucide-react";

const MOCK_REVIEWS = [
  { id: 1, name: "Sarah M.", avatar: "SM", rating: 5, date: "Dec 12, 2024", title: "Absolutely love it!", body: "Exceeded my expectations. The quality is top-notch and delivery was super fast. Would definitely recommend to anyone looking for this.", helpful: 24 },
  { id: 2, name: "James K.", avatar: "JK", rating: 4, date: "Nov 28, 2024", title: "Great value for money", body: "Really solid product. Looks exactly like the pictures. Minor packaging issue but the product itself is perfect.", helpful: 17 },
  { id: 3, name: "Priya L.", avatar: "PL", rating: 5, date: "Nov 15, 2024", title: "Premium feel, premium quality", body: "I was skeptical at first but this blew me away. The attention to detail is incredible. Already ordered a second one as a gift.", helpful: 31 },
  { id: 4, name: "Omar R.", avatar: "OR", rating: 3, date: "Oct 30, 2024", title: "Good but not perfect", body: "Decent product overall. A few things could be improved but for the price it's fair. Customer support was helpful when I had questions.", helpful: 8 },
];

const RATING_DIST = { 5: 62, 4: 20, 3: 10, 2: 5, 1: 3 };

const StarRow = ({ value, size = 16 }) =>
  Array.from({ length: 5 }, (_, i) => {
    const filled = i < Math.floor(value);
    const partial = !filled && i < value;
    return (
      <span key={i} className="relative inline-block" style={{ width: size, height: size }}>
        <Star size={size} className="text-gray-200 dark:text-gray-700" fill="currentColor" />
        {(filled || partial) && (
          <span className="absolute inset-0 overflow-hidden" style={{ width: partial ? `${(value % 1) * 100}%` : "100%" }}>
            <Star size={size} className="text-amber-400" fill="currentColor" />
          </span>
        )}
      </span>
    );
  });

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("reviews");
  const [comments, setComments] = useState(MOCK_REVIEWS);
  const [form, setForm] = useState({ name: "", rating: 5, title: "", body: "" });
  const [helpfulVotes, setHelpfulVotes] = useState({});
  const { addToCart } = useCart();

  useEffect(() => {
    getSingleProduct(id)
      .then(setProduct)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.body) return;
    setComments((prev) => [
      {
        id: Date.now(),
        name: form.name,
        avatar: form.name.slice(0, 2).toUpperCase(),
        rating: form.rating,
        date: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" }),
        title: form.title || "My Review",
        body: form.body,
        helpful: 0,
      },
      ...prev,
    ]);
    setForm({ name: "", rating: 5, title: "", body: "" });
  };

  if (loading) {
    return (
      <MainLayout>
        <PageWrapper>
          <div className="grid lg:grid-cols-2 gap-12 animate-pulse">
            <div className="bg-gray-200 dark:bg-gray-800 rounded-2xl h-96" />
            <div className="space-y-4">
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4" />
              <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-full" />
              <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-5/6" />
              <div className="h-10 bg-gray-200 dark:bg-gray-800 rounded w-1/3 mt-6" />
            </div>
          </div>
        </PageWrapper>
      </MainLayout>
    );
  }

  const rating = product?.rating ?? { rate: 4.2, count: 120 };

  return (
    <MainLayout>
      <PageWrapper>
        {/* ── Product Hero ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-start">
          {/* Image Panel */}
          <motion.div
            className="bg-white dark:bg-gray-900 rounded-3xl p-10 flex items-center justify-center shadow-sm border border-gray-100 dark:border-gray-800 sticky top-24"
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <img src={product.image} alt={product.title} className="h-96 object-contain mix-blend-multiply dark:mix-blend-normal" />
          </motion.div>

          {/* Info Panel */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold">{product.category}</p>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white leading-snug">{product.title}</h1>

            {/* Inline rating summary */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-0.5">
                <StarRow value={rating.rate} size={18} />
              </div>
              <span className="text-sm font-semibold text-gray-800 dark:text-gray-200">{rating.rate}</span>
              <span className="text-sm text-gray-400">({rating.count} ratings)</span>
            </div>

            <p className="text-gray-500 dark:text-gray-400 leading-relaxed text-[15px]">{product.description}</p>

            <div className="flex items-end gap-3">
              <p className="text-4xl font-bold text-gray-900 dark:text-white">${product.price}</p>
              <p className="text-sm text-green-500 font-medium mb-1">In Stock</p>
            </div>

            <button
              onClick={() => addToCart(product)}
              className="flex items-center gap-2 bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-8 py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 w-fit"
            >
              <ShoppingBag className="h-5 w-5" />
              Add to Cart
            </button>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              {[
                { icon: Truck, label: "Free Delivery", sub: "Orders over $50" },
                { icon: RotateCcw, label: "Easy Returns", sub: "30-day policy" },
                { icon: Shield, label: "Secure Pay", sub: "100% protected" },
              ].map(({ icon: Icon, label, sub }) => (
                <div key={label} className="flex flex-col items-center gap-1.5 bg-gray-50 dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-2xl p-3 text-center">
                  <Icon size={18} className="text-amber-500" />
                  <p className="text-xs font-semibold text-gray-800 dark:text-gray-200">{label}</p>
                  <p className="text-[10px] text-gray-400">{sub}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Tabs ── */}
        <div className="mt-20 border-b border-gray-200 dark:border-gray-800">
          <div className="flex gap-8">
            {["reviews", "write a review"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`pb-3 text-sm font-semibold capitalize tracking-wide transition-all border-b-2 -mb-px ${
                  activeTab === tab
                    ? "border-amber-400 text-gray-900 dark:text-white"
                    : "border-transparent text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* ── Reviews Tab ── */}
        {activeTab === "reviews" && (
          <motion.div
            className="mt-10 grid lg:grid-cols-3 gap-12"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            {/* Rating Summary */}
            <div className="space-y-5">
              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8 text-center">
                <p className="text-7xl font-bold text-gray-900 dark:text-white">{rating.rate}</p>
                <div className="flex justify-center gap-0.5 my-3">
                  <StarRow value={rating.rate} size={20} />
                </div>
                <p className="text-sm text-gray-400">{rating.count} verified ratings</p>
              </div>

              <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 space-y-3">
                {[5, 4, 3, 2, 1].map((star) => (
                  <div key={star} className="flex items-center gap-3">
                    <span className="text-xs text-gray-500 w-3">{star}</span>
                    <Star size={12} className="text-amber-400" fill="currentColor" />
                    <div className="flex-1 bg-gray-100 dark:bg-gray-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="h-full bg-amber-400 rounded-full transition-all duration-700"
                        style={{ width: `${RATING_DIST[star]}%` }}
                      />
                    </div>
                    <span className="text-xs text-gray-400 w-6">{RATING_DIST[star]}%</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Review Cards */}
            <div className="lg:col-span-2 space-y-5">
              {comments.map((review, i) => (
                <motion.div
                  key={review.id}
                  className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-6 space-y-3"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400 font-bold text-sm flex items-center justify-center flex-shrink-0">
                        {review.avatar}
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">{review.name}</p>
                        <p className="text-xs text-gray-400">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex gap-0.5 flex-shrink-0">
                      <StarRow value={review.rating} size={14} />
                    </div>
                  </div>
                  <p className="text-sm font-semibold text-gray-800 dark:text-gray-200">{review.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">{review.body}</p>
                  <button
                    onClick={() => setHelpfulVotes((v) => ({ ...v, [review.id]: true }))}
                    className={`flex items-center gap-1.5 text-xs transition-colors ${
                      helpfulVotes[review.id] ? "text-amber-500" : "text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    }`}
                  >
                    <ThumbsUp size={13} />
                    Helpful ({review.helpful + (helpfulVotes[review.id] ? 1 : 0)})
                  </button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* ── Write a Review Tab ── */}
        {activeTab === "write a review" && (
          <motion.div
            className="mt-10 max-w-2xl"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800 rounded-3xl p-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Share your experience</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Name *</label>
                    <input
                      value={form.name}
                      onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      placeholder="John Doe"
                      required
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Review Title</label>
                    <input
                      value={form.title}
                      onChange={(e) => setForm((f) => ({ ...f, title: e.target.value }))}
                      placeholder="Summarize your review"
                      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Rating *</label>
                  <div className="flex gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <button key={s} type="button" onClick={() => setForm((f) => ({ ...f, rating: s }))}>
                        <Star
                          size={28}
                          className={s <= form.rating ? "text-amber-400" : "text-gray-200 dark:text-gray-700"}
                          fill="currentColor"
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Your Review *</label>
                  <textarea
                    value={form.body}
                    onChange={(e) => setForm((f) => ({ ...f, body: e.target.value }))}
                    placeholder="Tell others what you think about this product..."
                    required
                    rows={5}
                    className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-400 transition resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold px-8 py-3 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 text-sm"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </motion.div>
        )}
      </PageWrapper>
    </MainLayout>
  );
};

export default ProductDetails;
