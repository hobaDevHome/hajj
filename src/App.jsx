import { Routes, Route, Navigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Layout from './components/Layout/Layout';
import PeopleList from './components/People/PeopleList';
import PersonDetail from './components/People/PersonDetail';
import { supabase } from './lib/supabase';
import SetupGuide from './components/Setup/SetupGuide';

function App() {
  const [isConnected, setIsConnected] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkConnection = async () => {
      try {
        const { data, error } = await supabase.from('people').select('count', { count: 'exact', head: true });
        if (error) {
          console.error('Supabase connection error:', error);
          setIsConnected(false);
        } else {
          setIsConnected(true);
        }
      } catch (err) {
        console.error('Connection check failed:', err);
        setIsConnected(false);
      } finally {
        setChecking(false);
      }
    };

    checkConnection();
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

  return (
    <Layout>
      <Routes>
        <Route path="/" element={<PeopleList />} />
        <Route path="/person/:id" element={<PersonDetail />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Layout>
  );
}

export default App;