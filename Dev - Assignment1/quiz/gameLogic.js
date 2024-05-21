export default function startGame(quizData) {
  const questionText = document.querySelector(".quiz-question-text");
  const options = document.querySelectorAll(".quiz-option-text");
  const quizContainer = document.querySelector(".quiz-question-container");

  let score = 0;
  const totalQuestions = quizData.length;

  options.forEach((option) => {
    option.addEventListener("click", (e) => checkAnswer(e));
  });

  loadQuestion();

  function loadQuestion() {
    if (quizData.length === 0) {
      endGame();
      return;
    }

    const currQuestionIndex = getRandomIndex();
    const currQuestion = quizData[currQuestionIndex];

    questionText.textContent = currQuestion.question;

    const currOptions = currQuestion.options;

    for (let i = 0; i < options.length; i++) {
      options[i].textContent = currOptions[i];
      options[i].style.backgroundColor = "white";
      options[i].style.color = "black";
    }

    quizContainer.dataset.currQuestionIndex = currQuestionIndex;
  }

  function checkAnswer(e) {
    const currQuestionIndex = quizContainer.dataset.currQuestionIndex;
    const currQuestion = quizData[currQuestionIndex];
    const selectedOption = e.target.textContent;

    if (selectedOption === currQuestion.correctAnswer) {
      score++;
      e.target.style.backgroundColor = "green";
      e.target.style.color = "white";
    } else {
      e.target.style.backgroundColor = "red";
      e.target.style.color = "white";
    }

    quizData.splice(currQuestionIndex, 1);

    setTimeout(() => {
      loadQuestion();
    }, 1000);
  }

  function getRandomIndex() {
    return Math.floor(Math.random() * quizData.length);
  }

  function endGame() {
    quizContainer.innerHTML = `
        <div class="quiz-end">
          <h2>Quiz Completed!</h2>
          <p>Your score is ${score} out of ${totalQuestions}</p>
        </div>
      `;
  }
}
