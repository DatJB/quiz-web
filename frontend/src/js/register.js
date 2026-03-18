document.addEventListener('DOMContentLoaded', () => {
  if (typeof initUsers === 'function') {
    initUsers();
  }

  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', handleRegister);
});

function handleRegister(event) {
  event.preventDefault();

  const formData = extractFormData();

  if (!validateFormat(formData)) {
    return;
  }
  if (isDuplicateUser(formData.username, formData.studentCode)) {
    return;
  }

  saveNewUser(formData);
}

function extractFormData() {
  return {
    fullName: document.getElementById('fullName').value.trim(),
    studentCode: document.getElementById(
        'studentCode').value.trim().toUpperCase(), // Mã SV thường viết hoa
    email: document.getElementById('email').value.trim(),
    username: document.getElementById('username').value.trim(),
    password: document.getElementById('password').value.trim(),
    confirmPassword: document.getElementById('confirmPassword').value.trim()
  };
}

function validateFormat(data) {
  if (!data.fullName || !data.studentCode || !data.email || !data.username
      || !data.password || !data.confirmPassword) {
    showToast("Vui lòng điền đầy đủ thông tin!", TOAST_TYPE.ERROR);
    return false;
  }

  if (data.username.length < 3) {
    showToast("Tên đăng nhập phải có ít nhất 3 ký tự!", TOAST_TYPE.ERROR);
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showToast("Email không hợp lệ!", TOAST_TYPE.ERROR);
    return false;
  }

  if (data.password.length < 6) {
    showToast("Mật khẩu phải có ít nhất 6 ký tự!", TOAST_TYPE.ERROR);
    return false;
  }

  if (data.password !== data.confirmPassword) {
    showToast("Mật khẩu xác nhận không khớp!", TOAST_TYPE.ERROR);
    return false;
  }

  return true;
}

function isDuplicateUser(username, studentCode) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];

  const isUsernameExists = users.some(u => u.username === username);
  if (isUsernameExists) {
    showToast("Tên đăng nhập đã tồn tại!", TOAST_TYPE.ERROR);
    return true;
  }

  const isStudentCodeExists = users.some(u => u.studentCode === studentCode);
  if (isStudentCodeExists) {
    showToast("Mã sinh viên đã được đăng ký!", TOAST_TYPE.ERROR);
    return true;
  }

  return false;
}

function saveNewUser(data) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];

  const newUser = {
    id: Date.now().toString(),
    username: data.username,
    password: data.password,
    fullName: data.fullName,
    email: data.email,
    studentCode: data.studentCode,
    role: ROLE.STUDENT,
    createdAt: new Date().toISOString().split('T')[0]
  };

  users.push(newUser);
  localStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(users));

  showToast("Đăng ký thành công!", TOAST_TYPE.SUCCESS);

  setTimeout(() => {
    window.location.href = "login.html";
  }, 1500);
}