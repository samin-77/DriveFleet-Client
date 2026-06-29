import { useState, useRef, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { FiMenu, FiX, FiLogOut, FiUser, FiPlusCircle, FiCalendar, FiTruck } from 'react-icons/fi';

export default function Navbar() {
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef();

  useEffect(() => {
    function handleClick(e) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  const linkClass = ({ isActive }) =>
    `px-3 py-2 rounded-lg text-sm font-medium transition ${isActive ? 'text-primary bg-blue-50' : 'text-gray-600 hover:text-primary hover:bg-gray-50'}`;

  const navLinks = (
    <>
      <NavLink to="/" end onClick={() => setMenuOpen(false)} className={linkClass}>Home</NavLink>
      <NavLink to="/explore-cars" onClick={() => setMenuOpen(false)} className={linkClass}>Explore Cars</NavLink>
      {user && (
        <>
          <NavLink to="/add-car" onClick={() => setMenuOpen(false)} className={linkClass}>Add Car</NavLink>
          <NavLink to="/my-bookings" onClick={() => setMenuOpen(false)} className={linkClass}>My Bookings</NavLink>
        </>
      )}
    </>
  );

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 bg-primary rounded-lg flex items-center justify-center">
              <FiTruck className="text-white text-lg" />
            </div>
            <span className="text-xl font-bold text-gray-900">DriveFleet</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            {navLinks}
          </div>

          <div className="flex items-center gap-3">
            {user ? (
              <div className="relative" ref={dropdownRef}>
                <button onClick={() => setDropdownOpen(!dropdownOpen)} className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition">
                  <img src={user.photoURL || 'https://ui-avatars.com/api/?name=' + user.name} alt="" className="w-8 h-8 rounded-full object-cover border-2 border-primary" />
                  <span className="hidden sm:block text-sm font-medium text-gray-700">{user.name}</span>
                </button>
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">{user.name}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                    <Link to="/add-car" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"><FiPlusCircle /> Add Car</Link>
                    <Link to="/my-bookings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"><FiCalendar /> My Bookings</Link>
                    <Link to="/my-cars" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-gray-700 hover:bg-blue-50 hover:text-primary transition"><FiTruck /> My Added Cars</Link>
                    <hr className="my-1 border-gray-100" />
                    <button onClick={() => { logout(); setDropdownOpen(false); }} className="flex items-center gap-2 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 transition w-full text-left"><FiLogOut /> Logout</button>
                  </div>
                )}
              </div>
            ) : (
              <Link to="/login" className="bg-primary text-white px-5 py-2 rounded-lg text-sm font-medium hover:bg-primary-dark transition">Login</Link>
            )}
            <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100">
              {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
            </button>
          </div>
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200 px-4 py-3 space-y-1">
          <NavLink to="/" end onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Home</NavLink>
          <NavLink to="/explore-cars" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Explore Cars</NavLink>
          {user && (
            <>
              <NavLink to="/add-car" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">Add Car</NavLink>
              <NavLink to="/my-bookings" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">My Bookings</NavLink>
              <NavLink to="/my-cars" onClick={() => setMenuOpen(false)} className="block px-3 py-2 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50">My Added Cars</NavLink>
              <hr className="my-2" />
              <button onClick={() => { logout(); setMenuOpen(false); }} className="flex items-center gap-2 px-3 py-2 text-sm text-red-600">Logout</button>
            </>
          )}
          {!user && <Link to="/login" onClick={() => setMenuOpen(false)} className="block px-3 py-2 text-sm font-medium text-primary">Login</Link>}
        </div>
      )}
    </nav>
  );
}
