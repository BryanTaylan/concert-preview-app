import React, { useState } from 'react';
import { ArrowLeft, Ticket, DollarSign } from 'lucide-react';
import { Section, Seat } from '../types';

interface SectionDetailProps {
  section: Section;
  onBack: () => void;
}

export const SectionDetail: React.FC<SectionDetailProps> = ({ section, onBack }) => {
  const [selectedSeats, setSelectedSeats] = useState<Set<string>>(new Set());

  const handleSeatClick = (seat: Seat) => {
    if (seat.status === 'sold') return;
    
    const newSelected = new Set(selectedSeats);
    if (newSelected.has(seat.id)) {
      newSelected.delete(seat.id);
    } else {
      newSelected.add(seat.id);
    }
    setSelectedSeats(newSelected);
  };

  const getSeatStatus = (seat: Seat): 'available' | 'selected' | 'sold' => {
    if (seat.status === 'sold') return 'sold';
    if (selectedSeats.has(seat.id)) return 'selected';
    return 'available';
  };

  const getSeatClassName = (seat: Seat): string => {
    const status = getSeatStatus(seat);
    const baseClasses = "w-8 h-8 rounded-md text-xs font-medium transition-all duration-200 cursor-pointer border-2 flex items-center justify-center";
    
    switch (status) {
      case 'available':
        return `${baseClasses} bg-green-600 border-green-500 hover:bg-green-500 hover:border-green-400 hover:scale-110 text-white`;
      case 'selected':
        return `${baseClasses} bg-purple-600 border-purple-500 text-white shadow-lg scale-110`;
      case 'sold':
        return `${baseClasses} bg-gray-700 border-gray-600 text-gray-500 cursor-not-allowed`;
      default:
        return baseClasses;
    }
  };

  const totalPrice = Array.from(selectedSeats).reduce((sum, seatId) => {
    const seat = section.seats.find(s => s.id === seatId);
    return sum + (seat?.price || 0);
  }, 0);

  // Group seats by row for better display
  const seatsByRow = section.seats.reduce((acc, seat) => {
    if (!acc[seat.row]) {
      acc[seat.row] = [];
    }
    acc[seat.row].push(seat);
    return acc;
  }, {} as Record<string, Seat[]>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onBack}
          className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-gray-300 hover:text-white"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h2 className="text-2xl font-bold text-white">{section.name}</h2>
          <p className="text-gray-400">{section.description}</p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-6 p-4 bg-gray-800 rounded-lg">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-600 rounded border border-green-500"></div>
          <span className="text-sm text-gray-300">Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-purple-600 rounded border border-purple-500"></div>
          <span className="text-sm text-gray-300">Selected</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-700 rounded border border-gray-600"></div>
          <span className="text-sm text-gray-300">Sold Out</span>
        </div>
      </div>

      {/* Seating Chart */}
      <div className="bg-gray-800 rounded-lg p-6 overflow-x-auto">
        <div className="space-y-4 min-w-max">
          {Object.entries(seatsByRow).map(([rowName, seats]) => (
            <div key={rowName} className="flex items-center space-x-2">
              <div className="w-16 text-right text-sm text-gray-500 font-medium">
                {rowName}
              </div>
              <div className="flex space-x-1">
                {seats.map((seat) => (
                  <div
                    key={seat.id}
                    onClick={() => handleSeatClick(seat)}
                    className={getSeatClassName(seat)}
                    title={`${seat.row} Seat ${seat.number} - $${seat.price} ${seat.status === 'sold' ? '(Sold Out)' : ''}`}
                  >
                    {seat.number}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Selection Summary */}
      {selectedSeats.size > 0 && (
        <div className="bg-gradient-to-r from-purple-900 to-pink-900 rounded-lg p-6 border border-purple-500">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Ticket className="h-5 w-5 text-purple-300" />
              <h3 className="text-lg font-semibold text-white">
                Selected Seats ({selectedSeats.size})
              </h3>
            </div>
            <div className="flex items-center space-x-2">
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-xl font-bold text-green-400">
                ${totalPrice}
              </span>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-2 mb-4">
            {Array.from(selectedSeats).map(seatId => {
              const seat = section.seats.find(s => s.id === seatId);
              return seat ? (
                <div key={seatId} className="bg-purple-800 rounded p-2 text-center">
                  <div className="text-white text-sm font-medium">
                    {seat.row} {seat.number}
                  </div>
                  <div className="text-purple-300 text-xs">
                    ${seat.price}
                  </div>
                </div>
              ) : null;
            })}
          </div>
          
          <button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105">
            Continue to Checkout
          </button>
        </div>
      )}
    </div>
  );
};