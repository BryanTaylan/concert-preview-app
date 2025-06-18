import React, { useState } from 'react';
import { HomePage } from './components/HomePage';
import { VenueDetail } from './components/VenueDetail';
import { AuthProvider } from './contexts/AuthContext';

type AppView = 'home' | 'venue';

function App() {
  const [currentView, setCurrentView] = useState<AppView>('home');
  const [selectedVenueId, setSelectedVenueId] = useState<string | null>(null);

  const handleVenueSelect = (venueId: string) => {
    setSelectedVenueId(venueId);
    setCurrentView('venue');
  };

  const handleBackToHome = () => {
    setCurrentView('home');
    setSelectedVenueId(null);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen">
        {currentView === 'home' ? (
          <HomePage onVenueSelect={handleVenueSelect} />
        ) : (
          selectedVenueId && (
            <VenueDetail 
              venueId={selectedVenueId} 
              onBack={handleBackToHome}
            />
          )
        )}
      </div>
    </AuthProvider>
  );
}

export default App;