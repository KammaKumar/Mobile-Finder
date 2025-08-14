import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { MapPin, Camera, DollarSign, Smartphone, AlertTriangle } from 'lucide-react';
import toast from 'react-hot-toast';
import { Phone } from '../types';

export default function ReportLost() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    imei: '',
    description: '',
    lastSeenLocation: '',
    reward: '',
    hasCase: false,
    caseDescription: '',
    contactPreference: 'app',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new lost phone report
    const newPhone: Phone = {
      id: Date.now().toString(),
      type: 'lost',
      brand: formData.brand,
      model: formData.model,
      color: formData.color,
      imei: formData.imei,
      description: formData.description,
      location: {
        lat: 40.7589 + (Math.random() - 0.5) * 0.01,
        lng: -73.9851 + (Math.random() - 0.5) * 0.01,
        address: formData.lastSeenLocation || 'New York, NY',
      },
      images: ['https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=400'],
      reportedAt: new Date(),
      status: 'active',
      reportedBy: '1',
      reward: formData.reward ? parseInt(formData.reward) : undefined,
      lastSeen: new Date(),
    };

    dispatch({ type: 'ADD_PHONE', payload: newPhone });
    toast.success('Lost phone reported successfully! We\'ll notify you of any matches.');
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const commonBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'Oppo'];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
            <AlertTriangle className="h-8 w-8 text-red-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Lost Phone</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Provide detailed information about your lost phone to help our community find it quickly. 
            The more details you provide, the better our AI matching system works.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Device Information */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <Smartphone className="h-6 w-6 text-blue-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Device Information</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Brand *
                </label>
                <select
                  name="brand"
                  value={formData.brand}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  <option value="">Select brand</option>
                  {commonBrands.map(brand => (
                    <option key={brand} value={brand}>{brand}</option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Model *
                </label>
                <input
                  type="text"
                  name="model"
                  value={formData.model}
                  onChange={handleInputChange}
                  placeholder="e.g., iPhone 14 Pro, Galaxy S23"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Color *
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  placeholder="e.g., Space Black, Deep Purple"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  IMEI Number
                </label>
                <input
                  type="text"
                  name="imei"
                  value={formData.imei}
                  onChange={handleInputChange}
                  placeholder="15-digit IMEI (optional but recommended)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 mt-1">
                  Find it in Settings {'>'}  About Phone or dial *#06#
                </p>
              </div>
            </div>

            <div className="mt-6">
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="checkbox"
                  id="hasCase"
                  name="hasCase"
                  checked={formData.hasCase}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                />
                <label htmlFor="hasCase" className="text-sm font-medium text-gray-700">
                  Phone has a case or cover
                </label>
              </div>
              
              {formData.hasCase && (
                <input
                  type="text"
                  name="caseDescription"
                  value={formData.caseDescription}
                  onChange={handleInputChange}
                  placeholder="Describe the case (color, material, design, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                />
              )}
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <MapPin className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Last Known Location</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address or Area *
              </label>
              <input
                type="text"
                name="lastSeenLocation"
                value={formData.lastSeenLocation}
                onChange={handleInputChange}
                placeholder="e.g., Central Park, Times Square, or specific address"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">
                Be as specific as possible. This helps our community know where to look.
              </p>
            </div>
          </div>

          {/* Additional Details */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <Camera className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Additional Details</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                placeholder="Provide any additional details that would help identify your phone (scratches, stickers, wallpaper, unique features, etc.)"
                required
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>

          {/* Reward Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <DollarSign className="h-6 w-6 text-orange-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Reward (Optional)</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Reward Amount ($)
              </label>
              <input
                type="number"
                name="reward"
                value={formData.reward}
                onChange={handleInputChange}
                placeholder="Enter reward amount"
                min="0"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">
                Offering a reward can increase the chances of recovery. Payment is held in escrow until verification.
              </p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-all font-medium"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all font-semibold shadow-lg"
            >
              Report Lost Phone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}