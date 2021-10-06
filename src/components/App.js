import { ThemeProvider } from "@material-ui/core";
import React, { useState } from "react";
import theme from "../theme";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import Starting from "./starting";

function App() {
    const [gameID, setGameID] = useState("1234");
    const [opponent, setOpponent] = useState("");
    // const [HistoryAndCreateReact, gameID] = historyAndCreate();
    return (
        <React.StrictMode>
            <ThemeProvider theme={theme}>
                <Starting />
                <HistoryAndCreate setGameID={setGameID} gameID={gameID} setOpponent={setOpponent} opponent={opponent} />
                <GameStatistics gameID={gameID} />
            </ThemeProvider>
        </React.StrictMode>
    );
}

export default App;
