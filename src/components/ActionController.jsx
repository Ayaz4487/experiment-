import React from 'react';

const ActionController = ({ onClear, onMarkReview, onPrevious, onSaveNext }) => {
  return (
    <div className="bg-slate-100 border-t border-gray-300 p-4 flex justify-between items-center shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.1)] relative z-20">
      <div className="flex gap-4">
        <button
          onClick={onClear}
          className="px-6 py-2 bg-white border border-gray-400 hover:bg-gray-100 text-gray-800 font-semibold rounded shadow-sm transition-colors"
        >
          Clear Response
        </button>
        <button
          onClick={onMarkReview}
          className="px-6 py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded shadow-sm transition-colors"
        >
          Mark for Review & Next
        </button>
      </div>

      <div className="flex gap-4">
        <button
          onClick={onPrevious}
          className="px-6 py-2 bg-white border border-blue-600 hover:bg-blue-50 text-blue-700 font-semibold rounded shadow-sm transition-colors"
        >
          « Previous
        </button>
        <button
          onClick={onSaveNext}
          className="px-8 py-2 bg-green-600 hover:bg-green-700 text-white font-bold rounded shadow-md transition-colors"
        >
          Save & Next »
        </button>
      </div>
    </div>
  );
};

export default ActionController;
