import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, FileText, Users, Building, User } from 'lucide-react';

function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { path: '/payslip', label: 'Payslip', icon: <FileText className="w-4 h-4" /> },
    { path: '/employee', label: 'Employee', icon: <Users className="w-4 h-4" /> },
    { path: '/department', label: 'Department', icon: <Building className="w-4 h-4" /> },
    { path: '/user/4565', label: 'User', icon: <User className="w-4 h-4" /> },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      scrolled 
        ? 'bg-white shadow-lg' 
        : 'bg-gradient-to-r from-emerald-600 via-teal-600 to-sky-600'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <span className={`text-2xl font-bold transition-colors duration-300 ${
              scrolled ? 'text-emerald-600' : 'text-white'
            }`}>
              College Payslip
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center px-4 py-2 rounded-md text-sm font-medium
                  transition-all duration-200 mx-1
                  ${scrolled
                    ? isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                    : isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className={`p-2 rounded-md focus:outline-none transition-colors duration-200 ${
                scrolled ? 'text-emerald-600' : 'text-white'
              }`}
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className={`
          md:hidden 
          transition-all duration-300 ease-in-out
          ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
          overflow-hidden
        `}>
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navItems.map((item) => (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={({ isActive }) => `
                  flex items-center px-3 py-2 rounded-md text-base font-medium
                  transition-all duration-200
                  ${scrolled
                    ? isActive
                      ? 'bg-emerald-50 text-emerald-600'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-emerald-600'
                    : isActive
                      ? 'bg-white/10 text-white'
                      : 'text-white/90 hover:bg-white/10'
                  }
                `}
              >
                <span className="mr-2">{item.icon}</span>
                {item.label}
              </NavLink>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;