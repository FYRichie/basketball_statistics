import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
    Select,
    FormControl,
    InputLabel,
    MenuItem,
    Button,
} from "@material-ui/core";
import Data from "./datatype";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function CountStatistics() {
    const [player, setPlayer] = useState();
    const [totalScore, setTotalScore] = useState(0); // Add other data
    const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const classes = useStyles();

    const getPlayers = () => {
        return players.map((p) => <MenuItem value={p}>{p}</MenuItem>);
    };
    const changePlayer = (e) => {
        setPlayer(e.target.value);
    };

    const [render, statistics] = Data();
    const addData = () => {
        // Add statistics
    };

    return (
        <div>
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="set-player-label">球員號碼</InputLabel>
                <Select
                    labelId="set-player-label"
                    id="set-player"
                    value={player}
                    label="球員號碼"
                    onChange={changePlayer}
                >
                    {getPlayers()}
                </Select>
            </FormControl>
            {render}
            <Button variant="contained" disabled onClick={addData}>
                新增
            </Button>
        </div>
    );
}

export default CountStatistics;
