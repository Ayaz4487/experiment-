export const subjects = [
  { id: 'acc', name: 'Accountancy (301)' },
  { id: 'eco', name: 'Economics / Business Economics (309)' },
  { id: 'bst', name: 'Business Studies (305)' }
];

export const generateQuestions = () => {
  const data = {
    acc: [],
    eco: [],
    bst: []
  };

  for (let i = 1; i <= 50; i++) {
    if (i === 1) {
      data.acc.push({
        id: i,
        text: "A and B share profits in a 3:2 ratio. They admit C for a 1/4th share. C acquires his share entirely from A. The new profit-sharing ratio will be:",
        options: ["2:2:1", "11:8:5", "3:2:1", "7:8:5"]
      });
    } else {
      data.acc.push({
        id: i,
        text: `Accountancy Question ${i}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      });
    }
  }

  for (let i = 1; i <= 50; i++) {
    if (i === 1) {
      data.eco.push({
        id: i,
        text: "Identify which of the following is an incorrect statement regarding the calculation of National Income at Basic Prices as per recent trends:",
        options: [
          "Gross Value Added at Basic Prices includes production taxes.",
          "It excludes production subsidies.",
          "It includes product taxes.",
          "Basic price is the amount receivable by the producer."
        ]
      });
    } else {
      data.eco.push({
        id: i,
        text: `Economics Question ${i}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      });
    }
  }

  for (let i = 1; i <= 50; i++) {
    if (i === 1) {
      data.bst.push({
        id: i,
        text: "Alpha Ltd. decides to automate its inventory management system to reduce human error. Which concept of management is primarily highlighted here?",
        options: [
          "Coordination",
          "Planning",
          "Technological Dimension of Business Environment",
          "Decentralization"
        ]
      });
    } else {
      data.bst.push({
        id: i,
        text: `Business Studies Question ${i}`,
        options: ["Option A", "Option B", "Option C", "Option D"]
      });
    }
  }

  return data;
};
