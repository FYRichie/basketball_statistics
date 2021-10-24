import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import Starting from "./starting";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
    const [gameID, setGameID] = useState("");
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/historyorcreate">
                    <HistoryAndCreate setGameID={setGameID} gameID={gameID} />
                </Route>
                <Route exact path="/game/:gameID">
                    <GameStatistics />
                </Route>
                <Route exact path="/">
                    <Starting />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
