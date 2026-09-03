function player(name, marker) {

    function getName() {
        return name;
    }

    function setName(newName) {
        name = newName;
    }

    function getMarker() {
        return marker;
    }

    return { getName, setName, getMarker };
}

const gameBoard = (function () {
    const grid = ['', '', '', '', '', '', '', '', ''];

    function getGrid() {
        return grid;
    }

    function checkWin(marker) {

        const rows = {
            top: [0, 1, 2],
            middle: [3, 4, 5],
            bottom: [6, 7, 8],
        }

        const cols = {
            left: [0, 3, 6],
            middle: [1, 4, 7],
            right: [2, 5, 8],
        }

        const diagonals = {
            left: [0, 4, 8],
            right: [2, 4, 6],
        }

        function checkLine(line, marker) {
            const [first, second, third] = line;
            if (grid[first] == marker &&
                grid[second] == marker &&
                grid[third] == marker) {
                // highlight the winning squares
                const squareList = displayController.getSquareList();
                squareList[first].style.backgroundColor = "gold";
                squareList[second].style.backgroundColor = "gold";
                squareList[third].style.backgroundColor = "gold";

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
    // Randomly choose player one or player two to go first
    let currentPlayer = randomNum(2) === 0 ? playerOne : playerTwo;

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
        // disable the name input fields
        displayController.getPlayerNameInputFields().forEach(feild => feild.disabled = true);
        // display starting player
        displayController.displayMessage(`${currentPlayer.getMarker()}: ${currentPlayer.getName()}'s turn.`);
    }

    
    function turn(position) {
        // if there is no winner, and there are squares available then process the click
        if (running) {
            if (gameBoard.checkSquareEmpty(position)) {
                gameBoard.addMarker(currentPlayer, position);
                displayController.update();
                // keep running while a player has not won 
                if (gameBoard.checkWin(currentPlayer.getMarker(), position)) {
                    running = false;
                    // re-enable player name input at game end
                    displayController.getPlayerNameInputFields().forEach(feild => feild.disabled = false);
                    // display winner name
                    displayController.displayMessage(`${currentPlayer.getMarker()}: ${currentPlayer.getName()} is the winner!`);
                }
                else if (!gameBoard.checkSquaresAvailable()) {
                    running = false;
                    // re-enable player name input at game end
                    displayController.getPlayerNameInputFields().forEach(feild => feild.disabled = false);
                    // display draw message
                    displayController.displayMessage("It's a draw!");
                }
                else {
                    // toggle player turn
                    currentPlayer = currentPlayer == playerOne ? playerTwo : playerOne;
                    // Display which player has turn
                    displayController.displayMessage(`${currentPlayer.getMarker()}: ${currentPlayer.getName()}'s turn.`);
                }
            }
            else {
                displayController.displayMessage('That square is occupied!');
            }
        }
    }

    return { start, getPlayerOne, getPlayerTwo, turn};
}());

const displayController = (function () {
    const gridContainer = document.querySelector('.grid-container');
    const squareList = document.querySelectorAll('.grid-container > div');
    const display = document.querySelector('.display');

    function getGridContainer() {
        return gridContainer;
    }

    function getSquareList() {
        return squareList;
    }

    function displayMessage(text) {
        display.textContent = text;
    }

    function update() {
        const grid = gameBoard.getGrid();
        // the grid and the squareList each have 9 squares
        for (let i = 0; i < grid.length; i++) {
            // only update the square if it has no marker already
            if (grid[i] == 'O' && squareList[i].firstElementChild == null){
                const nought = document.createElement('img');
                nought.src = './img/nought.png';
                nought.alt = 'nought';
                squareList[i].appendChild(nought);
            }
            else if (grid[i] == 'X' && squareList[i].firstElementChild == null){
                const cross = document.createElement('img');
                cross.src = './img/cross.png';
                cross.alt = 'cross';
                squareList[i].appendChild(cross);
            }
        }
    }

    // Get Player Input
    gridContainer.addEventListener('click', (event) => {
        const position = event.target.id;
        game.turn(position);
    });

    // get player names from input
    const playerNameInputContainer = document.querySelector('.playerNameInput');
    const playerNameInputFields = document.querySelectorAll('.playerNameInput input');

    function checkInputValid(event) {
        // input is valid if the value is neither null nor an empty string
        if (!(event.target.value == null || event.target.value == ''))
            return true;
    }

    function setPlayerName(event) {
        const player = event.target.id == 'player-one' ? game.getPlayerOne() : game.getPlayerTwo();
        if (checkInputValid(event)) {
            player.setName(event.target.value);
        }
        else {
            const defaultName = player == game.getPlayerOne() ? 'Player One' : 'Player Two';
            player.setName(defaultName);
        }
    }


   playerNameInputContainer.addEventListener('change', (event) => {
        setPlayerName(event);
    });

    function getPlayerNameInputFields(){
        return playerNameInputFields;
    }

    const newGameButton = document.querySelector('#new-game');

    newGameButton.addEventListener('click', () => {
        // reset the game
        gameBoard.reset();
        update();
        // for each square remove the image if it has one and reset its color
        squareList.forEach(square => {
            const image = square.firstElementChild;
            if (image){
                square.removeChild(image);
            }
            square.style.backgroundColor = "lightgoldenrodyellow"
        });
        // start the game
        game.start();
    });

    return { getGridContainer, getSquareList, displayMessage, getPlayerNameInputFields, update };

}());

