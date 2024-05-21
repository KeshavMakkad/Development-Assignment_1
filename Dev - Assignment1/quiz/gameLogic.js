const toggleButtonsState = () => {
  const btns = document.querySelectorAll(".quiz-option");
  btns.forEach((btn) => {
    btn.disabled = !btn.disabled;
  });
};

export default function startGame(quizData) {
  const questionText = document.querySelector(".quiz-question-text");
  const options = document.querySelectorAll(".quiz-option");
  const quizContainer = document.querySelector(".quiz-question-container");
  const progressText = document.querySelector(".progress-text");
  const progressBarFill = document.querySelector(".progress-bar-fill");
  const scoreText = document.querySelector(".score");

  let score = 0;
  const totalQuestions = quizData.length;
  // const totalQuestions = 1;
  let currentQuestionNumber = 0;

  options.forEach((option) => {
    option.addEventListener("click", (e) => checkAnswer(option.children[1]));
  });

  loadQuestion();

  function loadQuestion() {
    if (quizData.length === 0) {
      endGame();
      return;
    }

    currentQuestionNumber++;
    updateProgress();

    const currQuestionIndex = getRandomIndex();
    const currQuestion = quizData[currQuestionIndex];

    questionText.textContent = currQuestion.question;

    const currOptions = currQuestion.options;

    for (let i = 0; i < options.length; i++) {
      options[i].children[1].textContent = currOptions[i];
      options[i].children[1].style.backgroundColor = "white";
      options[i].children[1].style.color = "black";
    }

    quizContainer.dataset.currQuestionIndex = currQuestionIndex;
  }

  function checkAnswer(e) {
    const currQuestionIndex = quizContainer.dataset.currQuestionIndex;
    const currQuestion = quizData[currQuestionIndex];
    const selectedOption = e.textContent;

    if (selectedOption === currQuestion.correctAnswer) {
      score += 10;
      e.style.backgroundColor = "green";
      e.style.color = "white";
    } else {
      e.style.backgroundColor = "red";
      e.style.color = "white";
    }

    scoreText.textContent = `Score: ${score}`;
    quizData.splice(currQuestionIndex, 1);

    toggleButtonsState();
    setTimeout(() => {
      toggleButtonsState();
      loadQuestion();
    }, 1000);
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * quizData.length);
  }

  function updateProgress() {
    const progress = (currentQuestionNumber / totalQuestions) * 100;
    progressBarFill.style.width = `${progress}%`;
    progressText.textContent = `Question ${currentQuestionNumber}/${totalQuestions}`;
  }

  function endGame() {
    quizContainer.innerHTML = `
      <div class="quiz-end">
        <h2>Quiz Completed!</h2>
        <p>Your score is ${score} out of ${totalQuestions}</p>
        <div class="end-buttons">
          <button onclick="window.location='./../index.html'" class = "end-button">Home</button>
          <button onclick="window.location='./quiz.html'" class = "end-button">Restart</button>
        </div>
      </div>
    `;
  }
}
