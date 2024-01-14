import {isInBound} from "../BackendUtils";
import Move from "../Move";

export const iteratePiecePath = (row, col, color, chessPos, dRow, dCol, res) => {
    let newRow = row + dRow;
    let newCol = col + dCol;

    while (isInBound(newRow, newCol)) {
        if (chessPos.getColor(newRow, newCol) === null) {
            processDefaultMove(res, chessPos, row, col, newRow, newCol)
            // res.push({
            //     row: newRow,
            //     col: newCol,
            //     move: {
            //         chessPos: chessPos.clone().move(row, col, newRow, newCol)
            //     }
            // });
            newRow += dRow;
            newCol += dCol;
        } else {
            if (chessPos.getColor(newRow, newCol) !== color) {
                processDefaultMove(res, chessPos, row, col, newRow, newCol)
                // res.push({
                //     row: newRow,
                //     col: newCol,
                //     move: {
                //         chessPos: chessPos.clone().move(row, col, newRow, newCol)
                //     }
                // });
            }
            return;
        }
    }
}

export const directionalVector = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
]

export const processCustomMove = (res, chessPos, newRow, newCol, color, futureEnPassent) => {
    res.push(new Move(newRow, newCol, chessPos, futureEnPassent))
}

export const processDefaultMove = (res, chessPos, row, col, newRow, newCol, futureEnPassent) => {
    processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol), newRow, newCol, chessPos.getColor(row, col), futureEnPassent)
}