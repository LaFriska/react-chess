import {directionalVector} from "./PieceUtils";
import {isInBound} from "../BackendUtils";

export const getPossibleKingMove = (row, col, chessPos, color) => {
    const res = [];
    let newRow, newCol = undefined
    for(let i = 0; i < 8; i++){
        newRow = row + directionalVector[i][0]
        newCol = col + directionalVector[i][1]
        if(isInBound(newRow, newCol)) {
            if (chessPos.getColor(newRow, newCol) === null) {
                res.push({
                    row: newRow,
                    col: newCol,
                    move: {
                        chessPos: chessPos.clone().move(row, col, newRow, newCol)
                    }
                });
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
            }
        }
    }
    return res;
}