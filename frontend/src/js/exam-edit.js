const STORAGE_KEY = "exams";

let currentQuestions = [];
let currentExamId = null;// ID của kỳ thi đang sửa

//Khởi tạo dữ liệu từ localStorage vào form
document.addEventListener("DOMContentLoaded", () => {
    loadExamData();
});

function loadExamData() {
    //Lấy ID từ URL
    const urlParams = new URLSearchParams(window.location.search);
    currentExamId = urlParams.get('id');

    if (!currentExamId) {
        alert("Không tìm thấy ID kỳ thi!");
        window.location.href = "exams.html";
        return;
    }

    //Tìm kỳ thi trong localStorage
    const savedExams = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const examToEdit = savedExams.find(e => e.id === currentExamId);

    if (!examToEdit) {
        alert("Kỳ thi không tồn tại hoặc đã bị xóa!");
        window.location.href = "exams.html";
        return;
    }

    //Điền thông tin cơ bản vào form
    document.getElementById("editTitle").value = examToEdit.title || "";
    document.getElementById("editDesc").value = examToEdit.description || "";
    document.getElementById("editType").value = examToEdit.type || "practice";
    document.getElementById("editStatus").value = examToEdit.status || "free";
    document.getElementById("editDuration").value = examToEdit.duration || 30;
    
    if (examToEdit.status === "scheduled" && examToEdit.scheduledDate) {
        document.getElementById("editScheduledDate").value = examToEdit.scheduledDate;
    }
    
    toggleScheduledDate();

    //Lấy danh sách câu hỏi
    currentQuestions = examToEdit.questions ? JSON.parse(JSON.stringify(examToEdit.questions)) : [];
    renderQuestions();
}

function toggleScheduledDate() {
    const status = document.getElementById("editStatus").value;
    const dateContainer = document.getElementById("dateContainer");
    if (status === "scheduled") {
        dateContainer.classList.remove("hidden");
    } else {
        dateContainer.classList.add("hidden");
    }
}

// Thêm câu hỏi mới
function addQuestion() {
    currentQuestions.push({
        id: `new_${Date.now()}`,
        question: "",
        options: ["", "", "", ""],
        correctAnswer: 0,
        explanation: ""
    });
    renderQuestions();
}

// Xóa câu hỏi
function removeQuestion(index) {
    if(confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
        currentQuestions.splice(index, 1);
        renderQuestions();
    }
}

// Cập nhật giá trị vào mảng khi người dùng gõ
function updateQuestion(index, field, value) {
    currentQuestions[index][field] = value;
}

// Cập nhật mảng đáp án khi người dùng gõ
function updateOption(qIndex, optIndex, value) {
    currentQuestions[qIndex].options[optIndex] = value;
}

// Render toàn bộ danh sách câu hỏi
function renderQuestions() {
    const container = document.getElementById("questionsContainer");
    const emptyState = document.getElementById("emptyQuestions");
    document.getElementById("questionCountText").innerText = `Câu hỏi (${currentQuestions.length})`;

    if (currentQuestions.length === 0) {
        container.innerHTML = "";
        emptyState.classList.remove("hidden");
        return;
    }

    emptyState.classList.add("hidden");
    
    let html = "";
    currentQuestions.forEach((q, index) => {
        html += `
            <div class="border-l-4 border-red-500 bg-white shadow-sm rounded-r-xl border-y border-r border-gray-200 p-6">
                
                <div class="flex justify-between items-start mb-4">
                    <label class="font-semibold text-gray-800">Câu hỏi ${index + 1}</label>
                    <button type="button" onclick="removeQuestion(${index})" class="text-red-500 hover:bg-red-50 px-3 py-1.5 rounded-md transition-colors text-sm">
                        <i class="fa-solid fa-trash"></i> Xóa
                    </button>
                </div>

                <div class="space-y-5">
                    <div>
                        <textarea onchange="updateQuestion(${index}, 'question', this.value)" rows="2" placeholder="Nhập nội dung câu hỏi" required
                        class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2.5 outline-none">${q.question}</textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Các đáp án</label>
                        <div class="space-y-3">
                            ${q.options.map((opt, oIndex) => `
                                <div class="flex items-center gap-3">
                                    <span class="text-sm font-semibold w-6">${String.fromCharCode(65 + oIndex)}.</span>
                                    <input type="text" value="${opt}" required onchange="updateOption(${index}, ${oIndex}, this.value)" placeholder="Nhập đáp án ${String.fromCharCode(65 + oIndex)}" 
                                    class="flex-1 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2 outline-none">
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div class="grid grid-cols-1 gap-4">
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Đáp án đúng</label>
                            <select onchange="updateQuestion(${index}, 'correctAnswer', parseInt(this.value))" class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2.5 outline-none">
                                <option value="0" ${q.correctAnswer === 0 ? 'selected' : ''}>Đáp án A</option>
                                <option value="1" ${q.correctAnswer === 1 ? 'selected' : ''}>Đáp án B</option>
                                <option value="2" ${q.correctAnswer === 2 ? 'selected' : ''}>Đáp án C</option>
                                <option value="3" ${q.correctAnswer === 3 ? 'selected' : ''}>Đáp án D</option>
                            </select>
                        </div>
                        <div>
                            <label class="block text-sm font-medium text-gray-700 mb-1">Giải thích (tùy chọn)</label>
                            <textarea onchange="updateQuestion(${index}, 'explanation', this.value)" rows="1" placeholder="Giải thích đáp án đúng" 
                            class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2.5 outline-none">${q.explanation}</textarea>
                        </div>
                    </div>
                </div>

            </div>
        `;
    });

    container.innerHTML = html;
}

function importExcel() {
    alert("Chức năng Import từ Excel đang được phát triển!");
}

function handleSubmit(e) {
    e.preventDefault(); 

    if (currentQuestions.length === 0) {
        alert("Vui lòng thêm ít nhất một câu hỏi!");
        return;
    }

    const status = document.getElementById("editStatus").value;

    const updatedExam = {
        id: currentExamId,
        title: document.getElementById("editTitle").value,
        description: document.getElementById("editDesc").value,
        type: document.getElementById("editType").value,
        status: status,
        duration: parseInt(document.getElementById("editDuration").value),
        totalQuestions: currentQuestions.length,
        scheduledDate: status === "scheduled" ? document.getElementById("editScheduledDate").value : null,
        questions: currentQuestions
    };

    //Lưu đè vào LocalStorage
    let savedExams = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    const index = savedExams.findIndex(e => e.id === currentExamId);
    
    if (index !== -1) {
        savedExams[index] = updatedExam; 
        localStorage.setItem(STORAGE_KEY, JSON.stringify(savedExams));
        alert("Cập nhật kỳ thi thành công!");
    } else {
        alert("Có lỗi xảy ra, không tìm thấy kỳ thi để lưu!");
    }
    
    // Quay lại trang quản lý đề thi
    window.location.href = "exams.html";
}

// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });
