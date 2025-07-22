import React from 'react';
import { Program } from '../types';

interface ProgramCardProps {
  program: Program;
}

const ProgramCard: React.FC<ProgramCardProps> = ({ program }) => {
  return (
    <div className="card p-6 animate-fade-in hover:shadow-large group">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors duration-200">
            {program.name}
          </h3>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center">
              <svg className="w-4 h-4 text-primary-600" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-lg text-primary-600 font-semibold">{program.country}</p>
          </div>
        </div>
        <span className="badge badge-primary">
          {program.type}
        </span>
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium">Duration:</span>
            <span className="ml-1">{program.duration}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            <span className="font-medium">Age:</span>
            <span className="ml-1">{program.age_limit}</span>
          </div>
        </div>
        <div className="space-y-3">
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
            </svg>
            <span className="font-medium">Fee:</span>
            <span className="ml-1">{program.application_fee}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <svg className="w-4 h-4 text-gray-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
            <span className="font-medium">Processing:</span>
            <span className="ml-1">{program.processing_time}</span>
          </div>
        </div>
      </div>
      
      <p className="text-gray-700 text-sm mb-6 line-clamp-3 leading-relaxed">
        {program.description}
      </p>
      
      <div className="space-y-4">
        <div>
          <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 text-warning-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            Requirements
          </h4>
          <ul className="text-xs text-gray-600 space-y-2">
            {program.requirements.slice(0, 3).map((req, index) => (
              <li key={index} className="flex items-start">
                <span className="text-warning-500 mr-2 mt-1">•</span>
                <span className="leading-relaxed">{req}</span>
              </li>
            ))}
            {program.requirements.length > 3 && (
              <li className="text-primary-600 text-xs font-medium">
                +{program.requirements.length - 3} more requirements
              </li>
            )}
          </ul>
        </div>
        
        <div className="pt-4 border-t border-gray-100">
          <h4 className="font-semibold text-gray-900 text-sm mb-3 flex items-center">
            <svg className="w-4 h-4 text-success-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414l2.293 2.293a1 1 0 001.414-1.414z" clipRule="evenodd" />
            </svg>
            Benefits
          </h4>
          <div className="flex flex-wrap gap-2">
            {program.benefits.slice(0, 2).map((benefit, index) => (
              <span key={index} className="badge badge-success text-xs">
                {benefit}
              </span>
            ))}
            {program.benefits.length > 2 && (
              <span className="text-success-600 text-xs font-medium">
                +{program.benefits.length - 2} more benefits
              </span>
            )}
          </div>
        </div>
      </div>
      
      <div className="mt-6 pt-4 border-t border-gray-100">
        <button className="w-full btn-primary text-sm">
          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
          </svg>
          Learn More
        </button>
      </div>
    </div>
  );
};

export default ProgramCard;
