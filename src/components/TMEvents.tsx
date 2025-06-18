import React, { useEffect, useState } from 'react';

interface TMEvent {
  id: string;
  name: string;
  image: string;
  venue: string;
  seatmapUrl: string;
}

export const TMEvents: React.FC = () => {
  const [events, setEvents] = useState<TMEvent[]>([]);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/tm-events")
      .then((res) => res.json())
      .then((data) => setEvents(data))
      .catch((err) => console.error("Error fetching Ticketmaster events:", err));
  }, []);

  return (
    <div className="p-6 space-y-8 text-white">
      <h2 className="text-2xl font-bold">🎟️ Ticketmaster Events</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.id}
            className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700"
          >
            <img src={event.image} alt={event.name} className="w-full h-48 object-cover" />
            <div className="p-4 space-y-2">
              <h3 className="text-lg font-bold">{event.name}</h3>
              <p className="text-gray-400">Venue: {event.venue}</p>
              {event.seatmapUrl && (
                <img
                  src={event.seatmapUrl}
                  alt="Seatmap"
                  className="w-full mt-2 border border-gray-600 rounded"
                />
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
