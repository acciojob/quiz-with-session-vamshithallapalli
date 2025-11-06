// Initialize storage for answers
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// Get references to elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Display previously stored score if exists
if (localStorage.getItem("score")) {
  scoreElement.innerText = `Your score is ${localStorage.getItem("score")} out of 5.`;
}

// Display the quiz questions and restore checked answers
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const question = questions[i];
    const questionDiv = document.createElement("div");

    // Question text
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionDiv.appendChild(questionText);

    // Create the radio options
    question.choices.forEach((choice) => {
      const choiceLabel = document.createElement("label");
      const choiceElement = document.createElement("input");

      choiceElement.setAttribute("type", "radio");
      choiceElement.setAttribute("name", `question-${i}`);
      choiceElement.setAttribute("value", choice);

      // Restore saved selection
      if (userAnswers[i] === choice) {
        choiceElement.checked = true;
      }

      // Save answer when clicked
      choiceElement.addEventListener("change", () => {
        userAnswers[i] = choice;
        sessionStorage.setItem("progress", JSON.stringify(userAnswers));
      });

      choiceLabel.appendChild(choiceElement);
      choiceLabel.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(choiceLabel);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Submit button event
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) {
      score++;
    }
  }

  // Display & save score
  scoreElement.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
