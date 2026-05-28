import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, Clock, Send, MessageSquare, ChevronRight } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.1, ease: "easeOut" },
  }),
};

const contactInfo = [
  {
    icon: Phone,
    title: "Call Us",
    lines: ["+1 (800) 555-0199", "Mon–Fri, 9am–6pm EST"],
  },
  {
    icon: Mail,
    title: "Email Us",
    lines: ["support@archphaze.com", "We reply within 24 hours"],
  },
  {
    icon: MapPin,
    title: "Visit Us",
    lines: ["123 Fashion Avenue", "New York, NY 10001"],
  },
  {
    icon: Clock,
    title: "Store Hours",
    lines: ["Mon–Sat: 10am – 8pm", "Sunday: 12pm – 6pm"],
  },
];

const topics = [
  "Order & Shipping",
  "Returns & Exchanges",
  "Product Information",
  "Account & Billing",
  "Partnership Inquiry",
  "Other",
];

const ContactUs = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    topic: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <MainLayout>
      {/* ── Hero ── */}
      <section className="pt-32 pb-20 bg-gray-950 text-white relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 70% 30%, #f59e0b 0%, transparent 55%), radial-gradient(circle at 10% 80%, #f59e0b 0%, transparent 40%)",
          }}
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.p
            className="text-xs uppercase tracking-[0.3em] font-semibold text-amber-400 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            We're Here to Help
          </motion.p>
          <motion.h1
            className="text-5xl sm:text-6xl font-bold tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            Contact Us
          </motion.h1>
          <motion.p
            className="mt-5 text-white/60 text-lg max-w-xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.6 }}
          >
            Have a question, feedback, or just want to say hello? Our team is ready to assist you.
          </motion.p>
        </div>
      </section>

      {/* ── Contact Info Cards ── */}
      <section className="py-16 bg-white dark:bg-gray-950 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, i) => (
              <motion.div
                key={info.title}
                className="flex gap-4 p-6 bg-gray-50 dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-amber-400 transition-colors duration-300 group"
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                custom={i * 0.1}
              >
                <div className="w-11 h-11 rounded-lg bg-amber-50 dark:bg-amber-400/10 flex items-center justify-center shrink-0 group-hover:bg-amber-400 transition-colors duration-300">
                  <info.icon className="h-5 w-5 text-amber-500 group-hover:text-gray-900 transition-colors duration-300" />
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 dark:text-white text-sm mb-1">{info.title}</h3>
                  {info.lines.map((line) => (
                    <p key={line} className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                      {line}
                    </p>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Form + Map ── */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-5 gap-14">
          {/* Form */}
          <motion.div
            className="lg:col-span-3"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-8">
              <MessageSquare className="h-6 w-6 text-amber-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Send a Message</h2>
            </div>

            {submitted ? (
              <motion.div
                className="text-center py-20 space-y-4"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-400/10 flex items-center justify-center mx-auto">
                  <Send className="h-7 w-7 text-green-500" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Message Sent!</h3>
                <p className="text-gray-500 dark:text-gray-400 max-w-sm mx-auto">
                  Thanks for reaching out. We'll get back to you within 24 hours.
                </p>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors"
                >
                  Send another message
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="John"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Doe"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div className="grid sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                      Phone (Optional)
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                    Topic <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="topic"
                    required
                    value={formData.topic}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all appearance-none"
                  >
                    <option value="">Select a topic...</option>
                    {topics.map((t) => (
                      <option key={t} value={t}>{t}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-700 dark:text-gray-300 uppercase tracking-wide mb-2">
                    Message <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell us how we can help you..."
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 text-sm focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all resize-none"
                  />
                </div>

                <Button type="submit" size="lg" className="rounded-full w-full sm:w-auto">
                  <Send className="h-4 w-4" />
                  Send Message
                </Button>
              </form>
            )}
          </motion.div>

          {/* Sidebar */}
          <motion.div
            className="lg:col-span-2 space-y-6"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            custom={0.2}
          >
            {/* Map placeholder */}
            <div className="aspect-video rounded-lg bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 overflow-hidden flex items-center justify-center">
              <div className="text-center text-gray-400 dark:text-gray-600">
                <MapPin className="h-10 w-10 mx-auto mb-2" />
                <p className="text-sm font-medium">Map Coming Soon</p>
                <p className="text-xs mt-1">123 Fashion Avenue, NY</p>
              </div>
            </div>

            {/* FAQ teaser */}
            <div className="bg-gray-50 dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-6">
              <h3 className="font-bold text-gray-900 dark:text-white mb-4">Quick Answers</h3>
              <ul className="space-y-3">
                {[
                  "How do I track my order?",
                  "What is your return policy?",
                  "Do you offer international shipping?",
                  "How do I find my size?",
                ].map((q) => (
                  <li key={q}>
                    <a
                      href="/faq"
                      className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400 hover:text-amber-500 transition-colors group"
                    >
                      <span>{q}</span>
                      <ChevronRight className="h-4 w-4 shrink-0 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </li>
                ))}
              </ul>
              <a
                href="/faq"
                className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-amber-500 hover:text-amber-600 transition-colors"
              >
                View all FAQs <ChevronRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
};

export default ContactUs;
