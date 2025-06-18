import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Music } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

export const SeatMapView: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Get seat map data from location state
  const { eventName, seatmapUrl } = location.state || {
    eventName: 'Unknown Event',
    seatmapUrl: '',
  };

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
          <div onClick={() => navigate('/')} className="flex items-center space-x-3 cursor-pointer">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <Music className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">VenueView</h1>
             </div>
              <p className="text-xs text-gray-400">See before you buy</p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            {isAuthenticated && user ? (
              <div className="flex items-center space-x-3">
                <img
                  src={user.avatar}
                  alt={user.username}
                  className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                />
                <span className="text-white font-medium">{user.username}</span>
              </div>
            ) : (
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => handleAuthClick('login')}
                  className="text-gray-300 hover:text-white"
                >
                  Sign In
                </button>
                <button
                  onClick={() => handleAuthClick('signup')}
                  className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Seat Map Content */}
      <div className="flex flex-col items-center justify-center px-4 py-10">
        <h1 className="text-3xl font-bold text-white mb-6">{eventName}</h1>
        <div className="relative max-w-4xl w-full">
          <img
            src={seatmapUrl}
            alt="Seat Map"
            className="w-full h-auto rounded-xl border-4 border-purple-600 shadow-xl"
          />
        </div>
        <button
          onClick={() => navigate(-1)}
          className="mt-8 text-purple-400 underline hover:text-white"
        >
          ← Back to Events
        </button>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <AuthModal
          mode={authMode}
          onClose={() => setShowAuthModal(false)}
          onSwitchMode={(mode) => setAuthMode(mode)}
        />
      )}
    </div>
  );
};
