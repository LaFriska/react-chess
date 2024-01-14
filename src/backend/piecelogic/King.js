import {directionalVector, processCustomMove, processDefaultMove} from "./PieceUtils";
import {isInBound} from "../BackendUtils";

export const getPossibleKingMoves = (row, col, chessPos, color, game) => {
    const res = [];
    let newRow, newCol = undefined
    for(let i = 0; i < 8; i++){
        newRow = row + directionalVector[i][0]
        newCol = col + directionalVector[i][1]
        if(isInBound(newRow, newCol)) {
            if (chessPos.getColor(newRow, newCol) === null) {
                processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color)
            } else {
                if (chessPos.getColor(newRow, newCol) !== color) {
                    processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color)
                }
            }
        }
    }
    return res;
}

export const isThreatenedByKing = (chessPos) => {
    const dRow = Math.abs(chessPos.getKingPosition(true).row - chessPos.getKingPosition(false).row);
    const dCol = Math.abs(chessPos.getKingPosition(true).col - chessPos.getKingPosition(false).col)
    return dRow <= 1 && dCol <= 1;
}