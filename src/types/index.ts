export interface Seat {
  id: string;
  number: string;
  row: string;
  price: number;
  status: 'available' | 'selected' | 'sold';
}

export interface UserContent {
  id: string;
  userId: string;
  username: string;
  avatar: string;
  seatLocation: string;
  eventDate: string;
  eventName: string;
  photos: string[];
  videos?: string[];
  rating: number;
  review?: string;
  likes: number;
}

export interface Section {
  id: string;
  name: string;
  description: string;
  totalSeats: number;
  availableSeats: number;
  priceRange: {
    min: number;
    max: number;
  };
  seats: Seat[];
  color: string;
  position: {
    x: number;
    y: number;
  };
  userContent: UserContent[];
}

export interface StadiumLayout {
  id: string;
  name: string;
  sections: Section[];
  stage: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface Venue {
  id: string;
  name: string;
  location: string;
  city: string;
  state: string;
  capacity: number;
  image: string;
  rating: number;
  totalReviews: number;
  upcomingEvents: number;
  distance?: number;
  popularEvents: string[];
  venueType: 'arena' | 'stadium' | 'theater' | 'amphitheater' | 'club';
}

export interface User {
  id: string;
  email: string;
  username: string;
  firstName: string;
  lastName: string;
  avatar?: string;
  location?: string;
  joinDate: string;
  favoriteVenues: string[];
  attendedEvents: number;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}