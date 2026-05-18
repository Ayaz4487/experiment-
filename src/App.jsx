import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import SubjectTabs from './components/SubjectTabs';
import QuestionArea from './components/QuestionArea';
import ActionController from './components/ActionController';
import Sidebar from './components/Sidebar';
import { generateQuestions } from './data/questions';

const initialQuestions = generateQuestions();

function App() {
  const [activeSubjectId, setActiveSubjectId] = useState('acc');

  // State for tracking indices per subject
  const [currentIndices, setCurrentIndices] = useState({
    acc: 0,
    eco: 0,
    bst: 0
  });

  // State for tracking responses per subject
  // responses format: { acc: [{ status: 'not-visited', selectedOption: null }, ...], ... }
  const [responses, setResponses] = useState(() => {
    const initRes = { acc: [], eco: [], bst: [] };
    ['acc', 'eco', 'bst'].forEach((sub) => {
      initRes[sub] = Array(50).fill(null).map(() => ({
        status: 'not-visited',
        selectedOption: null
      }));
      // First question of each subject is visited initially
      initRes[sub][0].status = 'visited-not-answered';
    });
    return initRes;
  });

  const activeQuestions = initialQuestions[activeSubjectId];
  const currentIndex = currentIndices[activeSubjectId];
  const currentQuestion = activeQuestions[currentIndex];
  const currentResponses = responses[activeSubjectId];
  const currentSelectedOption = currentResponses[currentIndex].selectedOption;

  // Visit a question
  const visitQuestion = (index, subjectId = activeSubjectId) => {
    setResponses((prev) => {
      const newRes = { ...prev };
      const subRes = [...newRes[subjectId]];
      if (subRes[index].status === 'not-visited') {
        subRes[index] = { ...subRes[index], status: 'visited-not-answered' };
      }
      newRes[subjectId] = subRes;
      return newRes;
    });
  };

  const handleSubjectChange = (id) => {
    setActiveSubjectId(id);
    visitQuestion(currentIndices[id], id); // Visit the current question of the new subject
  };

  const handleNavigate = (index) => {
    setCurrentIndices((prev) => ({ ...prev, [activeSubjectId]: index }));
    visitQuestion(index, activeSubjectId);
  };

  const handleOptionSelect = (optionIndex) => {
    setResponses((prev) => {
      const newRes = { ...prev };
      const subRes = [...newRes[activeSubjectId]];
      subRes[currentIndex] = { ...subRes[currentIndex], selectedOption: optionIndex };
      newRes[activeSubjectId] = subRes;
      return newRes;
    });
  };

  const handleClear = () => {
    setResponses((prev) => {
      const newRes = { ...prev };
      const subRes = [...newRes[activeSubjectId]];
      subRes[currentIndex] = {
        ...subRes[currentIndex],
        selectedOption: null,
        status: 'visited-not-answered'
      };
      newRes[activeSubjectId] = subRes;
      return newRes;
    });
  };

  const handleMarkReview = () => {
    setResponses((prev) => {
      const newRes = { ...prev };
      const subRes = [...newRes[activeSubjectId]];
      const isAnswered = subRes[currentIndex].selectedOption !== null;
      subRes[currentIndex] = {
        ...subRes[currentIndex],
        status: isAnswered ? 'answered-marked' : 'marked'
      };
      newRes[activeSubjectId] = subRes;
      return newRes;
    });

    // Go to next question if not at the end
    if (currentIndex < 49) {
      handleNavigate(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      handleNavigate(currentIndex - 1);
    }
  };

  const handleSaveNext = () => {
    setResponses((prev) => {
      const newRes = { ...prev };
      const subRes = [...newRes[activeSubjectId]];
      const isAnswered = subRes[currentIndex].selectedOption !== null;

      if (isAnswered) {
        subRes[currentIndex] = { ...subRes[currentIndex], status: 'answered' };
      } else {
        // If they click Save & Next without selecting, it's just visited-not-answered
        subRes[currentIndex] = { ...subRes[currentIndex], status: 'visited-not-answered' };
      }

      newRes[activeSubjectId] = subRes;
      return newRes;
    });

    if (currentIndex < 49) {
      handleNavigate(currentIndex + 1);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100 font-sans text-gray-900">
      <Header />
      <SubjectTabs activeSubject={activeSubjectId} onSubjectChange={handleSubjectChange} />

      <div className="flex flex-1 overflow-hidden">
        {/* Left Area: Questions and Controls */}
        <div className="flex-1 flex flex-col relative">
          <QuestionArea
            question={currentQuestion}
            activeSubjectId={activeSubjectId}
            currentIndex={currentIndex}
            selectedOption={currentSelectedOption}
            onOptionSelect={handleOptionSelect}
          />
          <ActionController
            onClear={handleClear}
            onMarkReview={handleMarkReview}
            onPrevious={handlePrevious}
            onSaveNext={handleSaveNext}
          />
        </div>

        {/* Right Area: Sidebar */}
        <Sidebar
          questions={activeQuestions}
          currentQuestionIndex={currentIndex}
          responses={currentResponses}
          onNavigate={handleNavigate}
        />
      </div>
    </div>
  );
}

export default App;
