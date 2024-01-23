import {getCharacter} from "../Util";

const HorizontalCoords = () => {

    // You're building an array of 8 elements, why not just hardcode it?
    // const files = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h']
    const files = new Array(8).fill().map((x, i) => getCharacter(i))

    return(

        <div className="alph-coords">
            {
                files.map((file, col) =>
                    <div className="alph-square" key={col}><p className="alph">{file}</p></div>
                )
            }
        </div>
    )

}

export default HorizontalCoords