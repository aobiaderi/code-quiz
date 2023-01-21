// Declare variables
let score = 0;
const startButton = document.getElementById("start");
startButton.addEventListener("click", startQuiz);
let storedHighscore = JSON.parse(localStorage.getItem("highScore")) || [];
let timer = 75;
let incorrectSound = new Audio("./assets/sfx/incorrect.wav");
let correctSound = new Audio("./assets/sfx/correct.wav");

function startQuiz() {
// Start timer
// hide the instructions befoe user clicks to start quiz
document.getElementById("start-screen").style.display = "none";
 
// declare a variable to store the interval ID for setInterval function
   timeCountdown = setInterval(function() {
        
        if (timer >= 0) {
            document.getElementById("time").innerHTML = timer;
            timer--;
            if (currentQuestion < questions.length) {
                displayQuestion();
            
            } else {
                endQuiz();
            }
            
        }
        else if (timer < 0) {
            
            endQuiz();
        }
    }, 1000);

};

function endQuiz() {
    score =timer +1;

  // declare variable to store the value of the time at the end of the quiz
  let finalTime = document.getElementById("time").innerHTML;

  // // Stop the timer by passing the setInterval variable to the clearInterval function.
  clearInterval(timeCountdown); 
  document.getElementById("end-screen").style.display = "block";
  document.getElementById("time").innerHTML = finalTime + " seconds"; // Display the final time

  document.getElementById("final-score").innerHTML = score + " points"; // Display the final score

  // hide the questions at the end of the quiz
  document.getElementById("questions").style.display = "none";
  
}

// Create a displayQuestion function that will display the current question and choices

let currentQuestion = 0;

function displayQuestion() {

  document.getElementById("questions").style.display = "block";
// retrieve the current question from the questions array using currentQuestion as the index
  const question = questions[currentQuestion];
//   set the title of the current question to the innerHTML of the
  const questionTitle = document.getElementById("question-title");
  questionTitle.innerHTML = question.title;

  const choices = document.getElementById("choices");
  choices.innerHTML = "";

  //   for loop to go through the questions array and update the HTML elements with the current question's title and choices.
  for (let i = 0; i < question.choices.length; i++) {
    const choice = question.choices[i];
    const button = document.createElement("button");
    button.innerHTML = choice;
    button.addEventListener("click", checkAnswer);
    choices.appendChild(button);
  }
}

// check if the answer is correct and update the feedback element with a message
function checkAnswer(event) {
    document.getElementById("feedback").style.display = "block";
    const answer = event.target.innerHTML;
    if (answer === questions[currentQuestion].answer) {
        // play sound for correct answer
        correctSound.play()
      document.getElementById("feedback").innerHTML = "Correct!";
      currentQuestion++;
    
      if (currentQuestion < questions.length) {
        displayQuestion();
         
      } else {
        endQuiz();
      }
    } else {
        // play sound for correct answer
        incorrectSound.play()
      document.getElementById("feedback").innerHTML = "Incorrect!";
         //checks and then continues quiz if that is not the last question
    if (currentQuestion < questions.length) {
        displayQuestion();
        // apply penalty per incorrect answer   
        if(timer > 0) 
            timer -=10;
            currentQuestion++;
    
    } else {
        endQuiz();
    }
}};

// Get the submit button element
const submitButton = document.getElementById("submit");

// Add an event listener to the submit button
submitButton.addEventListener("click", handleSubmit);

function handleSubmit() {
// Get the user's initials from the input element
const userInitials = document.getElementById("initials").value;
let currentPlayer ={
    initials:userInitials,
    userScore:score

}
 // Check if the user has entered a value in the input field
 if (userInitials === "") {
    alert("Please enter your initials before submitting the score");
    return;
  }

// check if the string contains any non-alphabetic characters
if (userInitials.match(/[^a-zA-Z]/)) {
alert("Initials can only contain alphabetic characters.");
return;
  }
// store these details to an storedHighscore array 
storedHighscore.push(currentPlayer);

//store value in local storage as a string
localStorage.setItem("highScore",JSON.stringify(storedHighscore))

//  reload the page to start quiz again

location.reload()

// clear input field on reload
document.getElementById("initials").value = "";
}
