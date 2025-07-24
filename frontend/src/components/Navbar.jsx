import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, ShoppingBag, LogOut, ShoppingCart, Heart, LogIn } from "lucide-react";
import logo from '../assets/logo.jpg'

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Mock authentication state - replace with your actual auth context/state
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Example login function - replace with your actual login logic
  const handleLogin = () => {
    // Navigate to login page or open login modal
    
    navigate('/login');
  };

  
  const handleLogout = () => {
    setIsLoggedIn(false);
    setUser(null);
    setIsUserMenuOpen(false);
    // Add your logout API call here
    // Example: await logout();
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isUserMenuOpen && !event.target.closest('.user-menu-container')) {
        setIsUserMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <nav className="bg-white/90 backdrop-blur-sm sticky top-0 left-0 w-full z-50 p-4 shadow-sm">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <NavLink to="/" onClick={()=>scrollTo(0,0)}> 
            <img
              src={logo}
              alt="BookStore Logo"
              className="inline-block mr-2 rounded-full w-[65px] sm:w-[70px] md:w-[85px] lg:w-[70px] relative top-1"
            />
          </NavLink>
        </div>

        {/* Navigation Links - Middle (Hidden on mobile by default, shown on md screens) */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 lg:space-x-8">
            <li>
              <NavLink
                to="/"
                onClick={()=>scrollTo(0,0)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>

            <li>
              <NavLink
                to="/places"
                onClick={()=>scrollTo(0,0)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>All Places</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={()=>scrollTo(0,0)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>About</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={()=>scrollTo(0,0)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Contact</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
          </ul>
        </div>

        {/* Right Side - Auth Section */}
        <div className="hidden md:flex items-center space-x-4">
          {isLoggedIn ? (
            <div className="relative user-menu-container">
              {/* Favourite Places Icon */}
              <NavLink
                to="/favourites"
                className="text-gray-700 hover:text-red-600 transition duration-300 p-2 rounded-full hover:bg-gray-100"
                title="My Favourite Places"
              >
                <Heart size={20} />
              </NavLink>
              
              {/* User Menu */}
              <button
                onClick={toggleUserMenu}
                className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition duration-300 p-2 rounded-md hover:bg-gray-100"
              >
                <User size={20} />
                <span className="text-sm font-medium">{user?.name || 'User'}</span>
              </button>

              {/* User Dropdown Menu */}
              {isUserMenuOpen && (
                <div className="absolute right-0 top-full mt-2 w-48 bg-white rounded-md shadow-lg border border-gray-200 py-2 z-10">
                  <NavLink
                    to="/profile"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <User size={16} />
                    <span>Profile</span>
                  </NavLink>
                  <NavLink
                    to="/favourites"
                    className="flex items-center space-x-2 px-4 py-2 text-gray-700 hover:bg-gray-100 transition duration-200"
                    onClick={() => setIsUserMenuOpen(false)}
                  >
                    <Heart size={16} />
                    <span>My Favourites</span>
                  </NavLink>
                  <hr className="my-2 border-gray-200" />
                  <button
                    onClick={handleLogout}
                    className="flex items-center space-x-2 w-full px-4 py-2 text-red-600 hover:bg-red-50 transition duration-200"
                  >
                    <LogOut size={16} />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={()=>navigate('/login')}
              className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
            >
              <LogIn size={18} />
              <span>Login</span>
            </button>
          )}
        </div>

        {/* Hamburger Menu for Mobile */}
        <div className="md:hidden">
          <button
            onClick={toggleMobileMenu}
            className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle mobile menu"
          >
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out my-1 ${
                isMobileMenuOpen ? "opacity-0" : ""
              }`}
            ></span>
            <span
              className={`block w-6 h-0.5 bg-gray-700 transition-all duration-300 ease-in-out ${
                isMobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 mt-2">
          <ul className="flex flex-col items-center space-y-4">
            <li>
              <NavLink
                to='/'
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Home</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to='/places'
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>All Places</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>About</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>Contact</span>
                    {isActive && <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 h-0.5 bg-blue-600 w-8"></div>}
                  </>
                )}
              </NavLink>
            </li>
            
            {/* Mobile Auth Section */}
            <hr className="w-full border-gray-200 my-2" />
            {isLoggedIn ? (
              <>
                <li>
                  <NavLink
                    to="/favourites"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-red-600 font-medium transition duration-300 py-2 px-3 rounded-md"
                  >
                    <Heart size={18} />
                    <span>My Favourites</span>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/profile"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center space-x-2 text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md"
                  >
                    <User size={18} />
                    <span>Profile</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center space-x-2 text-red-600 hover:text-red-700 font-medium transition duration-300 py-2 px-3 rounded-md"
                  >
                    <LogOut size={18} />
                    <span>Logout</span>
                  </button>
                </li>
              </>
            ) : (
              <li>
                <button
                  onClick={() => {
                    handleLogin();
                    setIsMobileMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition duration-300 font-medium"
                >
                  <LogIn size={18} />
                  <span>Login</span>
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;