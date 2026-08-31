function player(name, marker) {

    function setName(newName) {
        name = newName;
    }

    function getMarker() {
        return marker;
    }

    return { name, setName, getMarker };
}

const gameBoard = (function () {
    const grid = ['', '', '', '', '', '', '', '', ''];

    function getGrid() {
        return grid;
    }

    function checkWin(marker) {

        const rows = {
            top: [grid[0], grid[1], grid[2]],
            middle: [grid[3], grid[4], grid[5]],
            bottom: [grid[6], grid[7], grid[8]],
        }

        const cols = {
            left: [grid[0], grid[3], grid[6]],
            middle: [grid[1], grid[4], grid[7]],
            right: [grid[2], grid[5], grid[8]],
        }

        const diagonals = {
            left: [grid[0], grid[4], grid[8]],
            right: [grid[2], grid[4], grid[6]],
        }

        function checkLine(line, marker) {
            if (line[0] == marker &&
                line[1] == marker &&
                line[2] == marker) {
                return true;
            }
            return false;
        }


        return checkLine(rows.top, marker) || checkLine(rows.middle, marker) || checkLine(rows.bottom, marker) ||
            checkLine(cols.left, marker) || checkLine(cols.middle, marker) || checkLine(cols.right, marker) ||
            checkLine(diagonals.left, marker) || checkLine(diagonals.right, marker);
    }

    function checkSquareEmpty(position) {
        return grid[position] == '';
    }

    function addMarker(player, position) {
        grid[position] = player.getMarker();
    }

    function reset() {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = '';
        }
    }

    function checkSquaresAvailable() {
        return grid.includes('');
    }

    return { getGrid, checkSquareEmpty, checkSquaresAvailable, checkWin, reset, addMarker };
}());

const game = (function () {
    const playerOne = player('Player One', 'O');
    const playerTwo = player('Player Two', 'X');



    let running = false;

    function getPlayerOne() {
        return playerOne;
    }

    function getPlayerTwo() {
        return playerTwo;
    }

    function randomNum(num) {
        return Math.floor(Math.random() * num);
    }

    function start() {
        running = true;
    }

    // Randomly choose player one or player two to go first
    let currentPlayer = randomNum(2) === 0 ? playerOne : playerTwo;

    function turn(position) {
        // if there is no winner, and there are squares available then process the click
        if (running) {
            if (gameBoard.checkSquareEmpty(position)) {
                gameBoard.addMarker(currentPlayer, position);
                displayController.update();
            }
            else {
                console.log('That square is occupied!');
            }

            // keep running while a player has not won 
            if (gameBoard.checkWin(currentPlayer.getMarker(), position)) {
                running = false;
                console.log(`${currentPlayer.name} has won!`);
            }
            else if (!gameBoard.checkSquaresAvailable()) {
                running = false;
                console.log("It's a draw");
            }
            // toggle player turn
            currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;

        }

    }

    return { start, getPlayerOne, getPlayerTwo, turn };
}());

const displayController = (function () {
    const gridContainer = document.querySelector('.grid-container');
    const squareList = document.querySelectorAll('.grid-container > div');

    function getGridContainer() {
        return gridContainer;
    }

    function getSquareList() {
        return squareList;
    }

    function update() {
        const grid = gameBoard.getGrid();
        // the grid and the squareList each have 9 squares
        for (let i = 0; i < grid.length; i++) {
            squareList[i].textContent = grid[i]
        }
    }

    gridContainer.addEventListener('click', (event) => {
        const position = event.target.id;
        game.turn(position);
    });


    return { getGridContainer, getSquareList, update };

}());


const newGameButton = document.querySelector('#new-game');
const closeButton = document.querySelector('#close-button');
const submitButton = document.querySelector('#submit-button');
const dialog = document.querySelector('dialog');

closeButton.addEventListener('click', () => dialog.close());

newGameButton.addEventListener('click', () => dialog.showModal());

submitButton.addEventListener('click', () => {

    const playerOneInput = document.querySelector('#player-one').value;
    const playerTwoInput = document.querySelector('#player-two').value;

    // get the player objects 
    const playerOne = game.getPlayerOne();
    const playerTwo = game.getPlayerTwo();
    // Set the name of the players with a default name or user entered name
    const playerOneName = playerOneInput == null || playerOneInput == '' ? 'Player One' : playerOneInput;
    playerOne.setName(playerOneName);
    const playerTwoName = playerTwoInput == null || playerTwoInput == '' ? 'Player Two' : playerTwoInput;
    playerTwo.setName(playerTwoName);

    const dialog = document.querySelector('dialog');
    dialog.close();

    // reset the game
    gameBoard.reset();
    displayController.update();

    // start the game
    game.start();
})