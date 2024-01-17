import {getCharacter} from "../Util";

const HorizontalCoords = () => {

    const files = new Array(8).fill().map((x, i) => getCharacter(i))

    return(

        <div className="alph-coords">
            {
                files.map((file, col) =>
                    <div className="alph-square"><p className="alph">{file}</p></div>
                )
            }
        </div>
    )

}

export default HorizontalCoords