'use strict';

var generatePlayerBoard = function generatePlayerBoard(numberOfRows, numberOfColumns) {
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
        row = [];
        for (var j = 0; j < numberOfColumns; j++) {
            row.push(' ');
        }
        board.push(row);
    }
    return board;
};

var generateBombBoard = function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
    var board = [];
    for (var i = 0; i < numberOfRows; i++) {
        row = [];
        for (var j = 0; j < numberOfColumns; j++) {
            row.push(null);
        }
        board.push(row);
    }

    //bomb counter
    var numberOfBombsPlaced = 0;
    while (numberOfBombsPlaced <= numberOfBombs) {
        //這邊有可能放bomb到重複的位置，之後會fix
        //generate random row/column index
        var randomRowIndex = Math.floor(Math.random() * numberOfRows);
        var randomColumnIndex = Math.floor(Math.random() * numberOfColumns);
        //set Bomb
        board[randomRowIndex][randomColumnIndex] = 'B';
        //counter+
        numberOfBombsPlaced++;
    }

    return board;
};

var printBoard = function printBoard(board) {
    //先把2維array中的item用join降成1維
    //再用chain 利用join把所有item串成single string
    console.log(board.map(function (row) {
        return row.join(' | ');
    }).join('\n'));
};

var playerBoard = generatePlayerBoard(3, 4);

var bombBoard = generateBombBoard(3, 4, 5);

console.log('Player Board: ');
printBoard(playerBoard);
console.log('Bomb Board: ');
printBoard(bombBoard);