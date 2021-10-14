import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Starting from "./starting";

function App() {
    const [gameID, setGameID] = useState("1234");
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
