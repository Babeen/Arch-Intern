import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Image, Package, MessageSquare, Tag, Mail, ArrowRight,
  TrendingUp, TrendingDown, ShoppingCart, Users, DollarSign,
  Eye, ArrowUpRight, MoreHorizontal, Activity,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, Legend,
} from "recharts";
import { useCms } from "../context/CmsContext";

/* ── Mock analytics data ── */
const revenueData = [
  { month: "Jan", revenue: 18400, orders: 142 },
  { month: "Feb", revenue: 22100, orders: 168 },
  { month: "Mar", revenue: 19800, orders: 155 },
  { month: "Apr", revenue: 27300, orders: 201 },
  { month: "May", revenue: 31200, orders: 238 },
  { month: "Jun", revenue: 28900, orders: 219 },
  { month: "Jul", revenue: 35600, orders: 274 },
  { month: "Aug", revenue: 41200, orders: 312 },
  { month: "Sep", revenue: 38700, orders: 291 },
  { month: "Oct", revenue: 44500, orders: 338 },
  { month: "Nov", revenue: 52100, orders: 401 },
  { month: "Dec", revenue: 61800, orders: 472 },
];

const categoryData = [
  { name: "Men's Clothing", value: 34, color: "#f59e0b" },
  { name: "Women's Clothing", value: 28, color: "#111827" },
  { name: "Electronics", value: 22, color: "#6b7280" },
  { name: "Jewelry", value: 16, color: "#d97706" },
];

const weeklyVisitors = [
  { day: "Mon", visitors: 1240, conversions: 87 },
  { day: "Tue", visitors: 1580, conversions: 112 },
  { day: "Wed", visitors: 1320, conversions: 94 },
  { day: "Thu", visitors: 1890, conversions: 143 },
  { day: "Fri", visitors: 2140, conversions: 178 },
  { day: "Sat", visitors: 2680, conversions: 221 },
  { day: "Sun", visitors: 1960, conversions: 159 },
];

const topProducts = [
  { name: "Urban Hoodie Pro", sales: 342, revenue: 17100, trend: "up" },
  { name: "Classic White Tee", sales: 289, revenue: 8670, trend: "up" },
  { name: "Slim Fit Chinos", sales: 201, revenue: 12060, trend: "down" },
  { name: "Gold Chain Necklace", sales: 178, revenue: 14240, trend: "up" },
  { name: "Wireless Earbuds", sales: 156, revenue: 23400, trend: "down" },
];

const recentActivity = [
  { action: "New order #4821", time: "2 min ago", type: "order" },
  { action: "Hero section updated", time: "14 min ago", type: "cms" },
  { action: "Product review added", time: "1 hr ago", type: "review" },
  { action: "Promotion banner activated", time: "3 hr ago", type: "promo" },
  { action: "Newsletter sent to 4,200 subscribers", time: "5 hr ago", type: "email" },
];

const sections = [
  { path: "/cms/hero", label: "Hero Section", icon: Image, desc: "Edit headline, subheading & CTA buttons." },
  { path: "/cms/products", label: "Products", icon: Package, desc: "Configure bestsellers section." },
  { path: "/cms/testimonials", label: "Testimonials", icon: MessageSquare, desc: "Manage customer reviews." },
  { path: "/cms/promotions", label: "Promotions", icon: Tag, desc: "Manage promotional banners." },
  { path: "/cms/newsletter", label: "Newsletter", icon: Mail, desc: "Edit newsletter copy & CTA." },
];

/* ── Reusable stat card ── */
const StatCard = ({ label, value, change, positive, icon: Icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.4, delay }}
    className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-5 flex flex-col gap-4"
  >
    <div className="flex items-center justify-between">
      <p className="text-xs font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wide">{label}</p>
      <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${color}`}>
        <Icon className="h-4 w-4" />
      </div>
    </div>
    <div>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
      <div className={`flex items-center gap-1 mt-1 text-xs font-medium ${positive ? "text-emerald-500" : "text-red-400"}`}>
        {positive ? <TrendingUp className="h-3.5 w-3.5" /> : <TrendingDown className="h-3.5 w-3.5" />}
        <span>{change} vs last month</span>
      </div>
    </div>
  </motion.div>
);

/* ── Custom tooltip ── */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-gray-900 dark:bg-[#1a1a24] border border-white/10 rounded-lg px-4 py-3 shadow-xl text-xs">
      <p className="text-gray-400 mb-2 font-medium">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-semibold">
          {p.name}: {typeof p.value === "number" && p.name.toLowerCase().includes("revenue")
            ? `$${p.value.toLocaleString()}`
            : p.value.toLocaleString()}
        </p>
      ))}
    </div>
  );
};

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { duration: 0.4, delay: i * 0.07, ease: "easeOut" } }),
};

const CmsDashboard = () => {
  const { content } = useCms();

  return (
    <div className="max-w-7xl mx-auto space-y-8">

      {/* ── Header ── */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" className="flex items-start justify-between gap-4 flex-wrap">
        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-1">Overview</p>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Welcome back. Here's what's happening with your store today.
          </p>
        </div>
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-2 text-xs font-semibold px-4 py-2.5 bg-amber-400 text-gray-900 rounded-lg hover:bg-amber-300 transition-colors"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
          View Storefront
        </Link>
      </motion.div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard label="Total Revenue" value="$421.8K" change="+18.2%" positive icon={DollarSign} color="bg-amber-100 dark:bg-amber-400/10 text-amber-600 dark:text-amber-400" delay={0.05} />
        <StatCard label="Total Orders" value="3,284" change="+12.5%" positive icon={ShoppingCart} color="bg-blue-100 dark:bg-blue-400/10 text-blue-600 dark:text-blue-400" delay={0.1} />
        <StatCard label="Active Users" value="18,420" change="+7.1%" positive icon={Users} color="bg-emerald-100 dark:bg-emerald-400/10 text-emerald-600 dark:text-emerald-400" delay={0.15} />
        <StatCard label="Page Views" value="94.2K" change="-3.4%" positive={false} icon={Eye} color="bg-purple-100 dark:bg-purple-400/10 text-purple-600 dark:text-purple-400" delay={0.2} />
      </div>

      {/* ── Revenue Chart + Pie ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Area chart */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={3}
          className="lg:col-span-2 bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Revenue Overview</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly revenue for 2025</p>
            </div>
            <div className="flex items-center gap-1 text-xs font-semibold text-emerald-500 bg-emerald-50 dark:bg-emerald-400/10 px-2.5 py-1 rounded-full">
              <TrendingUp className="h-3 w-3" /> +18.2%
            </div>
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#f59e0b" strokeWidth={2.5} fill="url(#revenueGrad)" dot={false} activeDot={{ r: 5, fill: "#f59e0b" }} />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Pie chart */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={4}
          className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <div className="mb-6">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Sales by Category</h3>
            <p className="text-xs text-gray-400 mt-0.5">Revenue distribution</p>
          </div>
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie
                data={categoryData}
                cx="50%"
                cy="50%"
                innerRadius={45}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
              >
                {categoryData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value) => [`${value}%`, "Share"]}
                contentStyle={{ background: "#111827", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "8px", fontSize: "11px" }}
                labelStyle={{ color: "#9ca3af" }}
                itemStyle={{ color: "#f9fafb" }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-4 space-y-2">
            {categoryData.map((cat) => (
              <div key={cat.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background: cat.color }} />
                  <span className="text-gray-600 dark:text-gray-400">{cat.name}</span>
                </div>
                <span className="font-semibold text-gray-900 dark:text-white">{cat.value}%</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Weekly Visitors Bar + Top Products ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Bar chart */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={5}
          className="lg:col-span-2 bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Weekly Traffic</h3>
              <p className="text-xs text-gray-400 mt-0.5">Visitors vs conversions this week</p>
            </div>
            <Activity className="h-4 w-4 text-gray-400" />
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={weeklyVisitors} margin={{ top: 0, right: 0, left: -20, bottom: 0 }} barGap={4}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" vertical={false} />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "12px" }} />
              <Bar dataKey="visitors" name="Visitors" fill="#f59e0b" radius={[4, 4, 0, 0]} maxBarSize={32} />
              <Bar dataKey="conversions" name="Conversions" fill="#111827" radius={[4, 4, 0, 0]} maxBarSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top products */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={6}
          className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-5">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white">Top Products</h3>
            <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
              <MoreHorizontal className="h-4 w-4" />
            </button>
          </div>
          <div className="space-y-4">
            {topProducts.map((p, i) => (
              <div key={p.name} className="flex items-center gap-3">
                <span className="text-xs font-bold text-gray-300 dark:text-gray-600 w-4 shrink-0">{i + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-gray-900 dark:text-white truncate">{p.name}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{p.sales} sales</p>
                </div>
                <div className="text-right shrink-0">
                  <p className="text-xs font-bold text-gray-900 dark:text-white">${p.revenue.toLocaleString()}</p>
                  <div className={`flex items-center justify-end gap-0.5 text-[10px] font-medium mt-0.5 ${p.trend === "up" ? "text-emerald-500" : "text-red-400"}`}>
                    {p.trend === "up" ? <TrendingUp className="h-2.5 w-2.5" /> : <TrendingDown className="h-2.5 w-2.5" />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Orders Line Chart + Activity ── */}
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Line chart */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={7}
          className="lg:col-span-2 bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white">Order Volume</h3>
              <p className="text-xs text-gray-400 mt-0.5">Monthly orders placed in 2025</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <LineChart data={revenueData} margin={{ top: 0, right: 0, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(107,114,128,0.1)" />
              <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line
                type="monotone"
                dataKey="orders"
                name="Orders"
                stroke="#111827"
                strokeWidth={2.5}
                dot={{ r: 3, fill: "#111827", strokeWidth: 0 }}
                activeDot={{ r: 5, fill: "#f59e0b" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Recent activity */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="show" custom={8}
          className="bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl p-6"
        >
          <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-5">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((item, i) => (
              <div key={i} className="flex gap-3 items-start">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                  item.type === "order" ? "bg-amber-400" :
                  item.type === "cms" ? "bg-blue-400" :
                  item.type === "review" ? "bg-emerald-400" :
                  item.type === "promo" ? "bg-orange-400" : "bg-purple-400"
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-gray-900 dark:text-white leading-snug">{item.action}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5">{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Hero preview strip ── */}
      <motion.div
        variants={fadeUp} initial="hidden" animate="show" custom={9}
        className="bg-gray-950 text-white rounded-xl p-5 flex items-center justify-between gap-4 border border-white/5"
      >
        <div>
          <p className="text-[10px] text-white/40 uppercase tracking-widest mb-1">Live Hero Headline</p>
          <p className="text-base font-bold">
            {content.hero.heading}{" "}
            <span className="italic font-light text-amber-300">{content.hero.headingItalic}</span>
          </p>
        </div>
        <Link
          to="/cms/hero"
          className="shrink-0 flex items-center gap-2 text-xs font-semibold px-4 py-2 bg-white/10 hover:bg-amber-400 hover:text-gray-900 rounded-lg transition-all duration-300"
        >
          Edit Hero <ArrowRight className="h-3.5 w-3.5" />
        </Link>
      </motion.div>

      {/* ── Quick access section cards ── */}
      <motion.div variants={fadeUp} initial="hidden" animate="show" custom={10}>
        <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-4">Quick Access</h3>
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-3">
          {sections.map(({ path, label, icon: Icon, desc }, i) => (
            <motion.div key={path} variants={fadeUp} initial="hidden" animate="show" custom={i * 0.3 + 10}>
              <Link
                to={path}
                className="group flex flex-col gap-3 p-4 bg-white dark:bg-[#111118] border border-gray-100 dark:border-white/5 rounded-xl hover:border-amber-400 hover:shadow-md transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
                  <Icon className="h-4 w-4 text-gray-500 dark:text-gray-400 group-hover:text-gray-900 transition-colors" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900 dark:text-white">{label}</p>
                  <p className="text-[10px] text-gray-400 mt-0.5 leading-relaxed line-clamp-2">{desc}</p>
                </div>
                <span className="flex items-center gap-1 text-[10px] font-semibold text-amber-500 mt-auto">
                  Edit <ArrowRight className="h-2.5 w-2.5" />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default CmsDashboard;
