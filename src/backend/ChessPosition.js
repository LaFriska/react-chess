const {convertToPieceName, checkPieceColor} = require("./BackendUtils");
const {isThreatenedByKnight} = require("./piecelogic/Knight");
const {isThreatenedByPawn} = require("./piecelogic/Pawn");
const {isThreatenedByKing} = require("./piecelogic/King");
const {isThreatenedByQueenBishopOrRook} = require("./piecelogic/PieceUtils");
const {isEven} = require("../Util");

class ChessPosition {

    kingTracker

    constructor(matrix, whiteKingRow, whiteKingCol, blackKingRow, blackKingCol){
        this.matrix = matrix
        this.checkMatrix()
        this.initiateKingTracker(whiteKingRow, whiteKingCol, blackKingRow, blackKingCol);
    }

    initiateKingTracker(whiteKingRow, whiteKingCol, blackKingRow, blackKingCol){

        if(whiteKingRow !== undefined && whiteKingCol !== undefined && blackKingRow !== undefined && blackKingCol !== undefined){
            this.kingTracker = {
                black: {row: blackKingRow, col: blackKingCol},
                white: {row: whiteKingRow, col: whiteKingCol}
            }
            return;
        }

        const search = (char) => {
            for(let r = 0; r < 8; r++){
                for(let c = 0; c < 8; c++){
                    if(this.get(r, c) === char) return {row: r, col: c}
                }
            }
        }
        this.kingTracker = { //TODO optimise king tracker init when cloning chessPosition
            black: this.get(0, 4) !== 'k' ? search('k') : {row: 0, col: 4},
            white: this.get(7, 4) !== 'K' ? search('K') : {row: 7, col: 4}
        }
    }

    getKingPosition(color){
        if(color === null || color === undefined) return null;
        if(color) return this.kingTracker.white;
        else return this.kingTracker.black;
    }

    updateKingPosition(color, newRow, newCol){
        if(color) this.kingTracker.white = {row: newRow, col: newCol}
        if(!color) this.kingTracker.black = {row: newRow, col: newCol}
        return this;
    }

    move(i, j, i2, j2){
        this.set(i2, j2, this.get(i, j))
        this.set(i, j, 'x')
        return this;
    }

    set(i, j, val){
        this.matrix[i][j] = val
        return this;
    }

    getMatrix(){
        return this.matrix;
    }

    get(row, col){
        return this.matrix[row][col];
    }

    getColor(row, col){
        const get = this.get(row, col)
        return checkPieceColor(get)
    }
    clone(){
        const matrix = Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => this.get(row, col))
        );
        return new ChessPosition(matrix, this.getKingPosition(true).row, this.getKingPosition(true).col, this.getKingPosition(false).row, this.getKingPosition(false).col);
    }

    checkMatrix(){
        if(this.matrix.length !== 8) throw new Error('Chess board matrix must be 8 by 8.')
        for(let i = 0; i < 8; i++){
            if(this.matrix[i].length !== 8) throw new Error('Chess board matrix must be 8 by 8.')
        }
    }

    getConverted(row, col){
        return convertToPieceName(this.get(row, col))
    }

    getSquareColor(row, col){
        return isEven(row + col);
    }

    static getDefaultPosition(){
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
        ])
    }

    isKingInDanger(color){
        if(isThreatenedByKnight(this, color)) return true;
        if(isThreatenedByPawn(this, color)) return true;
        if(isThreatenedByKing(this)) return true;
        return isThreatenedByQueenBishopOrRook(this, color);
    }

    construct(matrix, whiteKingRow, whiteKingCol, blackKingRow, blackKingCol){
        return new ChessPosition(matrix, whiteKingRow, whiteKingCol, blackKingRow, blackKingCol)
    }
}

//Different positions for testing purposes

const t1 = new ChessPosition([
        ['k', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'P', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'K', 'x'],
        ['B', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
        ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ]
)

const t2 = new ChessPosition([ //TODO cover proof of custom chess game with no kings
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'K', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'r', 'x', 'k', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
])

const t3 = new ChessPosition([
    ['x', 'x', 'K', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['k', 'x', 'x', 'x', 'q', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
    ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
])

module.exports = {ChessPosition}