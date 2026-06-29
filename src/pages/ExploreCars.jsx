import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';
import { FiSearch } from 'react-icons/fi';

const carTypes = ['All', 'SUV', 'Sedan', 'Hatchback', 'Luxury', 'Convertible', 'Truck'];

export default function ExploreCars() {
  const [search, setSearch] = useState('');
  const [carType, setCarType] = useState('All');

  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['cars', search, carType],
    queryFn: () => {
      const params = new URLSearchParams();
      if (search) params.append('search', search);
      if (carType && carType !== 'All') params.append('carType', carType);
      return axiosInstance.get(`/api/cars?${params}`).then((r) => r.data);
    },
  });

  const handleSearch = (e) => {
    e.preventDefault();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Explore Our Fleet</h1>
        <p className="text-gray-500 mt-1">Find the perfect car for your journey</p>
      </div>

      {/* Search & Filter */}
      <div className="flex flex-col sm:flex-row gap-4 mb-8">
        <form onSubmit={handleSearch} className="flex-1 relative">
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by car name..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-xl text-sm focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
          />
        </form>
        <div className="flex gap-2 flex-wrap">
          {carTypes.map((type) => (
            <button
              key={type}
              onClick={() => setCarType(type)}
              className={`px-4 py-2 rounded-xl text-sm font-medium transition ${carType === type ? 'bg-primary text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {isLoading ? (
        <LoadingSpinner />
      ) : error ? (
        <div className="text-center py-16 text-red-500">Failed to load cars. Please try again.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars?.length === 0 ? (
            <div className="col-span-full text-center py-16">
              <FiSearch className="text-4xl text-gray-300 mx-auto mb-3" />
              <p className="text-gray-400 text-lg">No cars found matching your criteria.</p>
              <p className="text-gray-400 text-sm mt-1">Try adjusting your search or filter.</p>
            </div>
          ) : (
            cars?.map((car) => <CarCard key={car._id} car={car} />)
          )}
        </div>
      )}
    </div>
  );
}
