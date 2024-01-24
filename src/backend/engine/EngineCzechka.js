import {getRandom, PlayData} from "../util/EngineUtil";

class EngineCzechka{
    side
    game
    possibleMoves

    constructor(game, side){
        this.game = game;
        this.side = side
    }

    nextMove(){
        if(this.game.turn !== this.side) return null;
        this.searchPossibleMoves();
        if(this.possibleMoves.length === 0) return null;
        return this.possibleMoves[getRandom(this.possibleMoves.length - 1)]
    }

    searchPossibleMoves(){
        this.possibleMoves = [];
        for(let row = 0; row < 8; row++){
            for(let col = 0; col < 8; col++){
                if(this.game.chessPos.getColor(row, col) === this.side)
                    this.game.getPossibleMoves(row, col).forEach((move) => {this.possibleMoves.push(new PlayData(row, col, move))})
            }
        }
    }

    getPawnPromotion(){
        return this.side ? 'Q' : 'q'
    }
}
export default EngineCzechka