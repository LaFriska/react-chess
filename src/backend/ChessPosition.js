const {convertToPieceName, checkPieceColor} = require("./BackendUtils");

class ChessPosition{

    constructor(matrix){
        this.matrix = matrix
        this.checkMatrix()
    }

    move(i, j, i2, j2){
        this.set(i2, j2, this.get(i, j))
        this.set(i, j, 'x')
    }

    set(i, j, val){
        this.matrix[i][j] = val
    }

    get(row, col){
        return this.matrix[row][col];
    }

    getColor(row, col){
        const get = this.get(row, col)
        return checkPieceColor(get)
    }
    clone(){
        return new ChessPosition([...this.matrix])
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
}

module.exports = {ChessPosition}