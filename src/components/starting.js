import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Button, Container, Grid, Typography } from "@material-ui/core";

export default function Starting() {
    return (
        <BrowserRouter>
            <Route exact path="/">
                <Container style={{ padding: "200px 100px" }} maxWidth="sm">
                    <Grid container justify="center">
                        <Typography variant="h1">NTUEE</Typography>
                        <Typography variant="h3">BASKETBALL</Typography>
                        <Button style={{ margin: "30px" }} variant="outlined" fullWidth href="/HistoryOrCreate">
                            Start!
                        </Button>
                    </Grid>
                </Container>
            </Route>
        </BrowserRouter>
    );
}
