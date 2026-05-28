import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import MainLayout from "../layouts/MainLayout";
import FormField from "../components/ui/FormField";
import Button from "../components/ui/Button";
import { useAuth } from "../context/AuthContext";

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  show: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.08, ease: "easeOut" },
  }),
};

const Login = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = (data) => {
    login(data);
    navigate("/");
  };

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <motion.div
          className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-lg p-8 shadow-lg"
          variants={fadeUp}
          initial="hidden"
          animate="show"
        >
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">
            Welcome back
          </p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Sign In</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={1}>
              <FormField
                type="email"
                placeholder="Email address"
                error={errors.email?.message}
                {...register("email", { required: "Email is required" })}
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={2}>
              <FormField
                type="password"
                placeholder="Password"
                error={errors.password?.message}
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Minimum 6 characters" },
                })}
              />
            </motion.div>
            <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3}>
              <Button className="rounded-full" type="submit" fullWidth size="lg">Sign In</Button>
            </motion.div>
          </form>

          <motion.p
            className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6"
            variants={fadeUp} initial="hidden" animate="show" custom={4}
          >
            Don't have an account?{" "}
            <Link to="/signup" className="text-amber-500 hover:text-amber-400 font-medium">
              Create one
            </Link>
          </motion.p>
        </motion.div>
      </div>
    </MainLayout>
  );
};

export default Login;
