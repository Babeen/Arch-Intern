/**
 * Profile.jsx
 *
 * WHAT IS THIS?
 * The user profile page — accessible at /profile (protected route).
 * Has 3 tabs: Profile Info, Change Password, Order History.
 *
 * KEY CONCEPTS:
 *
 * 1. Tab-based UI
 *    - A single `activeTab` state controls which panel is visible.
 *    - Only one panel renders at a time — no routing needed for tabs.
 *    - This is a very common pattern (Amazon, Daraz profile pages work this way).
 *
 * 2. react-hook-form
 *    - Used for both forms (profile update + change password).
 *    - `register` connects inputs to the form.
 *    - `handleSubmit` validates before calling our function.
 *    - `reset` clears the form after submission.
 *    - `watch` reads a field's live value — used to compare
 *      "new password" and "confirm password" fields.
 *
 * 3. Avatar initials
 *    - We don't have a profile picture upload (needs backend).
 *    - Instead we generate initials from the user's name (e.g. "John Doe" → "JD").
 *    - This is exactly what Gmail, Daraz, and Amazon do as a fallback.
 *
 * 4. Success / error feedback
 *    - Each form has its own `status` state: null | "success" | "error".
 *    - We show a colored banner below the form based on this state.
 *    - It auto-clears after 3 seconds using setTimeout.
 */

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ShoppingBag, Eye, EyeOff, CheckCircle, XCircle, LogOut } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import FormField from "../components/ui/FormField";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

// ── Helper: generate initials from a name string ──────────────────────────────
// "John Doe" → "JD"   |   "alice" → "A"   |   undefined → "U"
const getInitials = (name = "") =>
  name
    .trim()
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0].toUpperCase())
    .slice(0, 2)
    .join("");

// ── Tab definitions ───────────────────────────────────────────────────────────
const TABS = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "orders", label: "Order History", icon: ShoppingBag },
];

// ── Reusable status banner ────────────────────────────────────────────────────
const StatusBanner = ({ status, successMsg, errorMsg }) => (
  <AnimatePresence>
    {status && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
          status === "success"
            ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
            : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
        }`}
      >
        {status === "success"
          ? <CheckCircle className="h-4 w-4 shrink-0" />
          : <XCircle className="h-4 w-4 shrink-0" />}
        {status === "success" ? successMsg : errorMsg}
      </motion.div>
    )}
  </AnimatePresence>
);

// ── Profile Info Tab ──────────────────────────────────────────────────────────
const ProfileTab = ({ user, updateUser }) => {
  const [status, setStatus] = useState(null);

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    // defaultValues pre-fills the form with the current user data
    defaultValues: { name: user?.name || "", email: user?.email || "" },
  });

  const onSubmit = (data) => {
    updateUser(data);
    setStatus("success");
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Update your name and email address.</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
            Full Name
          </label>
          <FormField
            type="text"
            placeholder="Your full name"
            error={errors.name?.message}
            {...register("name", { required: "Name is required" })}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
            Email Address
          </label>
          <FormField
            type="email"
            placeholder="your@email.com"
            error={errors.email?.message}
            {...register("email", { required: "Email is required" })}
          />
        </div>

        <StatusBanner
          status={status}
          successMsg="Profile updated successfully!"
          errorMsg="Failed to update profile."
        />

        {/* isDirty is true when the user has changed any field from its default value */}
        <button
          type="submit"
          disabled={!isDirty}
          className="w-full py-3 rounded-full font-semibold transition-all duration-300
                     bg-gray-900 dark:bg-white text-white dark:text-gray-900
                     hover:bg-amber-400 hover:text-gray-900
                     disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-gray-900 disabled:dark:hover:bg-white"
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

// ── Password input with show/hide toggle ─────────────────────────────────────
// Defined OUTSIDE PasswordTab so React doesn't recreate it on every keystroke.
// If it were inside PasswordTab, every state change (typing a character) would
// cause React to unmount the old input and mount a new one — losing focus.
const PasswordInput = ({ name, placeholder, showKey, validation, show, toggleShow, register, errors }) => (
  <div className="relative">
    <input
      type={show[showKey] ? "text" : "password"}
      placeholder={placeholder}
      className="w-full bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white
                 placeholder-gray-400 dark:placeholder-white/40 rounded-xl px-4 py-3 pr-11
                 focus:outline-none focus:border-amber-400 transition-colors"
      {...register(name, validation)}
    />
    <button
      type="button"
      onClick={() => toggleShow(showKey)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
    >
      {show[showKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
    {errors[name] && (
      <p className="text-red-400 text-sm mt-1">{errors[name].message}</p>
    )}
  </div>
);

// ── Change Password Tab ───────────────────────────────────────────────────────
const PasswordTab = ({ changePassword }) => {
  const [status, setStatus] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [show, setShow] = useState({ current: false, new: false, confirm: false });
  const toggleShow = (field) => setShow((prev) => ({ ...prev, [field]: !prev[field] }));

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm();
  const newPassword = watch("newPassword");

  const onSubmit = (data) => {
    const result = changePassword(data.currentPassword, data.newPassword);
    if (result.success) {
      setStatus("success");
      reset();
    } else {
      setErrorMsg(result.message);
      setStatus("error");
    }
    setTimeout(() => setStatus(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-gray-900 dark:text-white">Change Password</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
          Choose a strong password you don't use elsewhere.
        </p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
            Current Password
          </label>
          <PasswordInput
            name="currentPassword" placeholder="Enter current password" showKey="current"
            show={show} toggleShow={toggleShow} register={register} errors={errors}
            validation={{ required: "Current password is required" }}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
            New Password
          </label>
          <PasswordInput
            name="newPassword" placeholder="Enter new password" showKey="new"
            show={show} toggleShow={toggleShow} register={register} errors={errors}
            validation={{ required: "New password is required", minLength: { value: 6, message: "Minimum 6 characters" } }}
          />
        </div>

        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">
            Confirm New Password
          </label>
          <PasswordInput
            name="confirmPassword" placeholder="Confirm new password" showKey="confirm"
            show={show} toggleShow={toggleShow} register={register} errors={errors}
            validation={{
              required: "Please confirm your password",
              validate: (val) => val === newPassword || "Passwords do not match",
            }}
          />
        </div>

        <ul className="text-xs text-gray-400 dark:text-gray-500 space-y-1 pl-1">
          <li className={`flex items-center gap-1.5 ${newPassword?.length >= 6 ? "text-green-500" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${newPassword?.length >= 6 ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`} />
            At least 6 characters
          </li>
          <li className={`flex items-center gap-1.5 ${/[A-Z]/.test(newPassword || "") ? "text-green-500" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${/[A-Z]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`} />
            One uppercase letter
          </li>
          <li className={`flex items-center gap-1.5 ${/[0-9]/.test(newPassword || "") ? "text-green-500" : ""}`}>
            <span className={`w-1.5 h-1.5 rounded-full ${/[0-9]/.test(newPassword || "") ? "bg-green-500" : "bg-gray-300 dark:bg-gray-600"}`} />
            One number
          </li>
        </ul>

        <StatusBanner status={status} successMsg="Password changed successfully!" errorMsg={errorMsg} />

        <button
          type="submit"
          className="w-full py-3 rounded-full font-semibold transition-all duration-300
                     bg-gray-900 dark:bg-white text-white dark:text-gray-900
                     hover:bg-amber-400 hover:text-gray-900"
        >
          Update Password
        </button>
      </form>
    </div>
  );
};

// ── Orders Tab ────────────────────────────────────────────────────────────────
const OrdersTab = ({ cart }) => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-bold text-gray-900 dark:text-white">Order History</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Your past purchases will appear here.</p>
    </div>

    {cart.length === 0 ? (
      <div className="text-center py-16 space-y-3">
        <ShoppingBag className="h-12 w-12 text-gray-200 dark:text-gray-700 mx-auto" />
        <p className="font-semibold text-gray-900 dark:text-white">No orders yet</p>
        <p className="text-sm text-gray-500">When you place orders, they'll show up here.</p>
      </div>
    ) : (
      // Showing current cart items as a placeholder for real order history
      <div className="space-y-3">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800/50 rounded-2xl">
            <img src={item.image} alt={item.title} className="w-14 h-14 object-contain shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-gray-900 dark:text-white shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>
    )}
  </div>
);

// ── Main Profile Page ─────────────────────────────────────────────────────────
const Profile = () => {
  const { user, logout, updateUser, changePassword } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const initials = getInitials(user?.name || user?.email || "User");

  return (
    <MainLayout>
      <PageWrapper>
        <div className="max-w-4xl mx-auto">

          {/* ── Profile Header Card ─────────────────────────────────────── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white dark:bg-gray-900 rounded-3xl p-6 shadow-sm border border-gray-100 dark:border-white/10 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
          >
            {/* Avatar with initials */}
            <div className="w-20 h-20 rounded-2xl bg-gray-900 dark:bg-white flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-white dark:text-gray-900">{initials}</span>
            </div>

            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold mb-1">Member</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {user?.name || "Your Account"}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
            </div>

            {/* Logout button */}
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400
                         hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </motion.div>

          {/* ── Tab Layout ──────────────────────────────────────────────── */}
          <div className="flex flex-col lg:flex-row gap-6">

            {/* Tab Sidebar */}
            <motion.nav
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="lg:w-52 shrink-0"
            >
              <div className="bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-sm border border-gray-100 dark:border-white/10">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      activeTab === id
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.nav>

            {/* Tab Content Panel */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.15 }}
              className="flex-1 bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border border-gray-100 dark:border-white/10"
            >
              {/* AnimatePresence animates between tab panels */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2 }}
                >
                  {activeTab === "profile" && <ProfileTab user={user} updateUser={updateUser} />}
                  {activeTab === "password" && <PasswordTab changePassword={changePassword} />}
                  {activeTab === "orders" && <OrdersTab cart={cart} />}
                </motion.div>
              </AnimatePresence>
            </motion.div>

          </div>
        </div>
      </PageWrapper>
    </MainLayout>
  );
};

export default Profile;
