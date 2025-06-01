export default function Die (props) {
    const styles = {
        backgroundColor: props.isHeld ? "#59E391" : "white"
    }


    return(
        <button 
            className='die' 
            style={styles} 
            onClick={props.holdFn}
            aria-pressed={props.isHeld}
            aria-label={`Die with a value ${props.value} and ${props.isHeld ? "held" : "not held"}` }
        >{props.value}</button>
    )
}