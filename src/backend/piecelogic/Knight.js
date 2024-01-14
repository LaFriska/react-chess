import {isInBound} from "../BackendUtils";
import {processDefaultMove} from "./PieceUtils";

const p = [1, -1, 1, -1]
const q = [1, 1, -1, -1]

export const getPossibleKnightMoves = (row, col, chessPos, color) => {
    const res = [];
    const add = (rowAdd, colAdd) => {
        const transformedRow = row + rowAdd
        const transformedCol = col + colAdd
        if(!isInBound(transformedRow, transformedCol)) return //Breaks if out of bound
        if(chessPos.getColor(transformedRow, transformedCol) === color) return; //Breaks if the target square contains a friendly piece
        processDefaultMove(res, chessPos, row, col, transformedRow, transformedCol)
    }
    for(let i = 0; i < 4; i++){
        add(p[i], 2 * q[i])
        add(2* p[i], q[i])
    }
    console.log(res)
    return res;
}

export const isThreatenedByKnight = (row, col, chessPos, color) => {
    const check = (rowAdd, colAdd) => {
        const transformedRow = row + rowAdd
        const transformedCol = col + colAdd
        return isInBound(transformedRow, transformedCol) && chessPos.get(transformedRow, transformedCol) === (color ? 'n' : 'N');
    }
    for(let i = 0; i < 4; i++){
        if(check(p[i], 2 * q[i])) return true;
        if(check(2* p[i], q[i])) return true;
    }
    return false;
}