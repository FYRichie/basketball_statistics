import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";

function CreateNewGame(props) {
    const { setGameID, gameID } = props;
    const [opponent, setOpponent] = useState("");

    const handleChangeOpponent = (e) => {
        setOpponent(e.target.value);
    };
    const handleCreate = async () => {
        // call axios.js
        // setGameID(createGame(new Date(), opponent));
        window.location.replace(window.location.origin + "/Game/" + gameID);
    };

    return (
        <>
            <TextField
                variant="outlined"
                defaultValue={opponent}
                value={opponent}
                label="對手"
                required={opponent === ""}
                onChange={handleChangeOpponent}
            />
            {opponent === "" ? (
                <div>請輸入對手</div>
            ) : (
                <Button variant="outlined" onClick={handleCreate}>
                    Create a new game
                </Button>
            )}
        </>
    );
}

export default CreateNewGame;
