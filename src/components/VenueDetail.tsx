import React, { useState } from 'react';
import { SectionOverview } from './SectionOverview';
import { SectionDetail } from './SectionDetail';
import { concertSections } from '../data/mockData';
import { venues } from '../data/venueData';
import { Section } from '../types';

interface VenueDetailProps {
  venueId: string;
  onBack: () => void;
}

export const VenueDetail: React.FC<VenueDetailProps> = ({ venueId, onBack }) => {
  const [selectedSection, setSelectedSection] = useState<Section | null>(null);
  
  // Find the selected venue
  const venue = venues.find(v => v.id === venueId);
  
  if (!venue) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-white mb-4">Venue Not Found</h2>
          <button
            onClick={onBack}
            className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Back to Venues
          </button>
        </div>
      </div>
    );
  }

  const handleSectionSelect = (section: Section) => {
    setSelectedSection(section);
  };

  const handleBackToOverview = () => {
    setSelectedSection(null);
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        {selectedSection ? (
          <SectionDetail 
            section={selectedSection} 
            onBack={handleBackToOverview}
          />
        ) : (
          <SectionOverview 
            venue={venue}
            sections={concertSections}
            onSectionClick={handleSectionSelect}
            onBackToHome={onBack}
          />
        )}
      </div>
    </div>
  );
};