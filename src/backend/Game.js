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
    futureEnPassent = [];

    // eslint-disable-next-line no-useless-constructor
    constructor(){
    }

    play(row, col, row2, col2){
        const checkPlay = this.checkPlay(row, col, row2, col2)
        if(checkPlay === false) return null;
        this.futureEnPassent = [];
        if(checkPlay === true) this.chessPos.move(row, col, row2, col2)
        else { //ADDITIONAL DATA
            this.chessPos.move(row, col, row2, col2)
            if(checkPlay.futureEnPassent !== undefined) {
                this.futureEnPassent = checkPlay.futureEnPassent;
            }
            if(checkPlay.specialInstruction !== undefined) {
                this.executeSpecialInstruction(checkPlay.specialInstruction)
            }
        }
        this.turn = !this.turn
        return this.chessPos;
    }

    executeSpecialInstruction(specialInstruction){
        const split = specialInstruction.split(' ');
        if(split[0] === 'delete'){
            this.chessPos.set(parseInt(split[1]), parseInt(split[2]), 'x')
        }
    }

    checkPlay(row, col, row2, col2){
        if(!(Math.max(row2, col2) < 8)) return false; //Makes sure the values stay in bound
        if(this.chessPos.getColor(row, col) !== this.turn) return false; //Checks for the right turn
        const piece = this.chessPos.get(row, col);
        return this.isPossibleMove(row, col, row2, col2)
    }

    enPassentCallBack = () => {

    }

    getPossibleMoves(row, col){
        const piece = this.chessPos.get(row, col);
        switch(piece){
            case 'N':
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p':
            case 'P': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece), this.futureEnPassent)
            default: return [];
        }
    }

    isPossibleMove(row, col, row2, col2){
        const possibleMoves = this.getPossibleMoves(row, col)
        for(let i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i].row === row2 && possibleMoves[i].col === col2){
                return possibleMoves[i].additionalData === undefined ? true : possibleMoves[i].additionalData;
            }
        }
        return false;
    }
}

export default Game