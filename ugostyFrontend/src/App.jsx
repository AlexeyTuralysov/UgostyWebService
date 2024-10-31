import { Routes, Route } from 'react-router-dom';
import Header from './widgets/header/Header';
import Home from "./pages/Home/Home";
import Author from "./pages/Author/Author";
import AdminPage from './pages/AdminPanel/AdminPage';
import Auth from './pages/Auth/Auth';
import EditProfile from './pages/Editing/ProfileEdit/EditProfile';
import PayDonation from './pages/PayDonation/PayDonation';

import ProtectedRoute from './services/auth/ProtectedRoute';
import ProtectedForAdmin from './services/AdminService/ProtectedAdmin/ProtectedForAdmin';

import HeaderManager from './widgets/HeaderManager/HeaderManager';

function App() {

  return (
    <>


      <Routes>
        <Route element={<Header />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Auth />} />

          <Route path="/admin" element={
            <ProtectedForAdmin>
              <AdminPage />
            </ProtectedForAdmin>
          } />

          <Route path="/:author" element={<Author />} />

        </Route>

        <Route element={<HeaderManager />}>



          <Route
            path="/:author/edit"
            element={
              <ProtectedRoute>
                <EditProfile />
              </ProtectedRoute>
            }
          />

          <Route
            path="/:author/donations"
            element={
              <ProtectedRoute>
                <PayDonation />
              </ProtectedRoute>
            }
          />
        </Route>






      </Routes>

    </>



  )
}

export default App
