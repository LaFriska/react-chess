import {getCharacter} from "../logic/util/Util.ts";

const HorizontalCoords = () => {

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