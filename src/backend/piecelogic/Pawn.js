export const getPossiblePawnMoves = (row, col, chessPos, color) => {
    const res = [];

    const frontPiece = chessPos.get(row - 1, col)
    if(frontPiece === 'x') res.push({x: row - 1, y: col})

    return res;
}