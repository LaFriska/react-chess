import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";
import {getPossibleKnightMoves} from "./piecelogic/Knight";
import {checkPieceColor} from "./BackendUtils";
import {getPossiblePawnMoves} from "./piecelogic/Pawn";
import {getPossibleRookMoves} from "./piecelogic/Rook";
import {getPossibleBishopMoves} from "./piecelogic/Bishop";
import {getPossibleQueenMoves} from "./piecelogic/Queen";

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
        if(checkPlay === null) return null;
        //Make moves
        this.futureEnPassent = []; //Reset en passent possibility
        if(checkPlay !== undefined && checkPlay.futureEnPassent !== undefined) {
            this.futureEnPassent = checkPlay.futureEnPassent;
        }

        if(checkPlay === undefined) {
            this.chessPos.move(row, col, row2, col2)
        }else if (checkPlay.type === 'normal'){
            this.chessPos.move(row, col, row2, col2)
        }else if (checkPlay.type === 'enpassent'){
            this.chessPos.move(row, col, row2, col2)
            this.chessPos.set(row, col2, 'x')
        }
        this.switchTurn()
        return this.chessPos;
    }

    switchTurn(){
        this.turn = !this.turn;
    }

    checkPlay(row, col, row2, col2){
        if(!(Math.max(row2, col2) < 8)) return null; //Makes sure the values stay in bound
        if(this.chessPos.getColor(row, col) !== this.turn) return null; //Checks for the right turn
        return this.isPossibleMove(row, col, row2, col2)
    }

    enPassentCallBack = () => {

    }

    isPossibleMove(row, col, row2, col2){
        const possibleMoves = this.getPossibleMoves(row, col)
        for(let i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i].row === row2 && possibleMoves[i].col === col2){
                return possibleMoves[i].move;
            }
        }
        return null;
    }

    getPossibleMoves(row, col){
        const piece = this.chessPos.get(row, col);
        switch(piece){
            case 'N':
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p':
            case 'P': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece), this.futureEnPassent)
            case 'r':
            case 'R': return getPossibleRookMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'b':
            case 'B': return getPossibleBishopMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'q':
            case 'Q': return getPossibleQueenMoves(row, col, this.chessPos, checkPieceColor(piece))
            default: return [];
        }
    }
}

export default Game