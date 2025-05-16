import { FaDatabase, FaExclamationTriangle, FaLink } from 'react-icons/fa';
import Card from '../UI/Card';
import Button from '../UI/Button';

const SetupGuide = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <Card className="max-w-2xl w-full p-6">
        <div className="text-center mb-6">
          <div className="flex justify-center mb-4">
            <div className="bg-primary-100 text-primary-600 p-3 rounded-full">
              <FaDatabase size={24} />
            </div>
          </div>
          
          <h1 className="text-2xl font-display text-gray-900 mb-2">
            Supabase Connection Required
          </h1>
          
          <p className="text-gray-600">
            This app requires a Supabase connection to store your duaa lists.
          </p>
        </div>
        
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6 flex items-start gap-3">
          <div className="text-amber-500 mt-1">
            <FaExclamationTriangle />
          </div>
          <div>
            <h3 className="font-medium text-amber-800 mb-1">Connection Not Detected</h3>
            <p className="text-amber-700 text-sm">
              Please connect to Supabase using the "Connect to Supabase" button in the top right corner of the editor.
            </p>
          </div>
        </div>
        
        <div className="border rounded-lg divide-y">
          <div className="p-4">
            <h3 className="font-medium mb-2">1. Connect to Supabase</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Click the "Connect to Supabase" button in the top right corner of the editor.
            </p>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium mb-2">2. Create Supabase Project</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Follow the prompts to create a new Supabase project or connect to an existing one.
            </p>
          </div>
          
          <div className="p-4">
            <h3 className="font-medium mb-2">3. Refresh the App</h3>
            <p className="text-gray-600 mb-3 text-sm">
              Once connected, refresh the page to initialize the app with your Supabase connection.
            </p>
            <Button onClick={() => window.location.reload()} className="mt-2">
              Refresh Page
            </Button>
          </div>
        </div>
        
        <div className="mt-6 text-center text-sm text-gray-500">
          <p>
            The app will automatically detect your Supabase connection once it's set up.
          </p>
        </div>
      </Card>
    </div>
  );
};

export default SetupGuide;