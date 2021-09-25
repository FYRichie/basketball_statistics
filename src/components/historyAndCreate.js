import { BrowserRouter, Route } from "react-router-dom";
import React from "react";
import HistoryGames from "./historyGames";
import CreateNewGame from "./createNewGame";

export default function HistoryAndCreate(props) {
    const { gameID, setGameID } = props;

    const HistoryAndCreateComponent = () => {
        return (
            <>
                <HistoryGames />
                <CreateNewGame setGameID={setGameID} gameID={gameID} />
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
