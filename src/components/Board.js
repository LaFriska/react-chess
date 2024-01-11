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
        const row = hasHighlight ? highlightedCoord.row : null
        const col = hasHighlight ?  highlightedCoord.col : null
        const row2 = coords.row
        const col2 = coords.col
        const hasPiece = chesspos.get(row2, col2) !== 'x';

        unhighlightPossibleMoves(newStates)
        if(hasPiece && hasHighlight){ //Tries to take a piece
            //Takes an enemy piece
            if(chesspos.getColor(row, col) !== chesspos.getColor(row2, col2)) tryPlay(newStates, row, col, row2, col2)
            else { //Moves from piece to select another same colour piece
                newStates[row2][col2] = {...newStates[row2][col2], highlight: true}
                const isSamePiece = row2 === row && col2 === col;
                if(!isSamePiece) highlightPossibleMoves(newStates, row2, col2)
                setHighlightedCoord(isSamePiece ? null : coords)
            }
            newStates[row][col] =  {...newStates[row][col], highlight: false}
        }else if (hasPiece && !hasHighlight){ //Selects a piece.
            newStates[row2][col2] = {...newStates[row2][col2], highlight: true}
            highlightPossibleMoves(newStates, row2, col2)
            setHighlightedCoord(coords)
        }else if (!hasPiece && hasHighlight){ //Moves a piece
            tryPlay(newStates, row, col, row2, col2)
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

    const tryPlay = (newStates, row, col, row2, col2) => {
        newStates[row][col] = {...newStates[row][col], highlight: false}
        const newPos = game.play(row, col, row2, col2)
        if(newPos !== null) setChessPos(newPos)
        setHighlightedCoord(null)
    }

    return(
        <div className='board'>
            <div className='tiles'>
                {
                    ranks.map((rank, row) =>
                        files.map((file, col) =>
                            <Tile color={tileStates[row][col].color}
                                  key={tileStates[row][col].id}
                                  id={tileStates[row][col].id}
                                  coords={{
                                      row: row,
                                      col: col
                                  }}
                                  highlight={tileStates[row][col].highlight}
                                  highlightPossibleMoves={tileStates[row][col].highlightPossibleMoves}
                                  highlightTile={controlTile}
                                  piece={chesspos.get(row, col)}
                            />
                        )
                    )
                }
            </div>
        </div>
    )
}

export default Board