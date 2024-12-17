document.addEventListener("DOMContentLoaded", () => {
    const questions = document.querySelectorAll(".question");
    const nextBtn = document.getElementById("next-btn");
    const prevBtn = document.getElementById("prev-btn");
    const submitBtn = document.getElementById("submit-btn");
    const resultPopup = document.getElementById("result-popup");
    const scorePopup = document.getElementById("score-popup");
    const correctAnswersPopup = document.getElementById("correct-answers-popup");
    const incorrectAnswersPopup = document.getElementById("incorrect-answers-popup");
    const closeBtn = document.getElementById("close-btn");

    const correctAnswers = [2, 1, 0, 0, 1, 0, 0, 1, 1, 2]; // Réponses correctes par index
    let currentQuestion = 0;

    // Ajouter l'élément d'erreur pour chaque question
    questions.forEach((question, index) => {
        const errorContainer = document.createElement("div");
        errorContainer.className = "error-message-container";
        errorContainer.style.color = "red";
        question.appendChild(errorContainer);
    });

    function showQuestion(index) {
        questions.forEach((q, i) => q.classList.toggle("active", i === index));
        prevBtn.classList.toggle("hidden", index === 0);
        nextBtn.classList.toggle("hidden", index === questions.length - 1);
        submitBtn.classList.toggle("hidden", index !== questions.length - 1);
    }

    function checkSelection() {
        const selected = document.querySelector(`input[name="q${currentQuestion + 1}"]:checked`);
        const errorContainer = questions[currentQuestion].querySelector(".error-message-container");
        if (!selected) {
            errorContainer.textContent = "Veuillez sélectionner une réponse pour continuer.";
            setTimeout(() => errorContainer.textContent = "", 3000);
            return false;
        }
        return true;
    }

    nextBtn.addEventListener("click", () => {
        if (checkSelection()) {
            currentQuestion++;
            showQuestion(currentQuestion);
        }
    });

    prevBtn.addEventListener("click", () => {
        if (currentQuestion > 0) currentQuestion--;
        showQuestion(currentQuestion);
    });

    submitBtn.addEventListener("click", () => {
        let score = 0;
        correctAnswersPopup.innerHTML = "";
        incorrectAnswersPopup.innerHTML = "";

        questions.forEach((question, index) => {
            const selected = question.querySelector(`input[name="q${index + 1}"]:checked`);
            const correctIndex = correctAnswers[index];
            if (selected) {
                if (parseInt(selected.value) === correctIndex) {
                    score++;
                    correctAnswersPopup.innerHTML += `<li>Question ${index + 1} : Correct (Proposition choisie : ${selected.nextSibling.textContent.trim()})</li>`;
                } else {
                    incorrectAnswersPopup.innerHTML += `<li>Question ${index + 1} : Incorrect (Proposition choisie : ${selected.nextSibling.textContent.trim()})</li>`;
                }
            }
        });

        scorePopup.textContent = `Votre score est de ${score} / ${questions.length}`;
        resultPopup.classList.add("show");
    });

    closeBtn.addEventListener("click", () => {
        resultPopup.classList.remove("show");
    });

    showQuestion(currentQuestion); // Initialiser l'affichage des questions

    // Gestion des labels pour les questions
    document.querySelectorAll('.question label').forEach(label => {
        label.addEventListener('click', function () {
            document.querySelectorAll('.question label').forEach(item => item.classList.remove('active'));
            this.classList.add('active');
        });
    });
});
