import { useState ,useEffect } from "react"

export default function Qus(props){
    
    const correct=props.name
    const [options, setOptions] = useState([]);
    
    useEffect(() => {
        const remaining = props.country.filter(c => c !== correct);
        const incorrect = [...remaining].sort(() => 0.5 - Math.random()).slice(0, 3);
        const shuffled = [...incorrect, correct].sort(() => 0.5 - Math.random());
        setOptions(shuffled);
        
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [correct]);

    const buttons = options.map((option, i) => {
        let className = "option"; 
        if (props.status.done) {
            if (option === props.name && props.status.state === "right") {
                className += " right";
            } else if (option === props.name && props.status.state === "wrong") {
                className += " right"; 
            } else if (option !== props.name && option === event?.target?.textContent) {
                className += " wrong";
            }
        }

        return (
            <button
                key={i}
                className={className}
                style={props.status.done ? { pointerEvents: "none" } : {}}
                onClick={(event) => props.chosed(props.index, props.name, event)}
            >
                {options[i]}
            </button>
        );
    })
    
    return (
        <div className="qus" style={!props.status.selected ? {display:"none"}:{}}>
            <div >Which country dose this
                flag <img style={{width:"16px"}} src={`${props.flag}`} alt="" /> belong to ?
            </div>
            <div className="answers">
                {buttons}
            </div>
        </div>
    )
}   