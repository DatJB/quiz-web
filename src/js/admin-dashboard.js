// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightActiveMenu();
    });;

// Dashboard
const mockExams = JSON.parse(localStorage.getItem("exams"));
const mockStudents = JSON.parse(localStorage.getItem("users"));
const mockResults = JSON.parse(localStorage.getItem("results"));

const totalExams = mockExams.length;
const totalStudents = mockStudents.length;
const totalAttempts = mockResults.length;
const averageScore =
    mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length;

const stats = [
    { title: "Tổng số kỳ thi", value: totalExams, color: "bg-blue-500" },
    { title: "Sinh viên", value: totalStudents, color: "bg-green-500" },
    { title: "Lượt thi", value: totalAttempts, color: "bg-purple-500" },
    { title: "Điểm TB", value: averageScore.toFixed(1), color: "bg-orange-500" },
];

const statsContainer = document.getElementById("stats");

stats.forEach(stat => {
    statsContainer.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p class="text-md text-gray-600">${stat.title}</p>
            <p class="text-3xl font-semibold mt-2">${stat.value}</p>
            <div class="w-12 h-12 ${stat.color} rounded-lg mt-4"></div>
        </div>
    `;
});


// Quick actions
const quickActions = [
    { title: "Quản lý kỳ thi", path: "exams.html" },
    { title: "Quản lý sinh viên", path: "manage-students.html" },
    { title: "Thống kê", path: "statistics.html" },
    { title: "Kết quả sinh viên", path: "students.html" },
];

const quickContainer = document.getElementById("quickActions");

quickActions.forEach(action => {
    quickContainer.innerHTML += `
        <div onclick="navigate('${action.path}')"
            class="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition">
            <p class="font-semibold text-lg">${action.title}</p>
        </div>
    `;
});

// Activity
const recentContainer = document.getElementById("recentActivity");

mockResults.slice(0,5).forEach(result => {
    const exam = mockExams.find(e => e.id === result.examId);

    recentContainer.innerHTML += `
        <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
            <div>
                <p class="font-medium">${result.studentName}</p>
                <p class="text-sm text-gray-600">
                    Hoàn thành: ${exam?.title || ""}
                </p>
            </div>
            <div class="text-right">
                <p class="font-semibold text-red-600">
                    ${result.score.toFixed(1)} điểm
                </p>
                <p class="text-xs text-gray-600">
                    ${new Date(result.completedAt).toLocaleString("vi-VN", {
                        hour: "2-digit",
                        minute: "2-digit",
                        second: "2-digit",
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}
                </p>
            </div>
        </div>
    `;
});