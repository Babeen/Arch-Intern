const LoadingSkeleton = () => {
  return (
    <div className="animate-pulse bg-white rounded-xl p-4 shadow">
      <div className="bg-gray-300 h-48 rounded mb-4"></div>

      <div className="bg-gray-300 h-4 rounded w-3/4 mb-2"></div>

      <div className="bg-gray-300 h-4 rounded w-1/2"></div>
    </div>
  );
};

export default LoadingSkeleton;