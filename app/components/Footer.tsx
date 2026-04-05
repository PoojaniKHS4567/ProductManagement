'use client';

import Link from 'next/link';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 text-white">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="py-12 grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center shadow-md">
                <span className="text-blue-600 font-bold text-lg">P</span>
              </div>
              <span className="font-bold text-xl text-white">
                ProductMPro
              </span>
            </div>
            <p className="text-gray-300 text-sm leading-relaxed">
              Manage your product inventory with ease. Track sales, update details, and organize your catalog in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-gray-300 hover:text-white transition-colors text-sm">Dashboard</Link></li>
              <li><Link href="/products" className="text-gray-300 hover:text-white transition-colors text-sm">Products</Link></li>
              <li><Link href="/products/add" className="text-gray-300 hover:text-white transition-colors text-sm">Add Product</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Categories</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Smartphone</li>
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Audio</li>
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Wearables</li>
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Laptops</li>
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Tablets</li>
              <li className="text-gray-300 text-sm hover:text-white transition-colors cursor-pointer">Accessories</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold text-lg mb-4 text-white">Contact</h3>
            <ul className="space-y-2">
              <li className="text-gray-300 text-sm flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span>support@productmpro.com</span>
              </li>
              <li className="text-gray-300 text-sm flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span>+1 (555) 123-4567</span>
              </li>
              <li className="text-gray-300 text-sm flex items-start gap-2">
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm0 18c-4.4 0-8-3.6-8-8s3.6-8 8-8 8 3.6 8 8-3.6 8-8 8zm.5-13H11v6l5.2 3.1.8-1.2-4.5-2.7V7z"/>
                </svg>
                <span>Mon-Fri 9am-6pm</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400 text-sm">
              © {currentYear} ProductMPro. All rights reserved.
            </p>
            <div className="flex space-x-6">
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors text-sm">Support</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;