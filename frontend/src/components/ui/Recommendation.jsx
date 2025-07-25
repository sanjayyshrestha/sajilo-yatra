import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import {
  MapPin,
  Mountain,
  Calendar,
  Sparkles,
  PawPrint,
  Sun,
  Compass,
  Palette,
  Heart,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';


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

// Default recommendations for non-logged-in users
const defaultRecommendations = [
  'Everest Base Camp', 'Pokhara', 'Chitwan National Park', 'Annapurna Base Camp',
  'Kathmandu Durbar Square', 'Lumbini', 'Bandipur', 'Nagarkot',
  'Bhaktapur Durbar Square', 'Rara Lake', 'Ghorepani Poon Hill Trek', 'Tilicho Lake'
];

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

const UNSPLASH_ACCESS_KEY = 'Kvi9xQzqvJlcUPS4FN0tCQELubCDZaJqVC09hW7wiVg';
const PIXABAY_ACCESS_KEY = '51460994-dcdee362e96d62a57b222a90a';
const GEMINI_API_KEY = 'AIzaSyDJlDS7l3gNHOqACdT8UGDe6mIpLCAMN_o';

const cache = new Map();

const fetchImage = async (query) => {
  const cacheKey = `image_${query}`;
  if (cache.has(cacheKey)) return cache.get(cacheKey);

  try {
   
    const unsplashResponse = await fetch(
      `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query + ' Nepal')}&per_page=1&orientation=landscape&order_by=relevant&client_id=${UNSPLASH_ACCESS_KEY}`
    );
    if (!unsplashResponse.ok) throw new Error(`Unsplash API error: ${unsplashResponse.status}`);
    const unsplashData = await unsplashResponse.json();
    if (unsplashData.results?.length > 0) {
      // Use regular size for better quality instead of small
      const url = unsplashData.results[0].urls.regular || unsplashData.results[0].urls.small;
      cache.set(cacheKey, url);
      return url;
    }

    // Fallback to Pixabay with high quality settings
    const pixabayResponse = await fetch(
      `https://pixabay.com/api/?key=${PIXABAY_ACCESS_KEY}&q=${encodeURIComponent(query + ' Nepal')}&image_type=photo&category=places&min_width=640&min_height=480&per_page=3&order=popular`
    );
    if (!pixabayResponse.ok) throw new Error(`Pixabay API error: ${pixabayResponse.status}`);
    const pixabayData = await pixabayResponse.json();
    if (pixabayData.hits?.length > 0) {
      // Use higher quality image URL
      const url = pixabayData.hits[0].largeImageURL || pixabayData.hits[0].webformatURL;
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

const capitalize = (str) => str.charAt(0).toUpperCase() + str.slice(1);

function RecommendedInterests() {
  const navigate = useNavigate();
  const [userInterests, setUserInterests] = useState([]);
  const [loadingInterests, setLoadingInterests] = useState(true);
  const [recommendedPlaces, setRecommendedPlaces] = useState([]);
  const [loadingRecommendations, setLoadingRecommendations] = useState(false);
  const [error, setError] = useState(null);
  const [debugInfo, setDebugInfo] = useState({});
  const [favorites, setFavorites] = useState(new Set());
  const { user } = useContext(AuthContext);
  const isLoggedIn = Boolean(user);

  useEffect(() => {
    if (!isLoggedIn) {
      setLoadingInterests(false);
      // Load default recommendations for non-logged-in users
      loadDefaultRecommendations();
      return;
    }

    setLoadingInterests(true);
    setError(null);

    const timeoutId = setTimeout(() => {
      axios.get('http://localhost:8080/api/users/interests', { withCredentials: true })
        .then(response => {
          console.log('Fetched interests response:', response.data); 
          const interests = response.data.interests?.map(interest => interest.name) || [];
          console.log('Processed interests:', interests);
          setUserInterests(interests);
          setDebugInfo(prev => ({ ...prev, fetchedInterests: interests }));
          setLoadingInterests(false);
        })
        .catch(err => {
          console.error('Error fetching interests:', err);
          setError('Failed to fetch your interests. Please try again.');
          setLoadingInterests(false);
        });
    }, 0);

    return () => clearTimeout(timeoutId);
  }, [isLoggedIn]);

  useEffect(() => {
    if (!isLoggedIn) return;

    // Fetch user's favorites
    axios.get('http://localhost:8080/api/users/favorites', { withCredentials: true })
      .then(response => {
        const favoritePlaces = response.data.favorites?.map(fav => fav.place) || [];
        setFavorites(new Set(favoritePlaces));
      })
      .catch(err => {
        console.error('Error fetching favorites:', err);
        setError('Failed to fetch your favorites. Please try again.');
      });
  }, [isLoggedIn]);

  const loadDefaultRecommendations = async () => {
    setLoadingRecommendations(true);
    setError(null);

    try {
      const shuffledDefault = [...defaultRecommendations].sort(() => 0.5 - Math.random());
      const selectedDefault = shuffledDefault.slice(0, 8); // Show 8 default recommendations

      const detailedRecommendations = await Promise.allSettled(
        selectedDefault.map(async (place) => {
          try {
            const searchQuery = activityToPlaceMap[place] || place;
            const [image, description] = await Promise.all([
              fetchImage(searchQuery),
              fetchDescription(place),
            ]);
            return { place, image, description, searchQuery };
          } catch (error) {
            console.error(`Error processing place ${place}:`, error);
            return {
              place,
              image: null,
              description: `Discover ${place}, a wonderful destination in Nepal.`,
              searchQuery: place,
              error: error.message
            };
          }
        })
      );

      const successfulRecommendations = detailedRecommendations
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

      setRecommendedPlaces(successfulRecommendations);
    } catch (error) {
      console.error('Error loading default recommendations:', error);
      setError('Failed to load recommendations. Please try again.');
    } finally {
      setLoadingRecommendations(false);
    }
  };

  useEffect(() => {
    if (loadingInterests) {
      setRecommendedPlaces([]);
      return;
    }

    if (!isLoggedIn) {
      return; // Default recommendations already loaded
    }

    if (userInterests.length === 0) {
      console.log('No user interests found'); 
      setRecommendedPlaces([]);
      setDebugInfo(prev => ({ ...prev, noInterests: true }));
      setLoadingRecommendations(false); 
      return;
    }

    const fetchRecommendations = async () => {
      setLoadingRecommendations(true);
      setError(null);

      try {
        console.log('Generating recommendations for interests:', userInterests); 

        const placesToRecommend = new Set();

        for (const interestCategory of userInterests) {
          console.log(`Processing interest category: ${interestCategory}`); 

          const lowerCaseCategory = interestCategory.toLowerCase();

          if (recommendations[lowerCaseCategory]) {
            const categoryPlaces = recommendations[lowerCaseCategory];
            console.log(`Found ${categoryPlaces.length} places for ${lowerCaseCategory}`); 

            const shuffled = [...categoryPlaces].sort(() => 0.5 - Math.random());
            const selected = shuffled.slice(0, 4);

            selected.forEach(place => {
              placesToRecommend.add(place);
            });

            console.log(`Added ${selected.length} places from ${lowerCaseCategory}:`, selected); 
          } else {
            console.warn(`No recommendations found for interest category: ${interestCategory} (after trying lowercase: ${lowerCaseCategory})`);
          }
        }

        console.log(`Total unique places to recommend: ${placesToRecommend.size}`); 
        setDebugInfo(prev => ({
          ...prev,
          placesFound: Array.from(placesToRecommend),
          totalPlacesFound: placesToRecommend.size
        }));

        if (placesToRecommend.size === 0) {
          console.warn('No places found to recommend');
          setRecommendedPlaces([]);
          setLoadingRecommendations(false);
          return;
        }

        const detailedRecommendations = await Promise.allSettled(
          Array.from(placesToRecommend).map(async (place) => {
            try {
              const searchQuery = activityToPlaceMap[place] || place;
              const [image, description] = await Promise.all([
                fetchImage(searchQuery),
                fetchDescription(place),
              ]);
              return { place, image, description, searchQuery };
            } catch (error) {
              console.error(`Error processing place ${place}:`, error);
              return {
                place,
                image: null,
                description: `Discover ${place}, a wonderful destination in Nepal.`,
                searchQuery: place,
                error: error.message
              };
            }
          })
        );

        const successfulRecommendations = detailedRecommendations
          .filter(result => result.status === 'fulfilled')
          .map(result => result.value);

        console.log(`Successfully processed ${successfulRecommendations.length} recommendations`); 
        setRecommendedPlaces(successfulRecommendations);
        setDebugInfo(prev => ({
          ...prev,
          finalRecommendations: successfulRecommendations.length,
          processingErrors: detailedRecommendations.filter(r => r.status === 'rejected').length
        }));

      } catch (error) {
        console.error('Error in fetchRecommendations:', error);
        setError('Failed to generate recommendations. Please try again.');
      } finally {
        setLoadingRecommendations(false);
      }
    };

    fetchRecommendations();
  }, [userInterests, loadingInterests, isLoggedIn]);

  const handlePlanTrip = (place) => {
    navigate(`/plan?place=${encodeURIComponent(place)}`);
  };

  const handleAddToFavorites = async (name) => {
    if (!isLoggedIn) {
      alert('Please log in to add favorites');
      return;
    }

    try {
      await axios.post(
        'http://localhost:8080/api/users/favorites',
        { name },
        { withCredentials: true }
      );
      alert(`Added "${name}" to favorites!`);
      setFavorites(prev => new Set([...prev, name]));
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert(error.response?.data?.message || 'Failed to add to favorites');
    }
  };

  if (loadingInterests) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading recommendations...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors"
            onClick={() => window.location.reload()}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white p-6">
      <h1 className="text-2xl font-light text-center text-gray-900 mb-8">
        {isLoggedIn ? 'Recommended Destinations for You' : 'Popular Destinations in Nepal'}
      </h1>

      {isLoggedIn && userInterests.length > 0 && (
        <div className="mb-8 text-center">
          <h2 className="text-lg font-medium text-gray-800 mb-4">
            Based on your interests: {userInterests.map(capitalize).join(', ')}
          </h2>
        </div>
      )}

      {loadingRecommendations ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="bg-gray-100 rounded-lg shadow-sm overflow-hidden animate-pulse">
              <div className="w-full h-48 bg-gray-200"></div>
              <div className="p-4">
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              </div>
            </div>
          ))}
        </div>
      ) : recommendedPlaces.length === 0 ? (
        <div className="text-center py-12">
          <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
          <p className="text-gray-500 mb-4">
            {isLoggedIn 
              ? 'No specific recommendations could be generated based on your current interests. This might be due to API limitations or network issues.'
              : 'Unable to load recommendations at the moment. Please try again later.'
            }
          </p>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors mr-2"
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
          <button
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
            onClick={() => window.location.href = '/travel-guide'}
          >
            Explore All Destinations
          </button>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recommendedPlaces.map((rec, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200">
              {rec.image ? (
                <div className="w-full h-48 overflow-hidden bg-gray-100 relative">
                  <img
                    src={rec.image}
                    alt={`View of ${rec.place} in Nepal`}
                    className="w-full h-full object-cover object-center transition-opacity duration-300"
                    style={{ imageRendering: 'crisp-edges' }}
                    loading="lazy"
                    onError={(e) => {
                      e.target.style.display = 'none'; 
                      e.target.nextSibling.style.display = 'flex'; 
                    }}
                  />
                  <div className="absolute inset-0 w-full h-full bg-gray-100 items-center justify-center hidden">
                    <span className="text-gray-500 text-sm">No image available</span>
                  </div>
                </div>
              ) : (
                <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
                  <span className="text-gray-500 text-sm">No image available</span>
                </div>
              )}
              <div className="p-4">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{rec.place}</h3>
                <p className="text-gray-700 text-sm leading-relaxed mb-4">
                  {rec.description || 'Discover this amazing destination in Nepal.'}
                </p>
                <div className="flex space-x-2">
                  <button
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    onClick={() => {handlePlanTrip(rec.place);scrollTo(0,0)}}
                  >
                    Plan My Trip
                  </button>
                  <button
                    className={`p-2 rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${
                      favorites.has(rec.place)
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                    }`}
                    onClick={() => handleAddToFavorites(rec.place)}
                    title={favorites.has(rec.place) ? 'Added to Favorites' : 'Add to Favorites'}
                  >
                    <Heart className={`w-5 h-5 ${favorites.has(rec.place) ? 'fill-current' : ''}`} />
                  </button>
                </div>
                {rec.error && process.env.NODE_ENV === 'development' && (
                  <p className="text-red-500 text-xs mt-2">Debug: {rec.error}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default RecommendedInterests;