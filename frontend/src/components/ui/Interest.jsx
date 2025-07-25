import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";

const possibleInterests = [
  "Nature",
  "Adventure",
  "Culture",
  "Food",
  "Spiritual",
  "Hiking",
  "Relaxation",
  "Wildlife",
  "Historical",
];

function Interests() {
  const { user, checkLogin } = useContext(AuthContext);
  const [selected, setSelected] = useState([]);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
const isLoggedIn = !!user;
  const fetchInterests = async () => {
    if (!isLoggedIn) return;
    setLoading(true);
    setError("");
    try {
      const res = await axios.get("http://localhost:8080/api/users/interests", {
        withCredentials: true,
      });
      const fetched = res.data.interests?.map((i) => i.name) || [];
      // Only include interests that are in possibleInterests
      setSelected(fetched.filter((i) => possibleInterests.includes(i)));
    } catch (err) {
      setError("Failed to load interests.");
      console.error("Error fetching interests:", err);
    } finally {
      setLoading(false);
    }
  };

  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };
  useEffect(() => {
    checkLogin();fetchInterests();
  },[isLoggedIn]);

  const handleRemoveInterest = (interest) => {
    setSelected((prev) => prev.filter((i) => i !== interest));
  };

  const handleSave = async () => {
    if (!isLoggedIn) {
      setError("Please log in to save interests.");
      return;
    }
    setLoading(true);
    setError("");
    setMessage("");
    try {
      await axios.put(
        "http://localhost:8080/api/users/interests",
        { interests: selected },
        { withCredentials: true }
      );
      console.log("interest saved");
      setMessage("Interests updated successfully!");
      setTimeout(() => setMessage(""), 3000);
    } catch (err) {
      setError("Failed to save interests.");
      console.error("Error saving interests:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isLoggedIn) {
    return (
      <div className="max-w-xl mx-auto p-6 text-center">
        <h2 className="text-2xl font-semibold mb-4 text-gray-900">
          Select Your Interests
        </h2>
        <p className="text-gray-600 mb-4">
          Please log in to manage your interests.
        </p>
        <button
          onClick={() => (window.location.href = "/login")}
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
        >
          Go to Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-6">
      <h2 className="text-2xl font-semibold mb-4 text-center text-gray-900">
        Select Your Interests
      </h2>

      {/* Interest Buttons */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        {possibleInterests.map((interest) => (
          <button
            key={interest}
            onClick={() => toggleInterest(interest)}
            className={`px-4 py-2 border rounded-full ${
              selected.includes(interest)
                ? "bg-blue-600 text-white"
                : "bg-gray-100 text-gray-800 hover:bg-gray-200"
            } transition`}
          >
            {interest}
          </button>
        ))}
      </div>

      {/* Selected Interests with Remove Option */}
      {selected.length > 0 && (
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2 text-gray-900">
            Selected Interests
          </h3>
          <div className="flex flex-wrap gap-2">
            {selected.map((interest) => (
              <div
                key={interest}
                className="flex items-center px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
              >
                <span>{interest}</span>
                <button
                  onClick={() => handleRemoveInterest(interest)}
                  className="ml-2 text-blue-700 hover:text-blue-900 focus:outline-none"
                  title={`Remove ${interest}`}
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Save Button */}
      <button
        onClick={handleSave}
        className="w-full bg-blue-700 text-white py-2 rounded-md hover:bg-blue-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? "Saving..." : "Save Interests"}
      </button>

      {/* Feedback Messages */}
      {message && <p className="text-green-600 mt-4 text-center">{message}</p>}
      {error && <p className="text-red-600 mt-4 text-center">{error}</p>}
    </div>
  );
}

export default Interests;
