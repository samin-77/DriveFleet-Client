import { Link, useNavigate } from 'react-router-dom';
import { FiHome, FiArrowLeft } from 'react-icons/fi';
import { useEffect } from 'react';

export default function NotFound() {
  const navigate = useNavigate();
  useEffect(() => { document.title = '404 - DriveFleet'; }, []);

  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4">
      <div className="text-center">
        <div className="text-8xl font-bold text-primary mb-2">404</div>
        <h2 className="text-2xl font-bold text-gray-900 mb-3">Page Not Found</h2>
        <p className="text-gray-500 mb-8 max-w-md mx-auto leading-relaxed">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="flex items-center justify-center gap-3">
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 border border-gray-300 text-gray-700 px-6 py-3 rounded-xl text-sm font-medium hover:bg-gray-50 transition">
            <FiArrowLeft /> Go Back
          </button>
          <Link to="/" className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-xl text-sm font-medium hover:bg-primary-dark transition shadow-lg shadow-primary/25">
            <FiHome /> Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
