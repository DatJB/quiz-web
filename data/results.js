const defaultResults = [
  {
    id: "1",
    examId: "1",
    studentId: "1",
    studentName: "Nguyễn Văn An",
    score: 8.5,
    correctAnswers: 8,
    totalQuestions: 10,
    answers: { q1: 0, q2: 2, q3: 1, q4: 1, q5: 2, q6: 2, q7: 0, q8: 1, q9: 1, q10: 0 },
    completedAt: "2026-02-20T10:30:00",
    timeSpent: 1200
  },
  {
    id: "2",
    examId: "1",
    studentId: "2",
    studentName: "Trần Thị Bình",
    score: 9.0,
    correctAnswers: 9,
    totalQuestions: 10,
    answers: { q1: 0, q2: 2, q3: 1, q4: 1, q5: 2, q6: 2, q7: 0, q8: 1, q9: 1, q10: 1 },
    completedAt: "2026-02-21T11:15:00",
    timeSpent: 1500
  },
  {
    id: "3",
    examId: "2",
    studentId: "1",
    studentName: "Nguyễn Văn An",
    score: 7.5,
    correctAnswers: 15,
    totalQuestions: 20,
    answers: {},
    completedAt: "2026-02-22T09:45:00",
    timeSpent: 5400
  },
  {
    id: "4",
    examId: "1",
    studentId: "3",
    studentName: "Lê Văn Cường",
    score: 7.0,
    correctAnswers: 7,
    totalQuestions: 10,
    answers: {},
    completedAt: "2026-02-23T14:20:00",
    timeSpent: 1800
  },
  {
    id: "5",
    examId: "2",
    studentId: "2",
    studentName: "Trần Thị Bình",
    score: 8.0,
    correctAnswers: 16,
    totalQuestions: 20,
    answers: {},
    completedAt: "2026-02-24T10:00:00",
    timeSpent: 5100
  }
];

function initResults() {
    if (!localStorage.getItem("results")) {
        localStorage.setItem("results", JSON.stringify(defaultResults));
    }
}