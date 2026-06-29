import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import BookingModal from '../components/BookingModal';
import { FaUsers, FaMapMarkerAlt, FaCar, FaDollarSign, FaCheckCircle, FaTimesCircle, FaCalendarCheck } from 'react-icons/fa';
import { FiTruck } from 'react-icons/fi';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

export default function CarDetails() {
  const { id } = useParams();
  const { user } = useAuth();
  const [showBooking, setShowBooking] = useState(false);

  const { data: car, isLoading } = useQuery({
    queryKey: ['car', id],
    queryFn: () => axiosInstance.get(`/api/cars/${id}`).then((r) => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (!car) return (
    <div className="text-center py-16">
      <FiTruck className="text-5xl text-gray-300 mx-auto mb-4" />
      <h2 className="text-xl font-bold text-gray-900 mb-2">Car Not Found</h2>
      <p className="text-gray-500 mb-4">The car you're looking for doesn't exist or has been removed.</p>
      <Link to="/explore-cars" className="inline-block bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition">Browse Cars</Link>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="rounded-2xl overflow-hidden shadow-sm border border-gray-200">
            <img src={car.image} alt={car.carName} className="w-full h-80 md:h-96 object-cover" />
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-start justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{car.carName}</h1>
              <p className="text-gray-500 flex items-center gap-2 mt-1"><FaMapMarkerAlt className="text-primary" /> {car.location}</p>
            </div>
            <span className={`px-4 py-1.5 rounded-full text-sm font-medium ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
              {car.availability ? 'Available' : 'Unavailable'}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Daily Price</p>
              <p className="text-2xl font-bold text-primary flex items-center gap-1"><FaDollarSign size={18} /> {car.dailyPrice}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Car Type</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FaCar className="text-primary" /> {car.carType}</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Seat Capacity</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FaUsers className="text-primary" /> {car.seatCapacity} Seats</p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4">
              <p className="text-xs text-gray-500 mb-1">Bookings</p>
              <p className="text-lg font-semibold text-gray-900 flex items-center gap-2"><FaCalendarCheck className="text-primary" /> {car.bookingCount || 0}</p>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
            <p className="text-gray-600 text-sm leading-relaxed">{car.description}</p>
          </div>

          <div className="mb-6">
            <h3 className="font-semibold text-gray-900 mb-2">Posted by</h3>
            <p className="text-sm text-gray-600">{car.userName || 'Unknown'}</p>
          </div>

          {user ? (
            <button onClick={() => setShowBooking(true)} disabled={!car.availability} className="bg-primary text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-primary/25">
              {car.availability ? 'Book Now' : 'Unavailable'}
            </button>
          ) : (
            <Link to="/login" className="inline-block bg-primary text-white px-8 py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition shadow-lg shadow-primary/25">
              Login to Book
            </Link>
          )}
        </motion.div>
      </div>

      {showBooking && <BookingModal car={car} onClose={() => setShowBooking(false)} />}
    </div>
  );
}
