import React, { useState } from "react";
import { Button, TextField } from "@material-ui/core";
import { createGame } from "../api";
import { useHistory } from "react-router-dom";

function CreateNewGame(props) {
    const { setGameID, gameID } = props;
    const [opponent, setOpponent] = useState("");
    const history = useHistory();

    const handleChangeOpponent = (e) => {
        setOpponent(e.target.value);
    };
    const handleCreate = async () => {
        // call axios.js
        let id = await createGame(new Date(), opponent);
        console.log(id);
        await setGameID(id);
        // console.log(gameID);
        history.push(`/game/${id}`);
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
