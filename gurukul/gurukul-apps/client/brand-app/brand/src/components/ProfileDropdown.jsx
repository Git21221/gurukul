import { useEffect, useRef, useState } from 'react';
import { ChevronDown, LogOut, User } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../redux/slices/authSlice';

export const ProfileDropdown = ({ user, brandColor }) => {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const [open, setOpen] = useState(false);
  const firstLetter = user?.fullName?.[0]?.toUpperCase() || '?';
  const dispatch = useDispatch();
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-2 focus:outline-none"
      >
        {user.profile_pic ? (
          <img
            src={user.profile_pic}
            alt="Profile"
            className="w-8 h-8 rounded-full object-cover"
          />
        ) : (
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold"
            style={{ backgroundColor: `${brandColor}40` }}
          >
            {firstLetter}
          </div>
        )}
        <ChevronDown className="w-4 h-4 text-gray-600" />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded-lg z-50">
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 transition-colors"
          >
            <User className="w-5 h-5 text-gray-600" />
            <span>Profile</span>
          </Link>
          <button
            onClick={() => {
              // Clear cookies (must not be HttpOnly)
              document.cookie = 'accessToken=; Max-Age=0; path=/;';
              document.cookie = 'refreshToken=; Max-Age=0; path=/;';
              document.cookie = 'user_role=; Max-Age=0; path=/;';

              dispatch(logout());
              navigate('/login');
            }}
            className="flex items-center gap-3 px-4 py-2 text-gray-800 hover:bg-gray-100 w-full text-left transition-colors"
            style={{
              color: 'var(--danger-color)',
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.backgroundColor = 'var(--danger-bg-color)')
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.backgroundColor = 'transparent')
            }
          >
            <LogOut className="w-5 h-5" />
            <span>Logout</span>
          </button>
        </div>
      )}
    </div>
  );
};
