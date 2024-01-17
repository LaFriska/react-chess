import './App.css';
import Board from "./components/Board";
import {ChessPosition} from "./backend/ChessPosition";
import VerticalCoords from "./components/VerticalCoords";
import HorizontalCoords from "./components/HorizontalCoords";

function App() {

  return (
    <div className="app">
        <div className="num-coord-board-container">
            <VerticalCoords/>
            <Board chesspos={ChessPosition.getDefaultPosition()}/>
        </div>
        <HorizontalCoords/>

    </div>
  );
}

export default App;
