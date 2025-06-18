import React, { useState, useEffect } from 'react';
import {
  Search, Music
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';
import { useNavigate } from 'react-router-dom';

interface HomePageProps {
  onVenueSelect?: (venueId: string) => void;
}

interface TMEvent {
  name: string;
  date: string;
  imageUrl: string;
  link: string;
  seatmapUrl: string;
}

export const HomePage: React.FC<HomePageProps> = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nearby' | 'popular' | 'favorites'>('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const [filteredVenues, setFilteredVenues] = useState<TMEvent[]>([]);
  const [tmEvents, setTmEvents] = useState<TMEvent[]>([]);

  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tm-events")
      .then(res => res.json())
      .then(data => {
        console.log("✅ Raw Ticketmaster data:", data);
        const raw = data || [];
        const formatted = raw.map((e: any) => ({
          name: e.name,
          date: new Date(e.date).toLocaleString(undefined, {
            dateStyle: 'medium',
            timeStyle: 'short',
          }),
          imageUrl: e.image,
          link: e.link,
          seatmapUrl: e.seatmap,
        }));
        console.log("✅ Formatted TM Events:", formatted);
        setTmEvents(formatted);
        setFilteredVenues(formatted);
      })
      .catch(err => console.error("TM fetch error:", err));
  }, []);

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
                <button onClick={() => handleAuthClick('login')} className="text-gray-300 hover:text-white">Sign In</button>
                <button onClick={() => handleAuthClick('signup')} className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-2 rounded-lg font-medium">Sign Up</button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-20 px-4 text-center">
        <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-4">See Your View</h2>
        <p className="text-xl text-gray-300 max-w-2xl mx-auto">Discover real fan photos and reviews from every seat in the house. Make informed decisions with authentic perspectives.</p>

        {/* Search */}
        <div className="relative max-w-2xl mx-auto mt-10">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search events..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
      </section>

      {/* TM Events Section */}
      <section className="px-4 pb-12">
        <div className="container mx-auto">
          <h3 className="text-2xl font-bold text-white mb-6">🎟️ Trending Events</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {tmEvents.map((event, index) => (
              <div key={index} className="bg-gray-800 p-4 rounded-xl shadow-md">
                <img
                  src={event.imageUrl}
                  alt={event.name}
                  className="w-full h-40 object-cover rounded"
                />
                <h4 className="text-white mt-2 text-lg font-bold">{event.name}</h4>
                <p className="text-sm text-gray-400">{event.date}</p>

                {event.link ? (
                    <div className="mt-2">
                  <a
                    href={event.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-purple-400 hover:underline mt-1 inline-block hover:cursor-pointer"
                  >
                    View Tickets →
                  </a>
                  </div>
                ) : (
                  <p className="text-gray-500 text-sm italic">Link unavailable</p>
                )}

                {event.seatmapUrl ? (
                  <button
                    onClick={() => navigate('/seatmap', { state: { seatmapUrl: event.seatmapUrl } })}
                    className="text-blue-400 hover:underline mt-1 inline-block hover:cursor-pointer"
                  >
                    View Seat Map →
                  </button>
                ) : (
                  <p className="text-gray-500 text-sm italic">Seat map unavailable</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

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
