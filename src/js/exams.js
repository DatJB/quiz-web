const STORAGE_KEY = "exams";
let deleteId = null;

function getExams() {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultExam));
        return defaultExam;
    }
    return JSON.parse(data);
}

const saveExams = (data) => localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
let exams = getExams();

const typeInfo = {
    practice: { label: "Luyện tập", color: "bg-green-100 text-green-700" },
    midterm: { label: "Giữa kỳ", color: "bg-blue-100 text-blue-700" },
    final: { label: "Cuối kỳ", color: "bg-red-100 text-red-700" }
};

function renderExams(list) {
    const container = document.getElementById("examList");
    const empty = document.getElementById("emptyState");

    container.innerHTML = "";
    empty.classList.toggle("hidden", list.length > 0);

    if (list.length === 0) return;

    list.forEach(exam => {
        const info = typeInfo[exam.type] || { label: exam.type, color: "bg-gray-100 text-gray-700" };
        const isFree = exam.status === "free";
        const dateHtml = exam.scheduledDate ? `
            <div class="flex items-center gap-1.5"><i class="fa-regular fa-calendar"></i> ${new Date(exam.scheduledDate).toLocaleString("vi-VN")}</div>` : "";

        container.innerHTML += `
            <div class="bg-white rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition p-5 mb-4">
                <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                    <div class="flex-1">
                        <div class="flex items-center gap-2 mb-3">
                            <span class="px-2.5 py-1 text-xs font-semibold rounded-md ${info.color}">${info.label}</span>
                            <span class="px-2.5 py-1 text-xs font-semibold rounded-md text-white ${isFree ? 'bg-[#c53030]' : 'bg-[#9b2c2c]'}">
                                ${isFree ? "Tự do" : "Theo lịch"}
                            </span>
                        </div>
                        <h3 class="text-lg font-semibold text-gray-900 mb-1">${exam.title}</h3>
                        <p class="text-gray-500 text-sm mb-4">${exam.description}</p>
                        <div class="flex flex-wrap items-center gap-5 text-sm text-gray-500">
                            <div class="flex items-center gap-1.5"><i class="fa-regular fa-clock"></i> ${exam.duration} phút</div>
                            <div class="flex items-center gap-1.5"><i class="fa-solid fa-list-ul"></i> ${exam.questions?.length || exam.totalQuestions} câu hỏi</div>
                            ${dateHtml}
                        </div>
                    </div>
                    <div class="flex items-center gap-3">
                        <button onclick="editExam('${exam.id}')" class="flex items-center gap-1.5 px-4 py-1.5 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition">
                            <i class="fa-solid fa-pen-to-square"></i> Sửa
                        </button>
                        <button onclick="openDelete('${exam.id}')" class="flex items-center gap-1.5 px-4 py-1.5 bg-[#e53e3e] text-white font-medium rounded-lg hover:bg-red-700 transition">
                            <i class="fa-solid fa-trash"></i> Xóa
                        </button>
                    </div>
                </div>
            </div>`;
    });
}

function filterExams() {
    const term = document.getElementById("searchInput").value.toLowerCase();
    const filtered = exams.filter(e => e.title.toLowerCase().includes(term) || e.description.toLowerCase().includes(term));
    renderExams(filtered);
}

const createExam = () => window.location.href = "exam-create.html";
const editExam = (id) => window.location.href = `exam-edit.html?id=${id}`;

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
    renderExams(exams);
    closeModal();
    if (typeof Swal !== 'undefined') Swal.fire({ icon: 'success', title: 'Đã xóa!', showConfirmButton: false, timer: 1500 });
    else alert("Đã xóa kỳ thi thành công!");
}

renderExams(exams);

fetch("../admin/header.html")
    .then(res => res.text())
    .then(data => {
        document.getElementById("header-container").innerHTML = data;
    })
    .then(() => {     
        if (typeof highlightActiveMenu === 'function') {
            highlightActiveMenu('/admin/exams');
        }
    })
    .catch(err => console.error("Lỗi Fetch HTML:", err));