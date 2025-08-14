import React from 'react';
import { Link } from 'react-router-dom';
import { Smartphone, Search, Shield, Users, MapPin, Bell, DollarSign, CheckCircle } from 'lucide-react';

export default function Home() {
  const stats = [
    { label: 'Phones Recovered', value: '12,450+', icon: Smartphone },
    { label: 'Active Users', value: '50,000+', icon: Users },
    { label: 'Success Rate', value: '94%', icon: CheckCircle },
    { label: 'Average Recovery Time', value: '2.5hrs', icon: Bell },
  ];

  const features = [
    {
      icon: Search,
      title: 'AI-Powered Matching',
      description: 'Advanced image recognition and metadata matching to quickly identify your lost device.',
    },
    {
      icon: Shield,
      title: 'Secure Verification',
      description: 'Multi-factor authentication and biometric verification ensure only you can claim your phone.',
    },
    {
      icon: MapPin,
      title: 'Real-time Tracking',
      description: 'GPS-based location tracking helps pinpoint where your phone was last seen.',
    },
    {
      icon: Users,
      title: 'Community Network',
      description: 'Leverage our community of verified users to increase your chances of recovery.',
    },
    {
      icon: DollarSign,
      title: 'Reward System',
      description: 'Incentivize finders with digital rewards through our secure escrow system.',
    },
    {
      icon: Bell,
      title: 'Instant Alerts',
      description: 'Get notified immediately when someone reports finding a phone matching yours.',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-50 via-white to-emerald-50 pt-16 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 to-emerald-600/5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
                Never Lose Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-emerald-600">
                  Phone Again
                </span>
              </h1>
              <p className="text-xl text-gray-600 mb-8 max-w-2xl">
                Revolutionary lost device recovery through community collaboration, AI matching, 
                and secure verification. Get your phone back in hours, not days.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link
                  to="/report-lost"
                  className="bg-blue-600 text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-700 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  Report Lost Phone
                </Link>
                <Link
                  to="/report-found"
                  className="bg-white text-gray-900 px-8 py-4 rounded-xl font-semibold text-lg border-2 border-gray-200 hover:border-gray-300 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
                >
                  I Found a Phone
                </Link>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-square max-w-md mx-auto relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-emerald-400 rounded-full blur-3xl opacity-30"></div>
                <img
                  src="https://images.pexels.com/photos/788946/pexels-photo-788946.jpeg?auto=compress&cs=tinysrgb&w=600"
                  alt="Smartphone in hand"
                  className="relative z-10 w-full h-full object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-blue-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              How FindMyPhone Works
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our advanced technology and community-driven approach make phone recovery 
              faster, safer, and more reliable than ever before.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white rounded-xl p-8 shadow-sm border border-gray-200 hover:shadow-md transition-all duration-200 hover:-translate-y-1"
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-blue-500 to-emerald-500 rounded-lg mb-6">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              Simple 3-Step Process
            </h2>
            <p className="text-xl text-gray-600">
              Get your phone back in just a few simple steps
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              {
                step: '01',
                title: 'Report Your Lost Phone',
                description: 'Provide device details, last known location, and upload photos. Our AI immediately starts matching.',
                color: 'from-blue-500 to-blue-600'
              },
              {
                step: '02',
                title: 'Community Finds It',
                description: 'Our network of verified users gets notified. When someone finds your phone, they upload photos.',
                color: 'from-emerald-500 to-emerald-600'
              },
              {
                step: '03',
                title: 'Secure Recovery',
                description: 'Verify ownership through our secure system, coordinate with the finder, and get your phone back.',
                color: 'from-orange-500 to-orange-600'
              }
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className={`inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r ${step.color} text-white text-xl font-bold rounded-full mb-6`}>
                  {step.step}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-4">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-emerald-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
            Ready to Protect Your Phone?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of users who trust FindMyPhone to keep their devices safe
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/dashboard"
              className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg hover:bg-blue-50 transition-all duration-200 shadow-lg transform hover:-translate-y-1"
            >
              Get Started Now
            </Link>
            <Link
              to="/dashboard"
              className="bg-transparent text-white px-8 py-4 rounded-xl font-semibold text-lg border-2 border-white hover:bg-white hover:text-blue-600 transition-all duration-200 transform hover:-translate-y-1"
            >
              View Dashboard
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}