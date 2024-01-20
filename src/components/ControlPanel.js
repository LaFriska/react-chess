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

    const resign = (side) => {
        toast.info((side ? "black" : "white") + " has won! " + (side ? "white" : "black") + " loses by resignation.")
        props.game.resign(side)
    }

    const makeDecision = (yesno) => {
        if(yesno && decision === "resign-white") resign(true);
        if(yesno && decision === "resign-black") resign(false);
    }

    const clearDecision = () => {
        if(decision === "resign-white" || decision === "resign-black") toast.success("The game will continue!", def)
        setDecision(null)
    }

    return (
        <div>
            <div className='control-panel'>
                <ControlButton onClick={() => checkResign(false)} game={props.game} text='Resign' color='#000000'/>
                <ControlButton text='Draw' color='#000000'/>
                <ControlButton onClick={() => makeDecision(true)} text='Yes' color='#4edc4e'/>
                <ControlButton onClick={() => clearDecision(null)} text='No' color='#eb3f3f'/>
                <ControlButton onClick={() => checkResign(true)} text='Resign' color='#FFFFFF' textColor='#000000'/>
                <ControlButton text='Draw' color='#FFFFFF' textColor='#000000'/>
            </div>
        </div>
    );
}

export default ControlPanel;