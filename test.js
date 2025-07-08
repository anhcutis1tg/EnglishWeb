let testWords = [];
try {
    testWords = JSON.parse(localStorage.getItem("testWords"));
    if (!Array.isArray(testWords) || testWords.length === 0) throw new Error();
} catch {
    window.location.href = "index.html";
}

let currentIndex = -1;
let usedIndices = [];

function nextWord() {
    if (usedIndices.length === testWords.length) {
        document.getElementById("eng-word").textContent = "🎉 Đã hoàn thành bài kiểm tra!";
        document.getElementById("viet-input").style.display = "none";

        const actionsDiv = document.querySelector(".actions");
        actionsDiv.innerHTML = ""; // Xóa các nút cũ

        const backBtn = document.createElement("button");
        backBtn.textContent = "Quay về trang chủ";
        backBtn.onclick = goBack;
        actionsDiv.appendChild(backBtn);

        return;
    }


    do {
        currentIndex = Math.floor(Math.random() * testWords.length);
    } while (usedIndices.includes(currentIndex));

    usedIndices.push(currentIndex);

    document.getElementById("eng-word").textContent = testWords[currentIndex].word;
    document.getElementById("viet-input").value = "";
    document.getElementById("feedback").textContent = "";
    document.getElementById("feedback").className = "";
}

// function checkAnswer() {
//     const input = document.getElementById("viet-input").value.trim().toLowerCase();
//     const feedback = document.getElementById("feedback");
//     const meanings = testWords[currentIndex].meaning;

//     let isCorrect = false;

//     if (Array.isArray(meanings)) {
//         isCorrect = meanings.some(m => input === m.toLowerCase());
//     } else {
//         isCorrect = input === meanings.toLowerCase();
//     }

//     if (isCorrect) {
//         feedback.textContent = "✅ Chính xác!";
//         feedback.className = "correct";
//     } else {
//         feedback.textContent = `❌ Sai rồi!`;
//         feedback.className = "incorrect";
//     }
// }
function checkAnswer() {
    const input = document.getElementById("viet-input").value.trim().toLowerCase();
    const meanings = testWords[currentIndex].meaning.map(m => m.toLowerCase());
    const feedback = document.getElementById("feedback");

    if (meanings.includes(input)) {
        feedback.textContent = "✅ Chính xác!";
        feedback.className = "correct";
    } else {
        feedback.textContent = `❌ Sai rồi!`;
        feedback.className = "incorrect";
    }
}




function showMeaning() {
    const feedback = document.getElementById("feedback");
    feedback.textContent = "📘 Nghĩa: " + testWords[currentIndex].meaning;
    feedback.className = "";
}

function showSynonym() {
    const s = testWords[currentIndex].synonyms || "Không có";
    const feedback = document.getElementById("feedback");
    feedback.textContent = "🟦 Từ đồng nghĩa: " + s;
    feedback.className = "";
}

function goBack() {
    window.location.href = "index.html";
}

window.onload = nextWord;
