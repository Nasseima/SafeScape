import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, X, ChevronDown, User, LogOut, Heart, MessageSquare, BookOpen } from 'lucide-react';

const Navbar = ({ isAuthenticated, setIsAuthenticated, username }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const handleResize = () => setIsOpen(false);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    navigate('/');
  };

  const navLinks = [
    { name: 'Flight', path: '/flight' },
    { name: 'Calendar', path: '/calendar' },
  ];

  const serviceLinks = [
    { name: 'Places', path: '/places' },
    { name: 'Activities', path: '/activities' },
    { name: 'Hotels', path: '/hotels' },
    { name: 'Laws', path: '/laws' },
  ];

  const resourceLinks = [
    { name: 'Safety Tips', path: '/safety' },
    { name: 'Contact Us', path: '/contact' }
  ];

  return (
    <>
      <nav className="bg-blue-600 text-white fixed top-0 left-0 right-0 z-50 shadow-md">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center py-4">
            <Link to="/" className="text-2xl font-bold">
              SafeScape
            </Link>
            {isAuthenticated && (
              <div className="hidden md:flex items-center justify-center flex-grow">
                <div className="flex items-center text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-6 py-3 rounded-full shadow-md border-2 border-white">
                  <User className="mr-3 h-6 w-6" />
                  <span>Welcome, {username}</span>
                </div>
              </div>
            )}
            <div className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link key={link.name} to={link.path} className="hover:text-blue-200 transition-colors">
                  {link.name}
                </Link>
              ))}
              <div className="relative group">
                <button className="flex items-center hover:text-blue-200 transition-colors">
                  Services <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {serviceLinks.map((service) => (
                    <Link key={service.name} to={service.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {service.name}
                    </Link>
                  ))}
                </div>
              </div>
              <div className="relative group">
                <button className="flex items-center hover:text-blue-200 transition-colors">
                  Resources <ChevronDown className="ml-1 h-4 w-4" />
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                  {resourceLinks.map((resource) => (
                    <Link key={resource.name} to={resource.path} className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
                      {resource.name}
                    </Link>
                  ))}
                </div>
              </div>
              {isAuthenticated ? (
                <UserMenu username={username} handleLogout={handleLogout} />
              ) : (
                <div className="flex items-center space-x-4">
                  <Link to="/login" className="hover:text-blue-200 transition-colors">
                    Login
                  </Link>
                  <Link to="/register" className="bg-white text-blue-600 px-4 py-2 rounded-md hover:bg-blue-50 transition-colors">
                    Register
                  </Link>
                </div>
              )}
            </div>
            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-white">
              {isOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </nav>
      {isOpen && (
        <div className="fixed inset-0 z-40 bg-blue-600 md:hidden">
          <div className="flex flex-col h-full pt-16 px-4 overflow-y-auto">
            {isAuthenticated && (
              <div className="py-3 text-xl font-bold bg-gradient-to-r from-yellow-400 to-orange-500 text-blue-900 px-4 rounded-full mb-4">
                <User className="inline-block mr-3 h-6 w-6" />
                Welcome, {username}
              </div>
            )}
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                to={link.path} 
                className="py-2 text-white hover:text-blue-200 transition-colors"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </Link>
            ))}
            <div className="py-2">
              <button
                onClick={() => setServicesOpen(!servicesOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-colors"
              >
                Services <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {servicesOpen && (
                <div className="pl-4 mt-2">
                  {serviceLinks.map((service) => (
                    <Link 
                      key={service.name} 
                      to={service.path} 
                      className="block py-2 text-white hover:text-blue-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {service.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <div className="py-2">
              <button
                onClick={() => setResourcesOpen(!resourcesOpen)}
                className="flex items-center text-white hover:text-blue-200 transition-colors"
              >
                Resources <ChevronDown className="ml-1 h-4 w-4" />
              </button>
              {resourcesOpen && (
                <div className="pl-4 mt-2">
                  {resourceLinks.map((resource) => (
                    <Link 
                      key={resource.name} 
                      to={resource.path} 
                      className="block py-2 text-white hover:text-blue-200 transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      {resource.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            {isAuthenticated ? (
              <>
                <Link 
                  to="/favorites" 
                  className="py-2 text-white hover:text-blue-200 transition-colors flex items-center"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="mr-2 h-4 w-4" /> Favorites
                </Link>
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsOpen(false);
                  }} 
                  className="py-2 text-white hover:text-blue-200 transition-colors text-left flex items-center"
                >
                  <LogOut className="mr-2 h-4 w-4" /> Logout
                </button>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="py-2 text-white hover:text-blue-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="py-2 text-white hover:text-blue-200 transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      )}
      <div className="h-20"></div>
    </>
  );
};

const UserMenu = ({ username, handleLogout }) => {
  return (
    <div className="relative group">
      <button className="flex items-center hover:text-blue-200 transition-colors">
        <User className="mr-2 h-4 w-4" /> {username} <ChevronDown className="ml-1 h-4 w-4" />
      </button>
      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
        <Link 
          to="/favorites" 
          className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
        >
          <Heart className="mr-2 h-4 w-4" /> Favorites
        </Link>
        <button onClick={handleLogout} className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600">
          <LogOut className="mr-2 h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;