import React, { useState, useEffect } from "react";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Box,
    AppBar,
    Toolbar,
    FormControl,
    withStyles,
    Button,
    Dialog,
    DialogActions,
    DialogTitle,
    InputLabel,
    MenuItem,
    Select,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
    createPoint,
    createAssist,
    createBlock,
    createRebound,
    createSteal,
    createTurnover,
    deletePoint,
    deleteAssist,
    deleteBlock,
    deleteRebound,
    deleteSteal,
    deleteTurnover,
} from "../api";
import {
    columns,
    createPlayersObject,
    createPlayersDisplayObject,
    getType,
    getFoulType,
} from "./gameStatisticsTool";
import AddPlayer from "./addPlayer";

const StickyTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2,
    },
    body: {
        backgroundColor: "#ddd",
        minWidth: "50px",
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1,
    },
}))(TableCell);

const GameStatisticsComponent = () => {
    const { gameID } = useParams();
    const opponent = "電機"; // may change to get from backend with gameid
    const [openChangeStatistics, setOpenChangeStatistics] = useState(false);
    const [selectedNum, setSelectedNum] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [period, setPeriod] = useState(1);
    const [openAddPlayer, setOpenAddPlayer] = useState(false);
    const [players, setPlayers] = useState([]);
    const [playersObject, setPlayersObject] = useState(
        // statistics for players
        createPlayersObject(players)
    );
    const [playersDisplayObject, setPlayersDisplayObject] = useState(
        // for display
        createPlayersDisplayObject(playersObject)
    );

    const changePlayersObject = (playerNum, event, add) => {
        console.log(playerNum, event, add);
        setPlayersObject(
            playersObject.map((p) => {
                if (p.num !== playerNum) return p;
                const _p = p;
                if (event === "playerStatus") _p.oncourt = !p.oncourt;
                else if (event === "freeThrowsMade") {
                    _p.score.freethrow.made += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "freethrow",
                            "made"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "freethrow",
                            "made"
                        );
                } else if (event === "freeThrowsAttempt") {
                    _p.score.freethrow.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "freethrow",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "freethrow",
                            "attempt"
                        );
                } else if (event === "twoPointersMade") {
                    _p.score.twopointer.made += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "twopointer",
                            "made"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "twopointer",
                            "made"
                        );
                } else if (event === "twoPointersAttempt") {
                    _p.score.twopointer.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "twopointer",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "twopointer",
                            "attempt"
                        );
                } else if (event === "threePointersMade") {
                    _p.score.threepointer.made += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "threepointer",
                            "made"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "threepointer",
                            "made"
                        );
                } else if (event === "threePointersAttempt") {
                    _p.score.threepointer.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            playerNum,
                            period,
                            "threepointer",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            playerNum,
                            period,
                            "threepointer",
                            "attempt"
                        );
                } else if (event === "offensiveRebound") {
                    _p.rebound.offensive += add;
                    if (add === 1)
                        createRebound(gameID, playerNum, period, "offensive");
                    else deleteRebound(gameID, playerNum, period, "offensive");
                } else if (event === "deffensiveRebound") {
                    _p.rebound.deffensive += add;
                    if (add === 1)
                        createRebound(gameID, playerNum, period, "deffensive");
                    else deleteRebound(gameID, playerNum, period, "deffensive");
                } else if (event === "assist") {
                    _p.assist += add;
                    if (add === 1) createAssist(gameID, playerNum, period);
                    else deleteAssist(gameID, playerNum, period);
                } else if (event === "steal") {
                    _p.steal += add;
                    if (add === 1) createSteal(gameID, playerNum, period);
                    else deleteSteal(gameID, playerNum, period);
                } else if (event === "foul") {
                    _p.foul.push(add); // foul type, count length
                } else if (event === "block") {
                    _p.block += add;
                    if (add === 1) createBlock(gameID, playerNum, period);
                    else deleteBlock(gameID, playerNum, period);
                } else if (event === "turnover") {
                    _p.turnover += add;
                    if (add === 1) createTurnover(gameID, playerNum, period);
                    else deleteTurnover(gameID, playerNum, period);
                }
                return _p;
            })
        );
        setPlayersDisplayObject(createPlayersDisplayObject(playersObject));
    };
    const handleClickCell = (e) => {
        const [num, name, id, label] = e.target.id.split("-");
        console.log(e.target.id);
        if (id === "playerTotalScore" || id === "rebound") return;
        else if (id === "playerStatus") {
            changePlayersObject(num, id, 0);
            return;
        }
        setSelectedNum(num);
        setSelectedName(name);
        setSelectedID(id);
        setSelectedLabel(label);
        setOpenChangeStatistics(true);
    };
    const handleCloseChange = () => {
        setSelectedNum("");
        setSelectedName("");
        setSelectedID("");
        setSelectedLabel("");
        setOpenChangeStatistics(false);
    };
    const handleChange = (playerNum, event, add) => {
        // console.log(playerNum, event, add);
        changePlayersObject(playerNum, event, add);
        // send data including period to backend
        handleCloseChange();
    };
    const handleAddPlayer = () => {
        setOpenAddPlayer(true);
    };
    const handleCloseAddPlayer = () => {
        setOpenAddPlayer(false);
    };

    return (
        <Paper sx={{ overflow: "hidden" }}>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                    <Toolbar>
                        <div>對手：{opponent}</div>
                        <Box sx={{ minWidth: 120, marginLeft: "100px" }}>
                            <FormControl fullWidth>
                                <InputLabel id="period-selection-label">
                                    節數
                                </InputLabel>
                                <Select
                                    labelId="period-selection-label"
                                    id="period-selection"
                                    value={period}
                                    onChange={(e) => {
                                        setPeriod(e.target.value);
                                    }}
                                >
                                    <MenuItem value={1}>第一節</MenuItem>
                                    <MenuItem value={2}>第二節</MenuItem>
                                    <MenuItem value={3}>第三節</MenuItem>
                                    <MenuItem value={4}>第四節</MenuItem>
                                    <MenuItem value={5}>延長一</MenuItem>
                                    <MenuItem value={6}>延長二</MenuItem>
                                    <MenuItem value={7}>延長三</MenuItem>
                                </Select>
                            </FormControl>
                        </Box>
                        <Button onClick={handleAddPlayer}>更改球員</Button>
                    </Toolbar>
                </AppBar>
            </Box>
            <TableContainer>
                <Table
                    stickyHeader
                    aria-label="sticky table"
                    sx={{ maxHeight: "200px" }}
                >
                    <TableHead>
                        <TableRow>
                            <TableCell align="center" colSpan={2}>
                                球員
                            </TableCell>
                            <TableCell align="center" colSpan={7}>
                                得分
                            </TableCell>
                            <TableCell align="center" colSpan={3}>
                                籃板
                            </TableCell>
                            <TableCell align="center" colSpan={6}>
                                其他
                            </TableCell>
                        </TableRow>
                        <TableRow>{getType()}</TableRow>
                    </TableHead>
                    <TableBody>
                        {playersDisplayObject.map((p) => {
                            return (
                                <TableRow
                                    hover
                                    tabIndex={-1}
                                    role="checkbox"
                                    key={p.num}
                                >
                                    {columns.map((c, index) => {
                                        const value = p[c.id];
                                        if (index < 2)
                                            return (
                                                <StickyTableCell>
                                                    <TableCell
                                                        key={c.id}
                                                        onClick={
                                                            handleClickCell
                                                        }
                                                        id={`${p.number}-${p.name}-${c.id}-${c.label}`}
                                                    >
                                                        {value}
                                                    </TableCell>
                                                </StickyTableCell>
                                            );
                                        return (
                                            <TableCell
                                                key={c.id}
                                                onClick={handleClickCell}
                                                id={`${p.number}-${p.name}-${c.id}-${c.label}`}
                                            >
                                                {value}
                                            </TableCell>
                                        );
                                    })}
                                </TableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            <Dialog
                open={openChangeStatistics}
                onClose={handleCloseChange}
                aria-labelledby={`${selectedNum}-${selectedID}-title`}
            >
                <DialogTitle id={`${selectedNum}-${selectedID}-title`}>
                    {`更改 ${selectedName} 的 ${selectedLabel}`}
                </DialogTitle>
                {selectedID !== "foul" ? (
                    <DialogActions>
                        <Button
                            onClick={() => {
                                handleChange(selectedNum, selectedID, -1);
                            }}
                        >
                            -1
                        </Button>
                        <Button
                            onClick={() => {
                                handleChange(selectedNum, selectedID, 1);
                            }}
                            autoFocus
                        >
                            +1
                        </Button>
                    </DialogActions>
                ) : (
                    <DialogActions>
                        {getFoulType(handleChange, selectedNum, selectedID)}
                    </DialogActions>
                )}
            </Dialog>
            <Dialog open={openAddPlayer} onClose={handleCloseAddPlayer}>
                <AddPlayer
                    players={players}
                    setPlayers={setPlayers}
                    playersObject={playersObject}
                    setPlayersObject={setPlayersObject}
                    setPlayersDisplayObject={setPlayersDisplayObject}
                />
            </Dialog>
        </Paper>
    );
};

export default GameStatisticsComponent;
