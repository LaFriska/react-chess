import {isInBound} from "../BackendUtils";
import { ChessPosition } from "../ChessPosition";
// @ts-ignore
import {processDefaultMove} from "../util/PieceLogicUtils.ts";
import Move from "../Move"

const p = [1, -1, 1, -1]
const q = [1, 1, -1, -1]

export const getPossibleKnightMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean) => {
    const res: Move[] = [];
    const add = (rowAdd: number, colAdd: number) => {
        const newRow: number = row + rowAdd
        const newCol: number = col + colAdd
        if(!isInBound(newRow, newCol)) return //Breaks if out of bound
        if(chessPos.getColor(newRow, newCol) === color) return; //Breaks if the target square contains a friendly piece
        processDefaultMove(res, chessPos, row, col, newRow, newCol, undefined)
    }
    for(let i = 0; i < 4; i++){
        add(p[i], 2 * q[i])
        add(2* p[i], q[i])
    }
    return res;
}

export const isThreatenedByKnight = (chessPos: ChessPosition, color: boolean) => {

    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;

    const check = (rowAdd: number, colAdd: number) => {
        const newRow: number = row + rowAdd
        const newCol: number = col + colAdd
        return isInBound(newRow, newCol) && chessPos.get(newRow, newCol) === (color ? 'n' : 'N');
    }
    for(let i = 0; i < 4; i++){
        if(check(p[i], 2 * q[i])) return true;
        if(check(2* p[i], q[i])) return true;
    }
    return false;
}