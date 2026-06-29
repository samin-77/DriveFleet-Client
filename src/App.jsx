import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import PrivateRoute from './components/PrivateRoute';
import Home from './pages/Home';
import ExploreCars from './pages/ExploreCars';
import CarDetails from './pages/CarDetails';
import Login from './pages/Login';
import Register from './pages/Register';
import AddCar from './pages/AddCar';
import MyAddedCars from './pages/MyAddedCars';
import UpdateCar from './pages/UpdateCar';
import MyBookings from './pages/MyBookings';
import NotFound from './pages/NotFound';

export default function App() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/explore-cars" element={<ExploreCars />} />
          <Route path="/cars/:id" element={<CarDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/add-car" element={<PrivateRoute><AddCar /></PrivateRoute>} />
          <Route path="/my-cars" element={<PrivateRoute><MyAddedCars /></PrivateRoute>} />
          <Route path="/my-cars/:id/edit" element={<PrivateRoute><UpdateCar /></PrivateRoute>} />
          <Route path="/my-bookings" element={<PrivateRoute><MyBookings /></PrivateRoute>} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
