/**
 * This simple interface holds two numbers each between 0 and 7 inclusive, representing the row index
 * and column index of the matrix used to represent the chess board. Functionalities such representing
 * possible squares for en passant moves use the Vector interface.
 */
class Vector{ //TODO change to class
    row: number
    col: number

    constructor(row: number, col: number){
        this.row = row;
        this.col = col;
    }
}

export default Vector