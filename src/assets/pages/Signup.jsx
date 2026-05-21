import { useForm } from "react-hook-form";
import MainLayout from "../layouts/MainLayout";
import Button from "../components/ui/Button";

const Signup = () => {
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <MainLayout>
      <div className="max-w-md mx-auto bg-white dark:bg-gray-900 p-8 rounded-2xl shadow">
        
        <h1 className="text-3xl font-bold mb-6">
          Create Account
        </h1>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          
          {/* Name */}
          <div>
            <input
              type="text"
              placeholder="Full Name"
            className="w-full border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-800 dark:text-white rounded-lg px-4 py-3"
              {...register("name", {
                required: "Name is required",
              })}
            />

            {errors.name && (
              <p className="text-red-500 text-sm mt-1">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div>
            <input
              type="email"
              placeholder="Email"
              className="w-full border rounded-lg px-4 py-3"
              {...register("email", {
                required: "Email is required",
              })}
            />

            {errors.email && (
              <p className="text-red-500 text-sm mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <input
              type="password"
              placeholder="Password"
              className="w-full border rounded-lg px-4 py-3"
              {...register("password", {
                required: "Password is required",
              })}
            />

            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          <Button className="w-full">
            Create Account
          </Button>

        </form>
      </div>
    </MainLayout>
  );
};

export default Signup;