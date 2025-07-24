import { MapPin } from 'lucide-react';
import aboutImage from '../assets/about-image.jpg';

export default function About() {
  return (
    <div className="min-h-screen bg-white">
      <style>
        {`
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
          .fade-in {
            animation: fadeIn 0.8s ease-out forwards;
          }
          .fade-in-delay-1 { animation-delay: 0.2s; opacity: 0; }
          .fade-in-delay-2 { animation-delay: 0.4s; opacity: 0; }
          .fade-in-delay-3 { animation-delay: 0.6s; opacity: 0; }
        `}
      </style>
      <div className="border-b border-gray-100 py-6">
        <h1 className="text-2xl font-light text-center text-gray-900 fade-in">Discover Nepal</h1>
      </div>
      <div className="max-w-4xl mx-auto p-6 text-center">
        <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4 fade-in" />
        <p className="text-gray-700 text-sm leading-relaxed mb-4 fade-in fade-in-delay-1">
          Nepal beckons with majestic Himalayas, vibrant cultures, and thrilling adventures, inviting tourists to explore its breathtaking landscapes and sacred heritage.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 fade-in fade-in-delay-2">
          Our hackathon-crafted guide unveils Nepal's hidden gems, from serene lakes to ancient temples, inspiring unforgettable journeys for every traveler.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed fade-in fade-in-delay-3">
          Join us in celebrating Nepal’s beauty, designed to spark wanderlust and promote sustainable tourism through innovative storytelling.
        </p>
        <div className="mt-6">
          <img
            src={aboutImage}
            alt="Nepal Landscape"
            className="w-full h-64 object-cover rounded-lg shadow-md fade-in fade-in-delay-3"
          />
        </div>
      </div>
    </div>
  );
}