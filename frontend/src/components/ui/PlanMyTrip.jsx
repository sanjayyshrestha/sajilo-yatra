import { useState, useEffect } from 'react';
import { MapPin } from 'lucide-react';

const GEMINI_API_KEY = 'AIzaSyBorhmI2yLNQ3pFGcpIw5K6DhMitc_cUi0';

export default function PlanMyTrip() {
  const [location, setLocation] = useState('Rautahat');
  const [formData, setFormData] = useState({
    duration: '',
    season: '',
    interests: [],
    specificAttractions: '',
    activityLevel: '',
    hikingComfort: '',
    transport: '',
    transportSuggestions: false,
    accommodation: '',
    accommodationRecommendations: false,
    foodPreference: '',
    dietaryRestrictions: '',
    culturalEngagement: '',
    culturalActivities: false,
    healthMobility: '',
    safetyTips: false,
    budget: ''
  });
  const [itinerary, setItinerary] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const place = params.get('place');
    if (place) {
      setLocation(decodeURIComponent(place));
    }
  }, []);

const formatGeminiResponse = (text) => {
  if (!text) return '';

  let formattedText = text;

  formattedText = formattedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  formattedText = formattedText.replace(/\*(.*?)\*/g, '<em>$1</em>');

  formattedText = formattedText.replace(/^(?:\*|\-)\s+(.+)/gm, '<li>$1</li>');
  formattedText = formattedText.replace(/(<li>.*?<\/li>)/gs, (match) => `<ul>${match}</ul>`);
  formattedText = formattedText.replace(/(<\/ul>\s*<ul>)/g, ''); 


  formattedText = formattedText.replace(/\n{2,}/g, '</p><p>');
 
  formattedText = formattedText.replace(/(?<!<\/(p|ul|ol|h[1-3])>)\n(?!<(p|ul|ol|h[1-3]))/g, '<br/>');

  if (!formattedText.match(/^<(p|ul|ol|h[1-3])/)) {
    formattedText = `<p>${formattedText}`;
  }
  if (!formattedText.match(/<\/(p|ul|ol|h[1-3])>$/)) {
    formattedText = `${formattedText}</p>`;
  }

  formattedText = formattedText.replace(/<p>\s*<\/p>/g, '');

  return formattedText;
};


  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleInterestsChange = (interest) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter((i) => i !== interest)
        : [...prev.interests, interest]
    }));
  };

  const generateItinerary = async () => {
    if (!formData.duration || !formData.season || formData.interests.length === 0) {
      setError('Please fill in duration, season, and at least one interest.');
      return;
    }

    setIsLoading(true);
    setError('');
    setItinerary('');

    const prompt = `
    You are a local cultural guide and creative trip planner.Create a personalized travel itinerary for a trip to ${location}, Nepal, based on the following details (max 300 words, use markdown for headings, bolding, and bullet points):
      - Duration: ${formData.duration} days
      - Season: ${formData.season}
      - Interests: ${formData.interests.join(', ')}
      - Specific Attractions: ${formData.specificAttractions || 'None specified'}
      - Activity Level: ${formData.activityLevel || 'Moderate'}
      - Hiking Comfort: ${formData.hikingComfort || 'Not specified'}
      - Transport: ${formData.transport || 'Not specified'}${formData.transportSuggestions ? ', suggest transport options' : ''}
      - Accommodation: ${formData.accommodation || 'Not specified'}${formData.accommodationRecommendations ? ', recommend based on budget/experience' : ''}
      - Food: ${formData.foodPreference || 'Not specified'}${formData.dietaryRestrictions ? `, dietary restrictions: ${formData.dietaryRestrictions}` : ''}
      - Cultural Engagement: ${formData.culturalEngagement || 'Not specified'}${formData.culturalActivities ? ', include cultural activities' : ''}
      - Health/Mobility: ${formData.healthMobility || 'None'}
      - Safety Tips: ${formData.safetyTips ? 'Include safety advice' : 'Not requested'}
      - Daily Budget: ${formData.budget || 'Not specified'}
      Provide a concise itinerary with daily activities, including key attractions, dining, and cultural experiences. Use headings for each day (e.g., **Day 1: Arrival & Exploration**) and bullet points for activities.
    `;

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: prompt }] }]
          })
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error(`Gemini API error: ${data.error?.message || 'Unknown error'}`);
      }

      const result = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No itinerary generated.';
      setItinerary(result);
    } catch (err) {
      console.error('Error generating itinerary:', err);
      setError('Failed to generate itinerary. Please try again.');
      setItinerary('Explore Rautahat with local temples, markets, and rural walks. Contact a local guide for a tailored experience.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="border-b border-gray-200 py-6">
        <h1 className="text-3xl font-light text-center text-gray-900">Plan Your Trip to {location}</h1>
      </div>

      <div className="max-w-3xl mx-auto p-6">
        <div className="border border-gray-200 p-6">
          <h2 className="text-xl font-medium mb-4 text-gray-900">Trip Preferences</h2>
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">How many days will you spend in {location}?</label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
                min="1"
                placeholder="e.g., 3"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">What time of year are you visiting?</label>
              <select
                name="season"
                value={formData.season}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select season</option>
                <option value="Spring (Mar-May)">Spring (Mar-May)</option>
                <option value="Summer (Jun-Aug)">Summer (Jun-Aug)</option>
                <option value="Autumn (Sep-Nov)">Autumn (Sep-Nov)</option>
                <option value="Winter (Dec-Feb)">Winter (Dec-Feb)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">What experiences interest you?</label>
              <div className="flex flex-wrap gap-2">
                {['Nature', 'Culture', 'Historical Sites', 'Adventure', 'Local Festivals'].map((interest) => (
                  <label key={interest} className="flex items-center gap-1 text-sm text-gray-900">
                    <input
                      type="checkbox"
                      checked={formData.interests.includes(interest)}
                      onChange={() => handleInterestsChange(interest)}
                    />
                    {interest}
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Specific attractions?</label>
              <input
                type="text"
                name="specificAttractions"
                value={formData.specificAttractions}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
                placeholder="e.g., temples, villages"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Preferred trip pace?</label>
              <select
                name="activityLevel"
                value={formData.activityLevel}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select pace</option>
                <option value="Relaxed">Relaxed with rest time</option>
                <option value="Packed">Packed with sightseeing</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Comfortable with hiking or long walks?</label>
              <select
                name="hikingComfort"
                value={formData.hikingComfort}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">How will you get around?</label>
              <select
                name="transport"
                value={formData.transport}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select transport</option>
                <option value="Local Transport">Local Transport</option>
                <option value="Rented Vehicle">Rented Vehicle</option>
                <option value="Guided Tours">Guided Tours</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm text-gray-900">
                <input
                  type="checkbox"
                  name="transportSuggestions"
                  checked={formData.transportSuggestions}
                  onChange={handleInputChange}
                />
                Need transport suggestions?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Preferred accommodation?</label>
              <select
                name="accommodation"
                value={formData.accommodation}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select accommodation</option>
                <option value="Hotels">Hotels</option>
                <option value="Guesthouses">Guesthouses</option>
                <option value="Homestays">Homestays</option>
                <option value="Eco-lodges">Eco-lodges</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm text-gray-900">
                <input
                  type="checkbox"
                  name="accommodationRecommendations"
                  checked={formData.accommodationRecommendations}
                  onChange={handleInputChange}
                />
                Need accommodation recommendations?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Interested in local cuisine?</label>
              <select
                name="foodPreference"
                value={formData.foodPreference}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Dietary restrictions?</label>
              <input
                type="text"
                name="dietaryRestrictions"
                value={formData.dietaryRestrictions}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
                placeholder="e.g., vegetarian, gluten-free"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Engage with local communities?</label>
              <select
                name="culturalEngagement"
                value={formData.culturalEngagement}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
              >
                <option value="">Select option</option>
                <option value="Yes">Yes</option>
                <option value="No">No</option>
              </select>
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm text-gray-900">
                <input
                  type="checkbox"
                  name="culturalActivities"
                  checked={formData.culturalActivities}
                  onChange={handleInputChange}
                />
                Interested in cultural activities?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Health or mobility considerations?</label>
              <input
                type="text"
                name="healthMobility"
                value={formData.healthMobility}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
                placeholder="e.g., wheelchair access, medical needs"
              />
            </div>
            <div>
              <label className="flex items-center gap-1 text-sm text-gray-900">
                <input
                  type="checkbox"
                  name="safetyTips"
                  checked={formData.safetyTips}
                  onChange={handleInputChange}
                />
                Need safety tips?
              </label>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-900 mb-1">Daily budget (in NPR)?</label>
              <input
                type="text"
                name="budget"
                value={formData.budget}
                onChange={handleInputChange}
                className="w-full border border-gray-200 p-2 text-sm text-gray-900"
                placeholder="e.g., 2000-5000"
              />
            </div>

            <button
              type="button"
              onClick={generateItinerary}
              className="w-full px-4 py-2 bg-gray-900 text-white text-sm hover:bg-gray-800"
              disabled={isLoading}
            >
              {isLoading ? 'Generating...' : 'Plan My Trip'}
            </button>
          </form>
        </div>

        {(itinerary || error) && (
          <div className="border border-gray-200 p-6 mt-6">
            <h2 className="text-xl font-medium mb-4 text-gray-900">Made for the Way You Travel</h2>
            {error && <p className="text-red-600 text-sm mb-4">{error}</p>}
            {isLoading ? (
              <div className="flex items-center justify-center">
                <MapPin className="w-16 h-16 text-gray-400 animate-bounce-slow" />
              </div>
            ) : (
              <div className="text-gray-700 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: formatGeminiResponse(itinerary) }} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}