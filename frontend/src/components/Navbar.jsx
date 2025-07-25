import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Heart, LogOut, LogIn, Compass, User } from "lucide-react";
import axios from "axios";
import logo from "../assets/logo.jpg";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();
  const { user, setUser, checkLogin } = useContext(AuthContext);

  const isLoggedIn = !!user;

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:8080/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
      alert(err.response?.data?.message || "Failed to logout");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  useEffect(() => {
    checkLogin();
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest(".user-menu-container")) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("touchstart", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("touchstart", handleClickOutside);
    };
  }, [isUserMenuOpen, isLoggedIn,]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
     
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getFirstName = (fullName) => {
    if (!fullName) return '';
    const firstName = fullName.split(' ')[0];
    return firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
  };

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 left-0 w-full z-50 shadow-sm">
      <div className="w-full px-3 sm:px-4 lg:px-6 xl:px-8">
        <div className="flex justify-between items-center h-16 sm:h-18 md:h-20">
         
          <div className="flex-shrink-0">
            <NavLink 
              to="/" 
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="block"
            >
              <img
                src={logo}
                alt="Sajilo Yatra Logo"
                className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 lg:w-16 lg:h-16 rounded-full object-contain transition-transform duration-200 hover:scale-105"
                onError={(e) => (e.target.src = "/path/to/fallback-image.jpg")}
              />
            </NavLink>
          </div>

          
          <div className="hidden lg:flex flex-grow justify-center">
            <ul className="flex space-x-4 xl:space-x-8">
              {[
                { to: "/", label: "Home" },
                { to: "/places", label: "All Places" },
                { to: "/about", label: "About" },
                { to: "/contact", label: "Contact" }
              ].map((link) => (
                <li key={link.to}>
                  <NavLink
                    to={link.to}
                    onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                    className={({ isActive }) =>
                      `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative text-sm xl:text-base ${
                        isActive ? "text-blue-600" : ""
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span>{link.label}</span>
                        {isActive && (
                          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-6 xl:w-8"></div>
                        )}
                      </>
                    )}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>

          
          <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-4">
       
            {isLoggedIn ? (
              <div className="flex items-center space-x-1 sm:space-x-2 lg:space-x-3">
        
                <NavLink
                  to="/favourites"
                  onClick={() => window.scrollTo(0, 0)}
                  className="text-gray-700 hover:text-red-600 transition duration-300 p-1.5 sm:p-2 rounded-full hover:bg-gray-100"
                  title="My Favourite Places"
                >
                  <Heart size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                </NavLink>
                
                <div className="relative user-menu-container">
                  <button
                    onClick={toggleUserMenu}
                    className="flex items-center space-x-1 text-gray-700 hover:text-blue-600 active:text-blue-600 transition duration-300 p-1.5 sm:p-2 rounded-md hover:bg-gray-100 active:bg-blue-50"
                  >
                    <User size={18} className="w-4 h-4 sm:w-5 sm:h-5 md:w-4 md:h-4 lg:w-5 lg:h-5" />
                    <span className="hidden sm:inline text-xs lg:text-sm font-medium max-w-16 sm:max-w-20 lg:max-w-24 truncate">
                      {getFirstName(user?.fullName) || "User"}
                    </span>
                  </button>
                  
                  {isUserMenuOpen && (
                    <div className="absolute right-0 top-full mt-2 w-44 sm:w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-50">
                      <div className="px-4 py-2 border-b border-gray-200 sm:hidden">
                        <p className="text-sm font-medium text-gray-900 truncate">
                          {getFirstName(user?.fullName) || "User"}
                        </p>
                      </div>
                      <NavLink
                        to="/interests"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition duration-200"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Compass size={16} />
                        <span>My Interests</span>
                      </NavLink>
                      <NavLink
                        to="/favourites"
                        className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 active:bg-gray-100 transition duration-200"
                        onClick={() => {
                          setIsUserMenuOpen(false);
                          window.scrollTo(0, 0);
                        }}
                      >
                        <Heart size={16} />
                        <span>My Favourites</span>
                      </NavLink>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="flex items-center space-x-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 active:bg-red-50 transition duration-200 text-left"
                      >
                        <LogOut size={16} />
                        <span>Logout</span>
                      </button>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <button
                onClick={() => {
                  navigate("/login");
                  window.scrollTo(0, 0);
                }}
                className="flex items-center space-x-1 lg:space-x-2 bg-blue-600 text-white px-2 sm:px-3 lg:px-4 py-1.5 sm:py-2 rounded-md hover:bg-blue-700 active:bg-blue-800 transition duration-300 font-medium text-xs sm:text-sm lg:text-base"
              >
                <LogIn size={16} className="w-4 h-4 sm:w-4 sm:h-4 lg:w-5 lg:h-5" />
                <span className="hidden xs:inline sm:inline">Login</span>
              </button>
            )}

           
            <div className="lg:hidden">
              <button
                onClick={toggleMobileMenu}
                className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                aria-label="Toggle mobile menu"
                aria-expanded={isMobileMenuOpen}
              >
                <div className="w-6 h-6 flex flex-col justify-center items-center">
                  <span
                    className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "rotate-45 translate-y-1" : "-translate-y-1"
                    }`}
                  ></span>
                  <span
                    className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "opacity-0" : "opacity-100"
                    }`}
                  ></span>
                  <span
                    className={`block w-5 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                      isMobileMenuOpen ? "-rotate-45 -translate-y-1" : "translate-y-1"
                    }`}
                  ></span>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden overflow-hidden transition-all duration-300 ease-in-out ${
          isMobileMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="bg-white border-t border-gray-200 px-3 sm:px-4 py-4">
          <ul className="flex flex-col space-y-1">
            {[
              { to: "/", label: "Home" },
              { to: "/places", label: "All Places" },
              { to: "/about", label: "About" },
              { to: "/contact", label: "Contact" }
            ].map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className={({ isActive }) =>
                    `block text-gray-700 hover:text-blue-600 hover:bg-blue-50 font-medium transition duration-300 py-3 px-4 rounded-md ${
                      isActive ? "text-blue-600 bg-blue-50" : ""
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;