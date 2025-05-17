// @ts-nocheck
/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlus, FaUndo, FaUsers } from "react-icons/fa";
import { usePeople } from "../../contexts/PeopleContext";
import Button from "../UI/Button";
import Spinner from "../UI/Spinner";
import EmptyState from "../UI/EmptyState";
import AddPersonModal from "./AddPersonModal";
import DeletePersonModal from "./DeletePersonModal";
import PersonCard from "./PersonCard";
import { toast } from "react-toastify";
import { supabase } from "../../lib/supabase";
import { useNavigate } from "react-router-dom";

const PeopleList = () => {
  const { people, loading, reload, isAdmin } = usePeople();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [personToDelete, setPersonToDelete] = useState(null);
  const navigate = useNavigate();
  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Spinner size="lg" />
      </div>
    );
  }

  // this fucntion makes all duaa to be uncompleted

  const onResetAll = async () => {
    try {
      const { data: duaas, error: fetchError } = await supabase
        .from("duaas")
        .select("id");

      if (fetchError) throw fetchError;

      const ids = duaas.map((d) => d.id);

      if (ids.length === 0) {
        toast.info("لا توجد دعوات لإعادة تعيينها.");
        return;
      }

      const { error: updateError } = await supabase
        .from("duaas")
        .update({ is_done: false })
        .in("id", ids);

      if (updateError) throw updateError;

      toast.success("تم إعادة تعيين كل الدعوات ✨");

      // 🌀 إعادة تحميل البيانات بدون ريفريش
      reload();
    } catch (error) {
      toast.error("فشل في إعادة التعيين");
      console.error(error);
    }
  };

  // دالة تسجيل الخروج
  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      toast.success("تم تسجيل الخروج");
      // بعد تسجيل الخروج ممكن تعملي redirect مثلاً للصفحة الرئيسية أو صفحة الدخول
      navigate("/login"); // عدلي حسب مسار صفحة الدخول عندك
    } catch (error) {
      toast.error("فشل في تسجيل الخروج");
      console.error(error);
    }
  };
  console.log("ismodalopen", isAddModalOpen);
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl md:text-3xl font-display text-gray-900">
            الأسماء
          </h2>
          <p className="text-gray-600 mt-1">
            {people.length > 0
              ? `${people.length} ${
                  people.length === 1 ? "شخص" : "أشخاص"
                } في قائمتك`
              : "أضف اشخاص للقائمة"}
          </p>
        </div>

        <Button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2"
        >
          <FaPlus />
          <span className="hidden sm:inline">إضافة اسم جديد</span>
        </Button>
      </div>

      {people.length === 0 ? (
        <EmptyState
          icon={<FaUsers />}
          title="لا اسماء بعد"
          description="ابدأ باضافة اسماء للقائمة"
          action={""}
        />
      ) : (
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-4 gap-2"
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
          {isAdmin && (
            <Button variant="accent" onClick={onResetAll}>
              <FaUndo />
              <span>ابدأ من جديد</span>
            </Button>
          )}
        </motion.div>
      )}

      <AddPersonModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
      />

      <Button
        onClick={handleSignOut}
        variant="danger"
        className="flex items-center gap-2"
      >
        تسجيل خروج
      </Button>
      <div className="w-full flex justify-between"></div>

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
