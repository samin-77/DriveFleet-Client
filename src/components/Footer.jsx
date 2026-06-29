import { Link } from 'react-router-dom';
import { FiMapPin, FiMail, FiTruck, FiArrowUp } from 'react-icons/fi';
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
                <FiTruck className="text-white text-lg" />
              </div>
              <span className="text-xl font-bold text-white">DriveFleet</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Your trusted car rental platform. Explore our fleet and hit the road with confidence. Quality vehicles at affordable prices.
            </p>
            <div className="flex gap-3 mt-4">
              <a href="https://www.facebook.com/ishfak.mahbub.samin" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition"><FaFacebook className="text-sm" /></a>
              <a href="https://www.linkedin.com/in/ishfak-samin-dev/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition"><FaLinkedin className="text-sm" /></a>
              <a href="https://www.instagram.com/icepiper._.77/" target="_blank" rel="noopener noreferrer" className="w-9 h-9 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary transition"><FaInstagram className="text-sm" /></a>
            </div>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Useful Links</h3>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/" className="hover:text-primary transition">Home</Link></li>
              <li><Link to="/explore-cars" className="hover:text-primary transition">Explore Cars</Link></li>
              <li><Link to="/add-car" className="hover:text-primary transition">Add Car</Link></li>
              <li><Link to="/my-bookings" className="hover:text-primary transition">My Bookings</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-white font-semibold mb-4">Contact Info</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-center gap-2"><FiMapPin className="text-primary shrink-0" /> Dhaka, Bangladesh</li>
              <li className="flex items-center gap-2"><FiMail className="text-primary shrink-0" /> saminmahbub19@gmail.com</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 py-4 flex items-center justify-between px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <p className="text-center text-sm text-gray-500">&copy; {new Date().getFullYear()} DriveFleet. All rights reserved.</p>
        <button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="text-gray-400 hover:text-primary transition">
          <FiArrowUp />
        </button>
      </div>
    </footer>
  );
}
