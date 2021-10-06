import { Route } from "react-router-dom";
import React from "react";
import HistoryGames from "./historyGames";
import CreateNewGame from "./createNewGame";
import { Container, Grid } from "@material-ui/core";

const HistoryAndCreate = (props) => {
    const { gameID, setGameID } = props;

    return (
        <Container maxWidth="md" alignItems="center" justifyContent="center">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh", flexWrap: "nowrap" }}
            >
                <HistoryGames />
                <CreateNewGame gameID={gameID} setGameID={setGameID} />
            </Grid>
        </Container>
    );
};

export default HistoryAndCreate;
