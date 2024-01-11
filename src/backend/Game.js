import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";
import {getPossibleKnightMoves} from "./Knight";
import {checkPieceColor} from "./BackendUtils";

class Game{

    chessPos = ChessPosition.getDefaultPosition(false)
    hasWhiteCastled = false;
    hasBlackCastled = false;
    moves = 0;
    turn = true;


    // eslint-disable-next-line no-useless-constructor
    constructor(){
    }

    play(x, y, x2, y2){
        if(!this.checkPlay(x, y, x2, y2)) return null;
        this.chessPos.move(x, y, x2, y2)
        this.turn = !this.turn
        return this.chessPos;
    }

    checkPlay(x, y, x2, y2){
        if(!(Math.max(x2, y2) < 8)) return false; //Makes sure the values stay in bound
        if(this.chessPos.getColor(x, y) !== this.turn) return false; //Checks for the right turn
        const piece = this.chessPos.get(x, y);
        return this.isPossibleMove(x, y, x2, y2)
    }

    getPossibleMoves(x, y){
        const piece = this.chessPos.get(x, y);
        switch(piece){
            case 'N':
            case 'n': return getPossibleKnightMoves(x, y, this.chessPos, checkPieceColor(piece))
            default: return [];
        }
    }

    isPossibleMove(x, y, x2, y2){
        const possibleMoves = this.getPossibleMoves(x, y)

        for(let i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i].x === x2 && possibleMoves[i].y === y2) return true;
        }
        return false;
    }
}

export default Game