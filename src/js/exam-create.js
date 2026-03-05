// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });

// Biến lưu trữ danh sách câu hỏi
let currentQuestions = [];

// Hàm Import Excel
function importExcel() {
    document.getElementById("excelInput").click();
}

// Bắt sự kiện khi người dùng chọn file xong
document.getElementById("excelInput").addEventListener("change", function(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(e) {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, {type: 'array'});
        
        const firstSheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[firstSheetName];
        const json = XLSX.utils.sheet_to_json(worksheet);

        const importedQuestions = json.map(row => ({
            id: `q_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
            question: row["Câu hỏi"] != null ? String(row["Câu hỏi"]) : "",
            options: [
                row["Đáp án A"] != null ? String(row["Đáp án A"]) : "", 
                row["Đáp án B"] != null ? String(row["Đáp án B"]) : "", 
                row["Đáp án C"] != null ? String(row["Đáp án C"]) : "", 
                row["Đáp án D"] != null ? String(row["Đáp án D"]) : ""
            ],
            correctAnswer: parseInt(row["Vị trí đúng (0-3)"]) || 0, 
            explanation: row["Giải thích"] != null ? String(row["Giải thích"]) : ""
        }));

        currentQuestions = [...currentQuestions, ...importedQuestions];
        updateQuestionUI();
        
        alert(`Đã import thành công ${importedQuestions.length} câu hỏi!`);
        document.getElementById("excelInput").value = ""; 
    };
    
    reader.readAsArrayBuffer(file);
});

// Hàm thêm câu hỏi thủ công
function addQuestion() {
    const newQuestion = {
        id: Date.now(),
        question: "",
        options: ["", "", "", ""], 
        correctAnswer: 0, 
        explanation: ""
    };
    
    currentQuestions.push(newQuestion);
    updateQuestionUI();
}

function updateQuestion(index, field, value) {
    currentQuestions[index][field] = value;
}

function updateOption(qIndex, optIndex, value) {
    currentQuestions[qIndex].options[optIndex] = value;
}

function removeQuestion(index) {
    if(confirm("Bạn có chắc muốn xóa câu hỏi này?")) {
        currentQuestions.splice(index, 1);
        updateQuestionUI();
    }
}

function toggleScheduledDate() {
    const status = document.getElementById("examStatus").value;
    const dateContainer = document.getElementById("dateContainer");
    if (status === "scheduled") {
        dateContainer.classList.remove("hidden");
    } else {
        dateContainer.classList.add("hidden");
    }
}

// Cập nhật giao diện danh sách câu hỏi
function updateQuestionUI() {
    const questionList = document.getElementById("questionList");
    const emptyState = document.getElementById("emptyQuestions");
    const countText = document.getElementById("questionCountText");

    countText.innerText = `Câu hỏi (${currentQuestions.length})`;

    if (currentQuestions.length === 0) {
        questionList.classList.add("hidden");
        emptyState.classList.remove("hidden");
        questionList.innerHTML = "";
    } else {
        emptyState.classList.add("hidden");
        questionList.classList.remove("hidden");

        questionList.innerHTML = currentQuestions.map((q, index) => `
            <div class="border-l-4 border-[#e53e3e] bg-white border-y border-r border-gray-200 rounded-lg p-6 mb-6 shadow-sm">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="font-semibold text-gray-800 text-lg">Câu hỏi ${index + 1}</h3>
                    <button type="button" onclick="removeQuestion(${index})" class="text-red-500 hover:text-red-700 hover:bg-red-50 p-2 rounded-md transition-colors">
                        <i class="fa-regular fa-trash-can text-lg"></i>
                    </button>
                </div>

                <div class="space-y-5">
                    <div>
                        <textarea rows="2" placeholder="Nhập nội dung câu hỏi" onchange="updateQuestion(${index}, 'question', this.value)" 
                        class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-3 outline-none transition-all">${q.question}</textarea>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Các đáp án</label>
                        <div class="space-y-3">
                            ${[0, 1, 2, 3].map(oIndex => `
                                <div class="flex items-center gap-3">
                                    <span class="font-bold text-gray-800 w-6">${String.fromCharCode(65 + oIndex)}.</span>
                                    <input type="text" placeholder="Đáp án ${String.fromCharCode(65 + oIndex)}" value="${q.options[oIndex]}" onchange="updateOption(${index}, ${oIndex}, this.value)" 
                                    class="flex-1 bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2.5 outline-none transition-all">
                                </div>
                            `).join('')}
                        </div>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Đáp án đúng</label>
                        <select onchange="updateQuestion(${index}, 'correctAnswer', parseInt(this.value))" 
                        class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-2.5 outline-none transition-all cursor-pointer">
                            <option value="0" ${q.correctAnswer === 0 ? 'selected' : ''}>A. Đáp án A</option>
                            <option value="1" ${q.correctAnswer === 1 ? 'selected' : ''}>B. Đáp án B</option>
                            <option value="2" ${q.correctAnswer === 2 ? 'selected' : ''}>C. Đáp án C</option>
                            <option value="3" ${q.correctAnswer === 3 ? 'selected' : ''}>D. Đáp án D</option>
                        </select>
                    </div>

                    <div>
                        <label class="block text-sm font-semibold text-gray-800 mb-2">Giải thích (tùy chọn)</label>
                        <textarea rows="2" placeholder="Giải thích đáp án đúng" onchange="updateQuestion(${index}, 'explanation', this.value)" 
                        class="w-full bg-gray-50 border border-gray-200 focus:bg-white focus:border-red-500 focus:ring-2 focus:ring-red-100 rounded-lg px-4 py-3 outline-none transition-all">${q.explanation}</textarea>
                    </div>
                </div>
            </div>
        `).join("");
    }
}

// Hàm gửi dữ liệu tạo kỳ thi
function submitExam() {
    const name = document.getElementById("examName").value;
    const desc = document.getElementById("examDesc").value;
    const type = document.getElementById("examType").value;
    const status = document.getElementById("examStatus").value;
    const duration = document.getElementById("examDuration").value;

    if (!name.trim() || !desc.trim() || !duration) {
        alert("Vui lòng điền đầy đủ các thông tin cơ bản bắt buộc (*)");
        return;
    }

    if (currentQuestions.length === 0) {
        alert("Vui lòng thêm ít nhất một câu hỏi!");
        return;
    }
    
    for (let i = 0; i < currentQuestions.length; i++) {
        const q = currentQuestions[i];
        if (!String(q.question).trim()) {
            alert(`Câu hỏi ${i + 1}: Chưa nhập nội dung câu hỏi!`);
            return;
        }
        if (q.options.some(opt => !String(opt).trim())) {
            alert(`Câu hỏi ${i + 1}: Chưa nhập đầy đủ 4 đáp án!`);
            return;
        }
    }

    const dateInput = document.getElementById("scheduledDate");
    const scheduledDateValue = (status === "scheduled" && dateInput) ? dateInput.value : null;

    const newExamData = {
        id: Date.now().toString(), 
        title: name,              
        description: desc,        
        type: type,
        status: status,
        duration: parseInt(duration),
        totalQuestions: currentQuestions.length,
        scheduledDate: scheduledDateValue,
        questions: currentQuestions
    };

    let savedExams = JSON.parse(localStorage.getItem("exams")) || [];
    savedExams.push(newExamData); 
    localStorage.setItem("exams", JSON.stringify(savedExams)); 

    alert("Tạo kỳ thi thành công!");
    window.location.href = "exams.html";
}