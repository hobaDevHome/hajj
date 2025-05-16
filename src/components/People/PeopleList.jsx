import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlus, FaUsers } from 'react-icons/fa';
import { usePeople } from '../../contexts/PeopleContext';
import Button from '../UI/Button';
import Spinner from '../UI/Spinner';
import EmptyState from '../UI/EmptyState';
import AddPersonModal from './AddPersonModal';
import DeletePersonModal from './DeletePersonModal';
import PersonCard from './PersonCard';

const PeopleList = () => {
  const { people, loading } = usePeople();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-display text-gray-900">People</h2>
          <p className="text-gray-600 mt-1">
            {people.length > 0 
              ? `${people.length} ${people.length === 1 ? 'person' : 'people'} in your duaa list`
              : 'Add people to your duaa list'}
          </p>
        </div>
        
        <Button 
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <FaPlus /> 
          <span className="hidden sm:inline">Add Person</span>
        </Button>
      </div>

      {people.length === 0 ? (
        <EmptyState
          icon={<FaUsers />}
          title="No people added yet"
          description="Start by adding a person you want to make duaa for during your Hajj journey."
          action={
            <Button onClick={() => setIsAddModalOpen(true)}>
              <FaPlus className="mr-2" /> Add First Person
            </Button>
          }
        />
      ) : (
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1 }}
        >
          <AnimatePresence>
            {people.map((person) => (
              <PersonCard 
                key={person.id} 
                person={person} 
                onDelete={setPersonToDelete}
              />
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      <AddPersonModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
      />

      {personToDelete && (
        <DeletePersonModal
          isOpen={true}
          onClose={() => setPersonToDelete(null)}
          person={personToDelete}
        />
      )}
    </div>
  );
};

export default PeopleList;