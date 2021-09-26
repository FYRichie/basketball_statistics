import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import HistoryGames from "./historyGames";
import CreateNewGame from "./createNewGame";

export default function HistoryAndCreate(props) {
    const { gameID, setGameID, setOpponent, opponent } = props;

    const HistoryAndCreateComponent = () => {
        return (
            <>
                <HistoryGames />
                <CreateNewGame
                    setGameID={setGameID}
                    gameID={gameID}
                    setOpponent={setOpponent}
                    opponent={opponent}
                />
            </>
        );
    };
    return (
        <BrowserRouter>
            <Route
                exact
                path="/HistoryOrCreate"
                component={HistoryAndCreateComponent}
            />
        </BrowserRouter>
    );
}
