import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { FaArrowLeft, FaCheck, FaPlus, FaTrash, FaUser } from 'react-icons/fa';
import { usePeople } from '../../contexts/PeopleContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import EmptyState from '../UI/EmptyState';
import Spinner from '../UI/Spinner';
import DuaaItem from '../Duaas/DuaaItem';
import AddDuaaForm from '../Duaas/AddDuaaForm';
import DeletePersonModal from './DeletePersonModal';

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { people, loading } = usePeople();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
  const person = people.find(p => p.id === id);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }
  
  if (!person) {
    return (
      <div className="text-center">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Person Not Found</h2>
        <p className="text-gray-600 mb-6">The person you're looking for does not exist.</p>
        <Button onClick={() => navigate('/')}>
          <FaArrowLeft className="mr-2" /> Back to People
        </Button>
      </div>
    );
  }
  
  const totalDuaas = person.duaas.length;
  const completedDuaas = person.duaas.filter(duaa => duaa.is_done).length;
  const isComplete = totalDuaas > 0 && completedDuaas === totalDuaas;
  
  return (
    <div>
      <div className="mb-6">
        <button 
          onClick={() => navigate('/')}
          className="text-primary-600 hover:text-primary-800 mb-4 flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          <span>Back to people</span>
        </button>
        
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl md:text-3xl font-display text-gray-900">
                {person.name}
              </h1>
              {isComplete && totalDuaas > 0 && (
                <span className="bg-success-500 text-white p-1 rounded-full">
                  <FaCheck size={12} />
                </span>
              )}
            </div>
            <p className="text-gray-600 mt-1">
              {completedDuaas} of {totalDuaas} duaas completed
            </p>
          </div>
          
          <Button 
            variant="danger" 
            onClick={() => setIsDeleteModalOpen(true)}
          >
            <FaTrash className="mr-2" />
            Delete Person
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-visible">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Duaas</h2>
            </div>
            
            <div className="p-4">
              {person.duaas.length === 0 ? (
                <EmptyState
                  title="No duaas added yet"
                  description="Add duaas that you want to make for this person."
                />
              ) : (
                <AnimatePresence>
                  <ul className="space-y-3">
                    {person.duaas.map((duaa) => (
                      <DuaaItem 
                        key={duaa.id} 
                        duaa={duaa} 
                        personId={person.id} 
                      />
                    ))}
                  </ul>
                </AnimatePresence>
              )}
            </div>
          </Card>
        </div>
        
        <div>
          <Card>
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Add New Duaa</h2>
            </div>
            
            <div className="p-4">
              <AddDuaaForm personId={person.id} />
            </div>
          </Card>
          
          <Card className="mt-4">
            <div className="p-4 border-b">
              <h2 className="text-xl font-semibold">Summary</h2>
            </div>
            
            <div className="p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Total Duaas:</span>
                <span className="font-medium">{totalDuaas}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Completed:</span>
                <span className="font-medium text-success-500">{completedDuaas}</span>
              </div>
              
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-600">Remaining:</span>
                <span className="font-medium text-primary-500">{totalDuaas - completedDuaas}</span>
              </div>
              
              <div className="mt-4">
                <div className="relative h-2 bg-gray-200 rounded-full overflow-hidden">
                  <motion.div 
                    className={`absolute top-0 left-0 h-full ${
                      isComplete ? 'bg-success-500' : 'bg-primary-500'
                    }`}
                    initial={{ width: 0 }}
                    animate={{ 
                      width: `${totalDuaas > 0 ? (completedDuaas / totalDuaas) * 100 : 0}%` 
                    }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                  />
                </div>
                
                <div className="mt-1 text-sm text-right">
                  {totalDuaas > 0 
                    ? `${Math.round((completedDuaas / totalDuaas) * 100)}% complete` 
                    : 'No duaas added'}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      
      <DeletePersonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        person={person}
        onDeleted={() => navigate('/')}
      />
    </div>
  );
};

export default PersonDetail;