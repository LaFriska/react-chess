import {directionalVector, processCustomMove, processDefaultMove} from "./PieceUtils";
import {isInBound} from "../BackendUtils";

export const getPossibleKingMove = (row, col, chessPos, color) => {
    const res = [];
    let newRow, newCol = undefined
    for(let i = 0; i < 8; i++){
        newRow = row + directionalVector[i][0]
        newCol = col + directionalVector[i][1]
        if(isInBound(newRow, newCol)) {
            if (chessPos.getColor(newRow, newCol) === null) {
                processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color)
                // processDefaultMove(res, chessPos, row, col, newRow, newCol)
                // res.push({
                //     row: newRow,
                //     col: newCol,
                //     move: {
                //         chessPos: chessPos.clone().move(row, col, newRow, newCol)
                //     }
                // });
            } else {
                if (chessPos.getColor(newRow, newCol) !== color) {
                    // processDefaultMove(res, chessPos, row, col, newRow, newCol)
                    processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color)
                    // res.push({
                    //     row: newRow,
                    //     col: newCol,
                    //     move: {
                    //         chessPos: chessPos.clone().move(row, col, newRow, newCol)
                    //     }
                    // });
                }
            }
        }
    }
    return res;
}