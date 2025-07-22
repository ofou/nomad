import React from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">{program.name}</h3>
          <p className="text-lg text-blue-600 font-semibold">{program.country}</p>
        </div>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded">
          {program.type}
        </span>
      </div>
      
      <div className="space-y-3 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium w-24">Duration:</span>
          <span>{program.duration}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium w-24">Age Limit:</span>
          <span>{program.age_limit}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium w-24">Fee:</span>
          <span>{program.application_fee}</span>
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <span className="font-medium w-24">Processing:</span>
          <span>{program.processing_time}</span>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-4 line-clamp-3">{program.description}</p>
      
      <div className="space-y-2">
        <h4 className="font-semibold text-gray-900 text-sm">Requirements:</h4>
        <ul className="text-xs text-gray-600 space-y-1">
          {program.requirements.slice(0, 3).map((req, index) => (
            <li key={index} className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              {req}
            </li>
          ))}
          {program.requirements.length > 3 && (
            <li className="text-blue-600 text-xs">+{program.requirements.length - 3} more requirements</li>
          )}
        </ul>
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h4 className="font-semibold text-gray-900 text-sm mb-2">Benefits:</h4>
        <div className="flex flex-wrap gap-1">
          {program.benefits.slice(0, 2).map((benefit, index) => (
            <span key={index} className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
              {benefit}
            </span>
          ))}
          {program.benefits.length > 2 && (
            <span className="text-green-600 text-xs">+{program.benefits.length - 2} more benefits</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramCard;
