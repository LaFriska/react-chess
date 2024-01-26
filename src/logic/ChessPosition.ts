// @ts-ignore
import {checkPieceColor} from "./util/BackendUtils.ts";
import {isThreatenedByKnight} from "./piecelogic/Knight.ts";
import {isThreatenedByPawn} from "./piecelogic/Pawn.ts";
import {isThreatenedByKing} from "./piecelogic/King.ts";
import {isThreatenedByQueenBishopOrRook} from "./util/PieceLogicUtils.ts";
import {isEven} from "./util/Util";
import KingTracker from "./KingTracker.ts";
import Vector from "./util/Vector.ts";

export class ChessPosition {

    kingTracker : KingTracker
    matrix: string[][]

    constructor(matrix: string[][], whiteKingPosition: Vector|undefined, blackKingPosition: Vector|undefined){
        this.matrix = matrix
        this.kingTracker = new KingTracker(this, whiteKingPosition, blackKingPosition)
    }

    forceMove(row: number, col: number, newRow: number, newCol: number): ChessPosition{
        this.set(newRow, newCol, this.get(row, col))
        this.set(row, col, 'x')
        return this;
    }

    set(row: number, col: number, piece: string): ChessPosition{
        this.matrix[row][col] = piece
        return this;
    }

    get(row: number, col: number): string{
        return this.matrix[row][col];
    }

    getColor(row: number, col: number): boolean{
        return checkPieceColor(this.get(row, col))
    }
    clone(): ChessPosition{
        const matrix: string[][] = Array.from({ length: 8 }, (_, row: number) =>
            Array.from({ length: 8 }, (_, col: number) => this.get(row, col))
        );
        return new ChessPosition(matrix, this.getKingPosition(true), this.getKingPosition(false));
    }

    // checkMatrix(): void{
    //     const err = () => {throw new Error('Chess board matrix must be 8 by 8.')}
    //     if(this.matrix.length !== 8) err()
    //     for(let i = 0; i < 8; i++){
    //         if(this.matrix[i].length !== 8) err()
    //     }
    // }

    getSquareColor(row: number, col: number){
        return isEven(row + col);
    }

    static getInitialPosition(): ChessPosition{
        // return t1;
        return new ChessPosition([
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
        ], undefined, undefined)
    }

    isKingInDanger(color: boolean): boolean{
        if(isThreatenedByKnight(this, color)) return true;
        if(isThreatenedByPawn(this, color)) return true;
        if(isThreatenedByKing(this)) return true;
        return isThreatenedByQueenBishopOrRook(this, color);
    }

    getKingPosition(color: boolean): Vector{
        return this.kingTracker.getKingPosition(color)
    }

    updateKingPosition(color: boolean, newRow: number, newCol: number) {
        this.kingTracker.updateKingPosition(color, new Vector(newRow, newCol))
        return this;
    }
}

//-----------------Different positions for testing purposes------------------------------

const t1 = new ChessPosition([
        ['r', 'x', 'x', 'x', 'k', 'x', 'x', 'r'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['R', 'x', 'x', 'x', 'K', 'x', 'x', 'R'],
    ], undefined, undefined
)