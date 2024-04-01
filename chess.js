"use strict";

class Player {
    constructor(playerName, playerTime) {
        this.playerName = playerName;
        this.playerTime = playerTime;
    }
}
//Object to hold the game properties

document.addEventListener("DOMContentLoaded", function () {
    let start = false;

    const pauseButton = document.getElementById("pauseButton");
    const currentLabel = document.getElementById("current");
    const endButton = document.getElementById("end");
    const playerOneBoard = document.getElementById("player--0");
    const playerTwoBoard = document.getElementById("player--1");
    // playerTwoBoard.addEventListener("click", switchPlayer(playerOne));
    let playerOneTime = document.getElementById("time--0");
    let playerTwoTime = document.getElementById("time--1");
    const image = document.getElementById("image");
    let activePlayer, activeTime;

    //A class definition to hold the players' information: name and timeRemaining


    //Using Prompt to collect the information
    let playerOneStartTime = prompt(
        "Please enter player one time: format ('5:30'",
        "10:00"
    );
    let playerTwoStartTime = prompt(
        "Please enter player one time: format ('5:30'",
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
    const playerOne = new Player("Player--0", playerOneStartTime);
    const playerTwo = new Player("Player--1", playerTwoStartTime);


    console.log(playerOne, playerTwo);
    playerOneTime.textContent = playerOne.playerTime;
    playerTwoTime.textContent = playerTwo.playerTime;

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
            if (seconds) {
                seconds--;
            } else if (mins) {
                seconds = 59;
                mins--;
            } else {
            }
            let second = seconds >= 10 ? seconds + "" : "0" + seconds;
            currentTime = `${mins}:${second}`;
            console.log(currentTime);
            if (playerOneBoard.classList.contains("active")) {
            playerOneTime.textContent = currentTime;
        } else {
            playerTwoTime.textContent = currentTime;
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
            alert("Not allowed");
            return;
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
        if (image.src.includes("/img/white.png")) {
            image.src = "/img/black.png";
        } else {
            image.src = "/img/white.png";
        }
        toggleFunction();
        timer(activeTime);

        
    };


    const startGame = function () {
        console.log("game starts....")
        playerOneBoard.classList.add("active");
        playerTwoTime.classList.add("inactive");
        playerOneTime.classList.add("activeTime");

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
