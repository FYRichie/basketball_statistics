import { Route } from "react-router-dom";
import React from "react";
import HistoryGames from "./historyGames";
import CreateNewGame from "./createNewGame";

const HistoryAndCreate = (props) => {
    const { gameID, setGameID } = props;

    return (
        <>
            <HistoryGames />
            <CreateNewGame gameID={gameID} setGameID={setGameID} />
        </>
    );
};

export default HistoryAndCreate;
