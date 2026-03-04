const STORAGE_KEY = "exams";

//Lấy dữ liệu từ localStorage
function getExams() {
    let data = localStorage.getItem(STORAGE_KEY);
    
    // Nếu trong localStorage chưa có key, lấy dữ liệu từ /data/exams.js - defaultExam
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultExam));
        return defaultExam; 
    }
    
    return JSON.parse(data);
}

//Lưu dữ liệu vào localStorage
function saveExams(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

// Biến toàn cục lưu danh sách
let exams = getExams();
let deleteId = null;

function getTypeLabel(type) {
  if (type === "practice") return "Luyện tập";
  if (type === "midterm") return "Giữa kỳ";
  if (type === "final") return "Cuối kỳ";
  return type;
}

function getTypeColor(type) {
  if (type === "practice") return "bg-green-100 text-green-700";
  if (type === "midterm") return "bg-blue-100 text-blue-700";
  if (type === "final") return "bg-red-100 text-red-700";
  return "bg-gray-100 text-gray-700";
}

function renderExams(list) {
  const container = document.getElementById("examList");
  const empty = document.getElementById("emptyState");

  container.innerHTML = "";

  if (list.length === 0) {
    empty.classList.remove("hidden");
    return;
  } else {
    empty.classList.add("hidden");
  }

  list.forEach(exam => {
    const statusBadge = exam.status === "free" 
      ? "bg-[#c53030] text-white" 
      : "bg-[#9b2c2c] text-white";

    container.innerHTML += `
      <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-5">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          
          <div class="flex-1">
            <div class="flex items-center gap-2 mb-3">
              <span class="px-2.5 py-1 text-xs font-semibold rounded-md ${getTypeColor(exam.type)}">
                ${getTypeLabel(exam.type)}
              </span>
              <span class="px-2.5 py-1 text-xs font-semibold rounded-md ${statusBadge}">
                ${exam.status === "free" ? "Tự do" : "Theo lịch"}
              </span>
            </div>
            
            <h3 class="text-lg font-semibold text-gray-900 mb-1">${exam.title}</h3>
            <p class="text-gray-500 text-sm mb-4">${exam.description}</p>
            
            <div class="flex flex-wrap items-center gap-5 text-sm text-gray-500">
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                ${exam.duration} phút
              </div>
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                ${exam.questions ? exam.questions.length : exam.totalQuestions} câu hỏi
              </div>
              ${exam.scheduledDate ? `
              <div class="flex items-center gap-1.5">
                <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                ${new Date(exam.scheduledDate).toLocaleString("vi-VN")}
              </div>` : ""}
            </div>
          </div>
          
          <div class="flex items-center gap-3">
            <button onclick="editExam('${exam.id}')"
              class="flex items-center gap-1.5 px-4 py-1 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Sửa
            </button>
            <button onclick="openDelete('${exam.id}')"
              class="flex items-center gap-1.5 px-4 py-1 bg-[#e53e3e] text-white font-medium rounded-lg hover:bg-red-700 transition-colors">
              <svg class="w-4 h-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Xóa
            </button>
          </div>

        </div>
      </div>
    `;
  });
}

function filterExams() {
  const term = document.getElementById("searchInput").value.toLowerCase();
  const filtered = exams.filter(e =>
    e.title.toLowerCase().includes(term) ||
    e.description.toLowerCase().includes(term)
  );
  renderExams(filtered);
}

function createExam() {
  window.location.href = "exam-create.html";
}

function editExam(id) {
  window.location.href = `exam-edit.html?id=${id}`;
}

function openDelete(id) {
  deleteId = id;
  document.getElementById("deleteModal").classList.remove("hidden");
}

function closeModal() {
  deleteId = null;
  document.getElementById("deleteModal").classList.add("hidden");
}

function confirmDelete() {
    exams = exams.filter(e => e.id !== deleteId);
    saveExams(exams); 
    closeModal();
    renderExams(exams);
    alert("Đã xóa kỳ thi thành công!");
}

renderExams(exams);