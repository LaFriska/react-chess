import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";

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
        if(piece.toLowerCase() === 'n' && !this.checkKnight(x, y, x2, y2)) return false;
        return true;
    }

    checkKnight(x, y, x2, y2){
        const dx = Math.abs(x2 - x)
        const dy = Math.abs(y2 - y)

        if(Math.abs(dx - dy) === 1) return true;
        else return false;
    }
}

export default Game