let testWords = [];
try {
    testWords = JSON.parse(localStorage.getItem("testWords"));
    if (!Array.isArray(testWords) || testWords.length === 0) throw new Error();
} catch {
    window.location.href = "index.html";
}

let currentIndex = -1;
let usedIndices = [];
let score = 0;

function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

const shuffledWords = shuffle([...testWords]);

function nextWord() {
    if (usedIndices.length === shuffledWords.length) {
        document.getElementById("viet-meaning").textContent = "🎉 Đã hoàn thành bài kiểm tra!";
        document.getElementById("eng-input").style.display = "none";
        document.getElementById("progress").textContent = "";
        document.querySelector(".actions").style.display = "none";
        showSummary();
        return;
    }

    do {
        currentIndex = Math.floor(Math.random() * shuffledWords.length);
    } while (usedIndices.includes(currentIndex));

    usedIndices.push(currentIndex);

    document.getElementById("viet-meaning").textContent = shuffledWords[currentIndex].meaning.join(", ");
    document.getElementById("eng-input").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "";
    document.getElementById("eng-input").style.display = "inline-block";
    document.getElementById("progress").textContent = `Câu ${usedIndices.length} / ${shuffledWords.length}`;
    document.querySelector(".actions").style.display = "block";
}

function submitAnswer() {
    const input = document.getElementById("eng-input").value.trim().toLowerCase();
    const correct = shuffledWords[currentIndex].word.toLowerCase();
    const feedback = document.getElementById("feedback");

    if (input === correct) {
        score++;
        feedback.textContent = "✅ Chính xác!";
        feedback.className = "correct";
    } else {
        feedback.textContent = `❌ Sai rồi! Đáp án đúng là: ${shuffledWords[currentIndex].word}`;
        feedback.className = "incorrect";
    }

    setTimeout(nextWord, 1000);
}

function showSynonym() {
    const s = shuffledWords[currentIndex].synonyms || "Không có";
    const feedback = document.getElementById("feedback");
    feedback.textContent = "🟦 Từ đồng nghĩa: " + s;
    feedback.className = "";
}

function restartTest() {
    location.reload();
}

function goBack() {
    window.location.href = "index.html";
}

function showSummary() {
    const percent = Math.round((score / shuffledWords.length) * 100);
    const summaryDiv = document.getElementById("summary");
    summaryDiv.style.display = "block";
    summaryDiv.innerHTML = `
    <h3>Kết quả bài kiểm tra</h3>
    <p>Tổng số câu: ${shuffledWords.length}</p>
    <p>Số câu đúng: ${score}</p>
    <p>Số câu sai: ${shuffledWords.length - score}</p>
    <p>Chính xác: ${percent}%</p>
    <div class="actions" style="margin-top: 20px;">
        <button onclick="goBack()">🏠 Trang chủ</button>
        <button onclick="restartTest()">🔁 Làm lại</button>
    </div>
  `;
}

window.onload = nextWord;
