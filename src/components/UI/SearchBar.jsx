import { motion } from "framer-motion";
import { FaTimes } from "react-icons/fa";

const SearchBar = ({ value, onChange, onClear, placeholder, icon }) => {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="input pl-10 pr-8 py-2 w-full rounded-full bg-white/20 text-white placeholder-gray-200 border-none focus:ring-2 focus:ring-white/30 focus:bg-white/30"
      />

      {value && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={onClear}
          className="absolute inset-y-0 right-0 pr-3 flex items-center text-white hover:text-gray-200 transition-colors"
        >
          <FaTimes />
        </motion.button>
      )}
    </div>
  );
};

export default SearchBar;
