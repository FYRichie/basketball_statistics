import { Route } from "react-router-dom";
import React from "react";
import HistoryGames from "./historyGames";
import CreateNewGame from "./createNewGame";
import { Container, Grid, Typography } from "@material-ui/core";

const HistoryAndCreate = (props) => {
    const { gameID, setGameID } = props;

    return (
        <Container maxWidth="md" alignItems="center" justifyContent="center">
            <Grid
                container
                spacing={0}
                direction="column"
                justifyContent="center"
                style={{ alignItems: "center", minHeight: "100vh", flexWrap: "nowrap" }}
            >
                <Typography variant="h2" style={{ margin: "20px" }}>
                    Game Records
                </Typography>
                <HistoryGames />
                <CreateNewGame gameID={gameID} setGameID={setGameID} />
            </Grid>
        </Container>
    );
};

export default HistoryAndCreate;
