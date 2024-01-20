import {ChessPosition} from "./ChessPosition";
import {getPossibleKnightMoves} from "./piecelogic/Knight";
import {checkPieceColor} from "./BackendUtils";
import {getPossiblePawnMoves} from "./piecelogic/Pawn";
import {getPossibleRookMoves} from "./piecelogic/Rook";
import {getPossibleBishopMoves} from "./piecelogic/Bishop";
import {getPossibleQueenMoves} from "./piecelogic/Queen";
import {getPossibleKingMoves} from "./piecelogic/King";

class Game{

    chessPos = ChessPosition.getDefaultPosition()
    turn = true;
    futureEnPassent = [];
    isInCheck;

    hasMoved = {
        K: false,
        k: false,
        Rl: false,
        rl: false,
        rr: false,
        Rr: false
    }

    checkMate = null;
    staleMate = null;
    hasGameEnded = false;

    // eslint-disable-next-line no-useless-constructor
    constructor(){
        this.updateIsInCheck()
    }
    play(row, col, row2, col2, promotion){
        const move = this.getMove(row, col, row2, col2)
        if(move === null) return null;
        //Make moves
        this.futureEnPassent = []; //Reset en passent possibility
        if(move.futureEnPassent !== undefined) this.futureEnPassent = move.futureEnPassent
        if(promotion !== undefined && promotion !== null) move.promote(promotion)
        this.chessPos = move.chessPos;
        this.updateHasMoved(move)
        this.switchTurn()
        this.updateIsInCheck()
        this.scanCheckmateAndStalemate();
        return this.chessPos;
    }

    scanCheckmateAndStalemate(){
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                if(this.chessPos.getColor (row, col) === this.turn && this.getPossibleMoves(row, col).length > 0) return;
            }
        }
        if(this.isInCheck) this.checkMate = true;
        else this.staleMate = true;
        this.hasGameEnded = true;
    }

    updateIsInCheck(){
        this.isInCheck = this.chessPos.isKingInDanger(this.turn);
    }

    updateHasMoved(){
        // if(move.hasMoved !== null) this.hasMoved[move.hasMoved] = true;
        if(this.chessPos.get(0, 0) !== 'r') this.hasMoved.rl = true;
        if(this.chessPos.get(0, 7) !== 'r') this.hasMoved.rr = true;
        if(this.chessPos.get(7, 0) !== 'R') this.hasMoved.Rl = true;
        if(this.chessPos.get(7, 7) !== 'R') this.hasMoved.RR = true;
        if(this.chessPos.get(0, 4) !== 'k') this.hasMoved.k = true;
        if(this.chessPos.get(7, 4) !== 'K') this.hasMoved.K = true;
    }

    switchTurn(){
        this.turn = !this.turn;
    }

    getMove(row, col, row2, col2){
        if(!(Math.max(row2, col2) < 8)) return null; //Makes sure the values stay in bound
        if(this.chessPos.getColor(row, col) !== this.turn) return null; //Checks for the right turn
        return this.isPossibleMove(row, col, row2, col2)
    }

    isPossibleMove(row, col, row2, col2){
        const possibleMoves = this.getPossibleMoves(row, col)
        for(let i = 0; i < possibleMoves.length; i++){
            if(possibleMoves[i].row === row2 && possibleMoves[i].col === col2) return possibleMoves[i];
        }
        return null;
    }

    getPossibleMoves(row, col){
        if(this.hasGameEnded) return [];
        const piece = this.chessPos.get(row, col);
        switch(piece.toLowerCase()){
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece), this.futureEnPassent)
            case 'r': return getPossibleRookMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'b': return getPossibleBishopMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'q': return getPossibleQueenMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'k': return getPossibleKingMoves(row, col, this.chessPos, checkPieceColor(piece), this)
            default: return [];
        }
    }

    // canCastleKingSide(color){
    //     if(color) return this.hasMoved.
    // }
}

export default Game