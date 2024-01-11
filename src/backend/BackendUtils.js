function convertToPieceName(char){
    switch(char){
        case 'r': return 'black_rook'
        case 'n': return 'black_knight'
        case 'b': return 'black_bishop'
        case 'q': return 'black_queen'
        case 'k': return 'black_king'
        case 'p': return 'black_pawn'
        case 'R': return 'white_rook'
        case 'N': return 'white_knight'
        case 'B': return 'white_bishop'
        case 'Q': return 'white_queen'
        case 'K': return 'white_king'
        case 'P': return 'white_pawn'
        default: return 'null';
    }
}

function checkPieceColor(piece){
    if(piece === 'x') return null;
    if(piece === piece.toUpperCase()) return true;
    if(piece === piece.toLowerCase()) return false;
}

function isInBound(row, col){
    if(Math.max(row, col) > 7 || Math.min(row, col) < 0) return false;
    return true
}

module.exports = {convertToPieceName, checkPieceColor, isInBound}