import React from "react";
import { BrowserRouter, Route } from "react-router-dom";
import { Button } from "@material-ui/core";

const startComponent = () => {
    const goToHistoryAndCreate = () => {
        window.location.replace(window.location.origin + "/HistoryOrCreate");
    };
    return (
        <>
            <Button variant="outlined" onClick={goToHistoryAndCreate}>
                開始
            </Button>
        </>
    );
};

export default function Starting() {
    return (
        <BrowserRouter>
            <Route exact path="/" component={startComponent} />
        </BrowserRouter>
    );
}
