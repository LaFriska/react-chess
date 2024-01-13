import {isInBound} from "../BackendUtils";

export const iteratePiecePath = (row, col, color, chessPos, dRow, dCol, res) => {
    let newRow = row + dRow;
    let newCol = col + dCol;

    while (isInBound(newRow, newCol)) {
        if (chessPos.getColor(newRow, newCol) === null) {
            res.push({
                row: newRow,
                col: newCol,
                move: {
                    chessPos: chessPos.clone().move(row, col, newRow, newCol)
                }
            });
            newRow += dRow;
            newCol += dCol;
        } else {
            if (chessPos.getColor(newRow, newCol) !== color) {
                res.push({
                    row: newRow,
                    col: newCol,
                    move: {
                        chessPos: chessPos.clone().move(row, col, newRow, newCol)
                    }
                });
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