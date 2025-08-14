import React from 'react';
import { MapPin, Clock, DollarSign, AlertTriangle, CheckCircle } from 'lucide-react';
import { Phone } from '../../types';
import { format } from 'date-fns';

interface PhoneCardProps {
  phone: Phone;
  onClick?: () => void;
  showActions?: boolean;
}

export default function PhoneCard({ phone, onClick, showActions = true }: PhoneCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-emerald-600 bg-emerald-50';
      case 'matched': return 'text-blue-600 bg-blue-50';
      case 'resolved': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'lost' ? 'text-red-600 bg-red-50' : 'text-emerald-600 bg-emerald-50';
  };

  return (
    <div 
      className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-all duration-200 cursor-pointer group"
      onClick={onClick}
    >
      {/* Image */}
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={phone.images[0] || 'https://images.pexels.com/photos/699122/pexels-photo-699122.jpeg?auto=compress&cs=tinysrgb&w=400'}
          alt={`${phone.brand} ${phone.model}`}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-4">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="font-semibold text-gray-900 mb-1">
              {phone.brand} {phone.model}
            </h3>
            <div className="flex items-center space-x-2 mb-2">
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(phone.type)}`}>
                {phone.type === 'lost' ? '🔍 Lost' : '📱 Found'}
              </span>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(phone.status)}`}>
                {phone.status}
              </span>
            </div>
          </div>
          {phone.reward && (
            <div className="flex items-center space-x-1 text-orange-600 bg-orange-50 px-2 py-1 rounded-full">
              <DollarSign className="h-3 w-3" />
              <span className="text-xs font-medium">${phone.reward}</span>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
            <span className="font-medium">Color:</span>
            <span>{phone.color}</span>
          </div>
          
          <div className="flex items-start space-x-2 text-sm text-gray-600">
            <MapPin className="h-4 w-4 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-1">{phone.location.address}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Clock className="h-4 w-4 flex-shrink-0" />
            <span>{format(phone.reportedAt, 'MMM dd, yyyy HH:mm')}</span>
          </div>

          {phone.condition && (
            <div className="flex items-center space-x-2 text-sm">
              <AlertTriangle className="h-4 w-4 text-yellow-500" />
              <span className="text-gray-600">Condition: {phone.condition}</span>
            </div>
          )}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">
          {phone.description}
        </p>

        {/* Actions */}
        {showActions && (
          <div className="flex items-center justify-between pt-3 border-t border-gray-100">
            <div className="flex items-center space-x-2 text-sm text-gray-500">
              <CheckCircle className="h-4 w-4" />
              <span>Verified Report</span>
            </div>
            <button className="text-blue-600 hover:text-blue-700 font-medium text-sm transition-colors">
              View Details →
            </button>
          </div>
        )}
      </div>
    </div>
  );
}