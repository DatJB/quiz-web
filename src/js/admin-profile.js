// Load header
fetch("header.html")
    .then(res => res.text())
    .then(data => document.getElementById("header-container").innerHTML = data)
    .then(() => {
        highlightCurrentMenu();
        restoreSidebarState();
    });;

let originalUserData = null;

document.addEventListener('DOMContentLoaded', () => {
  if (typeof initUsers === 'function') {
    initUsers();
  }

  const currentUserRaw = localStorage.getItem(STORAGE_KEY.CURRENT_USER);
  if (!currentUserRaw) {
    window.location.href = '../auth/login.html';
    return;
  }

  const currentUserSession = JSON.parse(currentUserRaw);
  if (currentUserSession.role !== ROLE.ADMIN) {
    window.location.href = '../auth/login.html';
    return;
  }

  loadAdminProfile(currentUserSession.id);

  document.getElementById('btnBack').addEventListener('click',
      () => window.location.href = 'dashboard.html');

  document.getElementById('btnEditProfile').addEventListener('click',
      () => toggleEditMode(true));
  document.getElementById('btnCancelEdit').addEventListener('click',
      handleCancelEdit);
  document.getElementById('profileForm').addEventListener('submit',
      (e) => handleSaveProfile(e, currentUserSession.id));
  document.getElementById('btnOpenPasswordForm').addEventListener('click',
      () => togglePasswordForm(true));
  document.getElementById('btnCancelPassword').addEventListener('click',
      () => togglePasswordForm(false));
  document.getElementById('changePasswordForm').addEventListener('submit',
      (e) => handleChangePassword(e, currentUserSession.id));
});

function loadAdminProfile(adminId) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];
  const fullAdmin = users.find(u => u.id === adminId);

  if (!fullAdmin) {
    return;
  }

  originalUserData = {...fullAdmin};

  document.getElementById('profUsername').value = fullAdmin.username;
  document.getElementById('profFullName').value = fullAdmin.fullName || '';
  document.getElementById('profEmail').value = fullAdmin.email || '';
  document.getElementById('profPhone').value = fullAdmin.phoneNum || '';
}

function togglePasswordForm(isOpen) {
  const form = document.getElementById('changePasswordForm');
  const prompt = document.getElementById('passwordPrompt');
  const btnOpen = document.getElementById('btnOpenPasswordForm');

  if (isOpen) {
    form.classList.remove('hidden');
    prompt.classList.add('hidden');
    btnOpen.classList.add('hidden');
    document.getElementById('currentPassword').focus();
  } else {
    form.classList.add('hidden');
    prompt.classList.remove('hidden');
    btnOpen.classList.remove('hidden');
    form.reset();
  }
}

function toggleEditMode(isEditing) {
  const inputs = ['profFullName', 'profEmail', 'profPhone'];
  const btnEdit = document.getElementById('btnEditProfile');
  const actionButtons = document.getElementById('actionButtons');

  inputs.forEach(id => {
    document.getElementById(id).disabled = !isEditing;
  });

  if (isEditing) {
    btnEdit.classList.add('hidden');
    actionButtons.classList.remove('hidden');
    document.getElementById('profFullName').focus();
  } else {
    btnEdit.classList.remove('hidden');
    actionButtons.classList.add('hidden');
  }
}

function handleCancelEdit() {
  document.getElementById('profFullName').value = originalUserData.fullName
      || '';
  document.getElementById('profEmail').value = originalUserData.email || '';
  document.getElementById('profPhone').value = originalUserData.phoneNum || '';

  toggleEditMode(false);
}

function handleSaveProfile(event, adminId) {
  event.preventDefault();

  const fullName = document.getElementById('profFullName').value.trim();
  const email = document.getElementById('profEmail').value.trim();
  const phone = document.getElementById('profPhone').value.trim();

  if (!fullName || !email) {
    showToast("Vui lòng điền đầy đủ Họ tên và Email!", TOAST_TYPE.ERROR);
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showToast("Email không hợp lệ!", TOAST_TYPE.ERROR);
    return;
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];
  const userIndex = users.findIndex(u => u.id === adminId);

  if (userIndex === -1) {
    return;
  }

  users[userIndex].fullName = fullName;
  users[userIndex].email = email;
  users[userIndex].phoneNum = phone;

  localStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(users));
  originalUserData = {...users[userIndex]};

  showToast("Cập nhật thông tin thành công!", TOAST_TYPE.SUCCESS);
  toggleEditMode(false);
}

function handleChangePassword(event, adminId) {
  event.preventDefault();

  const currentPassword = document.getElementById(
      'currentPassword').value.trim();
  const newPassword = document.getElementById('newPassword').value.trim();
  const confirmPassword = document.getElementById(
      'confirmPassword').value.trim();

  if (!currentPassword || !newPassword || !confirmPassword) {
    showToast("Vui lòng điền đầy đủ thông tin!", TOAST_TYPE.ERROR);
    return;
  }

  if (newPassword.length < 6) {
    showToast("Mật khẩu mới phải có ít nhất 6 ký tự!", TOAST_TYPE.ERROR);
    return;
  }

  if (newPassword !== confirmPassword) {
    showToast("Mật khẩu xác nhận không khớp!", TOAST_TYPE.ERROR);
    return;
  }

  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];
  const userIndex = users.findIndex(u => u.id === adminId);

  if (userIndex === -1) {
    return;
  }

  if (users[userIndex].password !== currentPassword) {
    showToast("Mật khẩu hiện tại không đúng!", TOAST_TYPE.ERROR);
    return;
  }

  users[userIndex].password = newPassword;
  localStorage.setItem(STORAGE_KEY.USERS, JSON.stringify(users));

  showToast("Đổi mật khẩu thành công!", TOAST_TYPE.SUCCESS);
  togglePasswordForm(false);
}

function handleLogout() {
  localStorage.removeItem(STORAGE_KEY.CURRENT_USER);
  window.location.href = '../auth/login.html';
}