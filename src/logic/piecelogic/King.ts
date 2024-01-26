import {directionalVector, processCustomMove} from "../util/PieceLogicUtils.ts";
// @ts-ignore
import {isInBound} from "../util/BackendUtils.ts";
import {ChessPosition} from "../ChessPosition"
import Game from "../Game"
import Move from "../Move"

export const getPossibleKingMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean, game: Game): Move[] => {
    const res: Move[] = [];
    let newRow: number
    let newCol: number
    for(let i = 0; i < 8; i++){
        newRow = row + directionalVector[i][0]
        newCol = col + directionalVector[i][1]
        if(isInBound(newRow, newCol)) {
            if (chessPos.getColor(newRow, newCol) === null) {
                processCustomMove(res, chessPos.clone().forceMove(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color, undefined)
            } else {
                if (chessPos.getColor(newRow, newCol) !== color) {
                    processCustomMove(res, chessPos.clone().forceMove(row, col, newRow, newCol).updateKingPosition(color, newRow, newCol), newRow, newCol, color, undefined)
                }
            }
        }
    }
    checkCastling(res, color, chessPos, game, true)
    checkCastling(res, color, chessPos, game, false)
    return res;
}

export const isThreatenedByKing = (chessPos: ChessPosition): boolean => {
    const dRow: number = Math.abs(chessPos.getKingPosition(true).row - chessPos.getKingPosition(false).row);
    const dCol: number = Math.abs(chessPos.getKingPosition(true).col - chessPos.getKingPosition(false).col)
    return dRow <= 1 && dCol <= 1;
}

function checkCastling(res: Move[], color: boolean, chessPos: ChessPosition, game: Game, kingSide: boolean){
    if(game.castleMoveLog[color ? 'K' : 'k']) return;
    const rook: "Rr" | "Rl" | "rl" | "rr" = (kingSide ? (color ? 'Rr' : 'rr') : (color ? 'Rl' : 'rl'));
    if(game.castleMoveLog[rook]) return;
    const d: 1 | -1 = kingSide ? 1 : -1;
    const row: 7 | 0 = color ? 7 : 0;
    if(chessPos.get(row, (kingSide ? 7 : 0)) !== (color ? 'R' : 'r')) return;

    for(let col = 4; col > 0 && col < 7; col = col + d){
        if(col !== 4 && chessPos.get(row, col) !== 'x') return;
        if(col !== 1 && chessPos.clone().forceMove(row, 4, row, col).updateKingPosition(color, row, col).isKingInDanger(color)) return;
    }

    const castledChessPos: ChessPosition = chessPos.clone().forceMove(row, 4, row, kingSide ? 6 : 2).forceMove(row, kingSide ? 7 : 0, row, kingSide ? 5 : 3)
    return processCustomMove(res, castledChessPos, row, kingSide ? 6 : 2, color, undefined)
}