document.addEventListener('DOMContentLoaded', () => {
  if (typeof initUsers === 'function') {
    initUsers();
  }

  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', handleLogin);
});

function handleLogin(event) {
  event.preventDefault();

  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  if (!isValidInput(usernameInput, passwordInput)) {
    return;
  }

  authenticateUser(usernameInput, passwordInput);
}

function isValidInput(username, password) {
  if (!username || !password) {
    showToast("Vui lòng điền đầy đủ thông tin!", TOAST_TYPE.ERROR);
    return false;
  }

  if (username.length < 3) {
    showToast("Tên đăng nhập phải có ít nhất 3 ký tự!", TOAST_TYPE.ERROR);
    return false;
  }

  if (password.length < 6) {
    showToast("Mật khẩu phải có ít nhất 6 ký tự!", TOAST_TYPE.ERROR);
    return false;
  }

  return true;
}

function authenticateUser(username, password) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];
  const validUser = users.find(
      u => u.username === username && u.password === password);

  if (!validUser) {
    showToast("Sai tên đăng nhập hoặc mật khẩu!", TOAST_TYPE.ERROR);
    return;
  }

  processSuccessfulLogin(validUser);
}

function processSuccessfulLogin(user) {
  const sessionData = {
    id: user.id,
    username: user.username,
    role: user.role
  };

  localStorage.setItem(STORAGE_KEY.CURRENT_USER, JSON.stringify(user));
  showToast("Đăng nhập thành công!", TOAST_TYPE.SUCCESS);
  setTimeout(() => {
    if (user.role === ROLE.ADMIN) {
      window.location.href = "../admin/dashboard.html";
    } else {
      window.location.href = "../student/home.html";
    }
  }, 1000);
}