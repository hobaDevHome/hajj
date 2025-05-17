import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const AddDuaaForm = ({ personId }) => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createDuaa } = usePeople();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      setError("Please enter a duaa");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createDuaa(personId, text.trim());
      setText("");
    } catch (err) {
      setError("Failed to add duaa. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-2">
        <textarea
          id="duaa-text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="اكتب نص الدعاء الذي تريد اضافته للقائمة"
          className="input min-h-[100px]"
          disabled={loading}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>

      <Button type="submit" fullWidth disabled={loading}>
        {loading ? (
          <Spinner size="sm" color="white" />
        ) : (
          <FaPlus className="mr-1" />
        )}
        إضافة الدعاء
      </Button>
    </form>
  );
};

export default AddDuaaForm;
