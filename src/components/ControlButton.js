const ControlButton = (props) => {

    const style = {
        backgroundColor: props.color === undefined ? 'gray' : props.color
    }

    return(
        <div className='control-button' style={style}>
            <h2>{props.text}</h2>
        </div>
    )
}

export default ControlButton;