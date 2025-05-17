fetchPeople; // @ts-nocheck
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { createContext, useContext, useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
  fetchPeople,
  addPerson,
  deletePerson,
  addDuaa,
  updateDuaa,
  deleteDuaa,
} from "../lib/supabase";
const ADMIN_EMAILS = ["admin1@hajj.com", "admin2@hajj.com", "admin@hajj.com"]; // غيريهم للإيميلات الحقيقية

// @ts-ignore
const PeopleContext = createContext();

export const usePeople = () => useContext(PeopleContext);

// eslint-disable-next-line react/prop-types
export const PeopleProvider = ({ children, user }) => {
  // @ts-ignore
  const isAdmin = ADMIN_EMAILS.includes(user?.email);
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (user) loadPeople();
  }, [user]);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const data = await fetchPeople(isAdmin ? null : user?.email);
      setPeople(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPerson = async (name) => {
    try {
      const newPerson = await addPerson(name, user?.email);
      setPeople((prev) => [newPerson, ...prev]);
      toast.success(`Added ${name}`);
      return newPerson;
    } catch (error) {
      toast.error("Failed to add person");
      throw error;
    }
  };
  const removePerson = async (id) => {
    try {
      await deletePerson(id);
      // @ts-ignore
      setPeople((prev) => prev.filter((person) => person.id !== id));
      toast.success("Person removed");
    } catch (error) {
      toast.error("Failed to remove person");
      throw error;
    }
  };

  const createDuaa = async (personId, text) => {
    try {
      const newDuaa = await addDuaa(personId, text);
      // @ts-ignore
      setPeople((prev) =>
        prev.map((person) =>
          // @ts-ignore
          person.id === personId
            ? // @ts-ignore
              { ...person, duaas: [...person.duaas, newDuaa] }
            : person
        )
      );
      toast.success("Duaa added");
      return newDuaa;
    } catch (error) {
      toast.error("Failed to add duaa");
      throw error;
    }
  };

  const toggleDuaa = async (personId, duaaId, isDone) => {
    try {
      const updatedDuaa = await updateDuaa(duaaId, { is_done: isDone });
      // @ts-ignore
      setPeople((prev) =>
        prev.map((person) =>
          // @ts-ignore
          person.id === personId
            ? {
                // @ts-ignore
                ...person,
                // @ts-ignore
                duaas: person.duaas.map((duaa) =>
                  duaa.id === duaaId ? updatedDuaa : duaa
                ),
              }
            : person
        )
      );

      if (isDone) {
        toast.success("Duaa marked as complete");
      }
    } catch (error) {
      toast.error("Failed to update duaa");
      throw error;
    }
  };

  const editDuaa = async (personId, duaaId, newText) => {
    try {
      const updatedDuaa = await updateDuaa(duaaId, { text: newText });
      // @ts-ignore
      setPeople((prev) =>
        prev.map((person) =>
          // @ts-ignore
          person.id === personId
            ? {
                // @ts-ignore
                ...person,
                // @ts-ignore
                duaas: person.duaas.map((duaa) =>
                  duaa.id === duaaId ? updatedDuaa : duaa
                ),
              }
            : person
        )
      );
      toast.success("تم تعديل الدعاء");
    } catch (error) {
      toast.error("فشل تعديل الدعاء");
      throw error;
    }
  };

  const removeDuaa = async (personId, duaaId) => {
    try {
      await deleteDuaa(duaaId);
      // @ts-ignore
      setPeople((prev) =>
        prev.map((person) =>
          // @ts-ignore
          person.id === personId
            ? {
                // @ts-ignore
                ...person,
                // @ts-ignore
                duaas: person.duaas.filter((duaa) => duaa.id !== duaaId),
              }
            : person
        )
      );
      toast.success("Duaa removed");
    } catch (error) {
      toast.error("Failed to remove duaa");
      throw error;
    }
  };

  const filteredPeople = searchQuery
    ? people.filter(
        (person) =>
          // @ts-ignore
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          // @ts-ignore
          person.duaas.some((duaa) =>
            duaa.text.toLowerCase().includes(searchQuery.toLowerCase())
          )
      )
    : people;

  const value = {
    people: filteredPeople,
    loading,
    searchQuery,
    setSearchQuery,
    createPerson,
    removePerson,
    createDuaa,
    toggleDuaa,
    editDuaa,
    removeDuaa,
    reload: loadPeople,
    user,
    isAdmin,
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
