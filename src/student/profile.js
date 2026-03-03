document.addEventListener('DOMContentLoaded', () => {
  if (typeof initUsers === 'function') {
    initUsers();
  }
  if (typeof initExams === 'function') {
    initExams();
  }
  if (typeof initResults === 'function') {
    initResults();
  }

  const currentUserRaw = localStorage.getItem(STORAGE_KEY.CURRENT_USER);
  if (!currentUserRaw) {
    window.location.href = '../auth/login.html';
    return;
  }

  const currentUserSession = JSON.parse(currentUserRaw);
  if (currentUserSession.role !== ROLE.STUDENT) {
    window.location.href = '../auth/login.html';
    return;
  }

  loadAndRenderProfile(currentUserSession);

  document.getElementById('btnLogout').addEventListener('click', handleLogout);
  document.getElementById('btnBack').addEventListener('click',
      () => window.location.href = 'home.html');
  document.getElementById('changePasswordForm').addEventListener('submit',
      (e) => handleChangePassword(e, currentUserSession.id));
});

function loadAndRenderProfile(sessionData) {
  const users = JSON.parse(localStorage.getItem(STORAGE_KEY.USERS)) || [];
  const results = JSON.parse(localStorage.getItem(STORAGE_KEY.RESULTS)) || [];
  const exams = JSON.parse(localStorage.getItem(STORAGE_KEY.EXAMS)) || [];

  const fullUser = users.find(u => u.id === sessionData.id);
  if (!fullUser) {
    return;
  }

  const studentResults = results.filter(r => r.studentId === fullUser.id);

  renderProfileInfo(fullUser);
  renderStatistics(studentResults);
  renderHistory(studentResults, exams);
}

function renderProfileInfo(user) {
  document.getElementById('profStudentCode').value = user.studentCode || 'N/A';
  document.getElementById('profFullName').value = user.fullName || '';
  document.getElementById('profEmail').value = user.email || '';
  document.getElementById('profUsername').value = user.username || '';

  document.getElementById('profPhone').value = user.phoneNum || 'Chưa cập nhật';
  document.getElementById('profClass').value = user.studentClass
      || 'Chưa cập nhật';
}

function renderStatistics(studentResults) {
  const totalExams = studentResults.length;
  let avgScore = 0;
  let highScore = 0;

  if (totalExams > 0) {
    const totalScore = studentResults.reduce((sum, r) => sum + r.score, 0);
    avgScore = (totalScore / totalExams).toFixed(1);
    highScore = Math.max(...studentResults.map(r => r.score)).toFixed(1);
  }

  document.getElementById('statTotalExams').innerText = totalExams;
  document.getElementById('statAvgScore').innerText = avgScore;
  document.getElementById('statHighScore').innerText = highScore;
}

function renderHistory(studentResults, exams) {
  const container = document.getElementById('historyContainer');
  container.innerHTML = '';

  if (studentResults.length === 0) {
    container.innerHTML = `
            <div class="text-center py-8 text-gray-500">
                <p>Bạn chưa tham gia bài thi nào.</p>
            </div>
        `;
    return;
  }

  const sortedResults = studentResults.sort(
      (a, b) => new Date(b.completedAt) - new Date(a.completedAt));

  sortedResults.slice(0, 5).forEach(result => {
    const exam = exams.find(e => e.id === result.examId);
    const examTitle = exam ? exam.title : 'Bài thi không xác định';

    const dateObj = new Date(result.completedAt);
    const formattedDate = dateObj.toLocaleDateString('vi-VN') + ' '
        + dateObj.toLocaleTimeString('vi-VN',
            {hour: '2-digit', minute: '2-digit'});

    const historyItem = document.createElement('div');
    historyItem.className = 'flex items-center justify-between p-4 bg-gray-50 rounded-lg border border-gray-100 hover:shadow-md transition-shadow';
    historyItem.innerHTML = `
            <div>
                <p class="font-bold text-gray-800">${examTitle}</p>
                <p class="text-sm text-gray-500 mt-1 flex items-center gap-1">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    ${formattedDate}
                </p>
            </div>
            <div class="text-right">
                <p class="text-2xl font-bold text-[#EC3136]">${result.score.toFixed(
        1)} <span class="text-sm font-normal text-gray-500">điểm</span></p>
                <p class="text-xs text-gray-500 font-medium">${result.correctAnswers}/${result.totalQuestions} câu đúng</p>
            </div>
        `;
    container.appendChild(historyItem);
  });
}

function handleChangePassword(event, userId) {
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
  const userIndex = users.findIndex(u => u.id === userId);

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
  document.getElementById('changePasswordForm').reset();
}

function handleLogout() {
  localStorage.removeItem(STORAGE_KEY.CURRENT_USER);
  window.location.href = '../auth/login.html';
}