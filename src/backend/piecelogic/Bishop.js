import {isInBound} from "../BackendUtils";
import {directionalVector, iteratePiecePath} from "./PieceUtils";

export const getPossibleBishopMoves = (row, col, chessPos, color) => {

    const res = [];

    const iterate = (dRow, dCol) => {return iteratePiecePath(row, col, color, chessPos, dRow, dCol, res)}
    for(let i = 0; i < 4; i++) iterate(directionalVector[i][0], directionalVector[i][1])

    return res;
}