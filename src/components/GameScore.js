import { useState } from "react";
import '../styles/game.css'

const GameScore = () => {

const [gameScore, setGameScore] = useState(0)

    return(
        <div className="gameHeader">
            <p style={{color:"white", marginTop:"0"}}>SCORE: {gameScore}</p>
        </div>
    )
}

export default GameScore;