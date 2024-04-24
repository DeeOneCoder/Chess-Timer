"use strict";

//A class definition to hold the players' information: name and timeRemaining
class Player {
    constructor(playerName, playerTime) {
        this.playerName = playerName;
        this.playerTime = playerTime;
    }
}

// Function to hide address ba


//This is to ensure players on mobile use the application in landscape mode;
window.addEventListener("DOMContentLoaded", function () {
    function hideAddressBar() {
    if (window.innerWidth > window.innerHeight) {
        // Landscape mode
        setTimeout(() => {
            window.scrollTo(0, 1); // Scroll to hide the address bar
        }, 0);
    }
}

// Listen for orientation change and resize events
window.addEventListener("orientationchange", hideAddressBar);
window.addEventListener("resize", hideAddressBar);

// Initially hide address bar on page load
    window.addEventListener("load", hideAddressBar);
    
    
  const landscapeMessage = document.getElementById('landscapeMessage');

  function checkOrientation() {
    if (window.innerHeight > window.innerWidth) {
      // Portrait mode
      landscapeMessage.style.display = 'block';
    } else {
      // Landscape mode
      landscapeMessage.style.display = 'none';
    }
  }

  window.addEventListener('resize', checkOrientation);

  // Check orientation on page load
  checkOrientation();
});



document.addEventListener("DOMContentLoaded", function () {
    let start = false;

    const pauseButton = document.getElementById("pauseButton");
    const currentLabel = document.getElementById("current");
    const newGameButton = document.getElementById("new");
    const resetGameButton = document.getElementById("reset");
    const playerOneBoard = document.getElementById("player--0");
    const playerTwoBoard = document.getElementById("player--1");
    let playerOneLabel = document.getElementById("playerOne");
    let playerTwoLabel = document.getElementById("playerTwo");
    let playerOneTime = document.getElementById("time--0");
    let playerTwoTime = document.getElementById("time--1");
    const image = document.getElementById("image");
    let activePlayer, activeTime;

    



        // Using Prompt to collect the information
        let playerOneStartTime = prompt(
            "Enter Player One time:\nMins only -> 3\nMins:Seconds -> 3:30\nPress Enter Key/Ok for: 10:00 mins\nPress Escape Key/Cancel for 5:00 mins\n\nGood Luck!",
            "10:00"
        );
        let playerTwoStartTime = prompt(
            "Enter Player Two time:\nMins only -> 3\nMins:Seconds -> 3:30\nPress Enter Key/Ok for: 10:00 mins\nPress Escape Key/Cancel for 5:00 mins\n\nGood Luck!",
            "10:00"
        );

        if (playerOneStartTime === null) {
            playerOneStartTime = "5:00";
            playerOneTime.textContent = playerOneStartTime;
        }

        if (playerTwoStartTime === null) {
            playerTwoStartTime = "5:00";
            playerTwoTime.textContent = playerTwoStartTime;
        }

        //Player objects
        const playerOne = new Player("Player One", playerOneStartTime);
        const playerTwo = new Player("Player Two", playerTwoStartTime);


        console.log(playerOne, playerTwo);
        playerOneTime.textContent = playerOne.playerTime;
        playerTwoTime.textContent = playerTwo.playerTime;

        playerOneLabel.textContent = playerOne.playerName;
        playerTwoLabel.textContent = playerTwo.playerName;

        console.log(playerOneTime, playerTwoTime);

    

        pauseButton.addEventListener("click", function () {
            console.log(pauseButton.textContent);

            if (pauseButton.textContent === "Start Game") {
                startGame();
            } else if (pauseButton.textContent === "Resume Game") {
                resumeGame();
            } else if (pauseButton.textContent === "Pause Game") {
                pauseGame();
            } else {

            }
        });

        let getActiveTime = function () {
            let aTime;
            if (playerOneBoard.classList.contains("active")) {
                aTime = playerOneTime.textContent;
            } else {
                aTime = playerTwoTime.textContent;
            }
            return aTime;
        }

        let getNextPlayerTime = function () {
            let aTime;
            if (!playerOneBoard.classList.contains("active")) {
                aTime = playerOneTime.textContent;
            } else {
                aTime = playerTwoTime.textContent;
            }
            return aTime;
        }

        let interval;

        const timer = function (time) {
            let currentTime = null;
            let parts = time.split(":");
            let mins = Number(parts[0]);
            let seconds = Number(parts[1]);
            interval = setInterval(function () {
                if (seconds === 0 && mins === 0) {

                    if (playerOneTime.textContent === "0:00") {
                        playerOneBoard.classList.remove("active", "board", "inactive");
                        playerOneBoard.classList.add("board-lose");
                        playerTwoBoard.classList.remove("active", "board", "inactive");
                        playerTwoBoard.classList.add("board-win");
                        playerOneTime.classList.remove("time");
                        playerTwoTime.classList.remove("time");
                        playerOneTime.classList.add("time-lose");
                        playerTwoTime.classList.add("time-win");
                        document.getElementById("time--0").innerText = "Time up; You Lost!";
                        image.src = "/img/black.png";
                        currentLabel.textContent = `BLACK Wins!`;
                        document.getElementById("time--1").innerHTML = "Congratulations!!! You Won on Time"; //This line does not work.
                        pauseButton.textContent = "Game Over";
                        pauseButton.removeEventListener("click", pauseGame);
                        document.getElementById("trophy2").classList.remove("hide-trophy");
                        return;
                    }

                    if (playerTwoTime.textContent === "0:00") {
                        playerOneBoard.classList.remove("active", "board", "inactive");
                        playerOneBoard.classList.add("board-win");
                        playerTwoBoard.classList.remove("active", "board", "inactive");
                        playerTwoBoard.classList.add("board-lose");
                        playerOneTime.classList.remove("time");
                        playerTwoTime.classList.remove("time");
                        playerOneTime.classList.add("time-win");
                        playerTwoTime.classList.add("time-lose");
                        document.getElementById("time--1").innerText = "Time up; You Lost!";
                        image.src = "/img/white.png";
                        currentLabel.textContent = `WHITE Wins!`;
                        document.getElementById("time--0").innerHTML = "Congratulations!!! You Won on Time"; //This line does not work.
                        pauseButton.textContent = "Game Over";
                        pauseButton.removeEventListener("click", pauseGame);
                        document.getElementById("trophy1").classList.remove("hide-trophy");
                        return;
                    }
                    clearInterval(interval);
                } else if (mins && seconds) {
                    seconds--;
                } else if (mins) {
                    seconds = 59;
                    mins--;
                } else {
                    seconds--;


                }
                let second = seconds >= 10 ? seconds + "" : "0" + seconds;
                currentTime = `${mins}:${second}`;
                console.log(currentTime);
                if (playerOneBoard.classList.contains("active")) {
                    playerOneTime.textContent = currentTime;
                } else if (playerTwoBoard.classList.contains("active")) {
                    playerTwoTime.textContent = currentTime;
                } else {

                }

            }, 1000);
            return currentTime;
            // console.log(currentTime);
        };

        const pauseGame = function () {
            // Clear any existing interval to ensure proper pausing
            clearInterval(interval);
            // Store active player and time for later resumption
            // activePlayer = currentPlayer.playerName;
            activeTime = getActiveTime();
            currentLabel.textContent = "Game Paused";
            console.log("Player: " + activePlayer, activeTime);

            // Temporarily change button text and event listener for resuming
            pauseButton.textContent = "Resume Game";
            pauseButton.removeEventListener("click", pauseGame); // Remove existing pause handler
            pauseButton.addEventListener("click", resumeGame);
        };

        const resumeGame = function () {
            // Restore stored player and time
            // currentPlayer = playerOne.playerName === activePlayer ? playerOne : playerTwo;
            activeTime = getActiveTime();

            timer(activeTime);

            pauseButton.textContent = "Pause Game";
            currentLabel.textContent = "Active Player";

            // Temporarily change button text and event listener for pausing
            pauseButton.removeEventListener("click", resumeGame); // Remove existing resume handler
            pauseButton.addEventListener("click", pauseGame);
        };

        const toggleFunction = () => {
            playerOneBoard.classList.toggle("active");
            playerTwoBoard.classList.toggle("active");
            playerTwoTime.classList.toggle("inactive");
            playerOneTime.classList.toggle("inactive");
            playerOneTime.classList.toggle("activeTime");
            playerTwoTime.classList.toggle("activeTime");
        };


        let switchPlayer = function () {

            if (pauseButton.textContent === "Resume Game") {
                alert("Not allowed!\nResume Game before Switching Player");
                return;
            }

            if (image.src.includes("/img/white.png")) {
                image.src = "/img/black.png";
            } else {
                image.src = "/img/white.png";
            }
            

            if (playerOneBoard.classList.contains("active")) {
                playerOneBoard.removeEventListener("click", switchPlayer);
                playerTwoBoard.addEventListener("click", switchPlayer);
            } else {
                playerTwoBoard.removeEventListener("click", switchPlayer);
                playerOneBoard.addEventListener("click", switchPlayer);
            }

            clearInterval(interval);
            activeTime = getNextPlayerTime();
            // console.log("Current Image Source:", image.src);
            toggleFunction();
            timer(activeTime);


        };

        newGameButton.addEventListener("click", function () {
            if (playerOneTime.textContent !== "0:00" && playerTwoTime.textContent !== "0:00") {
                let newGame = confirm("Do you want to restart the game timer?");
                if (newGame) {
                    location.reload();
                }
            }

        });


        const startGame = function () {
            console.log("game starts....")
            playerOneBoard.classList.add("active");
            playerTwoTime.classList.add("inactive");
            playerOneTime.classList.add("activeTime");
            playerOneLabel.textContent = playerOne.playerName;
            playerTwoLabel.textContent = playerTwo.playerName;
            activeTime = timer(playerOne.playerTime);
            activePlayer = playerOne.playerName;
            pauseButton.removeEventListener("click", startGame);
            pauseButton.addEventListener("click", pauseGame);
            playerOneBoard.addEventListener("click", switchPlayer);
            // playerTwoBoard.addEventListener("click", switchPlayer);
            console.log(`Name: ${playerOne.playerName}, Time: ${playerOne.playerTime}, Name: ${playerTwo.playerName}, Time: ${playerTwo.playerTime}`);
            pauseButton.textContent = "Pause Game";
            currentLabel.textContent = "Active Player";
        }




    });
