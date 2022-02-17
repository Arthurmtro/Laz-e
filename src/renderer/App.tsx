import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { useEffect, lazy, Suspense } from 'react';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Libs
import { parseProfileData } from './libs/ProfilesFuncs';

// Hooks
import useProfiles from './hooks/useProfiles';

// layout
import Layout from './layout';

// Pages
const ProfileConfig = lazy(() => import('./pages/ProfileConfig'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

export default function App() {
  const [, setProfiles] = useProfiles();

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log('REFRESH TRIGGERED');
    parseProfileData(setProfiles);
  }, [setProfiles]);

  return (
    <MemoryRouter>
      <ToastContainer
        position="bottom-right"
        autoClose={1000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        limit={3}
      />
      <Suspense fallback={<h1>LOADING</h1>}>
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/add-profile" element={<ProfileConfig />} />
            <Route path="/edit-profile" element={<ProfileConfig />} />
          </Routes>
        </Layout>
      </Suspense>
    </MemoryRouter>
  );
}
