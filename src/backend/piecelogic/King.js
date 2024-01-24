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
    checkCastling(res, color, chessPos, game, true)
    checkCastling(res, color, chessPos, game, false)
    return res;
}

export const isThreatenedByKing = (chessPos) => {
    const dRow = Math.abs(chessPos.getKingPosition(true).row - chessPos.getKingPosition(false).row);
    const dCol = Math.abs(chessPos.getKingPosition(true).col - chessPos.getKingPosition(false).col)
    return dRow <= 1 && dCol <= 1;
}

function checkCastling(res, color, chessPos, game, kingSide){
    if(game.castleMoveLog[color ? 'K' : 'k']) return;
    const rook = (kingSide ? (color ? 'Rr' : 'rr') : (color ? 'Rl' : 'rl'));
    if(game.castleMoveLog[rook]) return;
    const d = kingSide ? 1 : -1;
    const row = color ? 7 : 0;
    if(chessPos.get(row, (kingSide ? 7 : 0)) !== (color ? 'R' : 'r')) return;

    for(let col = 4; col > 0 && col < 7; col = col + d){
        if(col !== 4 && chessPos.get(row, col) !== 'x') return;
        if(col !== 1 && chessPos.clone().move(row, 4, row, col).updateKingPosition(color, row, col).isKingInDanger(color)) return;
    }

    const castledChessPos = chessPos.clone().move(row, 4, row, kingSide ? 6 : 2).move(row, kingSide ? 7 : 0, row, kingSide ? 5 : 3)
    return processCustomMove(res, castledChessPos, row, kingSide ? 6 : 2, color)
}