import React, { useState } from "react";
import GameStatistics from "./gameStatistics";
import HistoryAndCreate from "./historyAndCreate";
import Starting from "./starting";
import AddPlayer from "./addPlayer";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import {
    createPlayersObject,
    createPlayersDisplayObject,
} from "./gameStatisticsTool";

function App() {
    const [gameID, setGameID] = useState("1234");
    // const [HistoryAndCreateReact, gameID] = historyAndCreate();
    const [players, setPlayers] = useState([]);
    const [playersObject, setPlayersObject] = useState(
        // statistics for players
        createPlayersObject(players)
    );
    const [playersDisplayObject, setPlayersDisplayObject] = useState(
        // for display
        createPlayersDisplayObject(playersObject)
    );
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/historyorcreate">
                    <HistoryAndCreate setGameID={setGameID} gameID={gameID} />
                </Route>
                <Route exact path="/game/:gameID/addplayer">
                    <AddPlayer
                        players={players}
                        setPlayers={setPlayers}
                        playersObject={playersObject}
                        setPlayersObject={setPlayersObject}
                        setPlayersDisplayObject={setPlayersDisplayObject}
                    />
                </Route>
                <Route exact path="/game/:gameID">
                    <GameStatistics
                        players={players}
                        setPlayers={setPlayers}
                        playersObject={playersObject}
                        setPlayersObject={setPlayersObject}
                        playersDisplayObject={playersDisplayObject}
                        setPlayersDisplayObject={setPlayersDisplayObject}
                    />
                </Route>
                <Route exact path="/">
                    <Starting />
                </Route>
            </Switch>
        </BrowserRouter>
    );
}

export default App;
