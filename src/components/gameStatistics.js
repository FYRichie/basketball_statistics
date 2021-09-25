import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Box,
    AppBar,
    Toolbar,
    IconButton,
} from "@material-ui/core";
import { EditOutlined } from "@material-ui/icons";
import { BrowserRouter, Route } from "react-router-dom";

const useStyles = makeStyles((theme) => {});

const columns = [
    { id: "number", label: "背號", minWidth: 50 },
    { id: "name", label: "名字", minWidth: 100 },
    { id: "playerTotalScore", label: "得分", minWidth: 50 },
    { id: "freeThrows", label: "罰球(進/總)", minWidth: 100 },
    { id: "twoPointers", label: "兩分(進/總)", minWidth: 100 },
    { id: "threePointers", label: "三分(進/總)", minWidth: 100 },
    { id: "rebound", label: "籃板", minWidth: 50 },
    { id: "offensiveRebound", label: "進攻籃板", minWidth: 60 },
    { id: "deffensiveRebound", label: "防守籃板", minWidth: 60 },
    { id: "assist", label: "助攻", minWidth: 50 },
    { id: "steal", label: "抄截", minWidth: 50 },
    { id: "foul", label: "犯規", minWidth: 50 },
    { id: "block", label: "阻攻", minWidth: 50 },
    { id: "turnover", label: "失誤", minWidth: 50 },
    { id: "playerStatus", label: "上下場", minWidth: 50 },
];

function GameStatisticsComponent() {
    // const [unfinishedGame, setUnfinishedGame] = useState(false); // may set to true when start new game or db returns there's an unfinished game
    const [opponent, setOpponent] = useState("");
    const [changeOpponent, setChangeOpponent] = useState(false);
    const [opponentRequire, setOpponentRequire] = useState(true);

    const get_type = () => {
        return columns.map((c) => {
            return (
                <TableCell key={c.id} style={{ top: 57, minWidth: c.minWidth }}>
                    {c.label}
                </TableCell>
            );
        });
    };
    const handleChangeOpponent = (e) => {
        setOpponent(e.target.value);
        if (opponent !== "") setOpponentRequire(false);
    };
    const handleOpponentKeyUp = (e) => {
        if (e.key === "Enter") setChangeOpponent(false);
    };
    const editOpponent = () => {
        setChangeOpponent(true);
    };

    return (
        <Paper>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        {changeOpponent ? (
                            <TextField
                                variant="outlined"
                                defaultValue={opponent}
                                required={opponentRequire}
                                label="對手"
                                onChange={handleChangeOpponent}
                                onKeyUp={handleOpponentKeyUp}
                            />
                        ) : (
                            <>
                                <div>對手：{opponent}</div>
                                <IconButton onClick={editOpponent}>
                                    <EditOutlined />
                                </IconButton>
                            </>
                        )}
                    </Toolbar>
                </AppBar>
            </Box>
            <TableContainer sx={{ maxHeight: 500 }}>
                <Table stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                球員
                            </TableCell>
                            <TableCell align="center" colSpan={4}>
                                得分
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                籃板
                            </TableCell>
                            <TableCell align="center" colSpan={6}>
                                其他
                            </TableCell>
                        </TableRow>
                        <TableRow>{get_type()}</TableRow>
                    </TableHead>
                </Table>
            </TableContainer>
        </Paper>
    );
}

export default function GameStatistics(props) {
    return (
        <BrowserRouter>
            <Route
                exact
                path={"/Game/" + props.gameID}
                component={GameStatisticsComponent}
            />
        </BrowserRouter>
    );
}
