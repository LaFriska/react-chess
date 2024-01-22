class TFRPositionLog {
    claimThreefoldRepetition
    hasMoved
    castlingRights
    positions = []
    game
    constructor(game){
        this.castlingRights = new CastlingRight(game.hasMoved);
        this.game = game;
        this.log()
    }

    log(row, col, newRow, newCol, hasTakenPiece){
        const castlingRight = new CastlingRight(this.game.hasMoved);
        if(!this.castlingRights.compare(castlingRight)){
            this.castlingRights = castlingRight;
            this.reset();
        }
        if(row !== undefined){ //Assumes if row is undefined, every other param is also undefined, having a defined row and any other undefined params will likely result in an exception
            //Checks if AFTER the move new coordinates has a pawn, which implies that its a pawn move
            if(this.game.chessPos.get(newRow, newCol).toLowerCase() === 'p') this.reset();
            if(hasTakenPiece) this.reset();
        }
        this.iterativelyCompare(this.game.chessPos, this.game.futureEnPassent, this.game.turn);
        console.log(this.positions)
    }

    iterativelyCompare(chessPos, futureEnPassent, turn){
        for(let i = 0; i < this.positions.length; i++){
            if(this.positions[i].compare(new Pos(chessPos, futureEnPassent, turn))){
                this.positions[i].increment();
                if(this.positions[i].count >= 3) this.claimThreefoldRepetition = true;
                return;
            }
        }
        this.positions.push(new Pos(chessPos.clone(), this.cloneFutureEnPassent(futureEnPassent), turn))
    }

    cloneFutureEnPassent(futureEnPassent){
        return futureEnPassent.map(coords => ({...coords}));
    }
    reset(){
        this.positions = [];
    }
}

class Pos {
    chessPos
    futureEnPassent
    turn
    count

    constructor(chessPos, futureEnPassent, turn){
        this.chessPos = chessPos;
        this.futureEnPassent = futureEnPassent;
        this.turn = turn;
        this.count = 1;
    }

    increment(){
        this.count++;
    }

    compare(pos){ //Does NOT check for castling rights, as when castling rights change, position array will be cleared in PositionLog
        if(pos.turn !== this.turn) return false;
        if(this.futureEnPassent.length !== pos.futureEnPassent.length) return false;
        for(let i = 0; i < this.futureEnPassent.length; i++){ //Scans for if en passent moves are the same
            if(this.futureEnPassent[i].row !== pos.futureEnPassent[i].row) return false;
            if(this.futureEnPassent[i].col !== pos.futureEnPassent[i].col) return false;
        }
        for(let row = 0; row < 8; row++){ //Checks if chess position is the same.
            for(let col = 0; col < 8; col++){
                if(this.chessPos.get(row, col) !== pos.chessPos.get(row, col)) return false;
            }
        }
        return true;
    }
}

class CastlingRight{

    whiteRight = true;
    whiteLeft = true;
    blackRight = true;
    blackLeft = true;

    constructor(hasMoved){
        if(hasMoved.K === true) {
            this.whiteRight = false
            this.whiteLeft = false;
        }else {
            if(hasMoved.Rr) this.whiteRight = false;
            if(hasMoved.Rl) this.whiteLeft = false;
        }
        if(hasMoved.k === true) {
            this.blackRight = false
            this.blackRight = false;
        }else {
            if(hasMoved.rr) this.blackRight = false;
            if(hasMoved.rl) this.blackLeft = false;
        }
    }

    compare(castlingRight){
        if(this.whiteRight !== castlingRight.whiteRight) return false;
        if(this.whiteLeft !== castlingRight.whiteLeft) return false;
        if(this.blackLeft !== castlingRight.blackLeft) return false;
        return this.blackRight === castlingRight.blackRight;
    }
}

export default TFRPositionLog