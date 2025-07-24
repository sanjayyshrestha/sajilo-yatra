import { Mail } from 'lucide-react';

export default function ContactUs() {
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
        `}
      </style>
      <div className="border-b border-gray-100 py-6">
        <h1 className="text-2xl font-light text-center text-gray-900 fade-in">Contact Us</h1>
      </div>
      <div className="max-w-4xl mx-auto p-6 text-center">
        <Mail className="w-12 h-12 text-gray-300 mx-auto mb-4 fade-in" />
        <p className="text-gray-700 text-sm leading-relaxed mb-4 fade-in fade-in-delay-1">
          Namaste! Our hackathon team is here to guide your Nepal journey with curated travel insights.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed mb-4 fade-in fade-in-delay-2">
          Email: <a href="mailto:info@nepaltravelguide.com" className="text-gray-700 underline hover:text-gray-900">info@nepaltravelguide.com</a>
        </p>
        <p className="text-gray-700 text-sm leading-relaxed fade-in fade-in-delay-2">
          Follow <a href="https://x.com/nepaltravel" className="text-gray-700 underline hover:text-gray-900">@nepaltravel</a> on X for project updates and travel tips.
        </p>
        <p className="text-gray-700 text-sm leading-relaxed fade-in fade-in-delay-2">
          Built to inspire sustainable tourism, our platform connects travelers to Nepal’s wonders.
        </p>
      </div>
    </div>
  );
}