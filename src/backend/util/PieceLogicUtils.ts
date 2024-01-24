import {isInBound} from "../BackendUtils";
import { ChessPosition } from "../ChessPosition";
import Move from "../Move";

export const iteratePiecePath = (row: number, col: number, color: boolean, chessPos: ChessPosition, dRow: number, dCol: number, res: Move[]) => {
    let newRow = row + dRow;
    let newCol = col + dCol;
    while (isInBound(newRow, newCol)) {
        if (chessPos.getColor(newRow, newCol) === null) {
            processDefaultMove(res, chessPos, row, col, newRow, newCol, undefined) //TODO should maybe be null?
            newRow += dRow;
            newCol += dCol;
        } else {
            if (chessPos.getColor(newRow, newCol) !== color) processDefaultMove(res, chessPos, row, col, newRow, newCol, undefined)
            return;
        }
    }
}

export const iterateCheckForKingSafety = (row, col, dRow, dCol, chessPos, pieces) => {
    let newRow = row + dRow;
    let newCol = col + dCol;
    while (isInBound(newRow, newCol)) {
        if (chessPos.getColor(newRow, newCol) === null) {
            newRow += dRow;
            newCol += dCol;
        } else return chessPos.get(newRow, newCol) === pieces[0] || (pieces.length === 2 ? chessPos.get(newRow, newCol) === pieces[1] : false);
    }
}

export const isThreatenedByQueenBishopOrRook = (chessPos, color) => {
    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;
    const iterate = (dRow, dCol, pieces) => {return iterateCheckForKingSafety(row, col, dRow, dCol, chessPos, pieces)}
    for(let i = 0; i < 4; i++) if(iterate(directionalVector[i][0], directionalVector[i][1], color ? ['b', 'q'] : ['B', 'Q'])) return true;
    for(let i = 4; i < 8; i++) if(iterate(directionalVector[i][0], directionalVector[i][1], color ? ['r', 'q'] : ['R', 'Q'])) return true;
    return false;
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

export const processCustomMove = (res: Move[], chessPos: ChessPosition, newRow: number, newCol: number, color: boolean, futureEnPassent: any[]) => {
    if(chessPos.isKingInDanger(color)) return
    res.push(new Move(newRow, newCol, chessPos, futureEnPassent))
}

export const processDefaultMove = (res: Move[], chessPos: ChessPosition, row: number, col: number, newRow: number, newCol: number, futureEnPassent: any[]) => {
    processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol), newRow, newCol, chessPos.getColor(row, col), futureEnPassent)
}