import { Routes, Route } from "react-router-dom";
import StartScreen from "./components/StartScreen";
import GameScreen from "./components/GameScreen";


const MainRouter = () => {

    return(
    <Routes>
        <Route path="/" element={<StartScreen />}></Route>
        <Route path="/game" element={<GameScreen />}></Route>
    </Routes>

    )

}

export default MainRouter;