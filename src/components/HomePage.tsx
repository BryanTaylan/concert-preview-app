import React, { useState, useEffect } from 'react';
import { Search, MapPin, Star, Calendar, Users, Music, Ticket, TrendingUp, Filter, Heart } from 'lucide-react';
import { Venue } from '../types';
import { venues, calculateDistance } from '../data/venueData';
import { useAuth } from '../contexts/AuthContext';
import { AuthModal } from './AuthModal';

interface HomePageProps {
  onVenueSelect: (venueId: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onVenueSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredVenues, setFilteredVenues] = useState<Venue[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'nearby' | 'popular' | 'favorites'>('all');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'signup'>('login');
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    // Add distance to venues and filter based on search and filters
    let venuesWithDistance = venues.map(venue => ({
      ...venue,
      distance: calculateDistance(venue)
    }));

    // Apply search filter
    if (searchQuery) {
      venuesWithDistance = venuesWithDistance.filter(venue =>
        venue.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
        venue.state.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Apply category filter
    switch (selectedFilter) {
      case 'nearby':
        venuesWithDistance = venuesWithDistance.filter(venue => venue.distance! < 10).sort((a, b) => a.distance! - b.distance!);
        break;
      case 'popular':
        venuesWithDistance = venuesWithDistance.sort((a, b) => b.rating - a.rating);
        break;
      case 'favorites':
        if (isAuthenticated && user) {
          venuesWithDistance = venuesWithDistance.filter(venue => user.favoriteVenues.includes(venue.id));
        }
        break;
      default:
        venuesWithDistance = venuesWithDistance.sort((a, b) => a.distance! - b.distance!);
    }

    setFilteredVenues(venuesWithDistance);
  }, [searchQuery, selectedFilter, user, isAuthenticated]);

  const handleAuthClick = (mode: 'login' | 'signup') => {
    setAuthMode(mode);
    setShowAuthModal(true);
  };

  const getVenueTypeIcon = (type: string) => {
    switch (type) {
      case 'arena': return '🏟️';
      case 'stadium': return '⚾';
      case 'theater': return '🎭';
      case 'amphitheater': return '🎪';
      case 'club': return '🎵';
      default: return '🎤';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900">
      {/* Header */}
      <header className="bg-black bg-opacity-50 backdrop-blur-md border-b border-gray-800 sticky top-0 z-40">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
                <Music className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">VenueView</h1>
                <p className="text-xs text-gray-400">See before you buy</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {isAuthenticated && user ? (
                <div className="flex items-center space-x-3">
                  <img
                    src={user.avatar || 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'}
                    alt={user.username}
                    className="w-8 h-8 rounded-full object-cover border-2 border-purple-500"
                  />
                  <span className="text-white font-medium">{user.username}</span>
                </div>
              ) : (
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => handleAuthClick('login')}
                    className="text-gray-300 hover:text-white transition-colors"
                  >
                    Sign In
                  </button>
                  <button
                    onClick={() => handleAuthClick('signup')}
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-200"
                  >
                    Sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto space-y-8">
            <div className="space-y-4">
              <h2 className="text-6xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                See Your View
              </h2>
              <h3 className="text-3xl font-bold text-white">
                Before You Buy
              </h3>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
                Discover real fan photos and reviews from every seat in the house. Make informed decisions with authentic perspectives from fellow concert-goers.
              </p>
            </div>

            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search venues, cities, or artists..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-lg"
                />
              </div>
            </div>

            {/* Filter Buttons */}
            <div className="flex flex-wrap justify-center gap-3">
              {[
                { key: 'all', label: 'All Venues', icon: Music },
                { key: 'nearby', label: 'Nearby', icon: MapPin },
                { key: 'popular', label: 'Popular', icon: TrendingUp },
                { key: 'favorites', label: 'Favorites', icon: Heart }
              ].map(({ key, label, icon: Icon }) => (
                <button
                  key={key}
                  onClick={() => setSelectedFilter(key as any)}
                  disabled={key === 'favorites' && !isAuthenticated}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-medium transition-all duration-200 ${
                    selectedFilter === key
                      ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  } ${key === 'favorites' && !isAuthenticated ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Venues Grid */}
      <section className="py-12 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold text-white">
              {selectedFilter === 'all' && 'All Venues'}
              {selectedFilter === 'nearby' && 'Venues Near You'}
              {selectedFilter === 'popular' && 'Popular Venues'}
              {selectedFilter === 'favorites' && 'Your Favorites'}
            </h3>
            <div className="text-gray-400">
              {filteredVenues.length} venue{filteredVenues.length !== 1 ? 's' : ''} found
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredVenues.map((venue) => (
              <div
                key={venue.id}
                onClick={() => onVenueSelect(venue.id)}
                className="bg-gray-800 rounded-2xl overflow-hidden border border-gray-700 hover:border-purple-500 transition-all duration-300 cursor-pointer group hover:scale-105 hover:shadow-2xl"
              >
                <div className="relative">
                  <img
                    src={venue.image}
                    alt={venue.name}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-3 left-3 bg-black bg-opacity-70 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white">
                    {getVenueTypeIcon(venue.venueType)} {venue.venueType}
                  </div>
                  {venue.distance && (
                    <div className="absolute top-3 right-3 bg-purple-600 bg-opacity-90 backdrop-blur-sm px-2 py-1 rounded-full text-xs text-white font-medium">
                      {venue.distance.toFixed(1)} mi
                    </div>
                  )}
                </div>

                <div className="p-5 space-y-3">
                  <div>
                    <h4 className="text-lg font-bold text-white group-hover:text-purple-300 transition-colors">
                      {venue.name}
                    </h4>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <MapPin className="h-3 w-3" />
                      <span>{venue.city}, {venue.state}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className="text-white font-medium">{venue.rating}</span>
                      <span className="text-gray-400 text-sm">({venue.totalReviews.toLocaleString()})</span>
                    </div>
                    <div className="flex items-center space-x-1 text-sm text-gray-400">
                      <Users className="h-3 w-3" />
                      <span>{venue.capacity.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-sm">
                      <Calendar className="h-3 w-3 text-green-400" />
                      <span className="text-green-400 font-medium">{venue.upcomingEvents} events</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Ticket className="h-3 w-3 text-blue-400" />
                      <span className="text-blue-400 text-sm font-medium">View Seats</span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-gray-700">
                    <div className="text-xs text-gray-500 mb-1">Popular Events:</div>
                    <div className="flex flex-wrap gap-1">
                      {venue.popularEvents.slice(0, 2).map((event, index) => (
                        <span
                          key={index}
                          className="bg-gray-700 text-gray-300 px-2 py-1 rounded text-xs"
                        >
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredVenues.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-bold text-white mb-2">No venues found</h3>
              <p className="text-gray-400">Try adjusting your search or filters</p>
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-black bg-opacity-30">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-bold text-white mb-4">Why Choose VenueView?</h3>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Get the inside scoop on every venue with real fan experiences and authentic perspectives
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '📸',
                title: 'Real Fan Photos',
                description: 'See actual views from every section with photos taken by real concert-goers'
              },
              {
                icon: '⭐',
                title: 'Verified Reviews',
                description: 'Read honest reviews from verified attendees who sat in your exact section'
              },
              {
                icon: '🎯',
                title: 'Smart Recommendations',
                description: 'Get personalized seat recommendations based on your preferences and budget'
              }
            ].map((feature, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="text-4xl">{feature.icon}</div>
                <h4 className="text-xl font-bold text-white">{feature.title}</h4>
                <p className="text-gray-400 leading-relaxed">{feature.description}</p>
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