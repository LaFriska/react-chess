// @ts-ignore
import {isInBound} from "./BackendUtils.ts";
import { ChessPosition } from "../ChessPosition";
import Move from "../Move";
import Vector from "./Vector.ts";

export const iteratePiecePath = (row: number, col: number, color: boolean, chessPos: ChessPosition, dRow: number, dCol: number, res: Move[]): void => {
    let newRow: number = row + dRow;
    let newCol: number = col + dCol;
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

export const iterateCheckForKingSafety = (row: number, col: number, dRow: number, dCol: number, chessPos: ChessPosition, pieces: string[]) => {
    let newRow: number = row + dRow;
    let newCol: number = col + dCol;
    while(isInBound(newRow, newCol)) {
        if (chessPos.getColor(newRow, newCol) === null) {
            newRow += dRow;
            newCol += dCol;
        } else return chessPos.get(newRow, newCol) === pieces[0] || (pieces.length === 2 ? chessPos.get(newRow, newCol) === pieces[1] : false);
    }
    return false;
    //TODO return?
}

export const isThreatenedByQueenBishopOrRook = (chessPos: ChessPosition, color: boolean): boolean => {
    const kingRow = chessPos.getKingPosition(color).row;
    const kingCol = chessPos.getKingPosition(color).col;
    const iterate = (dRow: number, dCol: number, pieces: string[]) => {return iterateCheckForKingSafety(kingRow, kingCol, dRow, dCol, chessPos, pieces)}
    for(let i = 0; i < 4; i++) if(iterate(directionalVector[i][0], directionalVector[i][1], color ? ['b', 'q'] : ['B', 'Q'])) return true;
    for(let i = 4; i < 8; i++) if(iterate(directionalVector[i][0], directionalVector[i][1], color ? ['r', 'q'] : ['R', 'Q'])) return true;
    return false;
}

export const directionalVector: number[][] = [
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1],
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
]

export const processCustomMove = (res: Move[], chessPos: ChessPosition, newRow: number, newCol: number, color: boolean, futureEnPassent: Vector[]): void => {
    if(chessPos.isKingInDanger(color)) return
    res.push(new Move(newRow, newCol, chessPos, futureEnPassent))
}

export const processDefaultMove = (res: Move[], chessPos: ChessPosition, row: number, col: number, newRow: number, newCol: number, futureEnPassent: Vector[]): void => {
    processCustomMove(res, chessPos.clone().forceMove(row, col, newRow, newCol), newRow, newCol, chessPos.getColor(row, col), futureEnPassent)
}