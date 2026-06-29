import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiCalendar, FiDollarSign, FiUser, FiTruck, FiEye } from 'react-icons/fi';

export default function MyBookings() {
  const { data: bookings, isLoading, error } = useQuery({
    queryKey: ['my-bookings'],
    queryFn: () => axiosInstance.get('/api/my-bookings').then((r) => r.data),
  });

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-16 text-red-500">Failed to load bookings. Please try again.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Bookings</h1>
        <p className="text-gray-500 text-sm mt-1">View all your car rental bookings</p>
      </div>

      {bookings?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <FiTruck className="text-4xl text-gray-300 mx-auto mb-3" />
          <p className="text-gray-400">No bookings yet.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings?.map((booking) => (
            <div key={booking._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-5 flex flex-col sm:flex-row gap-4 items-start">
              {booking.car && (
                <div className="w-full sm:w-32 h-24 rounded-xl overflow-hidden shrink-0">
                  <img src={booking.car.image} alt={booking.car.carName} className="w-full h-full object-cover" />
                </div>
              )}
              <div className="flex-1">
                <h3 className="font-bold text-gray-900 text-lg">
                  {booking.car?.carName || 'Unknown Car'}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2 text-sm text-gray-600">
                  <p className="flex items-center gap-2"><FiCalendar className="text-primary" /> {new Date(booking.bookingDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                  <p className="flex items-center gap-2"><FiDollarSign className="text-primary" /> Total: <span className="font-semibold text-gray-900">${booking.totalPrice}</span></p>
                  <p className="flex items-center gap-2"><FiUser className="text-primary" /> {booking.driverNeeded ? 'With Driver' : 'Self Drive'}</p>
                </div>
                {booking.specialNote && (
                  <p className="text-xs text-gray-400 mt-2 italic">Note: {booking.specialNote}</p>
                )}
              </div>
              {booking.car && (
                <Link to={`/cars/${booking.car?._id}`} className="shrink-0 flex items-center gap-1 text-primary text-sm font-medium hover:underline mt-2 sm:mt-0">
                  <FiEye /> View Car
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
