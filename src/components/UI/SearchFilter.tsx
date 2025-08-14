import React from 'react';
import { Search, Filter, MapPin, Smartphone } from 'lucide-react';

interface SearchFilterProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  selectedType: 'all' | 'lost' | 'found';
  onTypeChange: (type: 'all' | 'lost' | 'found') => void;
  selectedBrand: string;
  onBrandChange: (brand: string) => void;
  selectedStatus: string;
  onStatusChange: (status: string) => void;
}

export default function SearchFilter({
  searchTerm,
  onSearchChange,
  selectedType,
  onTypeChange,
  selectedBrand,
  onBrandChange,
  selectedStatus,
  onStatusChange
}: SearchFilterProps) {
  const brands = ['All Brands', 'Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Huawei'];
  const statuses = ['All Status', 'active', 'matched', 'resolved'];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-6">
        {/* Search */}
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search by brand, model, location..."
            className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>

        {/* Filters */}
        <div className="flex flex-wrap items-center space-x-4">
          {/* Type Filter */}
          <div className="flex items-center space-x-2">
            <Filter className="h-4 w-4 text-gray-500" />
            <div className="flex bg-gray-100 rounded-lg p-1">
              {(['all', 'lost', 'found'] as const).map((type) => (
                <button
                  key={type}
                  onClick={() => onTypeChange(type)}
                  className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${
                    selectedType === type
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-blue-600'
                  }`}
                >
                  {type === 'all' ? 'All' : type === 'lost' ? '🔍 Lost' : '📱 Found'}
                </button>
              ))}
            </div>
          </div>

          {/* Brand Filter */}
          <select
            value={selectedBrand}
            onChange={(e) => onBrandChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {brands.map((brand) => (
              <option key={brand} value={brand}>{brand}</option>
            ))}
          </select>

          {/* Status Filter */}
          <select
            value={selectedStatus}
            onChange={(e) => onStatusChange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {statuses.map((status) => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-100">
        <div className="flex items-center space-x-6 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <MapPin className="h-4 w-4" />
            <span>Real-time tracking</span>
          </div>
          <div className="flex items-center space-x-2">
            <Smartphone className="h-4 w-4" />
            <span>AI-powered matching</span>
          </div>
        </div>
        <div className="text-sm text-gray-500">
          <span className="font-medium">24/7</span> Community Support
        </div>
      </div>
    </div>
  );
}