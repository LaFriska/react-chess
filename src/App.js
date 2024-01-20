import './css/App.css';
import Board from "./components/Board";
import {ChessPosition} from "./backend/ChessPosition";
import VerticalCoords from "./components/VerticalCoords";
import HorizontalCoords from "./components/HorizontalCoords";
import ControlPanel from "./components/ControlPanel";

function App() {
  // const notify = () => toast("Wow so easy!");

  return (
    <div className="app">
        <div className="vertical-container">
            {/*<button onClick={notify}></button>*/}
            {/*<ToastContainer />*/}
            <ControlPanel/>
            <VerticalCoords/>
            <div className="horizontal-board-container">
                <Board chesspos={ChessPosition.getDefaultPosition()}/>
                <HorizontalCoords/>
            </div>
        </div>
    </div>
  );
}

export default App;
