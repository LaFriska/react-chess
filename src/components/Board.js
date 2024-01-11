import React, {useState} from "react";
import './Board.css'
import {getCharacter, isEven} from "../Util";
import Tile from "./Tile";
import Game from '../backend/Game'

const Board = (props) => {
    const ranks = Array(8).fill().map((x,i) => 8-i)
    const files = Array(8).fill().map((x,i) => getCharacter(i))

    const initialTiles = ranks.map((rank, i) =>
        files.map((file, j) => ({
                    id: `${rank}${file}`,
                    color: isEven(i + j) ? 'white' : 'color',
                    highlight: false,
                    highlightPossibleMoves: false
                }
            )
        )
    )

    const [tileStates, setTileStates] = useState(initialTiles)
    const [highlightedCoord, setHighlightedCoord] = useState(null)
    const [chesspos, setChessPos] = useState(props.chesspos)
    const [game, setGame] = useState(new Game())
    const [highlightedPossibleMoves, setHighlightedPossibleMoves] = useState([])

    const controlTile = (coords) => {
        const newStates = [...tileStates]
        const hasHighlight = highlightedCoord !== null;
        const x = hasHighlight ? highlightedCoord.row : null
        const y = hasHighlight ?  highlightedCoord.col : null
        const x2 = coords.row
        const y2 = coords.col
        const hasPiece = chesspos.get(x2, y2) !== 'x';

        unhighlightPossibleMoves(newStates)
        if(hasPiece && hasHighlight){ //Tries to take a piece
            //Takes an enemy piece
            if(chesspos.getColor(x, y) !== chesspos.getColor(x2, y2)) tryPlay(newStates, x, y, x2, y2)
            else { //Moves from piece to select another same colour piece
                newStates[x2][y2] = {...newStates[x2][y2], highlight: true}
                const isSamePiece = x2 === x && y2 === y;
                if(!isSamePiece) highlightPossibleMoves(newStates, x2, y2)
                setHighlightedCoord(isSamePiece ? null : coords)
            }
            newStates[x][y] =  {...newStates[x][y], highlight: false}
        }else if (hasPiece && !hasHighlight){ //Selects a piece.
            newStates[x2][y2] = {...newStates[x2][y2], highlight: true}
            highlightPossibleMoves(newStates, x2, y2)
            setHighlightedCoord(coords)
        }else if (!hasPiece && hasHighlight){ //Moves a piece
            tryPlay(newStates, x, y, x2, y2)
        }else setHighlightedCoord(null) //Attempt to select an empty square
        setTileStates(newStates)
    }

    const highlightPossibleMoves = (newStates, x, y) => {
        const possibleMoves = game.getPossibleMoves(x, y)
        for(let i = 0; i < possibleMoves.length; i++){
            newStates[possibleMoves[i].x][possibleMoves[i].y] = {...newStates[possibleMoves[i].x][possibleMoves[i].y], highlightPossibleMoves: true}
        }
        setHighlightedPossibleMoves(possibleMoves)
    }

    const unhighlightPossibleMoves = (newStates) => {
        for(let i = 0; i < highlightedPossibleMoves.length; i++){
            newStates[highlightedPossibleMoves[i].x][highlightedPossibleMoves[i].y] = {...newStates[highlightedPossibleMoves[i].x][highlightedPossibleMoves[i].y], highlightPossibleMoves: false}
        }
    }

    const tryPlay = (newStates, x, y, x2, y2) => {
        newStates[x][y] = {...newStates[x][y], highlight: false}
        const newPos = game.play(x, y, x2, y2)
        if(newPos !== null) setChessPos(newPos)
        setHighlightedCoord(null)
    }

    return(
        <div className='board'>
            <div className='tiles'>
                {
                    ranks.map((rank, i) =>
                        files.map((file, j) =>
                            <Tile color={tileStates[i][j].color}
                                  key={tileStates[i][j].id}
                                  id={tileStates[i][j].id}
                                  coords={{
                                      row: i,
                                      col: j
                                  }}
                                  highlight={tileStates[i][j].highlight}
                                  highlightPossibleMoves={tileStates[i][j].highlightPossibleMoves}
                                  highlightTile={controlTile}
                                  piece={chesspos.get(i, j)}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Board