import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import Starting from "./starting";

function App() {
    const [gameID, setGameID] = useState("1234");
    // const [HistoryAndCreateReact, gameID] = historyAndCreate();
    return (
        <React.StrictMode>
            <Starting />
            <HistoryAndCreate setGameID={setGameID} gameID={gameID} />
            <GameStatistics gameID={gameID} />
        </React.StrictMode>
    );
}

export default App;
