function player(marker){
    return {marker};
}


function gameBoard(){
    let grid = [0, 0, 0, 0, 0, 0, 0, 0, 0];

    const squares = {
        topLeft: grid[0],
        topCenter: grid[1],
        topRight: grid[2],

        midLeft: grid[3],
        center: grid[4],
        midRight: grid[5],

        bottomLeft: grid[6],
        bottomCenter: grid[7],
        bottomRight: grid[8] 
    };

    const topRow = [squares.topLeft, squares.topCenter, squares.topRight];
    const middleRow = [squares.midLeft, squares.center, squares.midRight];
    const bottomRow = [squares.bottomLeft, squares.bottomCenter, squares.bottomRight];

    function checkLine(line, marker){
        if (line[0] == marker &&
            line[1] == marker &&
            line[2] == marker){
            return true;
    }
    return false;
}

return{grid, checkLine};
}    