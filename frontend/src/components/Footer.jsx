import React from 'react';
import { Facebook, Linkedin, Twitter, Youtube } from 'lucide-react';
import logo from '../assets/logo.jpg'
import { useNavigate } from 'react-router-dom';
const Footer = () => {
  const navigate=useNavigate()
  const handleNavigation = (path) => {
    window.scrollTo(0, 0);
    // Add your navigation logic here
    navigate(path)
    console.log(`Navigate to: ${path}`);
  };

  return (
    <footer className="bg-white border-t border-gray-200">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Logo and Description */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img
                src={logo}
                alt="Sajha Yatra Logo"
                className="w-16 h-16 rounded-full object-contain"
              />
              <span className="text-xl font-bold text-gray-900">Sajilo Yatra</span>
            </div>
            <p className="text-gray-600 text-sm max-w-xs">
              Discover the beauty and culture of Nepal through authentic travel experiences.
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-3 pt-2">
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <Facebook size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <Linkedin size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <Twitter size={16} />
              </a>
              <a href="#" className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-all duration-300">
                <Youtube size={16} />
              </a>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Navigation</h3>
            <ul className="space-y-2">
              <li><button onClick={() => handleNavigation('/')} className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Home</button></li>
              <li><button onClick={() => handleNavigation('/about')} className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">About Us</button></li>
              <li><button onClick={() => handleNavigation('/places')} className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Places</button></li>
              <li><button onClick={() => handleNavigation('/contact')} className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Contact</button></li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wider">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-orange-500 transition-colors duration-300 text-sm">FAQs</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-200 mt-8 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">© 2025 Sajha Yatra. All rights reserved.</p>
          <div className="flex items-center space-x-4 mt-3 md:mt-0 text-sm">
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">Privacy</a>
            <span className="text-gray-300">•</span>
            <a href="#" className="text-gray-500 hover:text-orange-500 transition-colors duration-300">Terms</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;