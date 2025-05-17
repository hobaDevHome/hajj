import { Link } from "react-router-dom";
import { FaCheck, FaTrash } from "react-icons/fa";
import { motion } from "framer-motion";
import Button from "../UI/Button";

const PersonCard = ({ person, onDelete }) => {
  const totalDuaas = person.duaas.length;
  const completedDuaas = person.duaas.filter((duaa) => duaa.is_done).length;
  const isComplete = totalDuaas > 0 && completedDuaas === totalDuaas;

  const completionPercentage =
    totalDuaas === 0 ? 0 : Math.round((completedDuaas / totalDuaas) * 100);

  const handleDelete = (e) => {
    e.preventDefault(); // Prevent navigation
    onDelete(person);
  };

  return (
    <Link to={`/person/${person.id}`}>
      <motion.div
        className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-4 group"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <h3 className="text-lg font-medium text-gray-900">{person.name}</h3>
            {isComplete && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="text-success-500"
              >
                <FaCheck size={14} />
              </motion.span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-500">
              {completedDuaas}/{totalDuaas}
            </span>
          </div>
        </div>

        <div className="relative h-2 bg-gray-100 rounded-full overflow-hidden">
          <motion.div
            className={`absolute top-0 left-0 h-full ${
              isComplete ? "bg-success-500" : "bg-primary-500"
            }`}
            initial={{ width: 0 }}
            animate={{ width: `${completionPercentage}%` }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </Link>
  );
};

export default PersonCard;
