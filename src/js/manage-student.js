initUsers();

let users = JSON.parse(localStorage.getItem("users")) || [];
let students = users.filter(user => user.role === "student");

const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("searchInput");
const emptyBox = document.getElementById("emptyBox");
const studentCount = document.getElementById("studentCount");

function renderStudents(data) {
    studentTable.innerHTML = "";

    if (data.length === 0) {
        emptyBox.style.display = "block";
    } else {
        emptyBox.style.display = "none";
    }

    data.forEach(student => {
        const row = `
            <tr class="border-b hover:bg-gray-50">
                <td class="py-3 px-4 font-medium">${student.studentCode || ""}</td>
                <td class="py-3 px-4">
                    <div class="flex items-center gap-2">
                        <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
                            <img src="../../images/user.svg"
                                class="w-4 h-4 opacity-70"
                                alt="user icon" />
                        </div>
                        <span>${student.fullName}</span>
                    </div>
                </td>
                <td class="py-3 px-4">${student.className || ""}</td>
                <td class="py-3 px-4">
                    <div class="flex items-center gap-2 text-gray-600">
                        <img src="../../images/mail.svg"
                            class="w-4 h-4 opacity-80"
                            alt="mail icon" />
                        <span>${student.email}</span>
                    </div>
                </td>
                <td class="py-3 px-4 text-gray-600">${formatDate(student.createdAt)}</td>
                <td class="py-3 px-4">
                    <div class="flex justify-center items-center gap-2"> 
                        <button onclick="editStudent('${student.id}')" 
                            class="p-2 border border-gray-300 rounded-lg hover:bg-gray-200 transition-all duration-200"
                        >   
                            <img src="../../images/edit.svg" class="w-5 h-5">
                        </button>
                            
                        <button onclick="deleteStudent('${student.id}')" 
                            class="p-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-100 transition-all duration-200"
                        >
                            <img src="../../images/trash.svg" class="w-5 h-5">
                        </button>
                    </div>
                </td>
            </tr>
        `;

        studentTable.innerHTML += row;
    });

    studentCount.textContent = data.length;
}

function formatDate(dateString) {
    if (!dateString) return "";

    const date = new Date(dateString);
    return date.toLocaleDateString("vi-VN");
}

searchInput.addEventListener("input", function(e) {
    const keyword = e.target.value.toLowerCase();

    const filtered = students.filter(student => 
        student.fullName.toLowerCase().includes(keyword) ||
        student.email.toLowerCase().includes(keyword) ||
        student.studentCode.toLowerCase().includes(keyword)
    );

    renderStudents(filtered);
});

function deleteStudent(id) {
    if (!confirm("Bạn có chắc muốn xóa sinh viên này?")) return;

    users = users.filter(user => user.id !== id);
    students = users.filter(user => user.role === "student");

    localStorage.setItem("users", JSON.stringify(users));

    renderStudents(students);
}

renderStudents(students);