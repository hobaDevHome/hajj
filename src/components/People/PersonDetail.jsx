import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { FaArrowLeft, FaCheck, FaPlus, FaTrash, FaUser } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Button from "../UI/Button";
import Card from "../UI/Card";
import EmptyState from "../UI/EmptyState";
import Spinner from "../UI/Spinner";
import DuaaItem from "../Duaas/DuaaItem";
import AddDuaaForm from "../Duaas/AddDuaaForm";
import DeletePersonModal from "./DeletePersonModal";

const PersonDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { people, loading } = usePeople();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const person = people.find((p) => p.id === id);

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
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Person Not Found
        </h2>
        <p className="text-gray-600 mb-6">
          The person you're looking for does not exist.
        </p>
        <Button onClick={() => navigate("/")}>
          <FaArrowLeft className="mr-2" /> عودة للأسماء
        </Button>
      </div>
    );
  }

  const totalDuaas = person.duaas.length;
  const completedDuaas = person.duaas.filter((duaa) => duaa.is_done).length;
  const isComplete = totalDuaas > 0 && completedDuaas === totalDuaas;

  return (
    <div>
      <div className="mb-6">
        <button
          onClick={() => navigate("/")}
          className="text-primary-600 hover:text-primary-800 mb-4 flex items-center"
        >
          <FaArrowLeft className="mr-1" />
          <span>عودة للأسماء</span>
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
              {completedDuaas} of {totalDuaas} الدعوات المكتملة
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="overflow-visible">
            <div className="p-1 border-b">
              <h2 className="text-xl font-semibold">قائمة الدعوات</h2>
            </div>

            <div className="p-1">
              {person.duaas.length === 0 ? (
                <EmptyState title=" " description="اضف ادعية للقائمة" />
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
            <div className="p-2 border-b">
              <h2 className="text-xl font-semibold">إضافة دعاء جديد </h2>
            </div>

            <div className="p-1">
              <AddDuaaForm personId={person.id} />
            </div>
          </Card>
        </div>
        <Button variant="danger" onClick={() => setIsDeleteModalOpen(true)}>
          <FaTrash className="mr-2" />
          حذف الاسم
        </Button>
      </div>

      <DeletePersonModal
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        person={person}
        onDeleted={() => navigate("/")}
      />
    </div>
  );
};

export default PersonDetail;
