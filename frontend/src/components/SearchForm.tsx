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
    <div className="card p-8 mb-8 animate-fade-in">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-bold text-gradient mb-4">
          Find Your Work & Holiday Opportunities
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Enter your nationality to discover available work and holiday programs around the world. 
          Start your adventure today!
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6">
        <div className="relative">
          <label htmlFor="nationality" className="block text-sm font-semibold text-gray-700 mb-3">
            Your Nationality
          </label>
          <div className="relative">
            <input
              type="text"
              id="nationality"
              value={nationality}
              onChange={(e) => setNationality(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              placeholder="e.g., United States, Canada, Australia..."
              className="input-field pr-12"
              disabled={isLoading}
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <svg className="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>
          
          {showSuggestions && nationality && filteredNationalities.length > 0 && (
            <div className="absolute z-20 w-full mt-2 bg-white border border-gray-200 rounded-xl shadow-large max-h-60 overflow-y-auto animate-slide-up">
              {filteredNationalities.map((nat, index) => (
                <button
                  key={index}
                  type="button"
                  className="w-full px-4 py-3 text-left hover:bg-gray-50 focus:bg-primary-50 focus:text-primary-700 transition-colors duration-150 border-b border-gray-100 last:border-b-0"
                  onClick={() => {
                    setNationality(nat);
                    setShowSuggestions(false);
                  }}
                >
                  <div className="flex items-center">
                    <svg className="h-4 w-4 text-primary-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {nat}
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
        
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={!nationality.trim() || isLoading}
            className="btn-primary flex-1"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Searching...
              </div>
            ) : (
              <div className="flex items-center justify-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                Search Programs
              </div>
            )}
          </button>
          
          <button
            type="button"
            onClick={handleClear}
            disabled={isLoading}
            className="btn-secondary"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
