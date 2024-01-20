import './ControlPanel.css'
import ControlButton from "./ControlButton";

const ControlPanel = () => {
    return (
        <div>
            <div className='control-panel'>
                <ControlButton text='Resign' color='#000000'/>
                <ControlButton text='Draw' color='#000000'/>
                <ControlButton text='Yes' color='#4edc4e'/>
                <ControlButton text='No' color='#eb3f3f'/>
                <ControlButton text='Resign' color='#FFFFFF' textColor='#000000'/>
                <ControlButton text='Draw' color='#FFFFFF' textColor='#000000'/>
            </div>
        </div>
    );
}

export default ControlPanel;