import {isInBound} from "../BackendUtils";

export const getPossibleKnightMoves = (row, col, chessPos, color) => {
    const res = [];
    const add = (rowAdd, colAdd) => {
        const transformedRow = row + rowAdd
        const transformedCol = col + colAdd
        if(!isInBound(transformedRow, transformedCol)) return //Breaks if out of bound
        if(chessPos.getColor(transformedRow, transformedCol) === color) return; //Breaks if the target square contains a friendly piece

        res.push({
            row: transformedRow,
            col: transformedCol,
            move: {
                chessPos: chessPos.clone().move(row, col, transformedRow, transformedCol)
            }
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