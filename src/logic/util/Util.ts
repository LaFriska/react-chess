export function convertToPieceName(piece: string): string{
    switch(piece){
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

export function checkPieceColor(piece: string): boolean{
    if(piece === 'x') return null;
    if(piece === piece.toUpperCase()) return true;
    if(piece === piece.toLowerCase()) return false;
}

export function isInBound(row: number, col: number){
    if(Math.max(row, col) > 7 || Math.min(row, col) < 0) return false;
    return true
}

export function getCharacter (i: number): string {
    return String.fromCharCode(i + 97)
}//TODO deprecate
export function isEven (i: number): boolean {
    return i % 2 === 0;
}

// module.exports = {convertToPieceName, checkPieceColor, isInBound, getCharacter, isEven}