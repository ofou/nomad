import React from 'react';
import { WorkHolidayProgram } from '../types';

interface ProgramCardProps {
  program: WorkHolidayProgram;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  const getCountryFlag = (country: string): string => {
    const flagMap: { [key: string]: string } = {
      'Australia': '🇦🇺',
      'New Zealand': '🇳🇿',
      'Canada': '🇨🇦',
      'Japan': '🇯🇵',
      'South Korea': '🇰🇷',
      'United Kingdom': '🇬🇧',
      'Ireland': '🇮🇪',
      'France': '🇫🇷',
      'Germany': '🇩🇪',
      'Netherlands': '🇳🇱',
      'Belgium': '🇧🇪',
      'Denmark': '🇩🇰',
      'Sweden': '🇸🇪',
      'Norway': '🇳🇴',
      'Finland': '🇫🇮',
      'Austria': '🇦🇹',
      'Italy': '🇮🇹',
      'Spain': '🇪🇸',
      'Portugal': '🇵🇹',
      'Czech Republic': '🇨🇿',
      'Poland': '🇵🇱',
      'Hungary': '🇭🇺',
      'Estonia': '🇪🇪',
      'Latvia': '🇱🇻',
      'Lithuania': '🇱🇹',
      'Slovakia': '🇸🇰',
      'Slovenia': '🇸🇮',
      'Malta': '🇲🇹',
      'Cyprus': '🇨🇾',
      'Chile': '🇨🇱',
      'Argentina': '🇦🇷',
      'Brazil': '🇧🇷',
      'Uruguay': '🇺🇾',
      'Hong Kong': '🇭🇰',
      'Taiwan': '🇹🇼',
      'Singapore': '🇸🇬',
      'Malaysia': '🇲🇾',
      'Thailand': '🇹🇭',
      'Philippines': '🇵🇭',
      'China': '🇨🇳',
      'Israel': '🇮🇱',
      'Turkey': '🇹🇷',
      'United States': '🇺🇸',
      'Mexico': '🇲🇽',
      'Peru': '🇵🇪',
      'Costa Rica': '🇨🇷',
      'Ukraine': '🇺🇦',
      'Croatia': '🇭🇷',
      'Greece': '🇬🇷',
      'Switzerland': '🇨🇭',
      'Luxembourg': '🇱🇺',
      'Iceland': '🇮🇸'
    };
    return flagMap[country] || '🌍';
  };

  const handleLearnMore = () => {
    if (program.website) {
      window.open(program.website, '_blank', 'noopener,noreferrer');
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
      {/* Header */}
      <div className="p-6 border-b border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">{getCountryFlag(program.country)}</span>
            <div>
              <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                {program.country}
              </h3>
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                {program.duration}
              </span>
            </div>
          </div>
        </div>
        <h4 className="font-medium text-gray-900 mb-2">{program.title}</h4>
        <p className="text-sm text-gray-600 line-clamp-3">{program.description}</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        {/* Age Limit */}
        {program.ageLimit && (
          <div className="flex items-center space-x-2">
            <span className="text-primary-500">👤</span>
            <span className="text-sm text-gray-600">
              <strong>Age Limit:</strong> {program.ageLimit}
            </span>
          </div>
        )}

        {/* Requirements */}
        <div>
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-primary-500">📋</span>
            <span className="text-sm font-medium text-gray-900">Requirements:</span>
          </div>
          <ul className="text-sm text-gray-600 space-y-1 ml-6">
            {program.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-gray-400 mr-2">•</span>
                <span>{req}</span>
              </li>
            ))}
            {program.requirements.length > 3 && (
              <li className="text-gray-400 italic">
                +{program.requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>

        {/* Eligible Countries */}
        {program.eligibleCountries && program.eligibleCountries.length > 0 && (
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <span className="text-primary-500">🌍</span>
              <span className="text-sm font-medium text-gray-900">Eligible Countries:</span>
            </div>
            <div className="text-sm text-gray-600">
              {program.eligibleCountries.slice(0, 5).join(', ')}
              {program.eligibleCountries.length > 5 && (
                <span className="text-gray-400 italic">
                  {' '}+{program.eligibleCountries.length - 5} more
                </span>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Footer */}
      <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
        <div className="flex items-center justify-between">
          <span className="text-xs text-gray-400">
            Added {new Date(program.createdAt).toLocaleDateString()}
          </span>
          {program.website && (
            <button
              onClick={handleLearnMore}
              className="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-primary-700 bg-primary-100 hover:bg-primary-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500 transition-colors duration-200"
            >
              Learn More
              <span className="ml-1">→</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;