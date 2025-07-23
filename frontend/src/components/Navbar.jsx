import React, { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { User, ShoppingBag, LogOut, ShoppingCart } from "lucide-react";
import logo from '../assets/logo.jpg'
const Navbar = () => {

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
;

  

  return (
    <nav className="bg-white p-4 shadow-md rounded-b-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo - Left Side */}
        <div className="flex-shrink-0">
          <NavLink to="/">
            <img
              src={logo}
              alt="BookStore Logo"
              // Adjusted logo sizing: w-full for very small, then specific widths
              // for sm, md (768px breakpoint), and lg.
              className="inline-block mr-2 rounded-full w-[65px] sm:w-[70px] md:w-[85px] lg:w-[100px] relative top-1"
            />
          </NavLink>
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

        {/* Navigation Links - Middle (Hidden on mobile by default, shown on md screens) */}
        <div className="hidden md:flex flex-grow justify-center">
          <ul className="flex space-x-6 lg:space-x-8"> {/* Slight adjustment to spacing */}
            <li>
              <NavLink
                to="/"
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

      </div>

      {/* Mobile Menu Overlay (Conditionally rendered based on state) */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white py-4 mt-2 ">
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
                to='/books'
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `text-gray-700 hover:text-blue-600 font-medium transition duration-300 py-2 px-3 rounded-md relative ${
                    isActive ? "text-blue-600" : ""
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    <span>All Books</span>
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
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;