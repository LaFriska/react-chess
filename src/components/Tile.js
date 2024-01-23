import {useState} from 'react'
import '../css/Consts.css'
import '../css/Tile.css'
import BackendUtils from "../backend/BackendUtils";
const Tile = (props) => {
    const [backgroundColor, setBackgroundColor] = useState(props.color === 'white' ? '#be7e3b' : '#593b19') // You aren't setting this state variable, just create a variable directly
    // const backgroundColor = props.color === 'white' ? '#be7e3b' : '#593b19'; <-- like this
    const styles={
        backgroundColor: backgroundColor // or even just put it in here
    }
    // You should call this something more descriptive, like onTileClick
    const clicked = () => {
        props.highlightTile(props.coords)
    }

    // Why is this a function and not just a variable?
    const isPieceDefined = () =>{
        return props.piece !== undefined && props.piece !== 'x'
    }

    let classname = 'tile'; // unused variable

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