import React from 'react';
import { Link } from 'react-router-dom';
import { 
  BookOpen, Users, Calendar, TrendingUp, MessageSquare, 
  CheckCircle, DollarSign, BarChart, Settings, ArrowRight
} from 'lucide-react';

export function Landing() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white border-b fixed w-full z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <BookOpen className="h-8 w-8 text-indigo-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">TuitionManager</span>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-gray-500 hover:text-gray-900">Features</a>
              <a href="#how-it-works" className="text-gray-500 hover:text-gray-900">How It Works</a>
              <a href="#pricing" className="text-gray-500 hover:text-gray-900">Pricing</a>
              <a href="#about" className="text-gray-500 hover:text-gray-900">About</a>
              <Link
                to="/login"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-white pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <h1>
                <span className="block text-sm font-semibold uppercase tracking-wide text-indigo-600">
                  Introducing TuitionManager
                </span>
                <span className="mt-1 block text-4xl tracking-tight font-extrabold sm:text-5xl xl:text-6xl">
                  <span className="block text-gray-900">Simplify Your</span>
                  <span className="block text-indigo-600">Tuition Management</span>
                </span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-xl lg:text-lg xl:text-xl">
                Efficiently manage student enrollments, payments, and schedules all in one place. The complete solution for modern educators.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left">
                <Link
                  to="/register"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700"
                >
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-lg shadow-lg lg:max-w-md">
                <img
                  className="w-full rounded-lg"
                  src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1471&q=80"
                  alt="Dashboard preview"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div id="features" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Our Tuition Management App?
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Everything you need to manage your teaching business effectively
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <Calendar className="w-8 h-8 text-indigo-600" />
                <div className="space-y-2">
                  <p className="text-slate-800 font-semibold">Smart Scheduling</p>
                  <p className="text-slate-600 text-sm">Organize classes and track attendance effortlessly</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <DollarSign className="w-8 h-8 text-indigo-600" />
                <div className="space-y-2">
                  <p className="text-slate-800 font-semibold">Payment Tracking</p>
                  <p className="text-slate-600 text-sm">Manage payments and generate invoices automatically</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <Users className="w-8 h-8 text-indigo-600" />
                <div className="space-y-2">
                  <p className="text-slate-800 font-semibold">Student Management</p>
                  <p className="text-slate-600 text-sm">Track progress and manage enrollments easily</p>
                </div>
              </div>
            </div>

            <div className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-600 to-blue-600 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
              <div className="relative px-7 py-6 bg-white ring-1 ring-gray-900/5 rounded-lg leading-none flex items-top justify-start space-x-6">
                <BarChart className="w-8 h-8 text-indigo-600" />
                <div className="space-y-2">
                  <p className="text-slate-800 font-semibold">Analytics & Reports</p>
                  <p className="text-slate-600 text-sm">Gain insights with detailed performance reports</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <div id="how-it-works" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">How It Works</h2>
            <p className="mt-4 text-xl text-gray-500">Get started in just a few simple steps</p>
          </div>

          <div className="mt-20">
            <div className="relative">
              <div className="absolute inset-0 flex items-center" aria-hidden="true">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-between">
                {[
                  { icon: Users, title: 'Add Students', description: 'Enter student details and create profiles' },
                  { icon: Calendar, title: 'Schedule Classes', description: 'Organize your teaching schedule' },
                  { icon: DollarSign, title: 'Track Payments', description: 'Manage fees and generate invoices' },
                  { icon: BarChart, title: 'Monitor Progress', description: 'Track performance and generate reports' }
                ].map((step, index) => (
                  <div key={index} className="bg-white px-4">
                    <div className="relative flex flex-col items-center">
                      <div className="rounded-full border-2 border-indigo-600 bg-white p-4">
                        <step.icon className="h-6 w-6 text-indigo-600" />
                      </div>
                      <h3 className="mt-6 text-lg font-medium text-gray-900">{step.title}</h3>
                      <p className="mt-2 text-sm text-gray-500">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Pricing Section */}
      <div id="pricing" className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Flexible Pricing Plans
            </h2>
            <p className="mt-4 text-xl text-gray-500">
              Choose the perfect plan for your needs
            </p>
          </div>

          <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {/* Free Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Free</h3>
                <p className="mt-4 text-gray-500">Perfect for getting started</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$0</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Up to 5 students</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Basic scheduling</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Simple reports</p>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="mt-8 block w-full bg-gray-800 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-gray-900"
                >
                  Get Started
                </Link>
              </div>
            </div>

            {/* Pro Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden border-2 border-indigo-600">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Pro</h3>
                <p className="mt-4 text-gray-500">Perfect for growing tutors</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">$29</span>
                  <span className="text-base font-medium text-gray-500">/month</span>
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Unlimited students</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Advanced scheduling</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Detailed analytics</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Payment processing</p>
                  </li>
                </ul>
                <Link
                  to="/register"
                  className="mt-8 block w-full bg-indigo-600 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-indigo-700"
                >
                  Start Free Trial
                </Link>
              </div>
            </div>

            {/* Enterprise Plan */}
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="px-6 py-8">
                <h3 className="text-2xl font-bold text-gray-900">Enterprise</h3>
                <p className="mt-4 text-gray-500">For large institutions</p>
                <p className="mt-8">
                  <span className="text-4xl font-extrabold text-gray-900">Custom</span>
                </p>
              </div>
              <div className="px-6 pt-6 pb-8">
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Custom integration</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">Dedicated support</p>
                  </li>
                  <li className="flex items-start">
                    <CheckCircle className="flex-shrink-0 h-6 w-6 text-green-500" />
                    <p className="ml-3 text-base text-gray-700">SLA guarantee</p>
                  </li>
                </ul>
                <a
                  href="mailto:contact@tuitionmanager.com"
                  className="mt-8 block w-full bg-gray-800 text-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white hover:bg-gray-900"
                >
                  Contact Sales
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div id="about" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center">
            <div>
              <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
                About Our Mission
              </h2>
              <p className="mt-3 max-w-3xl text-lg text-gray-500">
                TuitionManager was built with a simple goal: to help educators focus on teaching by simplifying administrative tasks. Our platform is designed for schools, tutoring centers, and independent instructors who want to manage their teaching business efficiently.
              </p>
              <div className="mt-8 sm:flex">
                <div className="rounded-md shadow">
                  <Link
                    to="/register"
                    className="flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </div>
            <div className="mt-8 grid grid-cols-2 gap-0.5 md:grid-cols-3 lg:mt-0 lg:grid-cols-2">
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <p className="text-center">
                  <span className="block text-2xl font-bold text-indigo-600">1000+</span>
                  <span className="block text-sm text-gray-500">Active Users</span>
                </p>
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <p className="text-center">
                  <span className="block text-2xl font-bold text-indigo-600">50k+</span>
                  <span className="block text-sm text-gray-500">Classes Managed</span>
                </p>
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <p className="text-center">
                  <span className="block text-2xl font-bold text-indigo-600">99%</span>
                  <span className="block text-sm text-gray-500">Satisfaction</span>
                </p>
              </div>
              <div className="col-span-1 flex justify-center py-8 px-8 bg-gray-50">
                <p className="text-center">
                  <span className="block text-2xl font-bold text-indigo-600">24/7</span>
                  <span className="block text-sm text-gray-500">Support</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="bg-gray-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
          <div className="lg:w-0 lg:flex-1">
            <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Stay updated with our newsletter
            </h2>
            <p className="mt-3 max-w-3xl text-lg leading-6 text-gray-300">
              Get the latest updates about new features and teaching tips delivered to your inbox.
            </p>
          </div>
          <div className="mt-8 lg:mt-0 lg:ml-8">
            <form className="sm:flex">
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                placeholder="Enter your email"
              />
              <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                <button
                  type="submit"
                  className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-indigo-500"
                >
                  Subscribe
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
          <div className="xl:grid xl:grid-cols-3 xl:gap-8">
            <div className="space-y-8 xl:col-span-1">
              <div className="flex items-center">
                <BookOpen className="h-8 w-8 text-indigo-600" />
                <span className="ml-2 text-xl font-bold text-gray-900">TuitionManager</span>
              </div>
              <p className="text-gray-500 text-base">
                Making education management simple and efficient for everyone.
              </p>
              <div className="flex space-x-6">
                {/* Add social media links here */}
              </div>
            </div>
            <div className="mt-12 grid grid-cols-2 gap-8 xl:mt-0 xl:col-span-2">
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Product
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#features" className="text-base text-gray-500 hover:text-gray-900">
                        Features
                      </a>
                    </li>
                    <li>
                      <a href="#pricing" className="text-base text-gray-500 hover:text-gray-900">
                        Pricing
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Support
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Help Center
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Contact
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="md:grid md:grid-cols-2 md:gap-8">
                <div>
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Company
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#about" className="text-base text-gray-500 hover:text-gray-900">
                        About
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Blog
                      </a>
                    </li>
                  </ul>
                </div>
                <div className="mt-12 md:mt-0">
                  <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                    Legal
                  </h3>
                  <ul className="mt-4 space-y-4">
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Privacy
                      </a>
                    </li>
                    <li>
                      <a href="#" className="text-base text-gray-500 hover:text-gray-900">
                        Terms
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-200 pt-8">
            <p className="text-base text-gray-400 xl:text-center">
              © 2024 TuitionManager. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}