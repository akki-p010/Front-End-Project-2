const questionEl = document.getElementById("question");
const formEl = document.getElementById("form");
const scoreEl = document.getElementById("score");

let storedAnswer;

let score = 0;

const randonNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const generateQuestion = () => {
  const randonNumber1 = randonNumber(1, 10);
  const randonNumber2 = randonNumber(1, 10);
  const questionType = randonNumber(1, 4);
  let firstNumber;
  let secondNumber;

  if (randonNumber1 > randonNumber2 && questionType > 2) {
    firstNumber = randonNumber1;
    secondNumber = randonNumber2;
  } else {
    firstNumber = randonNumber2;
    secondNumber = randonNumber1;
  }

  let question;
  let answer;

  switch (questionType) {
    case 1:
      question = `Q. What is ${randonNumber1} multiply by ${randonNumber2}?`;
      answer = randonNumber1 * randonNumber2;
      break;
    case 2:
      question = `Q. What is ${randonNumber1} added to ${randonNumber2}?`;
      answer = randonNumber1 + randonNumber2;
      break;
    case 3:
      question = `Q. What is ${randonNumber1} divided by ${randonNumber2}?`;
      answer = randonNumber1 / randonNumber2;
      break;
    case 4:
      question = `Q. What is ${randonNumber1} subtracted from ${randonNumber2}?`;
      answer = randonNumber1 - randonNumber2;
      break;
  }

  return { question, answer };
};

// console.log(generateQustion());

const showQuestion = () => {
  const { question, answer } = generateQuestion();
  questionEl.innerText = question;
  // scoreEl.innerText = score;
  storedAnswer = answer;
};

showQuestion();

const checkAnswer = (event) => {
  event.preventDefault();
  const formData = new FormData(form);
  const userAnswer = parseInt(formData.get("answer"));
  if (userAnswer === storedAnswer) {
    score += 1;
    Toastify({
      text: "Correct Answer",
      className: "info",
      gravity : "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right, #00b09b, #96c93d)",
      },
    }).showToast();
  } else {
    score -= 1;
    Toastify({
      text:"Wrong Answer",
      className: "info",
      gravity: "bottom",
      position: "center",
      style: {
        background: "linear-gradient(to right,rgb(244, 14, 14),rgb(201, 61, 61))",
      },
    }).showToast();
  }

  scoreEl.innerText = score;
  // localStorage.setItem("score", score);
  event.target.reset();
  showQuestion();
  console.log("answer", userAnswer);
};
