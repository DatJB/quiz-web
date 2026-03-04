// Dropdown button
const btn = document.getElementById("dropdownBtn");
const menu = document.getElementById("dropdownMenu");

btn.addEventListener("click", () => {
    menu.classList.toggle("hidden");
});

document.addEventListener("click", (e) => {
    if (!btn.contains(e.target) && !menu.contains(e.target)) {
        menu.classList.add("hidden");
    }
});

// User session
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (currentUser) {
    if (currentUser.fullName) {
        document.getElementById("fullname").textContent = currentUser.fullName;
        document.getElementById("name").textContent = currentUser.fullName;
    }
    if (currentUser.studentCode) document.getElementById("studentCode").textContent = currentUser.studentCode;
    if (currentUser.email) document.getElementById("email").textContent = currentUser.email;
}

// Filter
let filterType = "all";

document.addEventListener("DOMContentLoaded", () => {
    const allBtn = document.querySelector('.filter-btn');
    setFilter("all", { target: allBtn });
});

const setFilter = (type, event) => {
    filterType = type;

    document.querySelectorAll(".filter-btn").forEach(btn => {
        btn.classList.remove("bg-red-600", "text-white");
        btn.classList.add("border");
    });

    event.target.classList.remove("border");
    event.target.classList.add("bg-red-600", "text-white");

    renderExams();
};

// Render exams
initExams();
const exams = JSON.parse(localStorage.getItem("exams"));

const renderExams = () => {
    const searchTerm = document.getElementById("searchInput").value.toLowerCase();
    const examList = document.getElementById("examList");
    const emptyMessage = document.getElementById("emptyMessage");

    examList.innerHTML = "";

    const filtered = exams.filter(exam => {
        const matchSearch =
            exam.title.toLowerCase().includes(searchTerm) ||
            exam.description.toLowerCase().includes(searchTerm);

        const matchType = filterType === "all" || exam.type === filterType;

        return matchSearch && matchType;
    });

    if (filtered.length === 0) {
        emptyMessage.classList.remove("hidden");
        return;
    } else {
        emptyMessage.classList.add("hidden");
    }

    filtered.forEach(exam => {
        const card = document.createElement("div");
        card.className = "bg-white rounded-xl border shadow hover:shadow-lg transition p-6";

        const scheduledFuture =
            exam.status === "scheduled" &&
            exam.scheduledDate &&
            new Date(exam.scheduledDate) > new Date();

        card.innerHTML = `
            <div class="flex justify-between mb-2">
                <span class="text-sm font-semibold px-2 py-1 rounded-lg ${getTypeColor(exam.type)}">
                    ${getTypeLabel(exam.type)}
                </span>
                <span class="text-sm text-white font-semibold px-2 py-1 rounded-lg bg-[#B8232A]">
                    ${exam.status === "free" ? "Tự do" : "Theo lịch"}
                </span>
            </div>

            <h3 class="font-semibold text-lg mb-2 mt-4">${exam.title}</h3>
            <p class="text-md text-gray-600 mb-4">${exam.description}</p>

            <div class="text-md text-gray-600 space-y-1 mb-4 mt-6">
                <p><i class="fa-regular fa-clock ml-0.3 mr-1.5"></i> Thời gian: ${exam.duration} phút</p>
                <p><i class="fa-regular fa-file-lines ml-0.5 mr-2"></i> Số câu hỏi: ${exam.totalQuestions}</p>
                    ${exam.scheduledDate ? `<p><i class="fa-regular fa-calendar ml-0.5 mr-1.5"></i> ${new Date(exam.scheduledDate).toLocaleDateString("vi-VN", {
                        day: "2-digit",
                        month: "2-digit",
                        year: "numeric"
                    })}</p>` : ""}
            </div>

            <button onclick="startExam(${exam.id})"
            class="w-full py-2 rounded-lg text-white ${scheduledFuture ? "bg-gray-400 cursor-not-allowed" : "bg-red-600 hover:bg-red-700"}"
            ${scheduledFuture ? "disabled" : ""}
            >
                ${scheduledFuture ? "Chưa đến giờ thi" : "Bắt đầu làm bài"}
            </button>
        `;

        examList.appendChild(card);
    });
};

const getTypeLabel = (type) => {
    switch (type) {
        case "practice": return "Luyện tập";
        case "midterm": return "Giữa kỳ";
        case "final": return "Cuối kỳ";
        default: return type;
    }
};

const getTypeColor = (type) => {
    switch (type) {
        case "practice": return "bg-green-100 text-green-700";
        case "midterm": return "bg-blue-100 text-blue-700";
        case "final": return "bg-red-100 text-red-700";
        default: return "";
    }
};

const startExam = (id) => {
    const selectedExam = exams.find(e => Number(e.id) === id);
    localStorage.setItem("currentExam", JSON.stringify(selectedExam));

    window.location.href = "exam.html?id=" + id;

};

const logOut = () => {
    localStorage.removeItem("currentUser");
    window.location.href = "../auth/login.html";
};