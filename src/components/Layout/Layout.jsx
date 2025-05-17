import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import { FaHome, FaSearch } from "react-icons/fa";
import { MdOutlineMosque } from "react-icons/md";
import { usePeople } from "../../contexts/PeopleContext";
import SearchBar from "../UI/SearchBar";

const Layout = ({ children, user }) => {
  const location = useLocation();
  const { searchQuery, setSearchQuery } = usePeople();
  const isHomePage = location.pathname === "/";

  return (
    <div className="min-h-screen flex flex-col ">
      <header className="bg-secondary-500 text-white shadow-md">
        <div className="container mx-auto py-2">
          <img
            src="/images/kaaba.jpg"
            alt="الكعبة"
            className="w-full max-h-64 object-cover rounded-xl "
          />
          <div className="flex items-center justify-between"></div>

          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-4"
          >
            <SearchBar
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onClear={() => setSearchQuery("")}
              placeholder="ابحث في الاسماء والدعوات"
              icon={<FaSearch className="text-gray-400" />}
            />
          </motion.div>
        </div>
      </header>

      <main className="flex-grow container mx-auto py-6 px-4">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {children}
        </motion.div>
      </main>

      <footer className="bg-gray-100 border-t border-gray-200 py-4">
        <div className="container mx-auto text-center text-gray-600">
          <p className="text-sm mt-1">Made with 💖 for your Hajj journey</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
