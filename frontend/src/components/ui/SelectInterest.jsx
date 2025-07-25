import React, { useContext, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';


const interestOptions = [
  'Nature',
  'Adventure',
  'Historical',
  'Culture',
  'Spiritual',
  'Wildlife',
  'Leisure',
  'Offbeat',
];

const SelectInterests = () => {
  const [selected, setSelected] = useState([]);
  const navigate = useNavigate();
  const query = new URLSearchParams(useLocation().search);
  const userId = query.get('userId');
   const { setUser, setIsLoggedIn } = useContext(AuthContext);
  const toggleInterest = (interest) => {
    setSelected((prev) =>
      prev.includes(interest)
        ? prev.filter((i) => i !== interest)
        : [...prev, interest]
    );
  };

  const handleSubmit = async () => {
    try {
      const interests = selected.map((name) => ({ name }));

      await axios.post('http://localhost:8080/api/users/save-interests', {
        userId,
        interests,
      });
      setIsLoggedIn(true);
      alert('Interests saved!');
      navigate('/');
    } catch (err) {
      alert('Failed to save interests');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border border-gray-300 rounded-md shadow-sm">
      <h2 className="text-center text-xl font-semibold mb-6">Select Your Interests</h2>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {interestOptions.map((interest) => {
          const isSelected = selected.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              onClick={() => toggleInterest(interest)}
              className={`py-2 rounded-md border text-center ${
                isSelected
                  ? 'border-blue-600 bg-blue-100 text-blue-700'
                  : 'border-gray-300 bg-white text-gray-700 hover:bg-gray-100'
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleSubmit}
        disabled={selected.length === 0}
        className={`w-full py-3 rounded-md font-semibold ${
          selected.length === 0
            ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
            : 'bg-blue-600 text-white hover:bg-blue-700'
        }`}
      >
        {selected.length === 0
          ? 'Select at least one interest'
          : `Continue with ${selected.length} interest${selected.length > 1 ? 's' : ''}`}
      </button>
    </div>
  );
};

export default SelectInterests;
