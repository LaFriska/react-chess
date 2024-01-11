import {isInBound} from "../BackendUtils";

export const getPossiblePawnMoves = (row, col, chessPos, color) => {
    const res = [];
    const d = color ? -1 : 1
    const initialRank = color ? 6 : 1

    if(chessPos.get(row + d, col) === 'x') { //Avails square directly in front of pawn
        res.push({x: row + d, y: col})
        if(row === initialRank && chessPos.get(row + 2 * d, col) === 'x') res.push({x: row + 2*d, y: col}) //Avails 2nd square directly in front of pawn
    }

    const checkForTake = (newRow, newCol) => {
        if(!isInBound(newRow, newCol)) return;
        if(chessPos.getColor(newRow, newCol) === !color) {
            res.push({x: newRow, y: newCol})
        }
    }
    checkForTake(row + d, col + 1)
    checkForTake(row + d, col - 1)

    return res;
}