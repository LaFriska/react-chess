import {ChessPosition} from "./ChessPosition.ts";
import Vector from "./util/Vector.ts";
import CastleMoveLog from "./CastleMoveLog.ts";

class Move{

    row: number
    col: number
    chessPos: ChessPosition
    futureEnPassant: Vector[]
    castleMoveLog: CastleMoveLog

    constructor(row: number, col: number, chessPos: ChessPosition, futureEnPassant: Vector[]){
        this.row = row;
        this.col = col;
        this.chessPos = chessPos;
        this.futureEnPassant = futureEnPassant;
        this.castleMoveLog = null;
    }

    promote(piece: string): void{//TODO get rid of this piece of crap
        this.chessPos.set(this.row, this.col, piece)
    }
}

export default Move;