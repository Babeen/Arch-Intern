import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import FormField from "../components/ui/FormField";

const Signup = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = (data) => console.log(data);

  return (
    <MainLayout>
      <div className="min-h-[80vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-white dark:bg-gray-900 border border-gray-100 dark:border-white/10 rounded-3xl p-8 shadow-xl">
          <p className="text-xs uppercase tracking-[0.25em] text-amber-500 font-semibold mb-2">Get started</p>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">Create Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              type="text"
              placeholder="Full name"
              error={errors.name?.message}
              {...register("name", { required: "Name is required" })}
            />
            <FormField
              type="email"
              placeholder="Email address"
              error={errors.email?.message}
              {...register("email", { required: "Email is required" })}
            />
            <FormField
              type="password"
              placeholder="Password"
              error={errors.password?.message}
              {...register("password", { required: "Password is required" })}
            />
            <button
              type="submit"
              className="w-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-semibold py-3.5 rounded-full hover:bg-amber-400 hover:text-gray-900 transition-all duration-300 mt-2"
            >
              Create Account
            </button>
          </form>

          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link to="/login" className="text-amber-500 hover:text-amber-400 font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default Signup;
