import Qus from "./Qus"
import End from "./End"
import { useEffect , useState } from "react"

export default function App(){
    const [count,setCount]=useState(0)
    const [countries,setCountries]=useState([])
    const [randomCountries,setRandomCountries]=useState([])
    const countriesNames=randomCountries.map(country=>country.name.common)
    const [status,setStatus] = useState([])
    const [points,setPoints]=useState(0)
    const questions=randomCountries.map((country,index)=>{
        return(<Qus 
        name={country.name.common}
        flag={country.flags.png}
        key={index}
        index={index}
        country={countriesNames}
        status={status[index]}
        chosed={chosingDone}
        />)
    })
    const qoustionNumber=randomCountries.map((el,index)=><span key={index} style={(status[index].done==true||status[index].selected==true)?{background: "linear-gradient(90deg, #FF5F7E, #C46CFF)"}:{}} className="numbers" onClick={numberClick}>{index+1}</span>)
    function getRandomCountrys(countries){
      const shuffled = [...countries].sort(() => 0.5 - Math.random());
      return shuffled.slice(0, 10);
    }

    useEffect(()=>{
        fetch("https://restcountries.com/v3.1/all?fields=name,cca3,flags").
        then(data=>data.json()).
        then(d=>{
            setCountries(d)
            const getRandom10=getRandomCountrys(d)
            setRandomCountries(getRandom10)
            setStatus(getRandom10.map((el,index)=>{
                return(index===0?{
                    selected:true,
                    done:false,
                    state:null
                }:{
                    selected:false,
                    done:false,
                    state:null
                })
            }))
        }).
        catch((err) => console.error("Error fetching countries:", err));
    },[])

    function numberClick(event){
        const clikedIndex=event.target.textContent-1
        setStatus(prev=>prev.map((el,index)=>index==clikedIndex?{...el,selected:true}:{...el,selected:false}))
    }

    function chosingDone(id,rightAsnwer,event){
        setCount(prev=>prev+1)
        const ansewer=event.target.textContent
        setStatus(prev=>prev.map((el,index)=>index==id?(ansewer==rightAsnwer?{...el,done:true,state:"right"}:{...el,done:true,state:"wrong"}):el))
        if (ansewer==rightAsnwer){
            event.target.className="right"
            setPoints(prev=>prev+1)
        }else {
            event.target.className="wrong"
        }
    }

    function reset(){
        const getRandom10=getRandomCountrys(countries)
        setRandomCountries(getRandom10)
        setPoints(0)
        setCount(0)
        setStatus(getRandom10.map((el,index)=>{
            return(index===0?{
                selected:true,
                done:false,
                state:null
            }:{
                selected:false,
                done:false,
                state:null
            })
        }))
    }
    return (
        <div className="page">
            <div className="game">
                <div className="head">
                    <div className="name">Country Quiz</div>
                    <div className="points">{points}/10 points</div>
                </div>
                <div className="body">
                    <div className="numbersBox">{qoustionNumber}</div>
                    {questions}
                    {count==10 && <End reset={reset} points={points}/>}
                </div>
            </div>
        </div>
    )
}