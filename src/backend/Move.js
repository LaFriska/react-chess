class Move{

    row
    col
    chessPos
    futureEnPassent

    constructor(row, col, chessPos, futureEnPassent){
        this.row = row;
        this.col = col;
        this.chessPos = chessPos;
        this.futureEnPassent = futureEnPassent;
    }
}

export default Move;