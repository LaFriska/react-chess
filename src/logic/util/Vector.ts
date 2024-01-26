/**
 * This simple interface holds two numbers each between 0 and 7 inclusive, representing the row index
 * and column index of the matrix used to represent the chess board. Functionalities such representing
 * possible squares for en passant moves use the Vector interface.
 */
export interface Vector{ //TODO change to class
    row: number
    col: number
}