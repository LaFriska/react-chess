import Vector from "./util/Vector.ts";
import {ChessPosition} from "./ChessPosition.ts";

class KingTracker{

    blackKingPosition: Vector
    whiteKingPosition: Vector
    chessPos: ChessPosition

    constructor(chessPos: ChessPosition, whiteKingPosition: Vector | undefined, blackKingPosition: Vector | undefined){
        this.chessPos = chessPos
        this.blackKingPosition = blackKingPosition === undefined ? this.search('k') : blackKingPosition
        this.whiteKingPosition = whiteKingPosition === undefined ? this.search('K') : whiteKingPosition
    }

    search(kingChar: string): Vector{
        for(let r = 0; r < 8; r++){
            for(let c = 0; c < 8; c++){
                if(this.chessPos.get(r, c) === kingChar) return new Vector(r, c)
            }
        }
    }

    getKingPosition(color: boolean): Vector{
        if(color) return this.whiteKingPosition;
        return this.blackKingPosition
    }

    updateKingPosition(color: boolean, vector: Vector): void{
        if(color) this.whiteKingPosition = vector;
        else this.blackKingPosition = vector;
    }
}

export default KingTracker