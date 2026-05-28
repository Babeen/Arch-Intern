const LoadingSkeleton = () => (
  <div className="animate-pulse bg-white dark:bg-gray-900 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-800">
    <div className="h-64 bg-gray-100 dark:bg-gray-800" />
    <div className="p-4 space-y-3">
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-3/4" />
      <div className="h-4 bg-gray-100 dark:bg-gray-800 rounded-full w-1/2" />
      <div className="h-8 bg-gray-100 dark:bg-gray-800 rounded-full w-1/3 mt-2" />
    </div>
  </div>
);

export default LoadingSkeleton;
