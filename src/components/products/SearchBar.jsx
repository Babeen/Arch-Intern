import { Search } from "lucide-react";

const SearchBar = ({ search, setSearch }) => (
  <div className="relative w-full md:w-96">
    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
    <input
      type="text"
      placeholder="Search products..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full pl-11 pr-4 py-3 rounded-full border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none focus:border-amber-400 transition-colors"
    />
  </div>
);

export default SearchBar;
