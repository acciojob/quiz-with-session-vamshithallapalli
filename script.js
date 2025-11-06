//your JS code here.

// Load previous progress or initialize empty object
let userAnswers = JSON.parse(sessionStorage.getItem("progress")) || {};

// The questions data (must be at the top before renderQuestions runs)
const questions = [
  {
    question: "What is the capital of France?",
    choices: ["Paris", "London", "Berlin", "Madrid"],
    answer: "Paris",
  },
  {
    question: "What is the highest mountain in the world?",
    choices: ["Everest", "Kilimanjaro", "Denali", "Matterhorn"],
    answer: "Everest",
  },
  {
    question: "What is the largest country by area?",
    choices: ["Russia", "China", "Canada", "United States"],
    answer: "Russia",
  },
  {
    question: "Which is the largest planet in our solar system?",
    choices: ["Earth", "Jupiter", "Mars"],
    answer: "Jupiter",
  },
  {
    question: "What is the capital of Canada?",
    choices: ["Toronto", "Montreal", "Vancouver", "Ottawa"],
    answer: "Ottawa",
  },
];

// Get DOM elements
const questionsElement = document.getElementById("questions");
const scoreElement = document.getElementById("score");
const submitBtn = document.getElementById("submit");

// Display stored score if present
if (localStorage.getItem("score")) {
  scoreElement.innerText = `Your score is ${localStorage.getItem("score")} out of 5.`;
}

// Display quiz
function renderQuestions() {
  for (let i = 0; i < questions.length; i++) {
    const questionDiv = document.createElement("div");

    const questionText = document.createElement("p");
    questionText.innerText = questions[i].question;
    questionDiv.appendChild(questionText);

    questions[i].choices.forEach((choice) => {
      const label = document.createElement("label");
      const input = document.createElement("input");

      input.type = "radio";
      input.name = `question-${i}`;
      input.value = choice;

      // Restore saved choice
if (userAnswers[i] === choice) {
  input.checked = true;
  input.setAttribute("checked", "true");   // ✅ Add this
}

// Update progress in sessionStorage when selected
input.addEventListener("change", () => {
  userAnswers[i] = choice;
  sessionStorage.setItem("progress", JSON.stringify(userAnswers));

  // Remove `checked="true"` from all radios in the same group
  document.querySelectorAll(`[name="${input.name}"]`).forEach((radio) =>
    radio.removeAttribute("checked")
  );

  // Add `checked="true"` to the newly selected one
  input.setAttribute("checked", "true");   // ✅ Add this
});


      label.appendChild(input);
      label.appendChild(document.createTextNode(choice));
      questionDiv.appendChild(label);
      questionDiv.appendChild(document.createElement("br"));
    });

    questionsElement.appendChild(questionDiv);
  }
}

renderQuestions();

// Calculate score when submitting
submitBtn.addEventListener("click", () => {
  let score = 0;

  for (let i = 0; i < questions.length; i++) {
    if (userAnswers[i] === questions[i].answer) score++;
  }

  scoreElement.innerText = `Your score is ${score} out of 5.`;
  localStorage.setItem("score", score);
});
