

let generatePlayerBoard = (numberOfRows, numberOfColumns) => {
    let board = [];
    for (let i = 0; i < numberOfRows; i++) {
        let row = [];
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
        let row = [];
        for (let j = 0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }

    //bomb counter
    let numberOfBombsPlaced = 0
    while (numberOfBombsPlaced < numberOfBombs) {
        console.log('numberOfBombsPlaced:' + numberOfBombsPlaced);

        //這邊有可能放bomb到重複的位置，之後會fix
        //generate random row/column index
        let randomRowIndex = Math.floor(Math.random() * numberOfRows);
        let randomColumnIndex = Math.floor(Math.random() * numberOfColumns);

        //檢查此位置是否已經有bomb
        if (board[randomRowIndex][randomColumnIndex] !== 'B') {
            //set Bomb
            board[randomRowIndex][randomColumnIndex] = 'B'
            //counter+
            numberOfBombsPlaced++;
        }

    }



    return board;
}



const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
    const neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    //bombBoard的長度代表有幾個row
    const numberOfRows = bombBoard.length;

    //bombBoard第一個item是array,其length代表column
    const numberOfColumns = bombBoard[0].length;

    //用來存相鄰flipped tile的bomb
    let numberOfBombs = 0;

    neighborOffsets.forEach((offset) => {
        console.log(`offset:(${offset})`);

        //儲存鄰居的rowIndex
        //用鄰居的row座標+row位移
        const neighborRowIndex = rowIndex + offset[0];

        //對column做一樣的事
        const neighborColumnIndex = columnIndex + offset[1];

        //如果鄰居座標是valid
        if (neighborRowIndex >= 0
            && neighborRowIndex < numberOfRows
            && neighborColumnIndex >= 0
            && neighborColumnIndex < numberOfColumns) {

            //檢查是否有bomb
            if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
                console.log(`(${neighborRowIndex},${neighborColumnIndex}) has bomb`);
                numberOfBombs++;
            }
        }
    });

    return numberOfBombs;
}

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
    //檢查指定座標是否有flip過
    if (playerBoard[rowIndex][columnIndex] !== ' ') {
        console.log('This tile has already been flipped!');
        return
    } else if (bombBoard[rowIndex][columnIndex] === 'B') {
        //如果該座標有bomb
        playerBoard[rowIndex][columnIndex] = 'B';

    } else {
        //flip and 取得鄰居bomb的數字
        playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);

    }
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


flipTile(playerBoard, bombBoard, 1, 1);
console.log('Updated Player Board:');
printBoard(playerBoard);

