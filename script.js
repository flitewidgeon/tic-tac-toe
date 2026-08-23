function player(name, marker) {
    return { name, marker };
}


function gameBoard() {
    const grid = ['', '', '', '', '', '', '', '', ''];

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
        return grid[position] === '';
    }

    function addMarker(player, position) {
        grid[position] = player.marker;
    }

    function reset() {
        for (let i = 0; i < grid.length; i++) {
            grid[i] = '';
        }
    }

    function checkSquaresAvailable() {
        return grid.includes('');
    }

    return { grid, checkSquareEmpty, checkSquaresAvailable, checkWin, addMarker, reset };
}

function game() {

    function randomNum(num) {
        return Math.floor(Math.random() * num);
    }

    const playerOne = player('playerOne', 'O');
    const playerTwo = player('playerTwo', 'X');
    const board = gameBoard();
    const myDisplay = display();
    let running = true;
    
    function play() {
        // Randomly choose player one or player two to go first
        const startPlayer = randomNum(2) === 0 ? playerOne : playerTwo;
        turn(startPlayer, myDisplay.squareList);
    }
    
    function turn(player, squareList) {
        squareList.forEach(square => square.addEventListener('click', (event) => {
            const position = event.target.id;
            // if there is no winner, and there are squares available then process the click
            if (running && board.checkSquaresAvailable()) {
                if (board.checkSquareEmpty(position)) {
                    board.addMarker(player, position);
                    myDisplay.update(board);

                    // keep running while a player has not won 
                   if (board.checkWin(player.marker, position)){
                    running = false;
                    console.log(`${player.name} has won!`);
                   }

                    // toggle player turn
                    player = player == playerOne ? playerTwo : playerOne;
                }
                else {
                    console.log('That square is occupied!');
                }
            }
            else{
                console.log("It's a draw");
            }
        }));
    }

    return { play };
}

function display() {
    const squareList = document.querySelectorAll('.grid-container > div');

    function update(board) {
        const grid = board.grid;
        // the grid and the squareList each have 9 squares
        for (let i = 0; i < grid.length; i++) {
            squareList[i].textContent = grid[i]
        }
    }


    return { squareList, update};

}

game = game();
game.play();