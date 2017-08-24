let generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
}


let generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }



    //bomb counter
    let numberOfBombsPlaced = 0
    while (numberOfBombsPlaced < numberOfBombs) {
        //這邊有可能放bomb到重複的位置，之後會fix
        //generate random row/column index
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //set Bomb
        board[randomRowIndex][randomColumnIndex] = 'B'
        //counter+
        numberOfBombsPlaced++;
    }



    return board;
}

let printBoard = board => {
    //先把2維array中的item用join降成1維
    //再用chain 利用join把所有item串成single string
    console.log(board.map(row => row.join(' | ')).join('\n'));
}

let playerBoard = generatePlayerBoard(3, 4);

let bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);

