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

 // Add eventlistener to the clear highscore button to remove highscores from both the local storage and the display
clearscoreBtn.addEventListener("click",function(){
    // remove the highScore from the local storage
    localStorage.removeItem("highScore")
    // remove all of the <li> elements from the <ol> element using a while loop
    while (highscoreContainer.firstChild) {
highscoreContainer.removeChild(highscoreContainer.firstChild);
    }
});
