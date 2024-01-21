import '../css/ControlPanel.css'
import ControlButton from "./ControlButton";
import {toast} from "react-toastify";
import {def} from "./ToastOptions";
import {useState} from "react";

const ControlPanel = (props) => {

    let [decision, setDecision] = useState(null);

    const checkResign = (side) => {
        if(props.game.hasGameEnded) return;
        toast.warn("As " + (side ? 'white' : 'black') + ', are you sure you want to resign?', def)
        setDecision("resign-" + (side ? 'white' : 'black'))
    }

    const checkDraw = () => {
        if(props.game.hasGameEnded) return;
        if(props.game.movesWithoutProgress >= 50){
            toast.info("A player has claimed a draw after 50 moves without progress!")
            props.game.draw("50Moves")
            setDecision(null)
            return;
        }
        toast.warn("A draw has been offered. Would you like to accept?", def)
        setDecision("draw")
    }

    const resign = (side) => {
        toast.info((side ? "black" : "white") + " has won! " + (side ? "white" : "black") + " loses by resignation.")
        props.game.resign(side)
    }

    const draw = () => {
        toast.success("The offer for a draw has been accepted. The game ends in a draw.", def)
        props.game.draw("offeredDraw");
    }
    const makeDecision = () => {
        switch (decision){
            case "resign-white": resign(true); break;
            case "resign-black": resign(false); break;
            case "draw": draw(); break;
        }
        setDecision(null)
    }

    const clearDecision = () => {
        if(decision === "resign-white" || decision === "resign-black") toast.success("The game will continue!", def)
        if(decision === "draw") toast.success("Draw offer declined! The game will continue.", def)
        setDecision(null)
    }

    return (
        <div>
            <div className='control-panel'>

                <ControlButton onClick={() => checkResign(false)} game={props.game}
                               text='Resign'
                               type='black'/>

                <ControlButton onClick={() => makeDecision(true)}
                               text='Yes'
                               type='success'/>

                <ControlButton onClick={() => checkDraw()}
                               text='Draw'
                               color='#FFFFFF'/>

                <ControlButton onClick={() => clearDecision(null)}
                               text='No'
                               type='warning'/>

                <ControlButton onClick={() => checkResign(true)}
                               text='Resign'
                               color='#FFFFFF'
                               type='white'/>
            </div>
        </div>
    );
}

export default ControlPanel;