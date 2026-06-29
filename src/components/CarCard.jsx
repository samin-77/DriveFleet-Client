import { Link } from 'react-router-dom';
import { FiUsers, FiMapPin, FiDollarSign } from 'react-icons/fi';

export default function CarCard({ car }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow flex flex-col">
      <div className="relative h-52 overflow-hidden">
        <img src={car.image} alt={car.carName} className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" />
        {!car.availability && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-medium px-3 py-1 rounded-full">Unavailable</div>
        )}
        {car.availability && (
          <div className="absolute top-3 right-3 bg-accent text-white text-xs font-medium px-3 py-1 rounded-full">Available</div>
        )}
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="text-lg font-bold text-gray-900 mb-2">{car.carName}</h3>
        <div className="space-y-2 text-sm text-gray-600 mb-4 flex-1">
          <p className="flex items-center gap-2"><FiMapPin className="text-primary shrink-0" /> {car.location}</p>
          <p className="flex items-center gap-2"><FiUsers className="text-primary shrink-0" /> {car.seatCapacity} Seats</p>
          <p className="flex items-center gap-2"><FiDollarSign className="text-primary shrink-0" /> <span className="text-lg font-bold text-gray-900">${car.dailyPrice}</span> / day</p>
          <p className="text-xs bg-gray-100 text-gray-600 inline-block px-3 py-1 rounded-full">{car.carType}</p>
        </div>
        <Link to={`/cars/${car._id}`} className="block w-full text-center bg-primary text-white py-2.5 rounded-xl text-sm font-medium hover:bg-primary-dark transition">
          View Details
        </Link>
      </div>
    </div>
  );
}
