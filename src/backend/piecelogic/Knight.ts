import {isInBound} from "../BackendUtils";
import { ChessPosition } from "../ChessPosition";
// @ts-ignore
import {processDefaultMove} from "../util/PieceLogicUtils.ts";
import Move from "../Move"

const rowVectors: number[] = [1, -1, 1, -1]
const colVectors: number[] = [1, 1, -1, -1]

export const getPossibleKnightMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean): Move[] => {
    const res: Move[] = [];
    const add = (rowAdd: number, colAdd: number) => {
        const newRow: number = row + rowAdd
        const newCol: number = col + colAdd
        if(!isInBound(newRow, newCol)) return //Breaks if out of bound
        if(chessPos.getColor(newRow, newCol) === color) return; //Breaks if the target square contains a friendly piece
        processDefaultMove(res, chessPos, row, col, newRow, newCol, undefined)
    }
    for(let i = 0; i < 4; i++){
        add(rowVectors[i], 2 * colVectors[i])
        add(2* rowVectors[i], colVectors[i])
    }
    return res;
}

export const isThreatenedByKnight = (chessPos: ChessPosition, color: boolean): boolean => {

    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;

    const check = (rowAdd: number, colAdd: number) => {
        const newRow: number = row + rowAdd
        const newCol: number = col + colAdd
        return isInBound(newRow, newCol) && chessPos.get(newRow, newCol) === (color ? 'n' : 'N');
    }
    for(let i = 0; i < 4; i++){
        if(check(rowVectors[i], 2 * colVectors[i])) return true;
        if(check(2* rowVectors[i], colVectors[i])) return true;
    }
    return false;
}