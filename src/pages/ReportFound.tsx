import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useApp } from '../contexts/AppContext';
import { MapPin, Camera, Smartphone, CheckCircle, Upload } from 'lucide-react';
import toast from 'react-hot-toast';
import { Phone } from '../types';

export default function ReportFound() {
  const navigate = useNavigate();
  const { dispatch } = useApp();
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    color: '',
    description: '',
    foundLocation: '',
    condition: 'good',
    additionalNotes: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create new found phone report
    const newPhone: Phone = {
      id: Date.now().toString(),
      type: 'found',
      brand: formData.brand,
      model: formData.model,
      color: formData.color,
      description: formData.description,
      location: {
        lat: 40.7589 + (Math.random() - 0.5) * 0.01,
        lng: -73.9851 + (Math.random() - 0.5) * 0.01,
        address: formData.foundLocation || 'New York, NY',
      },
      images: ['https://images.pexels.com/photos/1616785/pexels-photo-1616785.jpeg?auto=compress&cs=tinysrgb&w=400'],
      reportedAt: new Date(),
      status: 'active',
      reportedBy: '2',
      condition: formData.condition,
    };

    dispatch({ type: 'ADD_PHONE', payload: newPhone });
    toast.success('Found phone reported successfully! We\'ll help connect you with the owner.');
    navigate('/dashboard');
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const commonBrands = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei', 'Sony', 'Oppo'];
  const conditionOptions = [
    { value: 'excellent', label: 'Excellent - Like new' },
    { value: 'good', label: 'Good - Minor wear' },
    { value: 'fair', label: 'Fair - Noticeable wear' },
    { value: 'damaged', label: 'Damaged - Cracked/broken' },
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-100 rounded-full mb-4">
            <CheckCircle className="h-8 w-8 text-emerald-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Report Found Phone</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Thank you for being a good Samaritan! Help us reunite this phone with its owner by 
            providing as much detail as possible. Your kindness makes a difference.
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
                  Condition *
                </label>
                <select
                  name="condition"
                  value={formData.condition}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                >
                  {conditionOptions.map(option => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Photos Section */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <Camera className="h-6 w-6 text-purple-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Photos</h2>
            </div>
            
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
              <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-lg font-medium text-gray-700 mb-2">Upload Photos of the Found Phone</p>
              <p className="text-gray-500 mb-4">
                Take clear photos of the front, back, and any distinctive features
              </p>
              <button
                type="button"
                className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all font-medium"
              >
                Choose Photos
              </button>
              <p className="text-sm text-gray-400 mt-2">
                Or drag and drop photos here (Max 5 photos, 10MB each)
              </p>
            </div>
            
            {/* Mock uploaded image preview */}
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
                <img
                  src="https://images.pexels.com/photos/1616785/pexels-photo-1616785.jpeg?auto=compress&cs=tinysrgb&w=400"
                  alt="Found phone"
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-2 right-2 bg-emerald-500 text-white rounded-full p-1">
                  <CheckCircle className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <div className="flex items-center mb-6">
              <MapPin className="h-6 w-6 text-emerald-600 mr-3" />
              <h2 className="text-xl font-semibold text-gray-900">Found Location</h2>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Where did you find it? *
              </label>
              <input
                type="text"
                name="foundLocation"
                value={formData.foundLocation}
                onChange={handleInputChange}
                placeholder="e.g., Central Park bench, Coffee shop on 5th Ave, Train station"
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              />
              <p className="text-sm text-gray-500 mt-2">
                Be specific about the location to help the owner identify if it's theirs.
              </p>
            </div>
          </div>

          {/* Description */}
          <div className="bg-white rounded-xl p-8 shadow-sm border border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Additional Details</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder="Describe any distinctive features, case, stickers, or damage you noticed"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Additional Notes
                </label>
                <textarea
                  name="additionalNotes"
                  value={formData.additionalNotes}
                  onChange={handleInputChange}
                  placeholder="Any other information that might help (time found, circumstances, etc.)"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Privacy Notice */}
          <div className="bg-blue-50 rounded-xl p-6 border border-blue-200">
            <h3 className="font-semibold text-blue-900 mb-3">🔒 Your Privacy is Protected</h3>
            <ul className="text-sm text-blue-700 space-y-2">
              <li>• Your contact information will only be shared after owner verification</li>
              <li>• All communications go through our secure, anonymous chat system</li>
              <li>• You can choose to remain anonymous until the exchange</li>
              <li>• Our team moderates all interactions for safety</li>
            </ul>
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
              className="px-8 py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-all font-semibold shadow-lg"
            >
              Report Found Phone
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}