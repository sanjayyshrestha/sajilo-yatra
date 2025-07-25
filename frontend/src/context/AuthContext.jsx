import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  

  const checkLogin = async () => {
    try {
      const { data } = await axios.get("http://localhost:8080/api/users/me", {
        withCredentials: true,
      });
      if (data.success) {
        setUser(data.user);
      } else {
        console.log(data.message);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  
  const addToFavorites = async (name) => {
    try {
      await axios.post(
        'http://localhost:8080/api/users/favorites',
        { name }, // send place name
        { withCredentials: true }
      );
      alert(`Added "${name}" to favorites!`);
      // Optionally update UI or refetch user data here
    } catch (error) {
      console.error('Error adding to favorites:', error);
      alert(error.response?.data?.message || 'Failed to add to favorites');
    }
  };
  return (
    <AuthContext.Provider value={{ user, setUser,checkLogin ,isLoggedIn, setIsLoggedIn,addToFavorites}}>
      {children}
    </AuthContext.Provider>
  );
};
