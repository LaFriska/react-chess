import './App.css';
import Board from "./components/Board";
import {ChessPosition} from "./backend/ChessPosition";

function App() {
  return (
    <div className="App">
      <Board chesspos={ChessPosition.getDefaultPosition()}/>
    </div>
  );
}

export default App;
