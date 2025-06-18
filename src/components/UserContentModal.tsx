import React, { useState } from 'react';
import { X, Star, Heart, Calendar, MapPin, ChevronLeft, ChevronRight, User, Camera } from 'lucide-react';
import { UserContent } from '../types';

interface UserContentModalProps {
  content: UserContent;
  onClose: () => void;
}

export const UserContentModal: React.FC<UserContentModalProps> = ({ content, onClose }) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);
  const [isLiked, setIsLiked] = useState(false);

  const nextPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev + 1) % content.photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prev) => (prev - 1 + content.photos.length) % content.photos.length);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-80 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-gray-900 rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-700 bg-gray-800 rounded-t-3xl">
          <div className="flex items-center space-x-4">
            <img
              src={content.avatar}
              alt={content.username}
              className="w-14 h-14 rounded-full object-cover border-2 border-gray-600"
            />
            <div>
              <h3 className="text-xl font-bold text-white">{content.username}</h3>
              <div className="flex items-center space-x-4 text-sm text-gray-400">
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4 text-blue-400" />
                  <span className="font-medium">{content.seatLocation}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4 text-green-400" />
                  <span>{content.eventDate}</span>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-3 hover:bg-gray-700 rounded-full transition-colors group"
          >
            <X className="h-6 w-6 text-gray-400 group-hover:text-white" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Event Info */}
          <div className="mb-6 bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-2xl p-5 border border-purple-500/30">
            <h4 className="text-2xl font-bold text-white mb-3">{content.eventName}</h4>
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < content.rating ? 'text-yellow-400 fill-current' : 'text-gray-600'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-300 ml-2 font-medium">{content.rating}/5</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Heart className={`h-5 w-5 ${isLiked ? 'text-red-400 fill-current' : 'text-gray-400'}`} />
                  <span className="text-sm text-gray-300 font-medium">{content.likes + (isLiked ? 1 : 0)} likes</span>
                </div>
              </div>
              <div className="flex items-center space-x-1 bg-blue-500/20 px-3 py-1 rounded-full">
                <Camera className="h-4 w-4 text-blue-400" />
                <span className="text-sm text-blue-300 font-medium">{content.photos.length} photos</span>
              </div>
            </div>
          </div>

          {/* Photo Gallery */}
          {content.photos.length > 0 && (
            <div className="mb-6">
              <div className="relative rounded-2xl overflow-hidden bg-black">
                <img
                  src={content.photos[currentPhotoIndex]}
                  alt={`View from ${content.seatLocation}`}
                  className="w-full h-64 md:h-96 object-cover"
                />
                
                {content.photos.length > 1 && (
                  <>
                    <button
                      onClick={prevPhoto}
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                    >
                      <ChevronLeft className="h-6 w-6" />
                    </button>
                    <button
                      onClick={nextPhoto}
                      className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-60 hover:bg-opacity-80 text-white p-3 rounded-full transition-all duration-200 backdrop-blur-sm"
                    >
                      <ChevronRight className="h-6 w-6" />
                    </button>
                    
                    {/* Photo indicators */}
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {content.photos.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentPhotoIndex(index)}
                          className={`w-3 h-3 rounded-full transition-all duration-200 ${
                            index === currentPhotoIndex 
                              ? 'bg-white shadow-lg' 
                              : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}

                {/* Photo counter */}
                <div className="absolute top-4 right-4 bg-black bg-opacity-60 text-white px-3 py-1 rounded-full text-sm backdrop-blur-sm">
                  {currentPhotoIndex + 1} / {content.photos.length}
                </div>
              </div>
            </div>
          )}

          {/* Review */}
          {content.review && (
            <div className="bg-gray-800 rounded-2xl p-6 border border-gray-700">
              <div className="flex items-center space-x-2 mb-3">
                <User className="h-5 w-5 text-gray-400" />
                <h5 className="font-bold text-white">Fan Review</h5>
              </div>
              <p className="text-gray-300 leading-relaxed text-lg">{content.review}</p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-5 border-t border-gray-700 bg-gray-800 rounded-b-3xl">
          <div className="flex items-center justify-between">
            <div className="text-sm text-gray-400">
              <span className="flex items-center space-x-1">
                <span className="w-2 h-2 bg-green-400 rounded-full"></span>
                <span>Verified attendee perspective</span>
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 ${
                  isLiked 
                    ? 'bg-red-600 hover:bg-red-700 text-white' 
                    : 'bg-gray-700 hover:bg-gray-600 text-gray-300'
                }`}
              >
                <Heart className={`h-4 w-4 ${isLiked ? 'fill-current' : ''}`} />
                <span className="text-sm font-medium">{isLiked ? 'Liked' : 'Like'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};