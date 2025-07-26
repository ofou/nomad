import React, { useState, useEffect } from 'react';
import { SearchFilters } from '../types';

interface SearchFormProps {
  onSearch: (filters: SearchFilters) => void;
  initialFilters: SearchFilters;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, initialFilters }) => {
  const [searchQuery, setSearchQuery] = useState(initialFilters.search || '');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search to avoid too many API calls
  useEffect(() => {
    const delayedSearch = setTimeout(() => {
      setIsSearching(true);
      onSearch({ search: searchQuery });
      setTimeout(() => setIsSearching(false), 200);
    }, 300);

    return () => clearTimeout(delayedSearch);
  }, [searchQuery, onSearch]);

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch({ search: searchQuery });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-gray-900 mb-2">
          🔍 Find Your Perfect Work & Holiday Program
        </h2>
        <p className="text-sm text-gray-600">
          Search by country, program name, or requirements
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              {isSearching ? (
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600"></div>
              ) : (
                <svg
                  className="h-4 w-4 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              )}
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-lg leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-primary-500 focus:border-transparent text-sm"
              placeholder="Search for countries, programs, or requirements..."
            />
            {searchQuery && (
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                <button
                  type="button"
                  onClick={handleClearSearch}
                  className="text-gray-400 hover:text-gray-600 focus:outline-none focus:text-gray-600 transition-colors duration-200"
                >
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Quick Filters */}
        <div className="flex flex-wrap gap-2">
          <span className="text-xs font-medium text-gray-500 self-center">Quick filters:</span>
          {['Australia', 'Canada', 'Japan', 'New Zealand', 'Europe'].map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setSearchQuery(filter)}
              className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-700 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Search Stats */}
        {searchQuery && (
          <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-100">
            <span>Searching for: "{searchQuery}"</span>
            <span className="flex items-center">
              {isSearching && (
                <>
                  <div className="animate-pulse h-2 w-2 bg-primary-400 rounded-full mr-1"></div>
                  Searching...
                </>
              )}
            </span>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchForm;