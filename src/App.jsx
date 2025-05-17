/* eslint-disable no-unused-vars */
import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import Layout from "./components/Layout/Layout";
import PeopleList from "./components/People/PeopleList";
import PersonDetail from "./components/People/PersonDetail";
import { supabase } from "./lib/supabase";
import SetupGuide from "./components/Setup/SetupGuide";
import Login from "./components/Login";
import Singup from "./components/Signup";
import { PeopleProvider } from "./contexts/PeopleContext";

const ADMIN_EMAILS = ["admin1@hajj.com", "admin2@hajj.com"];

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);
  const [user, setUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  // @ts-ignore
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        // @ts-ignore
        const { data, error } = await supabase
          .from("people")
          .select("count", { count: "exact", head: true });
        if (error) {
          console.error("Supabase connection error:", error);
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      } catch (err) {
        console.error("Connection check failed:", err);
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    };

    checkConnection();
  }, []);

  // هنا نتحقق من حالة تسجيل الدخول للمستخدم
  useEffect(() => {
    const getUser = async () => {
      const {
        data: { session },
      } = await supabase.auth.getSession();
      // @ts-ignore
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      setLoadingUser(false);
      setIsAdmin(ADMIN_EMAILS.includes(currentUser?.email));

      // استماع لتغير حالة الدخول
      supabase.auth.onAuthStateChange((_event, session) => {
        // @ts-ignore
        setUser(session?.user ?? null);
      });
    };
    getUser();
  }, []);

  if (checking) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-white">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-lg text-gray-600">Checking connection...</p>
        </div>
      </div>
    );
  }

  if (!isConnected) {
    return <SetupGuide />;
  }

  // if (!user) {
  //   return <Login />; // لو المستخدم مش مسجل دخول، اظهر صفحة تسجيل الدخول
  // }

  return (
    <PeopleProvider user={user}>
      <Layout user={user}>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Singup />} />

          {!user ? (
            <Route path="*" element={<Navigate to="/login" replace />} />
          ) : (
            <>
              <Route
                path="/"
                element={
                  <PeopleProvider user={user}>
                    <PeopleList />
                  </PeopleProvider>
                }
              />
              <Route
                path="/person/:id"
                element={
                  <PeopleProvider user={user}>
                    <PersonDetail />
                  </PeopleProvider>
                }
              />
            </>
          )}
        </Routes>
      </Layout>
    </PeopleProvider>
  );
}

export default App;
