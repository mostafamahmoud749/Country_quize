export default function End(props){
    return (
        <div className="popup">
            <h1>congrats you got {props.points}/10</h1>
            <button onClick={props.reset}>play again</button>
        </div>
    )
}