import {isInBound} from "../BackendUtils";

export const getPossibleRookMoves = (row, col, chessPos, color, futureEnPassent) => {
    const res = [];

    const iterate = (dRow, dCol) => {
        let newRow = row + dRow;
        let newCol = col + dCol;

        while (isInBound(newRow, newCol)) {
            if (chessPos.getColor(newRow, newCol) === null) {
                res.push({ row: newRow, col: newCol });
                newRow += dRow;
                newCol += dCol;
            } else {
                if (chessPos.getColor(newRow, newCol) !== color) {
                    res.push({ row: newRow, col: newCol });
                }
                return;
            }
        }
    };

    iterate(1, 0);
    iterate(-1, 0);
    iterate(0, 1);
    iterate(0, -1);
    return res;
}