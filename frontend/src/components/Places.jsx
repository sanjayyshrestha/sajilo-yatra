import { useState, useMemo } from 'react';
import {
  MapPin,
  Mountain,
  Calendar,
  Sparkles,
  PawPrint,
  Sun,
  Compass,
  Palette,
} from 'lucide-react';

// Move to a separate file (e.g., data.js) in a real project
const recommendations = {
  nature: [
    'Pokhara', 'Chitwan National Park', 'Rara Lake', 'Panch Pokhari', 'Gosaikunda',
    'Begnas Lake', 'Tilicho Lake', 'Shey Phoksundo Lake', 'Barun Valley', 'Kalinchowk',
    'Dhorpatan Hunting Reserve', 'Shivapuri Nagarjun National Park', 'Bardiya National Park',
    'Sagarmatha National Park', 'Khaptad National Park', 'Langtang Valley', 'Illam',
    'Tansen', 'Daman', 'Bandipur', 'Phulchoki', 'Godavari', 'Antu Danda', 'Sundarijal',
    'Pathibhara', 'Kakani', 'Chisapani', 'Bhedetar', 'Jomsom', 'Marpha',
    'Manang', 'Mustang', 'Tsho Rolpa Lake', 'Taudaha Lake', 'Phewa Lake',
    'Mai Pokhari', 'Rupa Lake', 'Sailung', 'Naubise', 'Sauraha',
    'Tinjure Milke Jaljale', 'Lamo Jharana', 'Ghandruk', 'Dhampus',
    'Koshi Tappu Wildlife Reserve', 'Shree Antu', 'Bhairavsthan', 'Ramdhuni Forest',
    'Basantapur', 'Badimalika Temple', 'Rolpa'
  ],
  adventure: [
    'Annapurna Base Camp', 'Everest Base Camp', 'Bhote Koshi', 'Upper Mustang Trek',
    'Langtang Trek', 'Manaslu Circuit Trek', 'Ghorepani Poon Hill Trek', 'Mardi Himal Trek',
    'Kanchenjunga Base Camp', 'Dhaulagiri Circuit Trek', 'Helambu Trek',
    'Rara Trek', 'Makalu Base Camp', 'Dolpo Trek', 'Pikey Peak Trek',
    'Tsho Rolpa Glacier Trek', 'Rock Climbing in Hattiban', 'Paragliding in Pokhara',
    'Zip Flying in Pokhara', 'White Water Rafting in Trishuli River',
    'Canyoning in Jalbire', 'Bungee Jumping in Bhote Koshi', 'Ultra-Light Flight in Pokhara',
    'Mountain Biking in Kathmandu Valley', 'Skydiving in Everest Region',
    'Motorbike Tour to Mustang', 'Jungle Safari in Chitwan', 'Jeep Safari in Bardia',
    'Kayaking in Seti River', 'Heli Tour to Everest', 'Scuba Diving in Gokyo Lake (rare)',
    'Camping in Dhorpatan', 'Snowboarding in Kalinchowk', 'Horseback Riding in Manang',
    'Boating in Rara', 'Ziplining in Dhulikhel', 'Ice Climbing in Manang',
    'Bird Watching in Koshi Tappu', 'Hot Air Balloon in Pokhara',
    'Bridge Swinging in Kushma', 'Hiking to Champadevi', 'Waterfall Rappelling in Lamjung',
    'Exploring Caves in Siddha Gufa', 'Trekking to Panch Pokhari', 'Jungle Walk in Shuklaphanta',
    'Rock Climbing in Nagarjun', 'Trekking in Tsum Valley', 'Camel Riding in Chitwan (occasional)',
    'Wilderness Photography in Shey Phoksundo', 'Zip biking in Kushma'
  ],
  historical: [
    'Kathmandu Durbar Square', 'Lumbini', 'Bhaktapur Durbar Square', 'Patan Durbar Square',
    'Swayambhunath', 'Boudhanath Stupa', 'Pashupatinath Temple',
    'Changunarayan Temple', 'Rani Mahal', 'Gorkha Durbar', 'Hanuman Dhoka',
    'Kumari Ghar', 'Sankhu', 'Janaki Mandir', 'Tansen Old Bazaar',
    'Nuwakot Durbar', 'Kirtipur', 'Manakamana Temple', 'Dolakha Bhimsen',
    'Budhanilkantha Temple', 'Halesi Mahadev', 'Pathibhara Devi Temple',
    'Muktinath Temple', 'Barpak Village', 'Thimi', 'Panauti',
    'Dhulikhel Old Town', 'Pindeshwor Temple', 'Changu Narayan', 'Bindabasini Temple',
    'Nyatapola Temple', 'Taumadhi Square', 'Ashoka Pillar', 'Maya Devi Temple',
    'Kagbeni Monastery', 'Tengboche Monastery',
    'Bajrayogini Temple', 'Ridi Bazaar', 'Ramgram Stupa', 'Tilaurakot',
    'Shree Krishna Mandir', 'Sankata Temple',
    'Itumbahal', 'Seto Machhindranath Temple', 'Jagannath Temple',
    'Bhimsen Temple', 'Pashupati Aryaghat', 'Tribhuvan Museum'
  ],
  culture: [
    'Thamel', 'Asan Bazaar', 'Patan Museum', 'Bhanu Bhakta Memorial', 'Gurkha Memorial',
    'Nepal Art Council', 'Taragaon Museum', 'Ranipokhari', 'Boudha Stupa Complex',
    'Bhaktapur Pottery Square', 'Newari Wooden Windows', 'Mithila Art Village', 'Chitwan Tharu Village',
    'Mustang Tibetan Settlement', 'Jumla Karnali Culture'
  ],
  spiritual: [
    'Muktinath', 'Swargadwari', 'Gosainkunda', 'Barahachhetra', 'Guheshwori Temple',
    'Dakshinkali Temple', 'Bindyabasini Temple', 'Shree Pashupatinath', 'Lumbini Peace Pagoda',
    'Namobuddha Monastery', 'Kopan Monastery', 'Shechen Monastery', 'Tengboche Gompa',
    'Ruru Kshetra', 'Devghat Dham'
  ],
  wildlife: [
    'Chitwan Rhino Reserve', 'Bardia Tiger Territory', 'Koshi Tappu Bird Sanctuary',
    'Shuklaphanta Grasslands', 'Parsa Wildlife Reserve', 'Api Nampa Conservation Area',
    'Banke National Park', 'Kanchenjunga Conservation Area', 'Annapurna Conservation Sanctuary',
    'Blackbuck Conservation Area'
  ],
  leisure: [
    'Garden of Dreams', 'Pokhara Lakeside', 'Nagarkot View Tower', 'Dhulikhel Resort Area',
    'Sauraha Riverside', 'Begnas Lake Resort', 'Rara Lake Camping Zone', 'Taudaha Lakeside',
    'Godavari Botanical Garden', 'Kakani Strawberry Farms'
  ],
  offbeat: [
    'Tsum Valley', 'Limbani Village', 'Rukumkot', 'Dolpa Crystal Mountain', 'Humla Karnali',
    'Ilam Tea Estates', 'Jiri Hill Station', 'Madi Dark Sky Reserve', 'Phoksundo Waterfall',
    'Rara Wetlands'
  ]
};

const activityToPlaceMap = {
  "Motorbike Tour to Mustang": "Mustang",
  "Bridge Swinging in Kushma": "Kushma",
  "Rock Climbing in Hattiban": "Hattiban",
  "Paragliding in Pokhara": "Pokhara",
  "Zip Flying in Pokhara": "Pokhara",
  "White Water Rafting in Trishuli River": "Trishuli River",
  "Canyoning in Jalbire": "Jalbire",
  "Bungee Jumping in Bhote Koshi": "Bhote Koshi",
  "Ultra-Light Flight in Pokhara": "Pokhara",
  "Mountain Biking in Kathmandu Valley": "Kathmandu Valley",
  "Skydiving in Everest Region": "Everest Region",
  "Jungle Safari in Chitwan": "Chitwan National Park",
  "Jeep Safari in Bardia": "Bardia National Park",
  "Kayaking in Seti River": "Seti River",
  "Heli Tour to Everest": "Everest Region",
  "Scuba Diving in Gokyo Lake (rare)": "Gokyo Lake",
  "Camping in Dhorpatan": "Dhorpatan"
};

const categoryIcons = {
  nature: Sun,
  adventure: Mountain,
  historical: Calendar,
  culture: Palette,
  spiritual: Sparkles,
  wildlife: PawPrint,
  leisure: Compass,
  offbeat: MapPin
};

// Use environment variables for API keys
const UNSPLASH_ACCESS_KEY = 'iEvc6jd120BizU9zu2wZbmNwDFgTuU8Z-wD0a7R4DPc'
const PIXABAY_ACCESS_KEY = '51460994-dcdee362e96d62a57b222a90a'
const GEMINI_API_KEY ='AIzaSyBorhmI2yLNQ3pFGcpIw5K6DhMitc_cUi0';

// Simple in-memory cache for API responses
const cache = new Map();

const fetchImage = async (query) => {
  const cacheKey = `image_${query}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' Nepal')}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (!unsplashResponse.ok) throw new Error(`Unsplash API error: ${unsplashResponse.status}`);
    const unsplashData = await unsplashResponse.json();
    if (unsplashData.results?.length > 0) {
      const url = unsplashData.results[0].urls.small;
      cache.set(cacheKey, url);
      return url;
    }

    const pixabayResponse = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_ACCESS_KEY}&q=${encodeURIComponent(query + ' Nepal')}&image_type=photo&per_page=3`
    );
    if (!pixabayResponse.ok) throw new Error(`Pixabay API error: ${pixabayResponse.status}`);
    const pixabayData = await pixabayResponse.json();
    if (pixabayData.hits?.length > 0) {
      const url = pixabayData.hits[0].webformatURL;
      cache.set(cacheKey, url);
      return url;
    }

    cache.set(cacheKey, null);
    return null;
  } catch (error) {
    console.error(`Image fetch error for ${query}: ${error.message}`);
    cache.set(cacheKey, null);
    return null;
  }
};

const fetchWikipediaDescription = async (place) => {
  const cacheKey = `wiki_${place}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await fetch(
      `https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(place)}`
    );
    if (!response.ok) throw new Error(`Wikipedia API error: ${response.status}`);
    const data = await response.json();
    if (data.extract) {
      const words = data.extract.split(' ').slice(0, 30).join(' ');
      const result = words.length < data.extract.length ? `${words}...` : words;
      cache.set(cacheKey, result);
      return result;
    }
    cache.set(cacheKey, null);
    return null;
  } catch (error) {
    console.warn(`Wikipedia fetch failed for ${place}: ${error.message}`);
    cache.set(cacheKey, null);
    return null;
  }
};

const generateGeminiDescription = async (place) => {
  const cacheKey = `gemini_${place}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${GEMINI_API_KEY}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            {
              parts: [
                {
                  text: `Write a brief 20-30 word description of ${place} in Nepal, focusing on its key attractions and significance.`,
                },
              ],
            },
          ],
        }),
      }
    );
    if (!response.ok) throw new Error(`Gemini API error: ${response.status}`);
    const data = await response.json();
    const result =
      data.candidates?.[0]?.content?.parts?.[0]?.text ||
      `Explore ${place}, a captivating Nepalese destination with unique attractions and cultural significance, perfect for travelers.`;
    cache.set(cacheKey, result);
    return result;
  } catch (error) {
    console.error(`Gemini fetch error for ${place}: ${error.message}`);
    const fallback = `Explore ${place}, a captivating Nepalese destination with unique attractions and cultural significance, perfect for travelers.`;
    cache.set(cacheKey, fallback);
    return fallback;
  }
};

const fetchDescription = async (place) => {
  const wikiDesc = await fetchWikipediaDescription(place);
  return wikiDesc || (await generateGeminiDescription(place));
};

export default function MinimalNepalTravel() {
  const [selectedCategory, setSelectedCategory] = useState('nature');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeImage, setPlaceImage] = useState(null);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedPlace(null);
    setPlaceImage(null);
    setDescription('');
    setError(null);
    setIsLoading(false);
  };

  const handlePlaceClick = async (place) => {
    setSelectedPlace(place);
    setIsLoading(true);
    setError(null);
    setPlaceImage(null);
    setDescription('');

    try {
      const searchQuery = activityToPlaceMap[place] || place;
      const [image, desc] = await Promise.all([
        fetchImage(searchQuery),
        fetchDescription(place),
      ]);

      setPlaceImage(image);
      setDescription(desc);
    } catch (err) {
      setError('Failed to load place details. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Capitalize category names for display
  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  // Memoize recommendations to prevent unnecessary re-renders
  const places = useMemo(() => recommendations[selectedCategory], [selectedCategory]);

  return (
    <div className="min-h-screen bg-white">
      <div className="border-b border-gray-100 py-6">
        <h1 className="text-2xl font-light text-center text-gray-900">Nepal Travel Guide</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(recommendations).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`flex items-center gap-2 px-4 py-2 text-sm transition-colors rounded-md ${
                  selectedCategory === category
                    ? 'bg-gray-900 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
                aria-pressed={selectedCategory === category}
                aria-label={`Select ${capitalize(category)} category`}
              >
                <Icon className="w-4 h-4" />
                {capitalize(category)}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-lg font-medium mb-4 text-gray-900">
              {capitalize(selectedCategory)} Places
            </h2>
            <div className="grid gap-2 max-h-96 overflow-y-auto">
              {places.map((place, index) => (
                <button
                  key={index}
                  onClick={() => handlePlaceClick(place)}
                  className={`text-left p-3 border rounded-md transition-colors ${
                    selectedPlace === place
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  aria-pressed={selectedPlace === place}
                  aria-label={`Select ${place}`}
                >
                  <span className="text-sm text-gray-900">{place}</span>
                </button>
              ))}
            </div>
          </div>

          <div>
            {selectedPlace ? (
              <div>
                <h2 className="text-lg font-medium mb-4 text-gray-900">Place Details</h2>
                <div className="mb-4">
                  {isLoading ? (
                    <div className="w-full h-64 bg-gray-200 animate-pulse rounded-md"></div>
                  ) : placeImage ? (
                    <div className="w-full h-64 overflow-hidden rounded-md bg-gray-100">
                      <img
                        src={placeImage}
                        alt={`View of ${selectedPlace} in Nepal`}
                        className="w-full h-full object-cover object-center"
                      />
                    </div>
                  ) : (
                    <div className="w-full h-64 bg-gray-100 flex items-center justify-center rounded-md">
                      <span className="text-gray-500 text-sm">No image available</span>
                    </div>
                  )}
                </div>
                <h3 className="text-xl font-light mb-2 text-gray-900">{selectedPlace}</h3>
                <span className="inline-block px-2 py-1 bg-gray-100 text-gray-700 text-xs mb-4 rounded">
                  {capitalize(selectedCategory)}
                </span>
                <div>
                  {isLoading ? (
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded"></div>
                    </div>
                  ) : error ? (
                    <p className="text-red-600 text-sm">{error}</p>
                  ) : (
                    <p className="text-gray-700 text-sm leading-relaxed">{description}</p>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">Select a place to view details</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}