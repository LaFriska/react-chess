import {isInBound} from "../BackendUtils";

export const getPossibleKnightMoves = (x, y, chessPos, color) => {
    const res = [];
    const add = (rowAdd, colAdd) => {
        const transformedRow = x + rowAdd
        const tranformedCol = y + colAdd
        if(!isInBound(transformedRow, tranformedCol)) return //Breaks if out of bound
        if(chessPos.getColor(transformedRow, tranformedCol) === color) return; //Breaks if the target square contains a friendly piece

        res.push({
            row: transformedRow,
            col: tranformedCol,
        })
    }
    const p = [1, -1, 1, -1]
    const q = [1, 1, -1, -1]
    for(let i = 0; i < 4; i++){
        add(p[i], 2 * q[i])
        add(2* p[i], q[i])
    }
    return res;
}