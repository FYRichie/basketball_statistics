import React, { useState } from "react";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@material-ui/core";
import { createGame } from "../api";
import { useHistory } from "react-router-dom";

function CreateNewGame(props) {
    const { setGameID, gameID } = props;
    const [opponent, setOpponent] = useState("");
    const [createOpened, setCreateOpened] = useState(true);
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
        <Dialog maxWidth="md" open={createOpened}>
            <DialogTitle>新增比賽</DialogTitle>
            <DialogContent>
                <TextField
                    variant="outlined"
                    defaultValue={opponent}
                    value={opponent}
                    label="對手名稱"
                    required={opponent === ""}
                    onChange={handleChangeOpponent}
                    helperText="請輸入對手"
                />
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleCreate}
                    variant="outlined"
                    style={{ margin: "10px" }}
                >
                    Create
                </Button>
            </DialogActions>
        </Dialog>
    );
}

export default CreateNewGame;
