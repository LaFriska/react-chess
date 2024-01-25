import './css/App.css';
import Board from "./components/Board";
import {ChessPosition} from "./logic/ChessPosition";
import VerticalCoords from "./components/VerticalCoords";
import HorizontalCoords from "./components/HorizontalCoords";
import ControlPanel from "./components/ControlPanel";
import Game from "./logic/Game";

function App() { //Hello world

  const game = new Game();

  return (
    <div className="app">
        <div className="vertical-container">
            <ControlPanel game={game}/>
            <VerticalCoords/>
            <div className="horizontal-board-container">
                <Board chesspos={ChessPosition.getDefaultPosition()} game={game}/>
                <HorizontalCoords/>
            </div>
        </div>
    </div>
  );
}

export default App;
