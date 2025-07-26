import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { MapPin } from 'lucide-react';
import { useNavigate } from 'react-router-dom';



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

function FavoritePlaces() {
  const navigate=useNavigate()
  const { user } = useContext(AuthContext);
  const isLoggedIn = Boolean(user);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [removing, setRemoving] = useState(null); // Track which place is being removed
  const [debugInfo, setDebugInfo] = useState({});

  const fetchFavorites = async () => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      const res = await axios.get('http://localhost:8080/api/users/favorites', {
        withCredentials: true,
      });
      const favoritePlaces = res.data.favorites || res.data.favoritePlace || [];
      if (!Array.isArray(favoritePlaces)) {
        throw new Error('Invalid favorites data format');
      }
      const detailedFavorites = await Promise.all(
        favoritePlaces.map(async (fav) => {
          const placeName = fav.place || fav.name || fav;
          const [image, description] = await Promise.all([
            fetchImage(placeName),
            fetchDescription(placeName),
          ]);
          return { place: placeName, image, description };
        })
      );
      setFavorites(detailedFavorites);
      setDebugInfo({ fetchedFavorites: detailedFavorites, response: res.data });
    } catch (err) {
      setError('Failed to load favorite places. Please try again.');
      console.error('Error fetching favorites:', err);
      setDebugInfo({ error: err.message, response: err.response?.data });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!isLoggedIn) return;
    fetchFavorites();
  }, [isLoggedIn]);

  const handleRemoveFromFavorites = async (place) => {
    if (!isLoggedIn) {
      setError('Please log in to manage favorites.');
      return;
    }

    setRemoving(place);
    try {
      await axios.delete(
  `http://localhost:8080/api/users/favorites/${encodeURIComponent(place)}`,
  { withCredentials: true }
);
      setFavorites(favorites.filter(fav => fav.place !== place));
      setSuccess(`Removed ${place} from favorites.`);
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      setError('Failed to remove from favorites. Please try again.');
      console.error('Error removing from favorites:', err);
      setDebugInfo(prev => ({ ...prev, removeError: err.message }));
    } finally {
      setRemoving(null);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 text-lg font-medium">Please log in to see your favorite places.</p>
          <button
            className="mt-4 px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            onClick={() => window.location.href = '/login'}
          >
            Go to Login
          </button>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-gray-300 border-t-gray-900 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg font-medium">Loading your favorite places...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <p className="text-red-600 text-lg font-medium mb-4">{error}</p>
          <button
            className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
            onClick={fetchFavorites}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-2xl font-light text-gray-900 text-center mb-8">Your Favorite Places</h2>
        {success && (
          <div className="mb-6 p-4 bg-green-100 text-green-700 rounded-md text-center text-sm">
            {success}
          </div>
        )}
        {favorites.length === 0 ? (
          <div className="text-center py-12">
            <MapPin className="w-12 h-12 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-500 text-lg font-medium mb-4">
              You haven't added any favorite places yet.
            </p>
            <button
              className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-800 transition-colors duration-200"
              onClick={() => navigate('/places')}
            >
              Explore Destinations
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favorites.map((fav, idx) => (
              <div
                key={idx}
                className="bg-white rounded-lg shadow-md overflow-hidden transform hover:scale-105 transition-transform duration-200"
              >
                {fav.image ? (
                  <div className="w-full h-48 overflow-hidden bg-gray-100">
                    <img
                      src={fav.image}
                      alt={`View of ${fav.place} in Nepal`}
                      className="w-full h-full object-cover object-center"
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
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">{fav.place}</h3>
                  <p className="text-gray-700 text-sm leading-relaxed mb-4">
                    {fav.description || 'Discover this amazing destination in Nepal.'}
                  </p>
                  <div className="flex space-x-2">
                    <button
                      className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                      onClick={() => {
                        window.location.href = `/plan?place=${encodeURIComponent(fav.place)}`;
                        window.scrollTo(0, 0);
                      }}
                    >
                      Plan My Trip
                    </button>
                    <button
                      className="px-3 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 disabled:opacity-50 disabled:cursor-not-allowed"
                      onClick={() => handleRemoveFromFavorites(fav.place)}
                      disabled={removing === fav.place}
                    >
                      {removing === fav.place ? 'Removing...' : 'Remove'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FavoritePlaces;