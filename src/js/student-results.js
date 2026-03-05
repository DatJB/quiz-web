initUsers();
let users = JSON.parse(localStorage.getItem("users")) || [];
let students = users.filter(user => user.role === "student");

initExams();
let exams = JSON.parse(localStorage.getItem("exams")) || [];

initResults();
let results = JSON.parse(localStorage.getItem("results")) || [];

let searchTerm = "";
let selectedStudent = null;


function getResultsByStudentId(studentId) {
    return results.filter(result => result.studentId === studentId);
}

function goToDashboard() {
    window.location.href = "dashboard.html";
}

function handleSearch() {
    searchTerm = document.getElementById("searchInput").value.toLowerCase();
    renderStudents();
}

function renderStudents() {
    const list = document.getElementById("studentList");

    const filtered = students.filter(student => {
        return (
            student.fullName.toLowerCase().includes(searchTerm) ||
            student.studentCode.toLowerCase().includes(searchTerm) ||
            student.studentClass.toLowerCase().includes(searchTerm)
        );
    });

    list.innerHTML = filtered.map(student => {
        const studentResults = getResultsByStudentId(student.id);

        let avg = 0;
        if (studentResults.length > 0) {
            avg = studentResults.reduce((sum, result) => sum + result.score, 0) / studentResults.length;
        }

        const isActive = selectedStudent === student.id;

        return`
            <div onclick="selectStudent('${student.id}')" class="p-3 rounded-xl border cursor-pointer ${isActive ? 'bg-red-500 text-white' : 'hover:bg-gray-50'}">
                <div class="flex justify-between">
                    <p class="font-medium">${student.fullName}</p>

                    <span class="${isActive ? 'bg-red-500 text-white' : 'text-red-600'} text-sm">
                        ${avg ? avg.toFixed(1) : "N/A"}
                    </span>
                </div>

                <p class="text-sm ${isActive ? 'bg-red-500 text-white' : 'text-gray-600'}">${student.studentCode}</p>
                <p class="text-xs ${isActive ? 'bg-red-500 text-white' : 'text-gray-500'}"> ${studentResults.length} bài thi </p>
            </div>
        `
    }).join("");
}

function selectStudent(studentId) {
    selectedStudent = studentId;
    renderStudents();
    renderStudentDetail();
}

function renderStudentDetail() {
    const detail = document.getElementById("studentDetail");
    const title = document.getElementById("detailTitle");
    const exportBtn = document.getElementById("exportBtn");

    const student = students.find(s => s.id === selectedStudent);
    const studentResults = getResultsByStudentId(selectedStudent);

    title.innerText = "Chi tiết - " + student.fullName;
    exportBtn.classList.remove("hidden");

    let avg = 0;
    if (studentResults.length > 0) {
        avg = studentResults.reduce((sum, result) => sum + result.score, 0) / studentResults.length;
    }

    detail.innerHTML = `
        <div class="grid grid-cols-3 gap-4 mb-6 bg-gray-50 p-4 rounded-xl">
            <div>
                <p class="text-sm text-gray-600">Mã sinh viên</p>
                <p class="font-medium">${student.studentCode}</p>
            </div>

            <div>
                <p class="text-sm text-gray-600">Email</p>
                <p class="font-medium text-sm">${student.email}</p>
            </div>

            <div>
                <p class="text-sm text-gray-600">Điểm trung bình</p>
                <p class="text-2xl text-red-600 font-semibold">${avg.toFixed(1)}</p>
            </div>
        </div>

        <h3 class="font-medium mb-4"> Kết quả các kỳ thi</h3>

        ${
            studentResults.length > 0?
                studentResults.map(result => {
                    const exam = exams.find(exam => exam.id === result.examId)

                    return`
                        <div class="border border-l-4 border-red-500 p-4 mb-4 bg-white shadow rounded-xl">
                            <div class="flex justify-between mb-3">
                                <div>
                                    <p class="font-medium">${exam.title}</p>
                                    <p class="text-sm text-gray-600">${new Date(result.completedAt).toLocaleString("vi-VN")}</p>
                                </div>

                                <div class="text-right">
                                    <p class="text-2xl font-semibold ${result.score >= 5 ? 'text-green-600' : 'text-gray-500'}">
                                        ${result.score.toFixed(1)}
                                    </p>

                                    <span class="text-sm px-2 py-1 rounded-xl ${result.score >= 5 ? 'bg-green-100 text-green-700': 'bg-gray-200 text-gray-600'}">
                                        ${result.score >= 5 ? 'Đạt' : 'Không đạt'}
                                    </span>
                                </div>
                            </div>

                            <div class="grid grid-cols-3 text-sm">
                                <div>
                                    <p class="text-gray-600">Số câu đúng</p>
                                    <p class="font-medium">${result.correctAnswers} / ${result.totalQuestions}</p>
                                </div>

                                <div>
                                    <p class="text-gray-600">Tỷ lệ đúng</p>
                                    <p class="font-medium">${Math.round(result.correctAnswers / result.totalQuestions * 100)}%</p>
                                </div>

                                <div>
                                    <p class="text-gray-600">Thời gian</p>
                                    <p class="font-medium">${Math.floor(result.timeSpent / 60)} phút</p>
                                </div>

                            </div>

                            ${exam && Object.keys(result.answers).length > 0 ? `
                                <div class="mt-4 pt-4 border-t">
                                    <details class="cursor-pointer">
                                        <summary class="text-sm font-medium text-red-600 hover:underline">
                                            Xem chi tiết câu trả lời
                                        </summary>

                                        <div class="mt-3 space-y-2">
                                            ${
                                                exam.questions.map((q, index) => {
                                                    const userAnswer = result.answers[q.id];
                                                    const isCorrect = userAnswer === q.correctAnswer;

                                                    return `
                                                        <div class="p-2 rounded text-sm ${isCorrect ? 'bg-green-50' : 'bg-red-50'}">
                                                            <p class="font-medium mb-1">
                                                                Câu ${index + 1}: ${q.question}
                                                            </p>

                                                            <div class="flex flex-col text-xs gap-1">
                                                                <span>
                                                                    Trả lời:
                                                                    <strong>
                                                                        ${
                                                                            userAnswer !== undefined
                                                                                ? `${String.fromCharCode(65 + userAnswer)}. ${q.options[userAnswer]}`
                                                                                : 'Chưa trả lời'
                                                                        }
                                                                    </strong>

                                                                    <span class="${isCorrect ? 'text-green-600' : 'text-red-600'}">
                                                                        ${isCorrect ? '✓ Đúng' : '✗ Sai'}
                                                                    </span>
                                                                </span>

                                                                <span>
                                                                    Đáp án:
                                                                    <strong class="${isCorrect ? 'text-green-700' : 'text-red-700'}">
                                                                        ${String.fromCharCode(65 + q.correctAnswer)}. ${q.options[q.correctAnswer]}
                                                                    </strong>
                                                                </span>

                                                                
                                                            </div>
                                                        </div>
                                                        `
                                                }).join("")
                                            }
                                        </div>
                                    </details>
                                </div>
                            ` : ""}
                        </div>
                    `
                }).join("")
            : `<p class="text-gray-500 text-center py-6">Sinh viên chưa tham gia kỳ thi nào</p>`
        }
    `;
}

function exportReport() {
    alert("Đang xuất báo cáo sinh viên");
}

renderStudents()