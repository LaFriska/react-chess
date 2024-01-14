import {isInBound} from "../BackendUtils";
import {processDefaultMove} from "./PieceUtils";

const p = [1, -1, 1, -1]
const q = [1, 1, -1, -1]

export const getPossibleKnightMoves = (row, col, chessPos, color) => {
    const res = [];
    const add = (rowAdd, colAdd) => {
        const newRow = row + rowAdd
        const newCol = col + colAdd
        if(!isInBound(newRow, newCol)) return //Breaks if out of bound
        if(chessPos.getColor(newRow, newCol) === color) return; //Breaks if the target square contains a friendly piece
        processDefaultMove(res, chessPos, row, col, newRow, newCol)
    }
    for(let i = 0; i < 4; i++){
        add(p[i], 2 * q[i])
        add(2* p[i], q[i])
    }
    return res;
}

export const isThreatenedByKnight = (chessPos, color) => {

    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;

    const check = (rowAdd, colAdd) => {
        const newRow = row + rowAdd
        const newCol = col + colAdd
        return isInBound(newRow, newCol) && chessPos.get(newRow, newCol) === (color ? 'n' : 'N');
    }
    for(let i = 0; i < 4; i++){
        if(check(p[i], 2 * q[i])) return true;
        if(check(2* p[i], q[i])) return true;
    }
    return false;
}