const Button = ({
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  className = "",
  ...props
}) => {
  const baseStyles = "font-semibold transition-all duration-300 inline-flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-gray-900 dark:bg-white text-white dark:text-gray-900 hover:bg-amber-400 hover:text-gray-900",
    secondary: "bg-white dark:bg-gray-900 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 hover:border-gray-900 dark:hover:border-white",
    outline: "bg-transparent border-2 border-gray-900 dark:border-white text-gray-900 dark:text-white hover:bg-gray-900 hover:text-white dark:hover:bg-white dark:hover:text-gray-900",
    ghost: "bg-transparent text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800",
    danger: "bg-red-500 text-white hover:bg-red-600",
  };

  const sizes = {
    sm: "px-4 py-2 text-xs",
    md: "px-6 py-3 text-sm",
    lg: "px-8 py-3.5 text-base",
  };

  return (
    <button
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
