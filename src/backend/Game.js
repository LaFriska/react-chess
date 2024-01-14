import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";
import {getPossibleKnightMoves} from "./piecelogic/Knight";
import {checkPieceColor} from "./BackendUtils";
import {getPossiblePawnMoves} from "./piecelogic/Pawn";
import {getPossibleRookMoves} from "./piecelogic/Rook";
import {getPossibleBishopMoves} from "./piecelogic/Bishop";
import {getPossibleQueenMoves} from "./piecelogic/Queen";
import {getPossibleKingMove} from "./piecelogic/King";

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
        this.chessPos = checkPlay.chessPos;
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
            if(possibleMoves[i].row === row2 && possibleMoves[i].col === col2) return possibleMoves[i];
        }
        return null;
    }

    getPossibleMoves(row, col){
        const piece = this.chessPos.get(row, col);
        switch(piece.toLowerCase()){
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece), this.futureEnPassent)
            case 'r': return getPossibleRookMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'b': return getPossibleBishopMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'q': return getPossibleQueenMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'k': return getPossibleKingMove(row, col, this.chessPos, checkPieceColor(piece))
            default: return [];
        }
    }
}

export default Game