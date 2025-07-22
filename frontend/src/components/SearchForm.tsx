import React, { useState, useEffect } from 'react';

interface SearchFormProps {
  onSearch: (nationality: string) => void;
  onClear: () => void;
  isLoading: boolean;
}

const SearchForm: React.FC<SearchFormProps> = ({ onSearch, onClear, isLoading }) => {
  const [nationality, setNationality] = useState('');
  const [nationalities, setNationalities] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    fetchNationalities();
  }, []);

  const fetchNationalities = async () => {
    try {
      const response = await fetch('/api/nationalities');
      const data = await response.json();
      setNationalities(data);
    } catch (error) {
      console.error('Error fetching nationalities:', error);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nationality.trim()) {
      onSearch(nationality.trim());
    }
  };

  const handleClear = () => {
    setNationality('');
    onClear();
  };

  const filteredNationalities = nationalities.filter(nat =>
    nat.toLowerCase().includes(nationality.toLowerCase())
  );

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">
        Find Your Work & Holiday Opportunities
      </h2>
      <p className="text-gray-600 mb-6">
        Enter your nationality to discover available work and holiday programs around the world.
      </p>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <label htmlFor="nationality" className="block text-sm font-medium text-gray-700 mb-2">
            Your Nationality
          </label>
          <input
            type="text"
            id="nationality"
            value={nationality}
            onChange={(e) => setNationality(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
            placeholder="e.g., United States, Canada, Australia..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={isLoading}
          />
          
          {showSuggestions && nationality && filteredNationalities.length > 0 && (
            <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
              {filteredNationalities.map((nat, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-4 py-2 text-left hover:bg-gray-100 focus:bg-gray-100"
                  onClick={() => {
                    setNationality(nat);
                    setShowSuggestions(false);
                  }}
                >
                  {nat}
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!nationality.trim() || isLoading}
            className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? 'Searching...' : 'Search Programs'}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
