import '../css/Coordinates.css'

const VerticalCoords = () => {

    // Why not hardcode this?
    // Also this file is pretty much identical to HorizontalCoords.js, why not just make a single Coords.js file and pass in the values via props?
    const ranks = new Array(8).fill().map((x, i) => 8-i)

    return(
        <div className="coords">
            {
                ranks.map((rank, row) =>
                    <div className="num-square" key={row}><p className="num">{rank.toString()}</p></div>
                )
            }
        </div>
    );
}

export default VerticalCoords