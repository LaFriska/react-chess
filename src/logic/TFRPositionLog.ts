import CastleMoveLog from "./CastleMoveLog";
import { ChessPosition } from "./ChessPosition";
import Game from "./Game"
import Vector from "./util/Vector.ts";

/**
 * TFR stands for threefold repetition.
 *
 * This is a log to count the number of unique positions where the turn, castling rights and
 * rights to en passant are the same. After every position change, the position log takes the current position and
 * compare it with an array of previous unique positions. If a position match, the "count" attribute
 * will be increased, and if no positions match with the current position, the current position will be added to the
 * array. Due to its computational intensive nature, any pawn moves, piece takes, castling, or any moves
 * that changes castling rights will wipe the position log entirely, since any of said moves are not irreversible,
 * that is, no previous positions could possibly repeat henceforth.
 * */
class TFRPositionLog {
    claimThreefoldRepetition: boolean
    castlingRights: CastlingRights
    positions: Pos[] = []
    game: Game

    constructor(game: Game) {
        this.castlingRights = new CastlingRights(game.castleMoveLog);
        this.game = game;
        this.positions.push(new Pos(game.chessPos.clone(), this.cloneFutureEnPassant(game.futureEnPassant), game.turn))
    }

    log(row: number, col: number, newRow: number, newCol: number, hasTakenPiece: boolean): void{
        const castlingRight: CastlingRights = new CastlingRights(this.game.castleMoveLog);
        if (!this.castlingRights.compare(castlingRight)) {
            this.castlingRights = castlingRight;
            this.reset();
        }
        if (this.game.chessPos.get(newRow, newCol).toLowerCase() === 'p') this.reset();
        if (hasTakenPiece) this.reset();
        this.iterativelyCompare(this.game.chessPos, this.game.futureEnPassant, this.game.turn);
    }

    iterativelyCompare(chessPos: ChessPosition, futureEnPassant: Vector[], turn: boolean): void{ //TODO create interface for row col for future en passant
        for(let i = 0; i < this.positions.length; i++){
            if(this.positions[i].compare(new Pos(chessPos, futureEnPassant, turn))){
                this.positions[i].increment();
                if(this.positions[i].count >= 3) this.claimThreefoldRepetition = true;
                return;
            }
        }
        this.positions.push(new Pos(chessPos.clone(), this.cloneFutureEnPassant(futureEnPassant), turn))
    }

    cloneFutureEnPassant(futureEnPassant: Vector[]): Vector[]{
        return futureEnPassant.map(coords => ({...coords}));
    }
    reset(): void{
        this.positions = [];
    }
}

class Pos {
    chessPos: ChessPosition
    futureEnPassant: Vector[]
    turn: boolean
    count: number

    constructor(chessPos: ChessPosition, futureEnPassant: Vector[], turn: boolean){
        this.chessPos = chessPos;
        this.futureEnPassant = futureEnPassant;
        this.turn = turn;
        this.count = 1;
    }

    increment(){
        this.count++;
    }

    compare(pos: Pos): boolean{ //Does NOT check for castling rights, as when castling rights change, position array will be cleared in PositionLog
        if(pos.turn !== this.turn) return false;
        if(this.futureEnPassant.length !== pos.futureEnPassant.length) return false;
        for(let i = 0; i < this.futureEnPassant.length; i++){ //Scans for if en passant moves are the same
            if(this.futureEnPassant[i].row !== pos.futureEnPassant[i].row) return false;
            if(this.futureEnPassant[i].col !== pos.futureEnPassant[i].col) return false;
        }
        for(let row = 0; row < 8; row++){ //Checks if chess position is the same.
            for(let col = 0; col < 8; col++){
                if(this.chessPos.get(row, col) !== pos.chessPos.get(row, col)) return false;
            }
        }
        return true;
    }
}

class CastlingRights{

    whiteRight:boolean = true;
    whiteLeft:boolean = true;
    blackRight:boolean = true;
    blackLeft:boolean = true;

    constructor(castleMoveLog: CastleMoveLog){
        if(castleMoveLog.K === true) {
            this.whiteRight = false
            this.whiteLeft = false;
        }else {
            if(castleMoveLog.Rr) this.whiteRight = false;
            if(castleMoveLog.Rl) this.whiteLeft = false;
        }
        if(castleMoveLog.k === true) {
            this.blackRight = false
            this.blackRight = false;
        }else {
            if(castleMoveLog.rr) this.blackRight = false;
            if(castleMoveLog.rl) this.blackLeft = false;
        }
    }

    compare(castlingRight: CastlingRights){
        if(this.whiteRight !== castlingRight.whiteRight) return false;
        if(this.whiteLeft !== castlingRight.whiteLeft) return false;
        if(this.blackLeft !== castlingRight.blackLeft) return false;
        return this.blackRight === castlingRight.blackRight;
    }
}

export default TFRPositionLog