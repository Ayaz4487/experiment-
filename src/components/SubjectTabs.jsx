import React from 'react';
import { subjects } from '../data/questions';

const SubjectTabs = ({ activeSubject, onSubjectChange }) => {
  return (
    <div className="flex border-b border-gray-300 bg-gray-50 px-4 pt-2 shadow-sm">
      {subjects.map((subject) => (
        <button
          key={subject.id}
          onClick={() => onSubjectChange(subject.id)}
          className={`px-6 py-3 font-medium text-sm transition-colors border-b-4 ${
            activeSubject === subject.id
              ? 'border-blue-600 text-blue-700 bg-white shadow-[0_-2px_0_0_rgba(37,99,235,1)] rounded-t-md'
              : 'border-transparent text-gray-600 hover:text-blue-600 hover:bg-gray-100'
          }`}
        >
          {subject.name}
        </button>
      ))}
    </div>
  );
};

export default SubjectTabs;
