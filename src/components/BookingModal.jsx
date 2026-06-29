import { useState } from 'react';
import { FiX } from 'react-icons/fi';
import toast from 'react-hot-toast';
import axiosInstance from '../api/axiosInstance';

export default function BookingModal({ car, onClose }) {
  const [driverNeeded, setDriverNeeded] = useState(false);
  const [specialNote, setSpecialNote] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [days, setDays] = useState(1);

  const totalPrice = car.dailyPrice * days;

  const handleBook = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      await axiosInstance.post('/api/bookings', {
        carId: car._id,
        driverNeeded,
        specialNote,
        bookingDate: startDate || new Date().toISOString().split('T')[0],
        totalPrice,
      });
      toast.success('Car booked successfully!');
      onClose();
    } catch (err) {
      toast.error(err.response?.data?.message || 'Booking failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" onClick={() => onClose?.()}>
      <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6 relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"><FiX size={20} /></button>
        <h3 className="text-xl font-bold text-gray-900 mb-1">Book {car.carName}</h3>
        <p className="text-sm text-gray-500 mb-4">${car.dailyPrice}/day - {car.carType}</p>

        <form onSubmit={handleBook} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
              <input type="date" min={new Date().toISOString().split('T')[0]} value={startDate} onChange={(e) => setStartDate(e.target.value)} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Rental Days</label>
              <input type="number" min={1} max={30} value={days} onChange={(e) => setDays(Math.max(1, Math.min(30, parseInt(e.target.value) || 1)))} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Driver Needed</label>
            <div className="flex gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="driver" checked={!driverNeeded} onChange={() => setDriverNeeded(false)} className="text-primary" />
                <span className="text-sm">No</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="radio" name="driver" checked={driverNeeded} onChange={() => setDriverNeeded(true)} className="text-primary" />
                <span className="text-sm">Yes</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Special Note (Optional)</label>
            <textarea value={specialNote} onChange={(e) => setSpecialNote(e.target.value)} rows={3} className="w-full px-3 py-2 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" placeholder="Any special requests..." />
          </div>

          <div className="bg-gray-50 rounded-xl p-3">
            <p className="text-sm text-gray-600">Total: <span className="text-xl font-bold text-primary">${totalPrice}</span></p>
          </div>

          <button type="submit" disabled={submitting} className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition disabled:opacity-50">
            {submitting ? 'Booking...' : 'Book Now'}
          </button>
        </form>
      </div>
    </div>
  );
}
