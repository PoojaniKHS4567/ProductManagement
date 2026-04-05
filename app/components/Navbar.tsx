'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import DarkModeToggle from './DarkModeToggle';
import { useState } from 'react';

const Navbar = () => {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Dashboard' },
    { href: '/products', label: 'Products' },
    { href: '/products/add', label: 'Add Product' },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-blue-600 dark:bg-gray-900/80 border-b border-blue-700 dark:border-gray-800">
      <div className="px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo - ProductMPro exactly as shown in footer */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md group-hover:scale-105 transition-transform">
              <span className="text-blue-600 font-bold text-lg">P</span>
            </div>
            <span className="font-bold text-xl text-white">
              ProductMPro
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`px-4 py-2 rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
            <DarkModeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center space-x-3 md:hidden">
            <DarkModeToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-lg text-white hover:bg-white/10"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-blue-500/50 animate-slide-up">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-4 py-3 rounded-lg transition-all duration-200 ${
                  pathname === link.href
                    ? 'bg-white/20 text-white font-medium'
                    : 'text-blue-100 hover:bg-white/10 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;