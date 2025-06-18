import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { HomePage } from './components/HomePage';
import { SeatMapView } from './components/SeatMapView';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/seatmap" element={<SeatMapView />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
