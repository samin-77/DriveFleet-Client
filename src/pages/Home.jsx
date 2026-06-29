import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FiArrowRight, FiShield, FiClock, FiHeadphones } from 'react-icons/fi';
import { useQuery } from '@tanstack/react-query';
import axiosInstance from '../api/axiosInstance';
import CarCard from '../components/CarCard';
import LoadingSpinner from '../components/LoadingSpinner';

export default function Home() {
  const { data: cars, isLoading, error } = useQuery({
    queryKey: ['cars', 'home'],
    queryFn: () => axiosInstance.get('/api/cars?limit=6').then((r) => r.data),
  });

  return (
    <div>
      {/* Banner */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-primary/90 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1600')] bg-cover bg-center opacity-20" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} className="max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-4">
              Drive Your <span className="text-secondary">Dream</span> Car Today
            </h1>
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Choose from our premium fleet of vehicles for any occasion. Affordable rates, flexible rentals, and exceptional service.
            </p>
            <Link to="/explore-cars" className="inline-flex items-center gap-2 bg-secondary text-gray-900 font-semibold px-7 py-3.5 rounded-xl hover:bg-yellow-400 transition shadow-lg">
              Explore Cars <FiArrowRight />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Cars */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Available Cars</h2>
          <p className="text-gray-500 mt-2">Choose from our carefully maintained fleet</p>
        </motion.div>
        {isLoading ? (
          <LoadingSpinner />
        ) : error ? (
          <div className="text-center py-8 text-red-500">Failed to load cars. Please try again later.</div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {cars?.map((car) => (
              <motion.div key={car._id} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
                <CarCard car={car} />
              </motion.div>
            ))}
          </div>
        )}
        {cars?.length > 0 && (
          <div className="text-center mt-8">
            <Link to="/explore-cars" className="inline-flex items-center gap-2 text-primary font-medium hover:underline">
              View All Cars <FiArrowRight />
            </Link>
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="bg-white py-16 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Why Choose DriveFleet?</h2>
            <p className="text-gray-500 mt-2">We make car rental simple and reliable</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: FiShield, title: 'Insurance Included', desc: 'Every rental comes with comprehensive insurance coverage for your peace of mind.' },
              { icon: FiClock, title: 'Flexible Rentals', desc: 'Daily, weekly, and monthly rental options to fit your schedule and budget.' },
              { icon: FiHeadphones, title: '24/7 Support', desc: 'Our support team is available around the clock to assist you anytime, anywhere.' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }} className="text-center p-8 rounded-2xl bg-gray-50 hover:bg-blue-50 transition">
                <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <item.icon className="text-2xl text-primary" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900">How It Works</h2>
            <p className="text-gray-500 mt-2">Rent a car in three simple steps</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Browse & Select', desc: 'Explore our wide range of vehicles and pick the perfect one for your needs.' },
              { step: '02', title: 'Book Online', desc: 'Fill in your details, choose your dates, and confirm your booking instantly.' },
              { step: '03', title: 'Hit the Road', desc: 'Pick up your car and enjoy the drive. Returning is just as easy!' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i === 1 ? 0 : i === 0 ? -20 : 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="text-center relative">
                <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-4 text-xl font-bold">
                  {item.step}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
