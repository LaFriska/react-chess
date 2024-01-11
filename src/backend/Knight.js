export const getPossibleKnightMoves = (x, y, chessPos, color) => {
    const res = [];
    const add = (xAdd, yAdd) => {
        const transformedX = x + xAdd
        const transformedY = y + yAdd
        if(Math.max(transformedX, transformedY) > 7) return; //Breaks if x and y are out of upper bounds of board
        if(Math.min(transformedX, transformedY) < 0) return; //Breaks if x and y are out of lower bounds of board
        if(chessPos.getColor(transformedX, transformedY) === color) return; //Breaks if the target square contains a friendly piece

        res.push({
            x: transformedX,
            y: transformedY
        })
    }
    const p = [1, -1, 1, -1]
    const q = [1, 1, -1, -1]
    for(let i = 0; i < 4; i++){
        add(p[i], 2 * q[i])
        add(2* p[i], q[i])
    }
    return res;
}