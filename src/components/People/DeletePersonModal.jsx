import { useState } from 'react';
import { FaExclamationTriangle } from 'react-icons/fa';
import { usePeople } from '../../contexts/PeopleContext';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';

const DeletePersonModal = ({ isOpen, onClose, person, onDeleted }) => {
  const [loading, setLoading] = useState(false);
  const { removePerson } = usePeople();

  const handleDelete = async () => {
    try {
      setLoading(true);
      await removePerson(person.id);
      onClose();
      if (onDeleted) onDeleted();
    } catch (error) {
      console.error('Error deleting person:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Delete Person"
    >
      <div className="text-center mb-4">
        <div className="flex justify-center mb-4">
          <div className="bg-red-100 text-red-600 p-3 rounded-full">
            <FaExclamationTriangle size={24} />
          </div>
        </div>
        
        <h3 className="text-lg font-medium mb-2">
          Are you sure you want to delete {person?.name}?
        </h3>
        
        <p className="text-gray-600">
          This will permanently delete this person and all their duaas.
          This action cannot be undone.
        </p>
      </div>
      
      <div className="flex justify-end gap-2 mt-6">
        <Button
          variant="outline"
          onClick={onClose}
          disabled={loading}
        >
          Cancel
        </Button>
        <Button
          variant="danger"
          onClick={handleDelete}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" color="white" /> : 'Delete'}
        </Button>
      </div>
    </Modal>
  );
};

export default DeletePersonModal;