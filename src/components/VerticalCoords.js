import '../css/Coordinates.css'

const VerticalCoords = () => {

    const ranks = new Array(8).fill().map((x, i) => 8-i)

    return(
        <div className="coords">
            {
                ranks.map((rank, row) =>
                    <div className="num-square"><p className="num">{rank.toString()}</p></div>
                )
            }
        </div>
    );
}

export default VerticalCoords