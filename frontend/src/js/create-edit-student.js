// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });

initUsers();

let users = JSON.parse(localStorage.getItem("users")) || [];
let students = users.filter(user => user.role === "student");

const params = new URLSearchParams(window.location.search);
const studentId = params.get("studentId");

const isEdit = !!studentId;

let formData = {
    studentCode: "",
    studentName: "",
    studentEmail: "",
    studentClass: "",
    password: "",
    confirmPassword: ""
};

const form = document.querySelector("form");

const studentCodeInput = document.getElementById("studentCode");
const nameInput = document.getElementById("studentName");
const emailInput = document.getElementById("studentEmail");
const classInput = document.getElementById("studentClass");
const passwordInput = document.getElementById("password");
const confirmPasswordInput = document.getElementById("confirmPassword");


if (isEdit) {
    const student = students.find(student => String(student.id) === studentId);

    if (student) {
        formData = {
            studentCode: student.studentCode,
            studentName: student.fullName,
            studentEmail: student.email,
            studentClass: student.studentClass,
            password: "",
            confirmPassword: ""
        };

        studentCodeInput.value = student.studentCode;
        nameInput.value = student.fullName;
        emailInput.value = student.email;
        classInput.value = student.studentClass ? student.studentClass : "D20CQCN05-B";

        studentCodeInput.disabled = true;
        studentCodeInput.classList.add("bg-gray-100", "cursor-not-allowed");
    }
}


function goToStudents() {
    window.location.href = "manage-students.html";
}


form.addEventListener("submit", function (e) {
    e.preventDefault();

    formData = {
        studentCode: studentCodeInput.value.trim(),
        name: nameInput.value.trim(),
        email: emailInput.value.trim(),
        class: classInput.value.trim(),
        password: passwordInput.value,
        confirmPassword: confirmPasswordInput.value
    };

    if (!formData.studentCode || !formData.name || !formData.email || !formData.class) {
        alert("Vui lòng điền đầy đủ thông tin bắt buộc!");
        return;
    }

    const codeExists = students.some(
        student => student.studentCode === formData.studentCode
    );

    if (!isEdit && codeExists) {
        alert("Mã sinh viên đã tồn tại!");
        return;
    }

    if (!isEdit || formData.password) {
        if (!formData.password) {
            alert("Vui lòng nhập mật khẩu!");
            return;
        }

        if (!formData.confirmPassword) {
            alert("Vui lòng xác nhận mật khẩu!");
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            alert("Mật khẩu xác nhận không khớp!");
            return;
        }
}

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email)) {
        alert("Email không hợp lệ!");
        return;
    }

    if (formData.password && formData.password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự!");
        return;
    }


    if (!isEdit) {
        const newStudent = {
            id: Date.now().toString(),
            role: "student",
            studentCode: formData.studentCode,
            fullName: formData.name,
            email: formData.email,
            studentClass: formData.class,
            password: formData.password,
            createdAt: Date.now()
        };

        users.push(newStudent);
        alert("Thêm sinh viên thành công!");
    } else {
        const index = users.findIndex(u => String(u.id) === studentId);

        if (index !== -1) {
            users[index].fullName = formData.name;
            users[index].email = formData.email;
            users[index].studentClass = formData.class;

            if (formData.password) {
                users[index].password = formData.password;
            }
        }
        alert("Cập nhật sinh viên thành công!");
    }

    localStorage.setItem("users", JSON.stringify(users));

    setTimeout(() => {
        window.location.href = "manage-students.html";
    }, 750);

});