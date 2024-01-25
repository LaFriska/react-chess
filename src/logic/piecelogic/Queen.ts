import {directionalVector, iteratePiecePath} from "../util/PieceLogicUtils.ts";
import Move from "../Move"
import {ChessPosition} from "../ChessPosition"

export const getPossibleQueenMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean): Move[] => {
    const res: Move[] = [];
    const iterate = (dRow: number, dCol: number) => {return iteratePiecePath(row, col, color, chessPos, dRow, dCol, res)}
    for(let i = 0; i < 8; i++) iterate(directionalVector[i][0], directionalVector[i][1])
    return res;
}