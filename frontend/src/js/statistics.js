// Dữ liệu fix cứng
const mockExams = [
    { id: "e1", title: "Luyện tập - Lập trình Web" },
    { id: "e2", title: "Giữa kỳ - Cơ sở dữ liệu" },
    { id: "e3", title: "Thi cuối kỳ - Mạng máy tính" }
];

const mockResults = [
    { id: "r1", examId: "e1", studentName: "Nguyễn Văn A", score: 8.5, correctAnswers: 17, totalQuestions: 20, completedAt: "2026-02-20T10:30:00" },
    { id: "r2", examId: "e1", studentName: "Trần Thị B", score: 4.0, correctAnswers: 8, totalQuestions: 20, completedAt: "2026-02-20T11:15:00" },
    { id: "r3", examId: "e2", studentName: "Lê Văn C", score: 9.0, correctAnswers: 18, totalQuestions: 20, completedAt: "2026-02-21T09:00:00" },
    { id: "r4", examId: "e3", studentName: "Phạm Thị D", score: 6.5, correctAnswers: 26, totalQuestions: 40, completedAt: "2026-02-22T14:30:00" },
    { id: "r5", examId: "e1", studentName: "Hoàng Văn E", score: 7.0, correctAnswers: 14, totalQuestions: 20, completedAt: "2026-02-23T08:20:00" },
    { id: "r6", examId: "e2", studentName: "Ngô Thị F", score: 3.5, correctAnswers: 7, totalQuestions: 20, completedAt: "2026-02-24T15:45:00" },
];

// Biến lưu trữ các instance của Chart.js để hủy trước khi vẽ lại
let charts = {
    scoreDist: null,
    passFail: null,
    participation: null,
    scoreTrend: null
};

//Biến lưu kết quả đang hiển thị để xuất Excel
let currentFilteredResults = [];

// Khởi tạo
document.addEventListener("DOMContentLoaded", () => {
    initFilter();
    applyFilter();
});

// Load danh sách kỳ thi vào Select Box
function initFilter() {
    const filter = document.getElementById("examFilter");
    mockExams.forEach(exam => {
        const option = document.createElement("option");
        option.value = exam.id;
        option.textContent = exam.title;
        filter.appendChild(option);
    });
}

// Hàm chạy khi người dùng chọn Dropdown
function applyFilter() {
    const selectedExam = document.getElementById("examFilter").value;
    
    // Lọc dữ liệu và lưu vào biến toàn cục
    currentFilteredResults = selectedExam === "all" 
        ? mockResults 
        : mockResults.filter(r => r.examId === selectedExam);

    updateSummaryCards(currentFilteredResults);
    renderTable(currentFilteredResults);
    drawCharts(currentFilteredResults);
}

// Cập nhật giao diện
function updateSummaryCards(data) {
    const totalAttempts = data.length;
    const averageScore = totalAttempts > 0 
        ? (data.reduce((sum, r) => sum + r.score, 0) / totalAttempts).toFixed(1) 
        : "0.0";

    document.getElementById("totalAttempts").innerText = totalAttempts;
    document.getElementById("averageScore").innerText = averageScore;
}

function renderTable(data) {
    const tbody = document.getElementById("resultsTableBody");
    tbody.innerHTML = "";

    if (data.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" class="text-center py-6 text-gray-500">Không có dữ liệu</td></tr>`;
        return;
    }

    data.forEach(result => {
        const examName = mockExams.find(e => e.id === result.examId)?.title || "Không rõ";
        const dateStr = new Date(result.completedAt).toLocaleString("vi-VN");
        const isPassed = result.score >= 5;

        tbody.innerHTML += `
            <tr class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm font-medium text-gray-800">${result.studentName}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${examName}</td>
                <td class="px-6 py-4 text-center">
                    <span class="font-bold ${isPassed ? 'text-green-600' : 'text-red-600'}">${result.score.toFixed(1)}</span>
                </td>
                <td class="px-6 py-4 text-sm text-gray-600 text-center">${result.correctAnswers}/${result.totalQuestions}</td>
                <td class="px-6 py-4 text-sm text-gray-600">${dateStr}</td>
                <td class="px-6 py-4 text-center">
                    <span class="px-3 py-1 rounded-full text-xs font-medium ${isPassed ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}">
                        ${isPassed ? 'Đạt' : 'Không đạt'}
                    </span>
                </td>
            </tr>
        `;
    });
}

// Vẽ biểu đồ
function drawCharts(data) {
    Object.keys(charts).forEach(key => {
        if (charts[key]) charts[key].destroy();
    });

    if (data.length === 0) return;

    //Phân phối điểm số 
    const ranges = [0,0,0,0,0]; // 0-2, 2-4, 4-6, 6-8, 8-10
    data.forEach(r => {
        if (r.score < 2) ranges[0]++;
        else if (r.score < 4) ranges[1]++;
        else if (r.score < 6) ranges[2]++;
        else if (r.score < 8) ranges[3]++;
        else ranges[4]++;
    });

    charts.scoreDist = new Chart(document.getElementById('scoreDistChart'), {
        type: 'bar',
        data: {
            labels: ['0-2', '2-4', '4-6', '6-8', '8-10'],
            datasets: [{
                label: 'Số sinh viên',
                data: ranges,
                backgroundColor: '#3b82f6', 
                borderRadius: 4
            }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });

    //Tỷ lệ đạt / không đạt
    const passCount = data.filter(r => r.score >= 5).length;
    const failCount = data.length - passCount;

    charts.passFail = new Chart(document.getElementById('passFailChart'), {
        type: 'doughnut',
        data: {
            labels: ['Đạt', 'Không đạt'],
            datasets: [{
                data: [passCount, failCount],
                backgroundColor: ['#22c55e', '#ef4444'], 
                borderWidth: 0
            }]
        },
        options: { 
            responsive: true, 
            maintainAspectRatio: false,
            cutout: '30%' 
        }
    });

    //Lượt tham gia theo kỳ thi
    const examLabels = mockExams.map(e => e.title.length > 20 ? e.title.substring(0, 20) + "..." : e.title);
    const examData = mockExams.map(e => data.filter(r => r.examId === e.id).length);

    charts.participation = new Chart(document.getElementById('participationChart'), {
        type: 'bar',
        data: {
            labels: examLabels,
            datasets: [{
                label: 'Số sinh viên',
                data: examData,
                backgroundColor: '#f97316', 
                borderRadius: 4
            }]
        },
        options: { 
            indexAxis: 'y', 
            responsive: true, 
            maintainAspectRatio: false 
        }
    });

    //Xu hướng điểm số 
    const trendData = [
        { date: "20/02", score: 7.2 },
        { date: "21/02", score: 7.5 },
        { date: "22/02", score: 7.8 },
        { date: "23/02", score: 8.0 },
        { date: "24/02", score: 8.2 }
    ];

    charts.scoreTrend = new Chart(document.getElementById('scoreTrendChart'), {
        type: 'line',
        data: {
            labels: trendData.map(t => t.date),
            datasets: [{
                label: 'Điểm Trung Bình',
                data: trendData.map(t => t.score),
                borderColor: '#1d4ed8',
                backgroundColor: 'rgba(29, 78, 216, 0.1)',
                tension: 0.3, 
                fill: true
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: { y: { min: 0, max: 10 } }
        }
    });
}

function handleExportPDF() {
    const element = document.getElementById('pdfContent');
    
    if (!element) {
        alert("Chưa tìm thấy nội dung để xuất! (Lỗi: Thiếu id='pdfContent' trong HTML)");
        return;
    }

    alert("Quá trình tải xuống sẽ được thực hiện.");

    const opt = {
        margin:       0.3, 
        filename:     'Thong_ke_ket_qua_thi.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 }, 
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'landscape' }
    };

    html2pdf().set(opt).from(element).save()
        .then(() => {
            console.log("Xuất PDF thành công!");
        });
}

function handleExportExcel() {
    //Kiểm tra xem có dữ liệu không
    if (currentFilteredResults.length === 0) {
        alert("Không có dữ liệu nào để xuất!");
        return;
    }

    alert("Đang xuất file Excel...");

    //Định dạng lại dữ liệu
    const dataToExport = currentFilteredResults.map(result => {

        const examName = mockExams.find(e => e.id === result.examId)?.title || "Không rõ";
        const dateStr = new Date(result.completedAt).toLocaleString("vi-VN");
        const isPassed = result.score >= 5;

        return {
            "Tên sinh viên": result.studentName,
            "Kỳ thi": examName,
            "Điểm số": result.score,
            "Số câu đúng": `${result.correctAnswers}/${result.totalQuestions}`,
            "Thời gian nộp bài": dateStr,
            "Trạng thái": isPassed ? "Đạt" : "Không đạt"
        };
    });

    //Sử dụng thư viện XLSX để tạo và lưu file
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    
    XLSX.utils.book_append_sheet(workbook, worksheet, "ThongKeKetQua");
    XLSX.writeFile(workbook, "Ket_qua_thi.xlsx");
}

fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });