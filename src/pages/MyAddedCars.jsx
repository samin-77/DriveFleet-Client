import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiEdit2, FiTrash2, FiPlus, FiUsers, FiMapPin, FiDollarSign } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { useState } from 'react';

export default function MyAddedCars() {
  const queryClient = useQueryClient();
  const [deleteId, setDeleteId] = useState(null);

  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['my-cars'],
    queryFn: () => axiosInstance.get('/api/my-cars').then((r) => r.data),
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => axiosInstance.delete(`/api/cars/${id}`),
    onSuccess: () => {
      toast.success('Car deleted');
      queryClient.invalidateQueries({ queryKey: ['my-cars'] });
      setDeleteId(null);
    },
    onError: () => toast.error('Failed to delete car'),
  });

  const confirmDelete = (id) => {
    setDeleteId(id);
    document.getElementById('delete_modal').showModal();
  };

  if (isLoading) return <LoadingSpinner />;
  if (error) return <div className="text-center py-16 text-red-500">Failed to load your cars. Please try again.</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">My Added Cars</h1>
          <p className="text-gray-500 text-sm mt-1">Manage your car listings</p>
        </div>
        <Link to="/add-car" className="flex items-center gap-2 bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition shadow-lg shadow-primary/25">
          <FiPlus /> Add New Car
        </Link>
      </div>

      {cars?.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-200">
          <p className="text-gray-400">You haven't added any cars yet.</p>
          <Link to="/add-car" className="inline-block mt-3 text-primary font-medium hover:underline">Add your first car</Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars?.map((car) => (
            <div key={car._id} className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="h-44 overflow-hidden">
                <img src={car.image} alt={car.carName} className="w-full h-full object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-gray-900 mb-2">{car.carName}</h3>
                <div className="space-y-1.5 text-sm text-gray-600 mb-3">
                  <p className="flex items-center gap-2"><FiDollarSign className="text-primary" /> ${car.dailyPrice}/day</p>
                  <p className="flex items-center gap-2"><FiMapPin className="text-primary" /> {car.location}</p>
                  <p className="flex items-center gap-2"><FiUsers className="text-primary" /> {car.seatCapacity} Seats</p>
                  <span className={`text-xs px-2.5 py-0.5 rounded-full ${car.availability ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {car.availability ? 'Available' : 'Unavailable'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <Link to={`/my-cars/${car._id}/edit`} className="flex-1 flex items-center justify-center gap-1.5 bg-blue-50 text-primary py-2 rounded-xl text-sm font-medium hover:bg-blue-100 transition">
                    <FiEdit2 /> Update
                  </Link>
                  <button onClick={() => confirmDelete(car._id)} className="flex-1 flex items-center justify-center gap-1.5 bg-red-50 text-red-600 py-2 rounded-xl text-sm font-medium hover:bg-red-100 transition">
                    <FiTrash2 /> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <dialog id="delete_modal" className="modal rounded-2xl p-0 backdrop:bg-black/50">
        <div className="bg-white rounded-2xl p-6 max-w-sm w-full">
          <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Car?</h3>
          <p className="text-sm text-gray-500 mb-5">This action cannot be undone. Are you sure you want to delete this car listing?</p>
          <div className="flex gap-3">
            <button onClick={() => document.getElementById('delete_modal').close()} className="flex-1 border border-gray-300 text-gray-700 py-2.5 rounded-xl text-sm font-medium hover:bg-gray-50 transition">Cancel</button>
            <button onClick={() => { deleteMutation.mutate(deleteId); document.getElementById('delete_modal').close(); }} className="flex-1 bg-red-600 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-red-700 transition">Delete</button>
          </div>
        </div>
      </dialog>
    </div>
  );
}
