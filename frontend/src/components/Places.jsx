import { useState, useMemo, useCallback, useContext } from 'react';
import axios from 'axios';

import {
  MapPin,
  Sun,
  Mountain,
  Calendar,
  Sparkles,
  PawPrint,
  Compass,
  Palette,
  Image as ImageIcon,
  Heart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const recommendations = {
  nature: [
    'Pokhara', 'Chitwan National Park', 'Rara Lake', 'Sisne Lake', 'Panch Pokhari', 'Gosaikunda',
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



const UNSPLASH_ACCESS_KEY = import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
const PIXABAY_ACCESS_KEY = import.meta.env.VITE_PIXABAY_ACCESS_KEY;
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

const cache = new Map();

const fetchImage = async (query) => {
  const cacheKey = `image_${query}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' Nepal')}&per_page=1&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (unsplashResponse.ok) {
      const unsplashData = await unsplashResponse.json();
      if (unsplashData.results?.length > 0) {
        const url = unsplashData.results[0].urls.regular;
        cache.set(cacheKey, url);
        return url;
      }
    } else {
      console.warn(`Unsplash API error for ${query}: Status ${unsplashResponse.status} - ${unsplashResponse.statusText}`);
    }

    const pixabayResponse = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_ACCESS_KEY}&q=${encodeURIComponent(query + ' Nepal')}&image_type=photo&per_page=3&safesearch=true`
    );
    if (pixabayResponse.ok) {
      const pixabayData = await pixabayResponse.json();
      if (pixabayData.hits?.length > 0) {
        const url = pixabayData.hits[0].webformatURL;
        cache.set(cacheKey, url);
        return url;
      }
    } else {
      console.warn(`Pixabay API error for ${query}: Status ${pixabayResponse.status} - ${pixabayResponse.statusText}`);
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
    if (!response.ok) {
      throw new Error(`Wikipedia API error: Status ${response.status}`);
    }
    const data = await response.json();
    if (data.extract) {
      const words = data.extract.split(' ').slice(0, 30);
      let result = words.join(' ');
      if (words.length < data.extract.split(' ').length) {
        result += '...';
      }
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
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(`Gemini API error: Status ${response.status} - ${errorData.error?.message || 'Unknown error'}`);
    }
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

export default function RecommendedInterests() {
  const { user } = useContext(AuthContext);
  const isLoggedIn = Boolean(user);
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('nature');
  const [selectedPlace, setSelectedPlace] = useState(null);
  const [placeImage, setPlaceImage] = useState(null);
  const [imageError, setImageError] = useState(false);
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState('');
  const [adding, setAdding] = useState(false);

  const handleCategoryChange = useCallback((category) => {
    setSelectedCategory(category);
    setSelectedPlace(null);
    setPlaceImage(null);
    setImageError(false);
    setDescription('');
    setError(null);
    setIsLoading(false);
    setSuccess('');
  }, []);

  const handlePlaceClick = useCallback(async (place) => {
    setSelectedPlace(place);
    setIsLoading(true);
    setError(null);
    setPlaceImage(null);
    setImageError(false);
    setDescription('');
    setSuccess('');

    try {
      const searchQuery = activityToPlaceMap[place] || place;
      const [image, desc] = await Promise.all([
        fetchImage(searchQuery),
        fetchDescription(place),
      ]);

      setPlaceImage(image);
      setImageError(!image);
      setDescription(desc);
    } catch (err) {
      console.error(`Error loading details for ${place}:`, err);
      setError('Failed to load place details. Please try again.');
      setPlaceImage(null);
      setImageError(true);
      setDescription('');
    } finally {
      setIsLoading(false);
    }
  }, []);

 const handleAddToFavorites = useCallback(async () => {
  if (!isLoggedIn) {
    setError('Please log in to add favorites.');
    return;
  }
  if (!selectedPlace) return;

  setAdding(true);
  setError('');
  setSuccess('');
  try {
    await axios.post(
      'http://localhost:8080/api/users/favorites',
      { name: selectedPlace }, // 🔥 fixed key
      { withCredentials: true }
    );
    setSuccess(`Added ${selectedPlace} to favorites.`);
    setTimeout(() => setSuccess(''), 3000);
  } catch (err) {
    setError('Failed to add to favorites. Please try again.');
    console.error('Error adding to favorites:', err);
  } finally {
    setAdding(false);
  }
}, [isLoggedIn, selectedPlace]);


  const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

  const places = useMemo(() => recommendations[selectedCategory], [selectedCategory]);

  return (
    <div className="min-h-screen bg-white font-sans text-gray-900">
      <div className="border-b border-gray-200 py-6">
        <h1 className="text-3xl font-light text-center text-gray-900">Nepal Travel Guide</h1>
      </div>

      <div className="max-w-6xl mx-auto p-6">
        <div className="flex flex-wrap gap-2 mb-8 justify-center">
          {Object.keys(recommendations).map((category) => {
            const Icon = categoryIcons[category];
            return (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className="flex items-center gap-2 px-4 py-2 text-sm text-gray-900 hover:bg-gray-100"
                aria-label={`Select ${capitalize(category)} category`}
              >
                <Icon className="w-4 h-4" />
                {capitalize(category)}
              </button>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column: Places List */}
          <div className="border border-gray-200 p-4">
            <h2 className="text-xl font-medium mb-4 text-gray-900">
              {capitalize(selectedCategory)} Destinations
            </h2>
            <div className="grid gap-2 max-h-[400px] lg:max-h-[500px] overflow-y-auto pr-2">
              {places.length > 0 ? (
                places.map((place) => (
                  <button
                    key={`${selectedCategory}-${place}`}
                    onClick={() => handlePlaceClick(place)}
                    className="text-left p-3 border border-gray-200 text-gray-900 hover:bg-gray-100"
                    aria-label={`View details for ${place}`}
                  >
                    <span className="text-base">{place}</span>
                  </button>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <p>No places found for this category.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Place Details */}
          <div className="border border-gray-200 p-6">
            {selectedPlace ? (
              <div>
                <h2 className="text-xl font-medium mb-4 text-gray-900">Place Details</h2>
                <div className="mb-4 aspect-video bg-gray-100 flex items-center justify-center">
                  {isLoading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse flex items-center justify-center">
                      <MapPin className="w-16 h-16 text-gray-400 animate-bounce-slow" />
                    </div>
                  ) : imageError || !placeImage ? (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 text-gray-500 text-sm flex-col">
                      <ImageIcon className="w-12 h-12 mb-2 text-gray-400" />
                      <span>No image available</span>
                    </div>
                  ) : (
                    <img
                      src={placeImage}
                      alt={`Scenic view of ${selectedPlace} in Nepal`}
                      className="w-full h-full object-cover object-center"
                      onError={() => {
                        console.error(`Image failed to load for ${selectedPlace}: ${placeImage}`);
                        setImageError(true);
                      }}
                      loading="lazy"
                    />
                  )}
                </div>
                <h3 className="text-2xl font-medium mb-2 text-gray-900">{selectedPlace}</h3>
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium mb-4">
                  {capitalize(selectedCategory)}
                </span>
                <div>
                  {isLoading ? (
                    <div className="space-y-3">
                      <div className="h-4 bg-gray-200 animate-pulse rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse w-5/6 rounded"></div>
                      <div className="h-4 bg-gray-200 animate-pulse w-3/4 rounded"></div>
                    </div>
                  ) : error ? (
                    <p className="text-red-600 text-sm font-medium mb-4">{error}</p>
                  ) : (
                    <>
                      <p className="text-gray-700 text-base leading-relaxed mb-4">{description}</p>
                      {success && (
                        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md text-sm">
                          {success}
                        </div>
                      )}
                      <div className="flex space-x-2">
                        <button
                          className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                          onClick={() => {
                            navigate(`/plan?place=${encodeURIComponent(selectedPlace)}`);
                            window.scrollTo(0, 0);
                          }}
                        >
                          Plan My Trip
                        </button>
                        <button
                          className="px-3 py-2 bg-transparent text-blue-600 rounded-md hover:bg-blue-100 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                          onClick={handleAddToFavorites}
                          disabled={adding || !isLoggedIn}
                          title="Add to Favorites"
                        >
                          {adding ? (
                            'Adding...'
                          ) : (
                            <Heart className="w-5 h-5" />
                          )}
                        </button>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ) : (
              <div className="text-center py-20 flex flex-col items-center justify-center h-full">
                <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">Select a place to view its details</p>
                <p className="text-gray-400 text-sm mt-2">Discover the wonders of Nepal!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}