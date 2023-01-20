const highscoreContainer = document.getElementById("highscores")
const clearscoreBtn = document.getElementById("clear")

// Get the highscores from local storage
const highScores = JSON.parse(localStorage.getItem("highScore"))

// Loop through the highscores array
 for (let i = 0; i < highScores.length; i++){
     // Create a new LI element
    let liEl = document.createElement("li")
     // Set the text of the LI element to the current highscore and user initials
    liEl.textContent = highScores[i].initials + "|" + highScores[i].userScore;
    // Append the LI element to the OL element
    highscoreContainer.append(liEl)
 }