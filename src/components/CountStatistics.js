import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";
import data from "./datatype";

const useStyles = makeStyles((theme) => ({
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
}));

function CountStatistics() {
    const [player, setPlayer] = useState();
    const [period, setPeriod] = useState("");

    const players = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    const classes = useStyles();
    const getPlayers = () => {
        return players.map((p) => <MenuItem value={p}>{p}</MenuItem>);
    };
    const getPeriods = () => {
        return data.period.map((p) => <MenuItem value={p}>{p}</MenuItem>);
    };
    const changePlayer = (e) => {
        setPlayer(e.target.value);
    };
    const changePeriod = (e) => {
        setPeriod(e.target.value);
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
            <FormControl variant="outlined" className={classes.formControl}>
                <InputLabel id="set-period-label">節數</InputLabel>
                <Select
                    labelId="set-period-label"
                    id="set-period"
                    value={period}
                    label="節數"
                    onChange={changePeriod}
                >
                    {getPeriods()}
                </Select>
            </FormControl>
        </div>
    );
}

export default CountStatistics;
