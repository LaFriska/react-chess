// @ts-ignore
import {getRandom, PlayData} from "../util/EngineUtil.ts";
import Game from "../Game"

class EngineCzechka{
    side: boolean
    game: Game
    possibleMoves: PlayData[] //TODO deprecate playdata and make everything into Move object

    constructor(game: Game, side: boolean){
        this.game = game;
        this.side = side
    }

    nextMove(): PlayData{
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

    getPawnPromotion(): string {
        return this.side ? 'Q' : 'q'
    }
}
export default EngineCzechka