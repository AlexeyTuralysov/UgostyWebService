

import { Routes, Route } from 'react-router-dom';
import Header from './widgets/header/Header';
import Home from "./pages/Home/Home";
import Author from "./pages/Author/Author";
import Auth from './pages/Auth/Auth';
import EditProfile from './pages/Editing/ProfileEdit/EditProfile';
import PayDonation from './pages/PayDonation/PayDonation';

import ProtectedRoute from './services/auth/ProtectedRoute';


function App() {


  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Auth />} />

        <Route path="/:author" element={<Author />} />

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



      </Routes>
    </>



  )
}

export default App
