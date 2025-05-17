import { useState } from "react";
import { motion } from "framer-motion";
import { FaCheck, FaEllipsisV, FaPray, FaTrash } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Card from "../UI/Card";
import Button from "../UI/Button";

const DuaaItem = ({ duaa, personId }) => {
  const { toggleDuaa, removeDuaa, editDuaa } = usePeople();
  const [showActions, setShowActions] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editedText, setEditedText] = useState(duaa.text);

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

  const handleSaveEdit = async () => {
    if (!editedText.trim()) {
      // ممكن تضيف تحذير هنا لو النص فاضي
      return;
    }
    try {
      await editDuaa(personId, duaa.id, editedText.trim());
      setIsEditing(false);
      setShowActions(false);
    } catch (error) {
      console.error("Error editing duaa:", error);
    }
  };

  return (
    <motion.li
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, height: 0, marginTop: 0 }}
      transition={{ duration: 0.3 }}
      className={`relative border rounded-lg p-2 transition-colors ${
        duaa.is_done ? "bg-gray-50 border-gray-200" : "bg-white border-gray-200"
      }`}
    >
      <div
        className="flex items-start gap-3"
        onClick={!isEditing ? handleToggle : undefined}
      >
        <button
          className={`flex-shrink-0 w-3 h-3 rounded border mt-0.5 flex items-center justify-center transition-colors ${
            duaa.is_done
              ? "bg-success-500 border-success-500 text-white"
              : "border-gray-300 hover:border-primary-500"
          }`}
        >
          {duaa.is_done && <FaCheck size={10} />}
        </button>

        <div className="flex-grow">
          {isEditing ? (
            <textarea
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              className="w-full border rounded px-2 py-1 text-gray-900 resize-none h-24"
              autoFocus
              onClick={(e) => e.stopPropagation()}
            />
          ) : (
            <p
              className={`text-gray-800 break-words ${
                duaa.is_done ? "line-through text-gray-500" : ""
              }`}
            >
              {duaa.text}
            </p>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowActions(!showActions);
            }}
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
          className="mt-2 pt-2 border-t flex justify-end gap-2"
        >
          {isEditing ? (
            <>
              <Button size="sm" onClick={handleSaveEdit}>
                حفظ
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setIsEditing(false);
                  setEditedText(duaa.text);
                  setShowActions(false);
                }}
              >
                إلغاء
              </Button>
            </>
          ) : (
            <>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setShowActions(false)}
              >
                إغلاق
              </Button>
              <Button
                variant="secondary"
                size="sm"
                onClick={() => setIsEditing(true)}
                className="flex items-center gap-1"
              >
                تعديل
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleDelete}
                disabled={isDeleting}
                className="flex items-center gap-1"
              >
                حذف
              </Button>
            </>
          )}
        </motion.div>
      )}
    </motion.li>
  );
};

export default DuaaItem;
