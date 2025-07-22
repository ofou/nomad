import React, { useState } from 'react';
import SearchForm from './components/SearchForm';
import ProgramCard from './components/ProgramCard';
import { Program } from './types';
import './App.css';

function App() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [searchedNationality, setSearchedNationality] = useState<string | null>(null);

  const handleSearch = async (nationality: string) => {
    setIsLoading(true);
    setError(null);
    setSearchedNationality(nationality);

    try {
      const response = await fetch(`/api/programs?nationality=${encodeURIComponent(nationality)}`);
      if (!response.ok) {
        throw new Error('Failed to fetch programs');
      }
      const data = await response.json();
      setPrograms(data);
    } catch (err) {
      setError('Failed to fetch programs. Please try again.');
      console.error('Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setPrograms([]);
    setError(null);
    setSearchedNationality(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      <header className="glass-effect shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary-600 rounded-xl flex items-center justify-center shadow-medium">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gradient">Work & Holiday Platform</h1>
                <p className="text-gray-600">Discover global opportunities</p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500">Powered by</div>
              <div className="text-lg font-semibold text-primary-600">Global Programs</div>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchForm 
          onSearch={handleSearch} 
          onClear={handleClear} 
          isLoading={isLoading} 
        />

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-8 animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-6 w-6 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error</h3>
                <div className="mt-2 text-sm text-red-700">{error}</div>
              </div>
            </div>
          </div>
        )}

        {searchedNationality && !isLoading && !error && (
          <div className="mb-8 animate-fade-in">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Programs for {searchedNationality} Nationals
              </h2>
              <p className="text-gray-600">
                Found {programs.length} available program{programs.length !== 1 ? 's' : ''}
              </p>
            </div>
            
            {programs.length === 0 ? (
              <div className="bg-warning-50 border border-warning-200 rounded-xl p-8 text-center animate-fade-in">
                <div className="w-16 h-16 bg-warning-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="h-8 w-8 text-warning-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-warning-800 mb-2">No programs found</h3>
                <p className="text-warning-700 max-w-md mx-auto">
                  No work and holiday programs were found for {searchedNationality} nationals. 
                  Try searching for a different nationality or check back later for new programs.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {programs.map((program, index) => (
                  <div key={program.id} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
                    <ProgramCard program={program} />
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary-600 mx-auto mb-4"></div>
              <p className="text-gray-600">Searching for programs...</p>
            </div>
          </div>
        )}
      </main>

      <footer className="glass-effect border-t border-white/20 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="text-center">
            <div className="flex justify-center items-center space-x-4 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <span className="text-lg font-semibold text-gray-900">Work & Holiday Platform</span>
            </div>
            <p className="text-gray-500 mb-2">&copy; 2024 All rights reserved.</p>
            <p className="text-sm text-gray-400 max-w-2xl mx-auto">
              This platform provides information about work and holiday programs. 
              Please verify all details with official sources before applying.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
