import React from 'react';
import { Smartphone, MapPin, Shield, Users } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center space-x-2 mb-4">
              <Smartphone className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">FindMyPhone</span>
            </div>
            <p className="text-gray-300 mb-4 max-w-md">
              Revolutionizing lost device recovery through community collaboration and secure verification. 
              Connect with finders, verify ownership, and get your phone back safely.
            </p>
            <div className="flex space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Users className="h-4 w-4" />
                <span>50K+ Users</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <Shield className="h-4 w-4" />
                <span>99.9% Safe</span>
              </div>
            </div>
          </div>

          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Features</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">Lost Phone Reporting</li>
              <li className="hover:text-white cursor-pointer transition-colors">AI Matching System</li>
              <li className="hover:text-white cursor-pointer transition-colors">Secure Verification</li>
              <li className="hover:text-white cursor-pointer transition-colors">Anonymous Chat</li>
              <li className="hover:text-white cursor-pointer transition-colors">Reward System</li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2 text-gray-300">
              <li className="hover:text-white cursor-pointer transition-colors">Help Center</li>
              <li className="hover:text-white cursor-pointer transition-colors">Safety Guidelines</li>
              <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
              <li className="hover:text-white cursor-pointer transition-colors">Report Fraud</li>
              <li className="hover:text-white cursor-pointer transition-colors">Privacy Policy</li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 flex flex-col sm:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            © 2024 FindMyPhone. All rights reserved.
          </p>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <span className="text-sm text-gray-400">Secure • Verified • Trusted</span>
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-gray-400">System Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}