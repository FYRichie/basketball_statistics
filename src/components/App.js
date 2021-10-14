import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Starting from "./starting";

function App() {
    const [gameID, setGameID] = useState("1234");
    const [opponent, setOpponent] = useState("");
    // const [HistoryAndCreateReact, gameID] = historyAndCreate();
    return (
        <React.StrictMode>
            {/* <BrowserRouter> */}
            {/* <Switch> */}
            <Starting />
            <HistoryAndCreate
                setGameID={setGameID}
                gameID={gameID}
                setOpponent={setOpponent}
                opponent={opponent}
            />
            <GameStatistics gameID={gameID} />
            {/* </Switch> */}
            {/* // </BrowserRouter> */}
        </React.StrictMode>
    );
}

export default App;
