import { ChessPosition } from "../ChessPosition";
import {directionalVector, iteratePiecePath} from "../util/PieceLogicUtils.ts";
import Move from "../Move"

export const getPossibleBishopMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean) => {
    const res: Move[] = [];
    const iterate = (dRow: number, dCol: number) => {return iteratePiecePath(row, col, color, chessPos, dRow, dCol, res)}
    for(let i = 0; i < 4; i++) iterate(directionalVector[i][0], directionalVector[i][1])

    return res;
}