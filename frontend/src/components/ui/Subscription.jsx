import React, { useState } from 'react';
import { Mail } from 'lucide-react';

export default function NewsletterSubscription() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = () => {
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 2000);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-2">
      <div className="max-w-md w-full">
        <div className="bg-white rounded-lg p-6 shadow-sm relative">
          <div className="text-center mb-4">
            <h1 className="text-xl md:text-2xl lg:text-3xl font-light text-gray-900 max-w-prose mx-auto">
              Namaste! Subscribe for Nepal travel news and offers.
            </h1>
          </div>

          <div className="flex flex-col sm:flex-row gap-2 max-w-xs mx-auto">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-500" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Your email"
                className="w-full pl-10 pr-3 py-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-gray-300 transition-all duration-200"
              />
            </div>

            <button
              onClick={handleSubmit}
              disabled={isSubscribed}
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                isSubscribed
                  ? 'bg-green-600 text-white cursor-not-allowed'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              {isSubscribed ? 'Subscribed!' : 'Subscribe'}
            </button>
          </div>

          {isSubscribed && (
            <div className="mt-2 text-center">
              <p className="text-green-700 font-medium">Thank you for subscribing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}