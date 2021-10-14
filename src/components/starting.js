import React from "react";
import { Button, Container, Grid, Typography } from "@material-ui/core";

export default function Starting() {
    return (
        <Container maxWidth="xs" alignItems="center" justifyContent="center">
            <Grid
                container
                spacing={0}
                direction="column"
                alignItems="center"
                justifyContent="center"
                style={{ minHeight: "100vh", flexWrap: "nowrap" }}
            >
                <Typography variant="h1">NTUEE</Typography>
                <Typography variant="h3">BASKETBALL</Typography>
                <Button style={{ margin: "30px" }} variant="outlined" fullWidth href="/HistoryOrCreate">
                    Start!
                </Button>
            </Grid>
        </Container>
    );
}
