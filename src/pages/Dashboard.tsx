import React, { useState, useMemo } from 'react';
import { useApp } from '../contexts/AppContext';
import PhoneCard from '../components/UI/PhoneCard';
import SearchFilter from '../components/UI/SearchFilter';
import { BarChart3, TrendingUp, MapPin, Users, Bell, Smartphone } from 'lucide-react';
import { format } from 'date-fns';

export default function Dashboard() {
  const { state } = useApp();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedType, setSelectedType] = useState<'all' | 'lost' | 'found'>('all');
  const [selectedBrand, setSelectedBrand] = useState('All Brands');
  const [selectedStatus, setSelectedStatus] = useState('All Status');

  // Filter phones based on search criteria
  const filteredPhones = useMemo(() => {
    return state.phones.filter(phone => {
      const matchesSearch = !searchTerm || 
        phone.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        phone.location.address.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesType = selectedType === 'all' || phone.type === selectedType;
      const matchesBrand = selectedBrand === 'All Brands' || phone.brand === selectedBrand;
      const matchesStatus = selectedStatus === 'All Status' || phone.status === selectedStatus;

      return matchesSearch && matchesType && matchesBrand && matchesStatus;
    });
  }, [state.phones, searchTerm, selectedType, selectedBrand, selectedStatus]);

  // Statistics
  const stats = {
    totalReports: state.phones.length,
    activeReports: state.phones.filter(p => p.status === 'active').length,
    matchedReports: state.phones.filter(p => p.status === 'matched').length,
    resolvedReports: state.phones.filter(p => p.status === 'resolved').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Track lost and found phones in real-time. Stay connected with our community.
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {[
            { 
              label: 'Total Reports', 
              value: stats.totalReports, 
              icon: BarChart3, 
              color: 'text-blue-600 bg-blue-50',
              change: '+12%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Active Cases', 
              value: stats.activeReports, 
              icon: Bell, 
              color: 'text-orange-600 bg-orange-50',
              change: '+5%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Matches Found', 
              value: stats.matchedReports, 
              icon: TrendingUp, 
              color: 'text-emerald-600 bg-emerald-50',
              change: '+23%',
              changeColor: 'text-green-600'
            },
            { 
              label: 'Resolved', 
              value: stats.resolvedReports, 
              icon: Users, 
              color: 'text-purple-600 bg-purple-50',
              change: '+18%',
              changeColor: 'text-green-600'
            },
          ].map((stat, index) => (
            <div key={index} className="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
                <div className={`text-sm font-medium ${stat.changeColor}`}>
                  {stat.change}
                </div>
              </div>
              <div className="text-2xl font-bold text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Search and Filters */}
        <SearchFilter
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedType={selectedType}
          onTypeChange={setSelectedType}
          selectedBrand={selectedBrand}
          onBrandChange={setSelectedBrand}
          selectedStatus={selectedStatus}
          onStatusChange={setSelectedStatus}
        />

        {/* Results Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Reports ({filteredPhones.length})
            </h2>
            {selectedType !== 'all' && (
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                {selectedType === 'lost' ? 'Lost Phones' : 'Found Phones'}
              </span>
            )}
          </div>
          <div className="text-sm text-gray-500">
            Last updated: {format(new Date(), 'MMM dd, HH:mm')}
          </div>
        </div>

        {/* Phone Grid */}
        {filteredPhones.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredPhones.map((phone) => (
              <PhoneCard
                key={phone.id}
                phone={phone}
                onClick={() => {
                  // Navigate to phone details
                  console.log('Navigate to phone details:', phone.id);
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Smartphone className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No phones found</h3>
            <p className="text-gray-500 mb-6">
              {searchTerm || selectedType !== 'all' || selectedBrand !== 'All Brands' || selectedStatus !== 'All Status'
                ? 'Try adjusting your search criteria'
                : 'Be the first to report a lost or found phone'
              }
            </p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedType('all');
                setSelectedBrand('All Brands');
                setSelectedStatus('All Status');
              }}
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}