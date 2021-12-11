import Ship from '../assets/ship.png'
import { useNavigate } from 'react-router'
import GameScore from './GameScore'

const StartScreen = () => {

    const navigate = useNavigate()
    document.addEventListener('keydown', e=>{
       if(e.key === 'Enter'){
           navigate('/game')
        }else{
            return;
        }
    })

    return(
        <div className="gameContainer">
        <h1 style={{color:"white", margin:"auto", textAlign:"center", marginTop:"12%", fontSize:"50px", marginBottom:"5%"}}>Space Invaders</h1>
        <h1 style={{color:"white", textAlign:"center", fontSize:"50px"}}>Press enter to play!</h1>

        </div>
    )


}

export default StartScreen;