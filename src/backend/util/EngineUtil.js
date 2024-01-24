export function getRandom(max) {
    return Math.floor(Math.random() * (max + 1));
}

export class PlayData{ //TODO make row col in play data into moves so that moves object can be scanned in itself
                        //to eliminate verbosity
    row
    col
    move
    constructor(row, col, move){
        this.row = row;
        this.col = col;
        this.move = move;
    }
}