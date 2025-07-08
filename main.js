localStorage.removeItem("testWords");
let selectedTopics = [];
let selectedTypes = [];
let selectedWords = [];

function updateSelectedWords() {
    selectedTypes = Array.from(document.querySelectorAll("input[name='type']:checked")).map(c => c.value);
    selectedWords = words.filter(w => selectedTopics.includes(w.topic) && selectedTypes.includes(w.type));
}

window.onload = () => {
    const topicsDiv = document.getElementById("topics");
    for (let i = 1; i <= 10; i++) {
        const button = document.createElement("button");
        button.className = "topic-button";
        button.textContent = "Chủ đề " + i;
        button.dataset.topic = i;

        button.addEventListener("click", () => {
            const topicId = parseInt(button.dataset.topic);
            if (selectedTopics.includes(topicId)) {
                selectedTopics = selectedTopics.filter(t => t !== topicId);
                button.classList.remove("selected");
            } else {
                selectedTopics.push(topicId);
                button.classList.add("selected");
            }

            updateSelectedWords();
        });

        topicsDiv.appendChild(button);
    }

    // Bắt sự kiện thay đổi loại từ
    document.querySelectorAll("input[name='type']").forEach(cb => {
        cb.addEventListener("change", updateSelectedWords);
    });
};

function showWords() {
    const listDiv = document.getElementById("word-list");
    listDiv.innerHTML = "<h2>Từ liên quan:</h2>";

    const typeLabels = {
        N: "Danh từ",
        V: "Động từ",
        ADJ: "Tính từ",
        PV: "Cụm động từ"
    };

    selectedTopics.forEach(topic => {
        const topicSection = document.createElement("div");
        const topicHeading = document.createElement("h3");
        topicHeading.textContent = "📘 Chủ đề " + topic;
        topicSection.appendChild(topicHeading);

        selectedTypes.forEach(type => {
            const wordsOfGroup = selectedWords.filter(w => w.topic === topic && w.type === type);
            if (wordsOfGroup.length > 0) {
                const typeHeading = document.createElement("h4");
                typeHeading.textContent = "➤ " + typeLabels[type];
                topicSection.appendChild(typeHeading);

                const ul = document.createElement("ul");
                wordsOfGroup.forEach(w => {
                    const li = document.createElement("li");
                    li.textContent = `${w.word} - ${w.meaning}`;
                    ul.appendChild(li);
                });

                topicSection.appendChild(ul);
            }
        });

        listDiv.appendChild(topicSection);
    });
}

function startTest() {
    if (selectedWords.length === 0) {
        alert("Vui lòng chọn ít nhất một chủ đề và loại từ trước khi bắt đầu kiểm tra.");
        return;
    }

    localStorage.setItem("testWords", JSON.stringify(selectedWords));
    window.location.href = "test.html";
}
