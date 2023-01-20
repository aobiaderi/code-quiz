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


