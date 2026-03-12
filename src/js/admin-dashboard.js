// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });
initUsers();
initExams();
initResults();
// Dashboard
const mockExams = JSON.parse(localStorage.getItem("exams"));
const mockStudents = JSON.parse(localStorage.getItem("users"));
const mockResults = JSON.parse(localStorage.getItem("results"));

console.log(mockExams)

const totalExams = mockExams.length;
const totalStudents = mockStudents.length;
const totalAttempts = mockResults.length;
const averageScore =
    mockResults.reduce((sum, r) => sum + r.score, 0) / mockResults.length;

const stats = [
    { title: "Tổng số kỳ thi", value: totalExams, description: "+2 kỳ thi mới" },
    { title: "Sinh viên", value: 15, description: "+4 sinh viên mới" },
    { title: "Lượt thi", value: 20, description: "+7 lượt" },
    { title: "Điểm trung bình", value: averageScore.toFixed(1), description: "-0.3 điểm" },
];

const statsContainer = document.getElementById("stats");

stats.forEach((stat, index) => {
    statsContainer.innerHTML += `
        <div class="bg-white p-6 rounded-xl shadow hover:shadow-lg transition">
            <p class="font-medium text-gray-500">${stat.title}</p>
            <p class="text-3xl font-semibold mt-2">${stat.value}</p>

            <div class="${index !== 3 ? "text-green-500" : "text-red-500"} ${stat.color} rounded-lg mt-4 font-semibold">
                ${index !== 3 ? `<i class="fa-solid fa-arrow-trend-up mr-1"></i>` : `<i class="fa-solid fa-arrow-trend-down mr-1"></i>`} ${stat.description}
            </div>
        </div>
    `;
});

// Quick actions
const quickActions = [
    { title: "Quản lý kỳ thi", icon: `<i class="fa-solid fa-file-lines text-xl mt-0.5"></i>`, path: "/admin/exams", color: "bg-[#2B7FFF]", description: "Thêm, sửa, xóa các kỳ thi" },
    { title: "Quản lý sinh viên", icon: `<i class="fa-solid fa-user-gear text-lg mt-0.5"></i>`, path: "/admin/manage-students", color: "bg-[#F6339A]", description: "Thêm, sửa, xóa tài khoản sinh viên" },
    { title: "Kết quả sinh viên", icon: `<i class="fa-solid fa-users text-lg mt-0.5"></i>`, path: "/admin/students", color: "bg-[#AD46FF]", description: "Xem điểm và chi tiết bài làm" },
    { title: "Thống kê", icon: `<i class="fa-solid fa-chart-column text-lg mt-0.5"></i>`, path: "/admin/statistics", color: "bg-[#00C951]", description: "Xem báo cáo và biểu đồ" },
];

const quickContainer = document.getElementById("quickActions");

quickActions.forEach((action, index) => {
    quickContainer.innerHTML += `
        <div onclick="navigate('${action.path}')"
            class="bg-white p-6 rounded-xl shadow cursor-pointer hover:shadow-lg transition flex justify-center items-center gap-3">
            <div class="w-12 ${index === 1 ? "lg:w-14" : ""} h-10 py-1 ${action.color} text-white rounded-lg text-center">${action.icon}</div>

            <div>
                <p class="font-semibold text-lg">${action.title}</p>
                <p class="text-sm opacity-70 mt-1">${action.description}</p>
            </div>
        </div>
    `;
});

// Activity
const recentContainer = document.getElementById("recentActivity");

mockResults.slice(0,5).forEach(result => {
    const exam = mockExams.find(e => e.id === result.examId);

    recentContainer.innerHTML += `
        <div class="flex justify-between w-full items-center p-3 bg-gray-50 rounded-lg hover:bg-gray-200 transition">
            <div class="flex gap-2.5 items-center justify-center">
                <div class="bg-red-600 rounded-full text-white p-2 w-8 h-8 flex items-center justify-center">
                    <img src="../../images/students.png" class="w-4 h-4 invert "/>
                </div>

                <div>
                    <p class="font-medium">${result.studentName}</p>
                    <p class="text-sm text-gray-600">
                        Hoàn thành: ${exam?.title || ""}
                    </p>
                </div>
            </div>

            <div class="text-right flex-shrink-0">
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