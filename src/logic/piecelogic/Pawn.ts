// @ts-ignore
import {isInBound} from "../util/BackendUtils.ts";
import {processCustomMove, processDefaultMove} from "../util/PieceLogicUtils.ts";
import Move from "../Move";
import { ChessPosition } from "../ChessPosition";

export const getPossiblePawnMoves = (row: number, col: number, chessPos: ChessPosition, color: boolean, futureEnPassent: any[]): Move[] => {
    const res: Move[] = [];
    const dRow: 1 | -1 = color ? -1 : 1 //Directional vector row
    if (!isInBound(row + dRow, col)) return res;
    const initialRank: 1 | 6 = color ? 6 : 1

    if (chessPos.get(row + dRow, col) === 'x') { //Avails square directly in front of pawn
        processDefaultMove(res, chessPos, row, col, row + dRow, col, undefined)
        if (row === initialRank && chessPos.get(row + 2 * dRow, col) === 'x') {//Avails 2nd square directly in front of pawn
            let temp: any[] = createFutureEnPassent(row, col, chessPos, color)
            const newRow: number = row + 2 * dRow;
            processDefaultMove(res, chessPos, row, col, newRow, col, (temp.length !== 0 ? temp : undefined)) //Adding future en passent when needed
        }
    }

    const checkDiagnalTakes = (newRow: number, newCol: number): void => {
        if (!isInBound(newRow, newCol)) return;
        if (chessPos.getColor(newRow, newCol) === !color) processDefaultMove(res, chessPos, row, col, newRow, newCol, undefined)
    }
    checkDiagnalTakes(row + dRow, col + 1)
    checkDiagnalTakes(row + dRow, col - 1)

    if (futureEnPassent.length !== 0) { //Add potential en passent move
        const checkEnPassent = (dCol: number): void => {
            let canEnPassent: boolean = false;
            for (let i = 0; i < futureEnPassent.length; i++) {
                if (futureEnPassent[i].col === col + dCol && futureEnPassent[i].row === row) {
                    canEnPassent = true;
                    break;
                }
            }
            if (canEnPassent) {
                const newRow: number = row + dRow;
                const newCol: number = col + dCol;
                processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).set(row, newCol, 'x'), row + dRow, col + dCol, color, undefined)
            }
        }

        checkEnPassent(-1)
        checkEnPassent(1)
    }
    return res;
}

//Searches for any enemy pieces that should have the option to play en passent
function createFutureEnPassent(row: number, col: number, chessPos: ChessPosition, color: boolean): any[] {
    const dRow: 1 | -1 = color ? -1 : 1
    const futureEnPassent: any[] = []
    const newRow: number = row + 2 * dRow
    if (isInBound(newRow, col + 1)) if (chessPos.getColor(newRow, col + 1) === !color) futureEnPassent.push({row: newRow, col: col});
    if (isInBound(newRow, col - 1)) if (chessPos.getColor(newRow, col - 1) === !color) futureEnPassent.push({row: newRow, col: col});
    return futureEnPassent;
}

export const isThreatenedByPawn = (chessPos: ChessPosition, color: boolean): boolean => {

    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;

    const dRow: 1 | -1 = color ? -1 : 1; //Difference in row
    const check = (dCol: number) => {
        const newRow: number = row + dRow;
        const newCol: number = col + dCol;
        return isInBound(newRow, newCol) && chessPos.get(newRow, newCol) === (color ? 'p' : 'P');
    }

    if(check(-1)) return true;
    return check(1);

}

export const isInConditionToPromote = (row: number, col: number, newRow: number, newCol: number, chessPos: ChessPosition): boolean => {
    if(chessPos.get(row, col).toLowerCase() !== 'p') return false;
    const color: boolean = chessPos.getColor(row, col)
    if(row !== (color ? 1 : 6)) return false;
    if(newRow !== (color ? 0 : 7)) return false;

    const dCol: number = Math.abs(newCol - col);
    if(dCol > 1) return false;
    else if(dCol === 1 && chessPos.getColor(newRow, newCol) !== !color) return false;
    else if(dCol === 0 && chessPos.get(newRow, newCol) !== 'x') return false;
    return !chessPos.clone().move(row, col, newRow, newCol).isKingInDanger(color);
}