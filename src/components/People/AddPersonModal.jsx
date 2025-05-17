// @ts-nocheck
/* eslint-disable react/prop-types */
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Modal from "../UI/Modal";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";

const AddPersonModal = ({ isOpen, onClose }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const { createPerson } = usePeople();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Please enter a name");
      return;
    }

    try {
      setLoading(true);
      setError("");
      await createPerson(name.trim());
      setName("");
      onClose();
    } catch (err) {
      setError("Failed to add person. Please try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  console.log("AddPersonModal isOpen:", isOpen);

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} title="إضافة اسم " footer="">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              الاسم
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="اكتب اسم الشخص"
              className="input"
              disabled={loading}
            />
            {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
          </div>

          <div className="flex justify-end gap-2 mt-6">
            <Button variant="outline" onClick={onClose} disabled={loading}>
              الغاء
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <Spinner size="sm" color="white" />
              ) : (
                <FaPlus className="mr-1" />
              )}
              أضف الاسم
            </Button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default AddPersonModal;
