import {useState} from 'react'
import '../css/Consts.css'
import '../css/Tile.css'
import BackendUtils from "../backend/BackendUtils";
const Tile = (props) => {
    const [backgroundColor, setBackgroundColor] = useState(props.color === 'white' ? '#be7e3b' : '#593b19')
    const styles={
        backgroundColor: backgroundColor
    }
    const clicked = () => {
        props.highlightTile(props.coords)
    }

    const isPieceDefined = () =>{
        return props.piece !== undefined && props.piece !== 'x'
    }

    let classname = 'tile';

    const getClassName = () => {
        let classname = 'tile';
        if(props.highlight === true) classname = classname + ' highlight'
        if(props.check === true) classname = classname + ' check'
        else if(props.highlightPossibleMoves !== null) {
            classname = classname + (props.highlightPossibleMoves ? ' highlight-possible-moves-white' : ' highlight-possible-moves-black')
        }
        return classname
    }

    return (
        isPieceDefined()
            ?
            <div onClick={clicked} className={getClassName()} style={styles}>
                <img className='piece' src={'./imgs/' + BackendUtils.convertToPieceName(props.piece) + '.svg'} draggable='false'/>
            </div>
            :
            <div onClick={clicked} className={getClassName()} style={styles}>
            </div>
    )
}

export default Tile