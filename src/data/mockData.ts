import { Section, UserContent, StadiumLayout } from '../types';

const generateUserContent = (sectionId: string): UserContent[] => {
  const users = [
    { username: 'ConcertPhotog', avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { username: 'LiveMusicLover', avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { username: 'VenueExpert', avatar: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { username: 'ShowReviewer', avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' },
    { username: 'MusicFanatic', avatar: 'https://images.pexels.com/photos/1181690/pexels-photo-1181690.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop' }
  ];

  // High-quality concert venue photos from different perspectives
  const concertPhotos = [
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1540406/pexels-photo-1540406.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1677710/pexels-photo-1677710.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1983046/pexels-photo-1983046.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=1200',
    'https://images.pexels.com/photos/2747449/pexels-photo-2747449.jpeg?auto=compress&cs=tinysrgb&w=1200'
  ];

  const events = [
    'Taylor Swift - The Eras Tour',
    'Bad Bunny - World\'s Hottest Tour',
    'Harry Styles - Love On Tour',
    'Beyoncé - Renaissance World Tour',
    'The Weeknd - After Hours Til Dawn'
  ];

  const reviews = [
    "Perfect view of the entire stage! Could see all the choreography and stage effects clearly.",
    "Amazing sound quality from this section. Every note was crystal clear.",
    "Great angle - not too close to hurt your neck, not too far to miss details.",
    "The energy from this section was incredible. Everyone was dancing!",
    "Best value for money. Great view without breaking the bank.",
    "Close enough to see facial expressions but far enough to see the full production.",
    "The lighting effects looked amazing from this perspective.",
    "Perfect for taking photos and videos - no obstructions!"
  ];

  return Array.from({ length: Math.floor(Math.random() * 6) + 4 }, (_, i) => {
    const user = users[Math.floor(Math.random() * users.length)];
    const event = events[Math.floor(Math.random() * events.length)];
    
    return {
      id: `${sectionId}-content-${i + 1}`,
      userId: `user-${Math.random().toString(36).substr(2, 9)}`,
      username: user.username,
      avatar: user.avatar,
      seatLocation: `${sectionId.replace('-', ' ').toUpperCase()} Row ${String.fromCharCode(65 + Math.floor(Math.random() * 8))} Seat ${Math.floor(Math.random() * 20) + 1}`,
      eventDate: new Date(Date.now() - Math.random() * 180 * 24 * 60 * 60 * 1000).toLocaleDateString(),
      eventName: event,
      photos: Array.from({ length: Math.floor(Math.random() * 3) + 2 }, () => 
        concertPhotos[Math.floor(Math.random() * concertPhotos.length)]
      ),
      rating: Math.floor(Math.random() * 2) + 4, // 4-5 stars
      review: reviews[Math.floor(Math.random() * reviews.length)],
      likes: Math.floor(Math.random() * 200) + 15
    };
  });
};

export const stadiumLayout: StadiumLayout = {
  id: 'madison-square-garden',
  name: 'Madison Square Garden',
  stage: {
    x: 50,
    y: 80,
    width: 24,
    height: 6
  },
  sections: [
    {
      id: 'floor',
      name: 'Floor',
      description: 'General Admission - Closest to stage',
      totalSeats: 650,
      availableSeats: 89,
      priceRange: { min: 185, max: 225 },
      color: 'from-amber-400 to-orange-500',
      position: { x: 50, y: 65 },
      userContent: generateUserContent('floor'),
      seats: Array.from({ length: 650 }, (_, i) => ({
        id: `floor-${i + 1}`,
        number: `${i + 1}`,
        row: 'GA',
        price: 185 + Math.floor(Math.random() * 40),
        status: Math.random() > 0.86 ? 'sold' : 'available'
      }))
    },
    {
      id: 'lower-bowl',
      name: 'Lower Bowl',
      description: 'Premium lower level seating',
      totalSeats: 420,
      availableSeats: 67,
      priceRange: { min: 145, max: 185 },
      color: 'from-blue-500 to-purple-600',
      position: { x: 50, y: 50 },
      userContent: generateUserContent('lower-bowl'),
      seats: Array.from({ length: 420 }, (_, i) => {
        const row = String.fromCharCode(65 + Math.floor(i / 21));
        const seatNum = (i % 21) + 1;
        return {
          id: `lower-bowl-${i + 1}`,
          number: `${seatNum}`,
          row: `${row}`,
          price: 145 + Math.floor(Math.random() * 40),
          status: Math.random() > 0.84 ? 'sold' : 'available'
        };
      })
    },
    {
      id: 'upper-bowl',
      name: 'Upper Bowl',
      description: 'Elevated view of entire venue',
      totalSeats: 580,
      availableSeats: 234,
      priceRange: { min: 75, max: 125 },
      color: 'from-green-500 to-teal-600',
      position: { x: 50, y: 35 },
      userContent: generateUserContent('upper-bowl'),
      seats: Array.from({ length: 580 }, (_, i) => {
        const row = String.fromCharCode(65 + Math.floor(i / 29));
        const seatNum = (i % 29) + 1;
        return {
          id: `upper-bowl-${i + 1}`,
          number: `${seatNum}`,
          row: `${row}`,
          price: 75 + Math.floor(Math.random() * 50),
          status: Math.random() > 0.6 ? 'sold' : 'available'
        };
      })
    },
    {
      id: 'suite-level',
      name: 'Suite Level',
      description: 'Private suites with premium amenities',
      totalSeats: 96,
      availableSeats: 12,
      priceRange: { min: 350, max: 500 },
      color: 'from-yellow-400 to-amber-500',
      position: { x: 50, y: 20 },
      userContent: generateUserContent('suite-level'),
      seats: Array.from({ length: 96 }, (_, i) => {
        const suiteNum = Math.floor(i / 8) + 1;
        const seatNum = (i % 8) + 1;
        return {
          id: `suite-${i + 1}`,
          number: `${seatNum}`,
          row: `Suite ${suiteNum}`,
          price: 350 + Math.floor(Math.random() * 150),
          status: Math.random() > 0.88 ? 'sold' : 'available'
        };
      })
    },
    {
      id: 'side-stage-left',
      name: 'Side Stage Left',
      description: 'Side view with unique perspective',
      totalSeats: 180,
      availableSeats: 45,
      priceRange: { min: 95, max: 135 },
      color: 'from-pink-500 to-rose-600',
      position: { x: 25, y: 55 },
      userContent: generateUserContent('side-stage-left'),
      seats: Array.from({ length: 180 }, (_, i) => {
        const row = String.fromCharCode(65 + Math.floor(i / 15));
        const seatNum = (i % 15) + 1;
        return {
          id: `side-left-${i + 1}`,
          number: `${seatNum}`,
          row: `${row}`,
          price: 95 + Math.floor(Math.random() * 40),
          status: Math.random() > 0.75 ? 'sold' : 'available'
        };
      })
    },
    {
      id: 'side-stage-right',
      name: 'Side Stage Right',
      description: 'Side view with unique perspective',
      totalSeats: 180,
      availableSeats: 52,
      priceRange: { min: 95, max: 135 },
      color: 'from-pink-500 to-rose-600',
      position: { x: 75, y: 55 },
      userContent: generateUserContent('side-stage-right'),
      seats: Array.from({ length: 180 }, (_, i) => {
        const row = String.fromCharCode(65 + Math.floor(i / 15));
        const seatNum = (i % 15) + 1;
        return {
          id: `side-right-${i + 1}`,
          number: `${seatNum}`,
          row: `${row}`,
          price: 95 + Math.floor(Math.random() * 40),
          status: Math.random() > 0.71 ? 'sold' : 'available'
        };
      })
    }
  ]
};

export const concertSections = stadiumLayout.sections;