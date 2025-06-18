import React, { useState } from 'react';
import { Camera, MapPin, Users, Ticket } from 'lucide-react';
import { Section, UserContent, Venue } from '../types';
import { UserContentModal } from './UserContentModal';

interface StadiumMapProps {
  venue: Venue;
  sections: Section[];
  onSectionClick: (section: Section) => void;
}

export const StadiumMap: React.FC<StadiumMapProps> = ({ venue, sections, onSectionClick }) => {
  const [selectedUserContent, setSelectedUserContent] = useState<UserContent | null>(null);
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  const handleUserContentClick = (content: UserContent, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedUserContent(content);
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
    <div className="relative w-full max-w-5xl mx-auto">
      {/* Stadium Map Container */}
      <div className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl p-8 shadow-2xl border border-gray-700">
        
        {/* Venue Header */}
        <div className="text-center mb-6">
          <div className="flex items-center justify-center space-x-3 mb-2">
            <span className="text-3xl">{getVenueTypeIcon(venue.venueType)}</span>
            <h2 className="text-2xl font-bold text-white">{venue.name}</h2>
          </div>
          <p className="text-gray-400 text-sm">Interactive Venue Map • Click sections to view seats • Red pins show fan photos</p>
          <div className="flex items-center justify-center space-x-4 mt-2 text-xs text-gray-500">
            <span>{venue.city}, {venue.state}</span>
            <span>•</span>
            <span>{venue.capacity.toLocaleString()} capacity</span>
            <span>•</span>
            <span className="capitalize">{venue.venueType}</span>
          </div>
        </div>

        {/* Map SVG */}
        <svg
          viewBox="0 0 100 100"
          className="w-full h-80 md:h-96 drop-shadow-lg"
          style={{ 
            background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(59, 130, 246, 0.1) 0%, rgba(17, 24, 39, 0.8) 70%)',
            borderRadius: '16px'
          }}
        >
          {/* Stage */}
          <defs>
            <linearGradient id="stageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fbbf24" />
              <stop offset="50%" stopColor="#f59e0b" />
              <stop offset="100%" stopColor="#d97706" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>

          <rect
            x="38"
            y="78"
            width="24"
            height="6"
            rx="3"
            fill="url(#stageGradient)"
            filter="url(#glow)"
          />
          <text
            x="50"
            y="82"
            textAnchor="middle"
            className="fill-white font-bold"
            fontSize="2.5"
          >
            STAGE
          </text>

          {/* Sections */}
          {sections.map((section) => (
            <g key={section.id}>
              {/* Section Area - More realistic shapes */}
              {section.id === 'floor' && (
                <ellipse
                  cx={section.position.x}
                  cy={section.position.y}
                  rx="12"
                  ry="8"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'fill-opacity-90 stroke-white stroke-2' 
                      : 'fill-opacity-70 stroke-gray-300 stroke-1'
                  }`}
                  fill="#f59e0b"
                  onClick={() => onSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              )}
              
              {section.id === 'lower-bowl' && (
                <ellipse
                  cx={section.position.x}
                  cy={section.position.y}
                  rx="18"
                  ry="10"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'fill-opacity-90 stroke-white stroke-2' 
                      : 'fill-opacity-70 stroke-gray-300 stroke-1'
                  }`}
                  fill="#3b82f6"
                  onClick={() => onSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              )}

              {section.id === 'upper-bowl' && (
                <ellipse
                  cx={section.position.x}
                  cy={section.position.y}
                  rx="22"
                  ry="12"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'fill-opacity-90 stroke-white stroke-2' 
                      : 'fill-opacity-70 stroke-gray-300 stroke-1'
                  }`}
                  fill="#10b981"
                  onClick={() => onSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              )}

              {section.id === 'suite-level' && (
                <rect
                  x={section.position.x - 15}
                  y={section.position.y - 4}
                  width="30"
                  height="8"
                  rx="2"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'fill-opacity-90 stroke-white stroke-2' 
                      : 'fill-opacity-70 stroke-gray-300 stroke-1'
                  }`}
                  fill="#fbbf24"
                  onClick={() => onSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              )}

              {(section.id === 'side-stage-left' || section.id === 'side-stage-right') && (
                <ellipse
                  cx={section.position.x}
                  cy={section.position.y}
                  rx="8"
                  ry="12"
                  className={`cursor-pointer transition-all duration-300 ${
                    hoveredSection === section.id 
                      ? 'fill-opacity-90 stroke-white stroke-2' 
                      : 'fill-opacity-70 stroke-gray-300 stroke-1'
                  }`}
                  fill="#ec4899"
                  onClick={() => onSectionClick(section)}
                  onMouseEnter={() => setHoveredSection(section.id)}
                  onMouseLeave={() => setHoveredSection(null)}
                />
              )}

              {/* Section Label */}
              <text
                x={section.position.x}
                y={section.position.y - (section.id === 'suite-level' ? 8 : 15)}
                textAnchor="middle"
                className="fill-white font-bold pointer-events-none drop-shadow-lg"
                fontSize="2.2"
              >
                {section.name}
              </text>

              {/* User Content Pinpoints */}
              {section.userContent.slice(0, 4).map((content, index) => {
                const angle = (index * 90) * (Math.PI / 180);
                const radius = section.id === 'floor' ? 16 : 
                              section.id === 'lower-bowl' ? 22 :
                              section.id === 'upper-bowl' ? 26 :
                              section.id === 'suite-level' ? 18 : 14;
                const pinX = section.position.x + Math.cos(angle) * radius;
                const pinY = section.position.y + Math.sin(angle) * radius;

                return (
                  <g key={content.id}>
                    {/* Pin Shadow */}
                    <circle
                      cx={pinX + 0.5}
                      cy={pinY + 0.5}
                      r="2.5"
                      className="fill-black fill-opacity-30"
                    />
                    {/* Pin */}
                    <circle
                      cx={pinX}
                      cy={pinY}
                      r="2.5"
                      className="fill-red-500 stroke-white stroke-1 cursor-pointer hover:fill-red-400 transition-all duration-200 animate-pulse hover:animate-none hover:scale-110"
                      onClick={(e) => handleUserContentClick(content, e as any)}
                    />
                    {/* Camera Icon */}
                    <circle
                      cx={pinX}
                      cy={pinY}
                      r="1.2"
                      className="fill-white cursor-pointer"
                      onClick={(e) => handleUserContentClick(content, e as any)}
                    />
                  </g>
                );
              })}
            </g>
          ))}
        </svg>

        {/* Legend */}
        <div className="mt-6 flex flex-wrap gap-6 justify-center text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <span className="text-gray-300">Fan Photos & Reviews</span>
          </div>
          <div className="flex items-center space-x-2">
            <Ticket className="h-4 w-4 text-blue-400" />
            <span className="text-gray-300">Click sections to book</span>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="h-4 w-4 text-green-400" />
            <span className="text-gray-300">Real attendee perspectives</span>
          </div>
        </div>
      </div>

      {/* Section Summary Cards */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            className={`p-5 rounded-xl border transition-all duration-300 cursor-pointer group ${
              hoveredSection === section.id
                ? 'bg-gray-700 border-gray-500 shadow-xl scale-105'
                : 'bg-gray-800 border-gray-700 hover:bg-gray-750'
            }`}
            onClick={() => onSectionClick(section)}
            onMouseEnter={() => setHoveredSection(section.id)}
            onMouseLeave={() => setHoveredSection(null)}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-bold text-white text-lg">{section.name}</h3>
              <div className="flex items-center space-x-1 bg-red-500 bg-opacity-20 px-2 py-1 rounded-full">
                <Camera className="h-3 w-3 text-red-400" />
                <span className="text-xs text-red-300 font-medium">{section.userContent.length}</span>
              </div>
            </div>
            
            <p className="text-sm text-gray-400 mb-3 leading-relaxed">{section.description}</p>
            
            <div className="flex justify-between items-center">
              <div className="text-sm">
                <span className="text-green-400 font-bold">${section.priceRange.min}-${section.priceRange.max}</span>
              </div>
              <div className="text-xs text-gray-500">
                <span className="text-blue-400 font-medium">{section.availableSeats}</span> available
              </div>
            </div>
            
            <div className="mt-3 w-full bg-gray-600 rounded-full h-1.5">
              <div 
                className="bg-gradient-to-r from-green-500 to-blue-500 h-1.5 rounded-full transition-all duration-300"
                style={{ width: `${(section.availableSeats / section.totalSeats) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* User Content Modal */}
      {selectedUserContent && (
        <UserContentModal
          content={selectedUserContent}
          onClose={() => setSelectedUserContent(null)}
        />
      )}
    </div>
  );
};