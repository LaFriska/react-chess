const {convertToPieceName, checkPieceColor} = require("./BackendUtils");
const {isThreatenedByKnight} = require("./piecelogic/Knight");
const {isThreatenedByPawn} = require("./piecelogic/Pawn");
const {isThreatenedByKing} = require("./piecelogic/King");
const {isThreatenedByQueenBishopOrRook} = require("./piecelogic/PieceUtils");

class ChessPosition{

    kingTracker //TODO cover the case that the king is somehow taken

    constructor(matrix){
        this.matrix = matrix
        this.checkMatrix()
        this.initiateKingTracker();
    }

    initiateKingTracker(){
        const search = (char) => {
            for(let r = 0; r < 8; r++){
                for(let c = 0; c < 8; c++){
                    if(this.get(r, c) === char) return {row: r, col: c}
                }
            }
        }
        this.kingTracker = {
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

    setToNew(chessPos){
        this.matrix = chessPos.getMatrix();
    }

    getMatrix(){
        return this.matrix;
    }

    get(row, col){
        return this.matrix[row][col];
        return this;
    }

    getColor(row, col){
        const get = this.get(row, col)
        return checkPieceColor(get)
    }
    clone(){
        const matrix = Array.from({ length: 8 }, (_, row) =>
            Array.from({ length: 8 }, (_, col) => this.get(row, col))
        );
        return new ChessPosition(matrix);
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

    getConvertedColumnArray(col){
        const vector = [];
        for(let i = 0; i < 8; i++){
            vector.push(this.getConverted(i, col))
        }
        return vector;
    }

    static getDefaultPosition(isBlackPOV){
        if(isBlackPOV) return new ChessPosition([
            ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'],
            ['P', 'P', 'P', 'P', 'P', 'P', 'P', 'P'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['x', 'x', 'x', 'x', 'x', 'x', 'x', 'x'],
            ['p', 'p', 'p', 'p', 'p', 'p', 'p', 'p'],
            ['r', 'n', 'b', 'q', 'k', 'b', 'n', 'r'],
        ])
        else return new ChessPosition([
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
        if(isThreatenedByQueenBishopOrRook(this, color)) return true;
        return false;
    }


}

module.exports = {ChessPosition}