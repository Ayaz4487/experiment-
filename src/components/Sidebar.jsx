import React from 'react';

const Sidebar = ({ questions, currentQuestionIndex, responses, onNavigate }) => {
  // Helpers to determine button styling based on state
  const getStatusStyle = (index) => {
    const response = responses[index];
    if (!response || response.status === 'not-visited') {
      return 'bg-gray-200 text-gray-700 border-gray-300';
    }
    if (response.status === 'visited-not-answered') {
      return 'bg-red-500 text-white border-red-600';
    }
    if (response.status === 'answered') {
      return 'bg-green-500 text-white border-green-600';
    }
    if (response.status === 'marked') {
      return 'bg-purple-600 text-white border-purple-700';
    }
    if (response.status === 'answered-marked') {
      return 'bg-purple-600 text-white border-purple-700 relative'; // Requires a green dot indicator
    }
    return 'bg-gray-200 text-gray-700 border-gray-300';
  };

  // Calculate counts for the legend
  const counts = {
    notVisited: 0,
    notAnswered: 0,
    answered: 0,
    marked: 0,
    answeredMarked: 0
  };

  responses.forEach((res) => {
    if (!res || res.status === 'not-visited') counts.notVisited++;
    else if (res.status === 'visited-not-answered') counts.notAnswered++;
    else if (res.status === 'answered') counts.answered++;
    else if (res.status === 'marked') counts.marked++;
    else if (res.status === 'answered-marked') counts.answeredMarked++;
  });

  return (
    <div className="w-80 bg-white border-l border-gray-300 flex flex-col shadow-lg z-20">
      {/* Candidate Info */}
      <div className="p-4 border-b border-gray-200 bg-slate-50 flex items-center">
        <div className="w-16 h-16 bg-gray-300 rounded-md overflow-hidden flex-shrink-0 border border-gray-400">
          <img
            src="https://via.placeholder.com/150"
            alt="Candidate"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="ml-4">
          <p className="font-bold text-slate-800">John Doe</p>
          <p className="text-sm text-slate-600">Roll No: 2026CUET001</p>
        </div>
      </div>

      {/* Legend */}
      <div className="p-4 border-b border-gray-200 grid grid-cols-2 gap-2 text-xs">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-gray-200 text-gray-700 font-bold">{counts.notVisited}</div>
          <span className="leading-tight">Not Visited</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-red-500 text-white font-bold">{counts.notAnswered}</div>
          <span className="leading-tight">Not Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-green-500 text-white font-bold">{counts.answered}</div>
          <span className="leading-tight">Answered</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-600 text-white font-bold">{counts.marked}</div>
          <span className="leading-tight">Marked for Review</span>
        </div>
        <div className="flex items-center gap-2 col-span-2">
          <div className="w-6 h-6 rounded flex items-center justify-center bg-purple-600 text-white font-bold relative">
            {counts.answeredMarked}
            <span className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white translate-x-1 translate-y-1"></span>
          </div>
          <span className="leading-tight">Answered & Marked for Review (will be considered for evaluation)</span>
        </div>
      </div>

      {/* Status Grid */}
      <div className="p-4 flex-1 overflow-y-auto bg-slate-50">
        <h3 className="font-bold text-slate-700 mb-3">Question Palette:</h3>
        <div className="grid grid-cols-5 gap-2">
          {questions.map((q, index) => {
            const isCurrent = index === currentQuestionIndex;
            const resStatus = responses[index]?.status;

            return (
              <button
                key={q.id}
                onClick={() => onNavigate(index)}
                className={`
                  w-10 h-10 rounded font-bold text-sm flex items-center justify-center border-2 transition-all
                  ${getStatusStyle(index)}
                  ${isCurrent ? 'ring-2 ring-blue-500 scale-110 shadow-md' : 'hover:opacity-80'}
                `}
              >
                {index + 1}
                {resStatus === 'answered-marked' && (
                  <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 rounded-full border border-white translate-x-1 translate-y-1"></span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
