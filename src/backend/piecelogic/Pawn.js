export const getPossiblePawnMoves = (x, y, chessPos, color) => {
    const res = [];

    const frontPiece = chessPos.get(x, y + 1)
    if(frontPiece === 'x') res.push({x: x, y: y + 1})

    return res;
}