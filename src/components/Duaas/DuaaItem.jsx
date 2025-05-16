import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaEllipsisV, FaPray, FaTrash } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Card from "../UI/Card";
import Button from "../UI/Button";

const DuaaItem = ({ duaa, personId }) => {
  const { toggleDuaa, removeDuaa } = usePeople();
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggle = async () => {
    try {
      await toggleDuaa(personId, duaa.id, !duaa.is_done);
    } catch (error) {
      console.error("Error toggling duaa:", error);
    }
  };

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await removeDuaa(personId, duaa.id);
    } catch (error) {
      console.error("Error deleting duaa:", error);
      setIsDeleting(false);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative border rounded-lg p-3 transition-colors ${
        duaa.is_done ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-start gap-3">
        <button
          onClick={handleToggle}
          className={`flex-shrink-0 w-5 h-5 rounded border mt-0.5 flex items-center justify-center transition-colors ${
            duaa.is_done
              ? "bg-success-500 border-success-500 text-white"
              : "border-gray-300 hover:border-primary-500"
          }`}
        >
          {duaa.is_done && <FaCheck size={10} />}
        </button>

        <div className="flex-grow">
          <p
            className={`text-gray-800 break-words ${
              duaa.is_done ? "line-through text-gray-500" : ""
            }`}
          >
            {duaa.text}
          </p>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setShowActions(!showActions)}
            className="text-gray-400 hover:text-gray-600 p-1"
          >
            <FaEllipsisV />
          </button>
        </div>
      </div>

      {showActions && (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="mt-2 pt-2 border-t flex justify-end"
        >
          <Button
            variant="danger"
            size="sm"
            onClick={handleDelete}
            disabled={isDeleting}
            className="flex items-center gap-1"
          >
            <FaTrash size={12} /> حذف
          </Button>
        </motion.div>
      )}
    </motion.li>
  );
};

export default DuaaItem;
