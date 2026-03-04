const exam = JSON.parse(localStorage.getItem("currentExam"));
document.getElementById("examTitle").textContent = exam.title;

let currentQuestion = 0;
let answers = {};
let timeLeft = exam.duration * 60;
let timer;

renderQuestion();
startTimer();

// Timer
function startTimer() {
    timer = setInterval(() => {
        if (timeLeft <= 1) {
            clearInterval();
            handleSubmit();
        }
        timeLeft--;
        document.getElementById("timer").textContent = formatTime(timeLeft);
    }, 1000);
}

function formatTime(seconds) {
    const m = Math.floor(seconds / 60).toString().padStart(2, "0");
    const s = (seconds % 60).toString().padStart(2, "0");
    return `${m}:${s}`;
}

// Render question
function renderQuestion() {
    const q = exam.questions[currentQuestion];
    document.getElementById("questionText").innerHTML = 
    `<span class="text-red-600">Câu ${currentQuestion + 1}:</span> ${q.question}`;

    document.getElementById("questionInfo").textContent = 
    `Câu ${currentQuestion + 1} / ${exam.questions.length}`;

    const optionsDiv = document.getElementById("options");
    optionsDiv.innerHTML = "";

    q.options.forEach((option, index) => {
        const checked = answers[q.id] === index ? "checked" : "";
        const safeOption = option.replace(/</g, "&lt;").replace(/>/g, "&gt;");
        
        optionsDiv.innerHTML += `
        <label class="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 border cursor-pointer">
            <input type="radio" name="option" value="${index}" ${checked}
            onchange="handleAnswer(${index})" class="mt-1.5 peer accent-red-600">
            <span class="peer-checked:text-red-700"><strong>${String.fromCharCode(65 + index)}.</strong> ${safeOption}</span>
        </label>
        `;
    });

    const prevBtn = document.getElementById("prevBtn");
    if (currentQuestion === 0) {
        prevBtn.disabled = true;
        prevBtn.classList.add("opacity-50", "cursor-not-allowed");
    } else {
        prevBtn.disabled = false;
        prevBtn.classList.remove("opacity-50", "cursor-not-allowed");
    }

    const nextBtn = document.getElementById("nextBtn");
    if (currentQuestion === exam.questions.length - 1) {
        nextBtn.textContent = "Nộp bài";
        nextBtn.classList.remove("bg-red-600");
        nextBtn.classList.add("bg-[#BE393F]");
    } else {
        nextBtn.textContent = "Câu tiếp theo";
        nextBtn.classList.remove("bg-[#BE393F]");
        nextBtn.classList.add("bg-red-600");
    }

    renderGrid();
    updateProgress();
}


// Answer
function handleAnswer(value) {
    answers[exam.questions[currentQuestion].id] = value;
    updateProgress();
    renderGrid();
}

function updateProgress() {
    const answeredCount = Object.keys(answers).length;
    const percent = (answeredCount / exam.questions.length) * 100;

    document.getElementById("progressBar").style.width = percent + "%";
    document.getElementById("progressText").textContent =
        `Đã trả lời: ${answeredCount}/${exam.questions.length}`;
}

// Navigation
document.getElementById("prevBtn").onclick = () => {
    if (currentQuestion > 0) {
        currentQuestion--;
        renderQuestion();
    }
};

document.getElementById("nextBtn").onclick = () => {
    if (currentQuestion < exam.questions.length - 1) {
        currentQuestion++;
        renderQuestion();
    } else {
        openDialog();
    }
};

// Grid
function renderGrid() {
    const grid = document.getElementById("questionGrid");
    grid.innerHTML = "";

    exam.questions.forEach((q, index) => {
        const answered = answers[q.id] !== undefined;
        const active = index === currentQuestion;

        let statusClass = "";

        if (active) {
            statusClass = "bg-red-600 text-white";
        } else if (answered) {
            statusClass = "bg-green-100";
        }

        grid.innerHTML += `
            <button onclick="goToQuestion(${index})"
                class="w-13 h-10 border rounded-lg ${statusClass}">
                ${index + 1}
            </button>
        `;
    });
}

function goToQuestion(index) {
    currentQuestion = index;
    renderQuestion();
}

// Submit
function openDialog() {
    const answeredCount = Object.keys(answers).length;

    if (answeredCount === exam.questions.length) {
        document.getElementById("dialogText").innerHTML =
            `Bạn đã trả lời <strong>${answeredCount}/${exam.questions.length}</strong> câu.<br>
            Bạn có chắc chắn muốn nộp bài?`;
    } else {
        document.getElementById("dialogText").innerHTML =
            `Bạn đã trả lời <strong>${answeredCount}/${exam.questions.length}</strong> câu.<br>
            <p class="text-red-600 text-sm mt-2 mb-2">Còn <strong>${exam.questions.length - answeredCount}</strong> câu chưa trả lời!</p> 
            Bạn có chắc chắn muốn nộp bài?`;
    }

    document.getElementById("submitDialog").classList.remove("hidden");
    document.getElementById("submitDialog").classList.add("flex");
}

function closeDialog() {
    document.getElementById("submitDialog").classList.add("hidden");
}

function handleSubmit() {
    clearInterval(timer);

    let correctCount = 0;
    exam.questions.forEach(q => {
        if (answers[q.id] === q.correctAnswer) correctCount++;
    });

    const result = {
        examId: exam.id,
        answers: answers,
        correctAnswers: correctCount,
        totalQuestions: exam.questions.length,
        score: (correctCount / exam.questions.length) * 10,
        completedAt: new Date().toISOString()
    };

    localStorage.setItem(`result-${exam.id}`, JSON.stringify(result));

    window.location.href = `result.html?examId=${exam.id}`;
}