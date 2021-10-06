import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";

const Starting = () => {
    const history = useHistory();
    const goToHistoryAndCreate = () => {
        history.push("/historyorcreate");
    };
    return (
        <>
            <Button variant="outlined" onClick={goToHistoryAndCreate}>
                開始
            </Button>
        </>
    );
};

export default Starting;
