// src/components/Navbar.jsx
import { navLinksByRole } from '@gurukul/shared-client';
import React from 'react';
import { useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';

const publicLinks = [
  { name: 'Features', href: '#features' },
  { name: 'How it Works', href: '#how-it-works' },
  { name: 'Pricing', href: '#pricing' },
];

const Navbar = () => {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  const links =
    isAuthenticated && navLinksByRole[userRole]
      ? navLinksByRole[userRole]
      : publicLinks;

  return (
    <nav className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <span className="gurukul-logo text-3xl text-gray-900 uppercase">
              Gurukul
            </span>
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {links.map((link) => (
              <NavLink key={link.name} to={link.href} className="nav-link">
                {link.name}
              </NavLink>
            ))}
            {isAuthenticated ? (
              <NavLink
                className="nav-button text-white px-4 py-2 rounded-lg transition-colors"
                to="/founder/create-brand"
              >
                Get Started
              </NavLink>
            ) : (
              <a
                href="/login/founder"
                className="nav-button text-white px-4 py-2 rounded-lg transition-colors bg-primary hover:bg-primary-dark"
              >
                Login
              </a>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
