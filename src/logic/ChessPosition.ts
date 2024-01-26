// @ts-ignore
import {checkPieceColor} from "./util/BackendUtils.ts";
import {isThreatenedByKnight} from "./piecelogic/Knight.ts";
import {isThreatenedByPawn} from "./piecelogic/Pawn.ts";
import {isThreatenedByKing} from "./piecelogic/King.ts";
import {isThreatenedByQueenBishopOrRook} from "./util/PieceLogicUtils.ts";
import {isEven} from "./util/Util";

export class ChessPosition {

    kingTracker : any //TODO make own class
    matrix: string[][]

    constructor(matrix: string[][], whiteKingRow: number|undefined, whiteKingCol: number|undefined, blackKingRow: number|undefined, blackKingCol: number|undefined){ //TODO change constr param to just a single king tracker object
        this.matrix = matrix
        this.checkMatrix()
        this.initiateKingTracker(whiteKingRow, whiteKingCol, blackKingRow, blackKingCol);
    }

    initiateKingTracker(whiteKingRow: number, whiteKingCol: number, blackKingRow: number, blackKingCol: number): void{

        if(whiteKingRow !== undefined && whiteKingCol !== undefined && blackKingRow !== undefined && blackKingCol !== undefined){
            this.kingTracker = {
                black: {row: blackKingRow, col: blackKingCol},
                white: {row: whiteKingRow, col: whiteKingCol}
            }
            return;
        }

        const search = (char: string) => {
            for(let r = 0; r < 8; r++){
                for(let c = 0; c < 8; c++){
                    if(this.get(r, c) === char) return {row: r, col: c} //TODO change to vector
                }
            }
        }
        this.kingTracker = { //TODO optimise king tracker init when cloning chessPosition
            black: this.get(0, 4) !== 'k' ? search('k') : {row: 0, col: 4},
            white: this.get(7, 4) !== 'K' ? search('K') : {row: 7, col: 4}
        }
    }

    getKingPosition(color: boolean){
        // if(color === null || color === undefined) return null;
        if(color) return this.kingTracker.white;
        else return this.kingTracker.black;
    }

    updateKingPosition(color: boolean, newRow: number, newCol: number) {
        if(color) this.kingTracker.white = {row: newRow, col: newCol} //TODO vector
        if(!color) this.kingTracker.black = {row: newRow, col: newCol}//TODO vector
        return this;
    }

    move(row: number, col: number, newRow: number, newCol: number){
        this.set(newRow, newCol, this.get(row, col))
        this.set(row, col, 'x')
        return this;
    }

    set(row: number, col: number, piece: string){
        this.matrix[row][col] = piece
        return this;
    }

    getMatrix(): string[][]{
        return this.matrix;
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
        return new ChessPosition(matrix, this.getKingPosition(true).row, this.getKingPosition(true).col, this.getKingPosition(false).row, this.getKingPosition(false).col);
    }

    checkMatrix(): void{ //TODO add param to constructor to skip checking
        const err = () => {throw new Error('Chess board matrix must be 8 by 8.')}
        if(this.matrix.length !== 8) err()
        for(let i = 0; i < 8; i++){
            if(this.matrix[i].length !== 8) err()
        }
    }

    getSquareColor(row: number, col: number){
        return isEven(row + col);
    }

    static getDefaultPosition(): ChessPosition{
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
        ], undefined, undefined, undefined, undefined)
    }

    isKingInDanger(color: boolean): boolean{
        if(isThreatenedByKnight(this, color)) return true;
        if(isThreatenedByPawn(this, color)) return true;
        if(isThreatenedByKing(this)) return true;
        return isThreatenedByQueenBishopOrRook(this, color);
    }
}

//Different positions for testing purposes

const t1 = new ChessPosition([
        ['r', 'x', 'x', 'x', 'k', 'x', 'x', 'r'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['R', 'x', 'x', 'x', 'K', 'x', 'x', 'R'],
    ], undefined, undefined, undefined, undefined
)