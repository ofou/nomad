import React, { useState, useEffect } from 'react';
import './App.css';
import { WorkHolidayProgram, SearchFilters } from './types';
import ProgramCard from './components/ProgramCard';
import SearchForm from './components/SearchForm';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001';

function App() {
  const [programs, setPrograms] = useState<WorkHolidayProgram[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchFilters, setSearchFilters] = useState<SearchFilters>({
    search: ''
  });

  useEffect(() => {
    fetchPrograms();
  }, [searchFilters]);

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const searchParams = new URLSearchParams();
      if (searchFilters.search) {
        searchParams.append('search', searchFilters.search);
      }
      
      const response = await fetch(`${API_BASE_URL}/api/programs?${searchParams}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setPrograms(data.programs || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch programs');
      console.error('Error fetching programs:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (filters: SearchFilters) => {
    setSearchFilters(filters);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              🌍 Work & Holiday Platform
            </h1>
            <p className="text-lg text-gray-600">
              Discover amazing work and holiday visa programs worldwide
            </p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search Section */}
        <div className="mb-8">
          <SearchForm onSearch={handleSearch} initialFilters={searchFilters} />
        </div>

        {/* Results Section */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-semibold text-gray-900">
              Available Programs
            </h2>
            <span className="text-sm text-gray-500">
              {loading ? 'Loading...' : `${programs.length} programs found`}
            </span>
          </div>
        </div>

        {/* Error State */}
        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <span className="text-red-500">⚠️</span>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">
                  Error loading programs
                </h3>
                <div className="mt-2 text-sm text-red-700">
                  <p>{error}</p>
                </div>
                <div className="mt-4">
                  <button
                    onClick={fetchPrograms}
                    className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                  >
                    Try Again
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Loading State */}
        {loading && !error && (
          <div className="flex justify-center items-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600"></div>
            <span className="ml-3 text-gray-500">Loading programs...</span>
          </div>
        )}

        {/* Programs Grid */}
        {!loading && !error && (
          <>
            {programs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program) => (
                  <ProgramCard key={program.id} program={program} />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-6xl mb-4">🔍</div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">
                  No programs found
                </h3>
                <p className="text-gray-500">
                  Try adjusting your search criteria to find more programs.
                </p>
              </div>
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center text-gray-500">
            <p>&copy; 2024 Work & Holiday Platform. Helping you live and work from anywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;