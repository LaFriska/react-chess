class Move{

    row
    col
    chessPos
    futureEnPassent //{row, col}
    castleMoveLog

    constructor(row, col, chessPos, futureEnPassent){
        this.row = row;
        this.col = col;
        this.chessPos = chessPos;
        this.futureEnPassent = futureEnPassent;
        this.castleMoveLog = null;
    }

    promote(piece){
        this.chessPos.set(this.row, this.col, piece)
    }
}

export default Move;