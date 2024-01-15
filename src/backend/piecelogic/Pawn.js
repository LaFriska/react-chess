import {isInBound} from "../BackendUtils";
import {processCustomMove, processDefaultMove} from "./PieceUtils";

export const getPossiblePawnMoves = (row, col, chessPos, color, futureEnPassent) => {
    const res = [];
    const d = color ? -1 : 1
    if (!isInBound(row + d, col)) return res;
    const initialRank = color ? 6 : 1

    if (chessPos.get(row + d, col) === 'x') { //Avails square directly in front of pawn
        processDefaultMove(res, chessPos, row, col, row + d, col)
        if (row === initialRank && chessPos.get(row + 2 * d, col) === 'x') {//Avails 2nd square directly in front of pawn
            let temp = createFutureEnPassent(row, col, chessPos, color)
            const newRow = row + 2 * d;
            processDefaultMove(res, chessPos, row, col, newRow, col, (temp.length !== 0 ? temp : undefined))
        }
    }

    const checkForTake = (newRow, newCol) => {
        if (!isInBound(newRow, newCol)) return;
        if (chessPos.getColor(newRow, newCol) === !color) {
            processDefaultMove(res, chessPos, row, col, newRow, newCol)
        }
    }
    checkForTake(row + d, col + 1)
    checkForTake(row + d, col - 1)

    if (futureEnPassent.length !== 0) {
        const checkEnPassent = (lr) => {
            let canEnPassent = false;
            for (let i = 0; i < futureEnPassent.length; i++) {
                if (futureEnPassent[i].col === col + lr && futureEnPassent[i].row === row) {
                    canEnPassent = true;
                    break;
                }
            }
            if (canEnPassent) {
                const newRow = row + d;
                const newCol = col + lr;
                processCustomMove(res, chessPos.clone().move(row, col, newRow, newCol).set(row, newCol, 'x'), row + d, col + lr, color)
            }
        }

        checkEnPassent(-1)
        checkEnPassent(1)
    }
    return res;
}

//Searches for any enemy pieces that should have the option to play en passent
function createFutureEnPassent(row, col, chessPos, color) {
    const d = color ? -1 : 1
    const res = []
    const newRow = row + 2 * d
    if (isInBound(newRow, col + 1)) if (chessPos.getColor(newRow, col + 1) === !color) {
        res.push({
            row: newRow,
            col: col
        });
    }
    if (isInBound(newRow, col - 1)) if (chessPos.getColor(newRow, col - 1) === !color) {
        res.push({
            row: newRow,
            col: col
        });
    }
    return res;
}

export const isThreatenedByPawn = (chessPos, color) => {

    const row = chessPos.getKingPosition(color).row;
    const col = chessPos.getKingPosition(color).col;

    const dRow = color ? -1 : 1; //Difference in row
    const check = (dCol /*Difference in col*/) => {
        const newRow = row + dRow;
        const newCol = col + dCol;
        return isInBound(newRow, newCol) && chessPos.get(newRow, newCol) === (color ? 'p' : 'P');
    }

    if(check(-1)) return true;
    if(check(1)) return true;
}

export const isInConditionToPromote = (row, col, newRow, newCol, chessPos) => {
    if(chessPos.get(row, col).toLowerCase() !== 'p') return false;
    const color = chessPos.getColor(row, col)
    if(row !== (color ? 1 : 6)) return false;
    if(newRow !== (color ? 0 : 7)) return false;

    const dCol = Math.abs(newCol - col);
    if(dCol > 1) return false;
    else if(dCol === 1 && chessPos.getColor(newRow, newCol) !== !color) return false;
    else if(dCol === 0 && chessPos.get(newRow, newCol) !== 'x') return false;
    if(chessPos.clone().move(row, col, newRow, newCol).isKingInDanger(color)) return false;
    return true;
}