class Move{

    row
    col
    chessPos
    futureEnPassent
    // hasMoved

    constructor(row, col, chessPos, futureEnPassent){
        this.row = row;
        this.col = col;
        this.chessPos = chessPos;
        this.futureEnPassent = futureEnPassent;
        this.hasMoved = null;
    }

    // setHasMove(id){
    //     this.hasMoved = id;
    // }
}

export default Move;