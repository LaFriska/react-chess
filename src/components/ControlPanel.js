import './ControlPanel.css'
import ControlButton from "./ControlButton";

const ControlPanel = () => {
    return (
        <div>
            <div className='control-panel'>
                <ControlButton text='Resign' color='#2670d1'/>
                <ControlButton text='Draw' color='#2670d1'/>
                <ControlButton text='Yes' color='#4edc4e'/>
                <ControlButton text='No' color='#eb3f3f'/>
            </div>
        </div>
    );
}

export default ControlPanel;