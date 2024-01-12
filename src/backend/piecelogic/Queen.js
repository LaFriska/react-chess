import {directionalVector, iteratePiecePath} from "./PieceUtils";

export const getPossibleQueenMoves = (row, col, chessPos, color) => {
    const res = [];

    const iterate = (dRow, dCol) => {
        return iteratePiecePath(row, col, color, chessPos, dRow, dCol, res)
    }

    for(let i = 0; i < 8; i++){
        iterate(directionalVector[i][0], directionalVector[i][1])
    }

    return res;
}