import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";
import {getPossibleKnightMoves} from "./piecelogic/Knight";
import {checkPieceColor} from "./BackendUtils";
import {getPossiblePawnMoves} from "./piecelogic/Pawn";

class Game{

    chessPos = ChessPosition.getDefaultPosition(false)
    hasWhiteCastled = false;
    hasBlackCastled = false;
    moves = 0;
    turn = true;


    // eslint-disable-next-line no-useless-constructor
    constructor(){
    }

    play(row, col, row2, col2){
        if(!this.checkPlay(row, col, row2, col2)) return null;
        this.chessPos.move(row, col, row2, col2)
        this.turn = !this.turn
        return this.chessPos;
    }

    checkPlay(row, col, row2, col2){
        if(!(Math.max(row2, col2) < 8)) return false; //Makes sure the values stay in bound
        if(this.chessPos.getColor(row, col) !== this.turn) return false; //Checks for the right turn
        const piece = this.chessPos.get(row, col);
        return this.isPossibleMove(row, col, row2, col2)
    }

    getPossibleMoves(row, col){
        const piece = this.chessPos.get(row, col);
        switch(piece){
            case 'N':
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p':
            case 'P': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece))
            default: return [];
        }
    }

    isPossibleMove(row, col, row2, col2){
        const possibleMoves = this.getPossibleMoves(row, col)

        for(let i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i].x === row2 && possibleMoves[i].y === col2) return true;
        }
        return false;
    }
}

export default Game