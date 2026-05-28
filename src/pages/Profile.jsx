import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion, AnimatePresence } from "framer-motion";
import { User, Lock, ShoppingBag, Eye, EyeOff, CheckCircle, XCircle, LogOut } from "lucide-react";
import MainLayout from "../layouts/MainLayout";
import PageWrapper from "../components/ui/PageWrapper";
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const getInitials = (name = "") =>
  name.trim().split(" ").filter(Boolean).map((w) => w[0].toUpperCase()).slice(0, 2).join("");

const TABS = [
  { id: "profile", label: "Profile Info", icon: User },
  { id: "password", label: "Change Password", icon: Lock },
  { id: "orders", label: "Order History", icon: ShoppingBag },
];

const StatusBanner = ({ status, successMsg, errorMsg }) => (
  <AnimatePresence>
    {status && (
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -8 }}
        transition={{ duration: 0.25 }}
        className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium ${
          status === "success"
            ? "bg-green-50 dark:bg-green-500/10 text-green-700 dark:text-green-400 border border-green-200 dark:border-green-500/20"
            : "bg-red-50 dark:bg-red-500/10 text-red-700 dark:text-red-400 border border-red-200 dark:border-red-500/20"
        }`}
      >
        {status === "success" ? <CheckCircle className="h-4 w-4 shrink-0" /> : <XCircle className="h-4 w-4 shrink-0" />}
        {status === "success" ? successMsg : errorMsg}
      </motion.div>
    )}
  </AnimatePresence>
);

const ProfileTab = ({ user, updateUser }) => {
  const [status, setStatus] = useState(null);
  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
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
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">Full Name</label>
          <FormField type="text" placeholder="Your full name" error={errors.name?.message} {...register("name", { required: "Name is required" })} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">Email Address</label>
          <FormField type="email" placeholder="your@email.com" error={errors.email?.message} {...register("email", { required: "Email is required" })} />
        </div>
        <StatusBanner status={status} successMsg="Profile updated successfully!" errorMsg="Failed to update profile." />
        <Button className="rounded-full" type="submit" disabled={!isDirty} fullWidth size="lg">Save Changes</Button>
      </form>
    </div>
  );
};

const PasswordInput = ({ name, placeholder, showKey, validation, show, toggleShow, register, errors }) => (
  <div className="relative">
    <input
      type={show[showKey] ? "text" : "password"}
      placeholder={placeholder}
      className="w-full bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 rounded-md px-4 py-3 pr-11 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all"
      {...register(name, validation)}
    />
    <button
      type="button"
      onClick={() => toggleShow(showKey)}
      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-amber-500 transition-colors"
    >
      {show[showKey] ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
    </button>
    {errors[name] && <p className="text-red-500 text-xs mt-1.5">{errors[name].message}</p>}
  </div>
);

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
        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Choose a strong password you don't use elsewhere.</p>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">Current Password</label>
          <PasswordInput name="currentPassword" placeholder="Enter current password" showKey="current" show={show} toggleShow={toggleShow} register={register} errors={errors} validation={{ required: "Current password is required" }} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">New Password</label>
          <PasswordInput name="newPassword" placeholder="Enter new password" showKey="new" show={show} toggleShow={toggleShow} register={register} errors={errors} validation={{ required: "New password is required", minLength: { value: 6, message: "Minimum 6 characters" } }} />
        </div>
        <div>
          <label className="text-xs uppercase tracking-[0.15em] font-semibold text-gray-400 dark:text-gray-500 block mb-1.5">Confirm New Password</label>
          <PasswordInput name="confirmPassword" placeholder="Confirm new password" showKey="confirm" show={show} toggleShow={toggleShow} register={register} errors={errors} validation={{ required: "Please confirm your password", validate: (val) => val === newPassword || "Passwords do not match" }} />
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
        <Button type="submit" fullWidth size="lg">Update Password</Button>
      </form>
    </div>
  );
};

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
      <div className="space-y-3">
        {cart.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: "easeOut" }}
            className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-800 rounded-lg"
          >
            <img src={item.image} alt={item.title} className="w-14 h-14 object-contain shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-gray-900 dark:text-white text-sm line-clamp-1">{item.title}</p>
              <p className="text-xs text-gray-500 mt-0.5">Qty: {item.quantity}</p>
            </div>
            <p className="font-bold text-gray-900 dark:text-white shrink-0">${(item.price * item.quantity).toFixed(2)}</p>
          </motion.div>
        ))}
      </div>
    )}
  </div>
);

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
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800 mb-6 flex flex-col sm:flex-row items-center sm:items-start gap-5"
          >
            <div className="w-20 h-20 rounded-lg bg-gray-900 dark:bg-white flex items-center justify-center shrink-0">
              <span className="text-2xl font-bold text-white dark:text-gray-900">{initials}</span>
            </div>
            <div className="flex-1 text-center sm:text-left">
              <p className="text-xs uppercase tracking-[0.2em] text-amber-500 font-semibold mb-1">Member</p>
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{user?.name || "Your Account"}</h1>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-0.5">{user?.email}</p>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 hover:text-red-500 dark:hover:text-red-400 transition-colors shrink-0"
            >
              <LogOut className="h-4 w-4" />
              Sign Out
            </button>
          </motion.div>

          <div className="flex flex-col lg:flex-row gap-6">
            <motion.nav
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              className="lg:w-52 shrink-0"
            >
              <div className="bg-white dark:bg-gray-900 rounded-lg p-2 border border-gray-200 dark:border-gray-800">
                {TABS.map(({ id, label, icon: Icon }) => (
                  <button
                    key={id}
                    onClick={() => setActiveTab(id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-md text-sm font-medium transition-all duration-200 ${
                      activeTab === id
                        ? "bg-gray-900 dark:bg-white text-white dark:text-gray-900"
                        : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-white"
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    {label}
                  </button>
                ))}
              </div>
            </motion.nav>

            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="flex-1 bg-white dark:bg-gray-900 rounded-lg p-6 border border-gray-200 dark:border-gray-800"
            >
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
