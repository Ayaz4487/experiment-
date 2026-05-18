import React from 'react';
import { subjects } from '../data/questions';

const QuestionArea = ({ question, activeSubjectId, currentIndex, selectedOption, onOptionSelect }) => {
  const activeSubject = subjects.find((s) => s.id === activeSubjectId);

  if (!question) return <div className="p-6">Loading question...</div>;

  return (
    <div className="flex-1 flex flex-col bg-white overflow-y-auto relative">
      <div className="sticky top-0 bg-slate-50 border-b border-gray-200 px-6 py-4 flex justify-between items-center z-10 shadow-sm">
        <div>
          <h2 className="text-lg font-bold text-slate-800">{activeSubject?.name}</h2>
          <p className="text-sm font-semibold text-slate-600 mt-1">
            Question {currentIndex + 1} of 50
          </p>
        </div>
        <div className="bg-slate-200 px-4 py-2 rounded text-sm font-bold text-slate-700 shadow-inner">
          Marking Scheme: <span className="text-green-600">Correct +5</span> | <span className="text-red-600">Incorrect -1</span>
        </div>
      </div>

      <div className="p-8">
        <div className="text-lg font-medium text-slate-800 mb-8 leading-relaxed">
          {question.text}
        </div>

        <div className="space-y-4">
          {question.options.map((option, index) => (
            <label
              key={index}
              className={`flex items-start p-4 border rounded-lg cursor-pointer transition-all ${
                selectedOption === index
                  ? 'border-blue-500 bg-blue-50 shadow-md ring-1 ring-blue-500'
                  : 'border-gray-300 hover:bg-gray-50 hover:border-gray-400'
              }`}
            >
              <div className="flex items-center h-6">
                <input
                  type="radio"
                  name={`question-${question.id}`}
                  className="w-5 h-5 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 cursor-pointer"
                  checked={selectedOption === index}
                  onChange={() => onOptionSelect(index)}
                />
              </div>
              <div className="ml-4 text-base text-gray-700">
                <span className="font-bold mr-2">[{String.fromCharCode(65 + index)}]</span>
                {option}
              </div>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default QuestionArea;
