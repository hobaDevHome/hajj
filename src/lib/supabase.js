import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    'Missing Supabase environment variables. Please connect to Supabase using the "Connect to Supabase" button.'
  );
}

export const supabase = createClient(
  supabaseUrl || "https://placeholder-url.supabase.co",
  supabaseAnonKey || "placeholder-key"
);

export const fetchPeople = async (userId) => {
  let query = supabase.from("people").select("*, duaas(*)");

  if (userId) {
    query = query.eq("user_id", userId);
  }

  const { data, error } = await query;

  if (error) throw error;
  return data;
};

export const addPerson = async (name) => {
  const { data, error } = await supabase
    .from("people")
    .insert([{ name }])
    .select()
    .single();

  if (error) {
    console.error("Error adding person:", error);
    throw error;
  }

  return { ...data, duaas: [] };
};

export const deletePerson = async (id) => {
  const { error } = await supabase.from("people").delete().eq("id", id);

  if (error) {
    console.error("Error deleting person:", error);
    throw error;
  }

  return id;
};

export const addDuaa = async (personId, text) => {
  const { data, error } = await supabase
    .from("duaas")
    .insert([{ person_id: personId, text, is_done: false }])
    .select()
    .single();

  if (error) {
    console.error("Error adding duaa:", error);
    throw error;
  }

  return data;
};

export const updateDuaa = async (id, updates) => {
  const { data, error } = await supabase
    .from("duaas")
    .update(updates)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error("Error updating duaa:", error);
    throw error;
  }

  return data;
};

export const deleteDuaa = async (id) => {
  const { error } = await supabase.from("duaas").delete().eq("id", id);

  if (error) {
    console.error("Error deleting duaa:", error);
    throw error;
  }

  return id;
};
