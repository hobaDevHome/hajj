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

const PeopleContext = createContext();

export const usePeople = () => useContext(PeopleContext);

export const PeopleProvider = ({ children }) => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    loadPeople();
  }, []);

  const loadPeople = async () => {
    try {
      setLoading(true);
      const data = await fetchPeople();
      setPeople(data);
    } catch (error) {
      toast.error("Failed to load data");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const createPerson = async (name) => {
    try {
      const newPerson = await addPerson(name);
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
      setPeople((prev) =>
        prev.map((person) =>
          person.id === personId
            ? { ...person, duaas: [...person.duaas, newDuaa] }
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
      setPeople((prev) =>
        prev.map((person) =>
          person.id === personId
            ? {
                ...person,
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
      setPeople((prev) =>
        prev.map((person) =>
          person.id === personId
            ? {
                ...person,
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
      setPeople((prev) =>
        prev.map((person) =>
          person.id === personId
            ? {
                ...person,
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
          person.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
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
  };

  return (
    <PeopleContext.Provider value={value}>{children}</PeopleContext.Provider>
  );
};
