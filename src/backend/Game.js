import {ChessPosition} from "./ChessPosition";
import board from "../components/Board";
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

    hasMoved = {
        K: false,
        k: false,
        Rl: false,
        rl: false,
        rr: false,
        Rr: false
    }

    // eslint-disable-next-line no-useless-constructor
    constructor(){
    }
    //TODO completely refactor futureEnPassent so that Pawn.js interact directly with the game class
    play(row, col, row2, col2){
        const move = this.getMove(row, col, row2, col2)
        if(move === null) return null;
        //Make moves
        this.updateHasMoved(move)
        this.futureEnPassent = []; //Reset en passent possibility
        if(move.futureEnPassent !== undefined) this.futureEnPassent = move.futureEnPassent
        this.chessPos = move.chessPos;
        this.switchTurn()
        return this.chessPos;
    }

    updateHasMoved(move){
        if(move.hasMoved !== null) this.hasMoved[move.hasMoved] = true;
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
        const piece = this.chessPos.get(row, col);
        switch(piece.toLowerCase()){
            case 'n': return getPossibleKnightMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'p': return getPossiblePawnMoves(row, col, this.chessPos, checkPieceColor(piece), this.futureEnPassent)
            case 'r': {
                const possibleMoves = getPossibleRookMoves(row, col, this.chessPos, checkPieceColor(piece));
                //TODO cover case: rook not in corner square in the first place, or rook taken.
                if(this.hasMoved.Rl === false && row === 7 && col === 0) possibleMoves.forEach((move) => {move.setHasMove('Rl')})
                if(this.hasMoved.Rr === false && row === 7 && col === 7) possibleMoves.forEach((move) => {move.setHasMove('Rr')})
                if(this.hasMoved.rl === false && row === 0 && col === 0) possibleMoves.forEach((move) => {move.setHasMove('rl')})
                if(this.hasMoved.rr === false && row === 0 && col === 7) possibleMoves.forEach((move) => {move.setHasMove('rr')})

                return possibleMoves
            }
            case 'b': return getPossibleBishopMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'q': return getPossibleQueenMoves(row, col, this.chessPos, checkPieceColor(piece))
            case 'k': {
                const possibleMoves = getPossibleKingMoves(row, col, this.chessPos, checkPieceColor(piece), this);

                if(this.hasMoved.K === false && piece === 'K') possibleMoves.forEach((move) => {move.setHasMove('K')})
                if(this.hasMoved.k === false && piece === 'k') possibleMoves.forEach((move) => {move.setHasMove('k')})

                return possibleMoves
            }
            default: return [];
        }
    }

    // canCastleKingSide(color){
    //     if(color) return this.hasMoved.
    // }
}

export default Game