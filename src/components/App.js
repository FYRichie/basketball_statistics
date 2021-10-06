import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import Starting from "./starting";
import AddPlayer from "./addPlayer";
import { BrowserRouter, Switch, Route } from "react-router-dom";

function App() {
    const [gameID, setGameID] = useState("1234");
    // const [HistoryAndCreateReact, gameID] = historyAndCreate();
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/historyorcreate">
                    <HistoryAndCreate setGameID={setGameID} gameID={gameID} />
                </Route>
                {/* <Route exact path="/game/:gameID/addplayer">
                    <AddPlayer />
                </Route> */}
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
