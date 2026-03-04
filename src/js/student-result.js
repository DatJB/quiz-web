const params = new URLSearchParams(window.location.search);
const examId = params.get("examId");
const examData = JSON.parse(localStorage.getItem("currentExam"));

loadResult();

function loadResult() {
    const result = JSON.parse(localStorage.getItem("result-" + examId));

    renderPage(result);
}

function renderPage(result) {
    document.getElementById("examTitle").innerText = examData.title;

    const score = result.score;
    const percent = (result.correctAnswers / result.totalQuestions) * 100;

    document.getElementById("scoreValue").innerText = score.toFixed(1);

    const scoreCircle = document.getElementById("scoreCircle");
    const scoreLabel = document.getElementById("scoreLabel");

    if (score >= 5) {
        scoreCircle.classList.add("border-green-500", "bg-green-50");
    } else {
        scoreCircle.classList.add("border-red-500", "bg-red-50");
    }

    if (score >= 8) scoreLabel.innerText = "Xuất sắc";
    else if (score >= 6.5) scoreLabel.innerText = "Khá";
    else if (score >= 5) scoreLabel.innerText = "Trung bình";
    else scoreLabel.innerText = "Yếu";

    document.getElementById("correctInfo").innerText =
        result.correctAnswers + "/" + result.totalQuestions;

    document.getElementById("percentInfo").innerText =
        percent.toFixed(0) + "%";

    document.getElementById("completedTime").innerText =
        new Date(result.completedAt).toLocaleTimeString("vi-VN");

    document.getElementById("progressText").innerText =
        result.correctAnswers + "/" + result.totalQuestions + " câu";

    document.getElementById("progressBar").style.width =
        percent + "%";

    renderDetails(result);
}

function renderDetails(result) {
    const container = document.getElementById("detailContainer");
    container.innerHTML = "";

    examData.questions.forEach((q, index) => {
        const userAnswer = result.answers[q.id];
        const isCorrect = userAnswer === q.correctAnswer;

        let block = document.createElement("div");
        block.className = "p-4 rounded-lg border-2 " +
        (isCorrect
            ? "bg-green-50 border-green-200"
            : "bg-red-50 border-red-200");

        let optionsHtml = "";

        q.options.forEach((opt, i) => {

            const isUser = userAnswer === i;
            const isRight = i === q.correctAnswer;

            let style = "bg-white border border-gray-200";

            if (isRight) style = "bg-green-100 border border-green-300";
            else if (isUser) style = "bg-red-100 border border-red-300";

            const safeOpt = opt.replace(/</g, "&lt;").replace(/>/g, "&gt;");
            optionsHtml += `
                <div class="p-2 rounded ${style}">
                    <strong>${String.fromCharCode(65 + i)}.</strong> ${safeOpt}
                </div>
                `;
        });

        let optionStyle = "bg-gray-200 border-[#DADBDD]";
        if (result.answers[q.id] !== undefined) {
            if (isCorrect) optionStyle = "bg-green-100 border-[#C5E2CF]";
            else optionStyle = "bg-red-100 border-[#E5CBCB]";
        }

        block.innerHTML = `
            <p class="font-medium mb-3">
                Câu ${index + 1}: ${q.question}
            </p>
            <div class="space-y-2 mb-3">
                ${optionsHtml}
            </div>
            <div class="text-sm mt-5">
                <span class="px-2 py-1 ${optionStyle} rounded-xl font-semibold border">
                    ${result.answers[q.id] !== undefined ? "Bạn chọn:" : ""} ${userAnswer !== undefined ? String.fromCharCode(65 + userAnswer) : "Chưa trả lời"}
                </span>
                <span class="px-2 py-1 bg-green-100 rounded-xl font-semibold border border-[#C5E2CF] ml-2">
                    Đáp án đúng: ${String.fromCharCode(65 + q.correctAnswer)}
                </span>
            </div>
            ${q.explanation ? `
                <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-[#BEDBFF] text-sm">
                    <strong>Giải thích:</strong> ${q.explanation}
                </div>` : ""}
            `;

            container.appendChild(block);
        });
}

function goHome() {
    window.location.href = "home.html";
}