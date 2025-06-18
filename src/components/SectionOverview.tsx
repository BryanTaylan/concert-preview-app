import React from 'react';
import { MapPin, Camera, Star, ArrowLeft, Users, Calendar } from 'lucide-react';
import { Section, Venue } from '../types';
import { StadiumMap } from './StadiumMap';

interface SectionOverviewProps {
  venue: Venue;
  sections: Section[];
  onSectionClick: (section: Section) => void;
  onBackToHome?: () => void;
}

export const SectionOverview: React.FC<SectionOverviewProps> = ({ venue, sections, onSectionClick, onBackToHome }) => {
  const totalUserContent = sections.reduce((sum, section) => sum + section.userContent.length, 0);
  const totalAvailableSeats = sections.reduce((sum, section) => sum + section.availableSeats, 0);

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
    <div className="space-y-8">
      {/* Header */}
      <div className="text-center space-y-6">
        {onBackToHome && (
          <div className="flex justify-start mb-6">
            <button
              onClick={onBackToHome}
              className="flex items-center space-x-2 p-3 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
            >
              <ArrowLeft className="h-5 w-5" />
              <span>Back to Venues</span>
            </button>
          </div>
        )}
        
        {/* Venue Hero Section */}
        <div className="relative rounded-3xl overflow-hidden mb-8">
          <img
            src={venue.image}
            alt={venue.name}
            className="w-full h-64 md:h-80 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <div className="flex items-center space-x-3 mb-4">
              <div className="text-4xl">{getVenueTypeIcon(venue.venueType)}</div>
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white">
                  {venue.name}
                </h1>
                <div className="flex items-center space-x-4 text-gray-300 mt-2">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{venue.city}, {venue.state}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="h-4 w-4" />
                    <span>{venue.capacity.toLocaleString()} capacity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="space-y-2">
          <p className="text-xl text-gray-300">
            See real fan perspectives before you buy
          </p>
        </div>
        
        {/* Venue Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Star className="h-5 w-5 text-yellow-400 fill-current" />
              <span className="text-2xl font-bold text-white">{venue.rating}</span>
            </div>
            <p className="text-sm text-gray-400">{venue.totalReviews.toLocaleString()} reviews</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Camera className="h-5 w-5 text-red-400" />
              <span className="text-2xl font-bold text-white">{totalUserContent}</span>
            </div>
            <p className="text-sm text-gray-400">fan photos</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <Calendar className="h-5 w-5 text-green-400" />
              <span className="text-2xl font-bold text-white">{venue.upcomingEvents}</span>
            </div>
            <p className="text-sm text-gray-400">upcoming events</p>
          </div>
          
          <div className="bg-gray-800 rounded-2xl p-4 border border-gray-700">
            <div className="flex items-center justify-center space-x-2 mb-2">
              <MapPin className="h-5 w-5 text-blue-400" />
              <span className="text-2xl font-bold text-white">{totalAvailableSeats}</span>
            </div>
            <p className="text-sm text-gray-400">seats available</p>
          </div>
        </div>

        {/* Popular Events */}
        <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 border border-purple-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
          <h3 className="text-lg font-bold text-white mb-3">Popular Events at {venue.name}</h3>
          <div className="flex flex-wrap gap-2 justify-center">
            {venue.popularEvents.map((event, index) => (
              <span
                key={index}
                className="bg-purple-600 bg-opacity-50 text-purple-200 px-3 py-1 rounded-full text-sm font-medium"
              >
                {event}
              </span>
            ))}
          </div>
        </div>

        {/* Instructions */}
        <div className="bg-gradient-to-r from-blue-900/30 to-purple-900/30 border border-blue-500/30 rounded-2xl p-6 max-w-2xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-gray-300">Click red pins to see fan photos</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span className="text-gray-300">Click sections to view available seats</span>
            </div>
          </div>
        </div>
      </div>

      {/* Stadium Map */}
      <StadiumMap venue={venue} sections={sections} onSectionClick={onSectionClick} />

      {/* Footer Info */}
      <div className="text-center space-y-3 pt-8 border-t border-gray-800">
        <p className="text-gray-400 text-sm">
          All photos and reviews are from verified attendees of previous events at {venue.name}
        </p>
        <p className="text-gray-600 text-xs">
          Actual views may vary depending on stage setup, lighting, and event configuration
        </p>
      </div>
    </div>
  );
};