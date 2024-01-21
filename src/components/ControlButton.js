import {useState} from "react";

const ControlButton = (props) => {


    const [hover, setHover] = useState(false);

    const handleHover = () => {
        setHover(true);
    };

    const unhover = () => {
        setHover(false);
    }

    const style = () => {
        switch (props.type){
            case "warning": return {
                color: "black",
                backgroundColor: hover ? "#c90000" : "#ff0000"
            }
            case "success": return{
                color: "black",
                backgroundColor: hover ? "#00b61e" : "#00ff2a"
            }
            case "black": return{
                color: "white",
                backgroundColor: hover ? "#484848" : "#000000"
            }
            case "white": return{
                color: "black",
                backgroundColor: hover ? "#e1e1e1" : "#ffffff"
            }
            case "info": return{
                color: "white",
                backgroundColor: hover ? "#0054c5" : "#0066ff"
            }
            default: return{
                color: "black",
                backgroundColor: hover ? "#818181" : "#989898"
            }
        }
    }

    return(
        <div className='control-button' style={style()}
             onClick={props.onClick}
             onMouseEnter={handleHover}
             onMouseLeave={unhover}
        >
            <h2>{props.text}</h2>
        </div>
    )
}

export default ControlButton;