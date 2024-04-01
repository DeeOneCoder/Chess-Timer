    // let currentPlayer, nextPlayer;
    
    
    playerOneTime.textContent = playerOne.timeRemaining;
    playerTwoTime.textContent = playerTwo.timeRemaining;

    // console.log(playerOne, playerTwo);

    if (!start) {
    }

    let interval;

    const timer = function (time) {
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
            let currentTime = `${mins}:${second}`;
            console.log(currentTime);
            playerOneTime.textContent = currentTime;
        }, 1000);
        // console.log(currentTime);
    };

    // const runIntervals = function (time) {
        
    // }

    const startGame = function() {
        console.log("game starts....")
        playerOneBoard.classList.add("active");
        timer(playerOne.timeRemaining);
        // timer(playerOneTime.textContent);

        // currentPlayer = playerOne;
        // nextPlayer = playerTwo;
        let currentName, currTime = { ...playerOne };
        let nextName, nextTime = { ...playerTwo };
        
        console.log(currentName, currTime, nextName, nextTime);
        pauseButton.textContent = "Pause Game";
        currentLabel.textContent = "Active Player";
        playerOneBoard.addEventListener("click", switchPlayer);
    }

    if (pauseButton.textContent === "Start Game") {
        pauseButton.addEventListener("click", function () {
        console.log(pauseButton.textContent);
            pauseButton.removeEventListener("click", this);
            pauseButton.addEventListener("click", pauseGame);
            startGame()
        });
    }

    //Switching between players: Pause self time and start opponent's time, change active background,
    // change active player, change active player image
    let switchPlayer = function () {
        clearInterval(interval);
        
        // console.log("Current Image Source:", image.src);
        if (image.src.includes("/img/white.png")) {
            image.src = "/img/black.png";
        } else {
            image.src = "/img/white.png";
        }
        timer(currentPlayer.timeRemaining);
        
    };

    //Pause Button Functins: Stop clock, Change active background, Text: Game Paused, Show Overlay to effect continue;
    const pauseGame = function () {
        clearInterval(interval);
        currentLabel.textContent = "Game Paused";
        // console.log("Button Clicked");

        console.log("Image Element:", image);
        pauseButton.textContent = "Resume Game";

        // Check if the image element's src attribute is properly updated
        
}
    


    // const pauseGame = function () {
    //     // pauseButton.removeEventListener("click", resumeGame);
    //     if (playerOneBoard.classList.contains("active")) {
    //         activePlayer = playerOne.playerName;
    //         activeTime = playerOneTime.textContent;
    //     } else {
    //         activePlayer = playerTwo.playerName;
    //         activeTime = playerTwoTime.textContent;
    //     }
    //     clearInterval(interval);
    //     currentLabel.textContent = "Game Paused";
    //     console.log("Player: " + activePlayer, activeTime);

    //     pauseButton.addEventListener("click", resumeGame);


    //     // console.log("Image Element:", image);
    //     pauseButton.textContent = "Resume Game";

    //     // Check if the image element's src attribute is properly updated

    // }

    // const resumeGame = function () {
    //     timer(activeTime);
    //     pauseButton.textContent = "Pause Game"
    //     currentLabel.textContent = "Active Player";
    //     // pauseButton.removeEventListener("click", resumeGame);

    //     pauseButton.addEventListener("click", pauseGame);
    // }


    const toggleFunction = () => {
        playerOneBoard.classList.toggle("active");
        playerTwoBoard.classList.toggle("active");
    };

    // console.log(this);

    
    // pauseButton.addEventListener("click", );

    endButton.addEventListener("click", function () {
        window.alert("End Button Pressed");
    });

    playerOneBoard.addEventListener("click", switchPlayer(playerTwo));

    playerTwoBoard.addEventListener("click", switchPlayer(playerOne));