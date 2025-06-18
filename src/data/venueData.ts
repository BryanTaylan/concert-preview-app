import { Venue } from '../types';

export const venues: Venue[] = [
  {
    id: 'madison-square-garden',
    name: 'Madison Square Garden',
    location: '4 Pennsylvania Plaza',
    city: 'New York',
    state: 'NY',
    capacity: 20789,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.6,
    totalReviews: 12847,
    upcomingEvents: 23,
    popularEvents: ['Taylor Swift', 'Bad Bunny', 'Harry Styles'],
    venueType: 'arena'
  },
  {
    id: 'barclays-center',
    name: 'Barclays Center',
    location: '620 Atlantic Ave',
    city: 'Brooklyn',
    state: 'NY',
    capacity: 19000,
    image: 'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.4,
    totalReviews: 8934,
    upcomingEvents: 18,
    popularEvents: ['The Weeknd', 'Dua Lipa', 'Post Malone'],
    venueType: 'arena'
  },
  {
    id: 'yankee-stadium',
    name: 'Yankee Stadium',
    location: '1 E 161st St',
    city: 'Bronx',
    state: 'NY',
    capacity: 54251,
    image: 'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    totalReviews: 15623,
    upcomingEvents: 12,
    popularEvents: ['Beyoncé', 'Ed Sheeran', 'Coldplay'],
    venueType: 'stadium'
  },
  {
    id: 'radio-city-music-hall',
    name: 'Radio City Music Hall',
    location: '1260 6th Ave',
    city: 'New York',
    state: 'NY',
    capacity: 6015,
    image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.8,
    totalReviews: 9876,
    upcomingEvents: 31,
    popularEvents: ['Christmas Spectacular', 'Comedy Shows', 'Broadway'],
    venueType: 'theater'
  },
  {
    id: 'brooklyn-bowl',
    name: 'Brooklyn Bowl',
    location: '61 Wythe Ave',
    city: 'Brooklyn',
    state: 'NY',
    capacity: 600,
    image: 'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.3,
    totalReviews: 2341,
    upcomingEvents: 45,
    popularEvents: ['Indie Bands', 'Local Artists', 'DJ Sets'],
    venueType: 'club'
  },
  {
    id: 'forest-hills-stadium',
    name: 'Forest Hills Stadium',
    location: '1 Tennis Pl',
    city: 'Forest Hills',
    state: 'NY',
    capacity: 14000,
    image: 'https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.5,
    totalReviews: 5432,
    upcomingEvents: 8,
    popularEvents: ['Summer Concerts', 'Rock Festivals', 'Pop Stars'],
    venueType: 'amphitheater'
  },
  {
    id: 'prudential-center',
    name: 'Prudential Center',
    location: '25 Lafayette St',
    city: 'Newark',
    state: 'NJ',
    capacity: 16514,
    image: 'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.2,
    totalReviews: 7654,
    upcomingEvents: 19,
    popularEvents: ['Hip Hop Artists', 'Pop Concerts', 'Sports Events'],
    venueType: 'arena'
  },
  {
    id: 'beacon-theatre',
    name: 'Beacon Theatre',
    location: '2124 Broadway',
    city: 'New York',
    state: 'NY',
    capacity: 2894,
    image: 'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=800',
    rating: 4.7,
    totalReviews: 4321,
    upcomingEvents: 27,
    popularEvents: ['Jazz Concerts', 'Comedy Shows', 'Intimate Performances'],
    venueType: 'theater'
  }
];

// Simulate user location for distance calculation
export const calculateDistance = (venue: Venue, userLat: number = 40.7128, userLng: number = -74.0060): number => {
  // Mock distance calculation - in a real app, you'd use actual coordinates
  const mockDistances: Record<string, number> = {
    'madison-square-garden': 2.1,
    'barclays-center': 8.3,
    'yankee-stadium': 12.7,
    'radio-city-music-hall': 1.8,
    'brooklyn-bowl': 9.2,
    'forest-hills-stadium': 15.4,
    'prudential-center': 18.9,
    'beacon-theatre': 3.2
  };
  
  return mockDistances[venue.id] || Math.random() * 25;
};