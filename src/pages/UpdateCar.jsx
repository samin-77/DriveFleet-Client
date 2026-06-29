import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axiosInstance from '../api/axiosInstance';
import LoadingSpinner from '../components/LoadingSpinner';
import toast from 'react-hot-toast';
import { FiTruck, FiInfo } from 'react-icons/fi';

export default function UpdateCar() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    dailyPrice: '',
    description: '',
    availability: true,
    image: '',
    carType: 'SUV',
    location: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    axiosInstance.get(`/api/cars/${id}`)
      .then((res) => {
        const c = res.data;
        setForm({
          dailyPrice: c.dailyPrice,
          description: c.description,
          availability: c.availability,
          image: c.image,
          carType: c.carType,
          location: c.location,
        });
      })
      .catch(() => toast.error('Failed to load car'))
      .finally(() => setLoading(false));
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      await axiosInstance.put(`/api/cars/${id}`, {
        ...form,
        dailyPrice: Number(form.dailyPrice),
      });
      toast.success('Car updated!');
      navigate('/my-cars');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Update failed');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center"><FiTruck className="text-white text-lg" /></div>
        <h1 className="text-2xl font-bold text-gray-900">Update Car</h1>
      </div>
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-6 flex items-start gap-3">
        <FiInfo className="text-primary shrink-0 mt-0.5" />
        <p className="text-sm text-blue-800">Update the fields you want to change. Only price, description, availability, image, type, and location can be edited.</p>
      </div>
      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 md:p-8 space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Daily Rent Price ($)</label>
            <input type="number" name="dailyPrice" required value={form.dailyPrice} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Car Type</label>
            <select name="carType" value={form.carType} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none">
              <option>SUV</option>
              <option>Sedan</option>
              <option>Hatchback</option>
              <option>Luxury</option>
              <option>Convertible</option>
              <option>Truck</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <input type="url" name="image" required value={form.image} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pickup Location</label>
            <input type="text" name="location" required value={form.location} onChange={handleChange} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none" />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea name="description" required value={form.description} onChange={handleChange} rows={4} className="w-full px-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none" />
        </div>
        <div className="flex items-center gap-3">
          <input type="checkbox" name="availability" id="availability" checked={form.availability} onChange={handleChange} className="w-4 h-4 text-primary rounded focus:ring-primary" />
          <label htmlFor="availability" className="text-sm font-medium text-gray-700">Available for rent</label>
        </div>
        <button type="submit" disabled={saving} className="w-full bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition disabled:opacity-50">
          {saving ? 'Updating...' : 'Update Car'}
        </button>
      </form>
    </div>
  );
}
