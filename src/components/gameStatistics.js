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
    Grid,
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
    Container,
} from "@material-ui/core";
import { useParams } from "react-router-dom";
import {
    createPoint,
    createAssist,
    createBlock,
    createRebound,
    createSteal,
    createTurnover,
    createFoul,
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
    initState,
} from "./gameStatisticsTool";
import AddPlayer from "./addPlayer";

const StickyTableCell = withStyles((theme) => ({
    head: {
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
    const [opponent, setOpponent] = useState(""); // may change to get from backend with gameid
    const [openChangeStatistics, setOpenChangeStatistics] = useState(false);
    const [selectedNum, setSelectedNum] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [period, setPeriod] = useState(1);
    const [openAddPlayer, setOpenAddPlayer] = useState(false);
    const [players, setPlayers] = useState([]);
    const [playersObject, setPlayersObject] = useState(
        createPlayersObject(players, setPlayers)
    );
    const [playersDisplayObject, setPlayersDisplayObject] = useState(
        createPlayersDisplayObject(playersObject)
    );
    const [clickTime, setClickTime] = useState(null);

    const changePlayersObject = async (playerNum, event, add) => {
        console.log(playerNum, event, add);
        setPlayersObject(
            playersObject.map((p) => {
                if (p.num !== playerNum) return p;
                const _p = p;
                if (event === "playerStatus") _p.oncourt = !p.oncourt;
                else if (event === "freeThrowsMade") {
                    _p.score.freethrow.made += add;
                    if (add === 1)
                        createPoint(gameID, _p.ID, period, "freethrow", "made");
                    else
                        deletePoint(gameID, _p.ID, period, "freethrow", "made");
                } else if (event === "freeThrowsAttempt") {
                    _p.score.freethrow.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            _p.ID,
                            period,
                            "freethrow",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            _p.ID,
                            period,
                            "freethrow",
                            "attempt"
                        );
                } else if (event === "twoPointersMade") {
                    _p.score.twopointer.made += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            _p.ID,
                            period,
                            "twopointer",
                            "made"
                        );
                    else
                        deletePoint(
                            gameID,
                            _p.ID,
                            period,
                            "twopointer",
                            "made"
                        );
                } else if (event === "twoPointersAttempt") {
                    _p.score.twopointer.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            _p.ID,
                            period,
                            "twopointer",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            _p.ID,
                            period,
                            "twopointer",
                            "attempt"
                        );
                } else if (event === "threePointersMade") {
                    _p.score.threepointer.made += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            _p.ID,
                            period,
                            "threepointer",
                            "made"
                        );
                    else
                        deletePoint(
                            gameID,
                            _p.ID,
                            period,
                            "threepointer",
                            "made"
                        );
                } else if (event === "threePointersAttempt") {
                    _p.score.threepointer.attempt += add;
                    if (add === 1)
                        createPoint(
                            gameID,
                            _p.ID,
                            period,
                            "threepointer",
                            "attempt"
                        );
                    else
                        deletePoint(
                            gameID,
                            _p.ID,
                            period,
                            "threepointer",
                            "attempt"
                        );
                } else if (event === "offensiveRebound") {
                    _p.rebound.offensive += add;
                    if (add === 1)
                        createRebound(gameID, _p.ID, period, "offensive");
                    else deleteRebound(gameID, _p.ID, period, "offensive");
                } else if (event === "deffensiveRebound") {
                    _p.rebound.deffensive += add;
                    if (add === 1)
                        createRebound(gameID, _p.ID, period, "deffensive");
                    else deleteRebound(gameID, _p.ID, period, "deffensive");
                } else if (event === "assist") {
                    _p.assist += add;
                    if (add === 1) createAssist(gameID, _p.ID, period);
                    else deleteAssist(gameID, _p.ID, period);
                } else if (event === "steal") {
                    _p.steal += add;
                    if (add === 1) createSteal(gameID, _p.ID, period);
                    else deleteSteal(gameID, _p.ID, period);
                } else if (event === "foul") {
                    _p.foul.push(add); // foul type, count length
                    createFoul(gameID, _p.ID, period, add);
                } else if (event === "block") {
                    _p.block += add;
                    if (add === 1) createBlock(gameID, _p.ID, period);
                    else deleteBlock(gameID, _p.ID, period);
                } else if (event === "turnover") {
                    _p.turnover += add;
                    if (add === 1) createTurnover(gameID, _p.ID, period);
                    else deleteTurnover(gameID, _p.ID, period);
                }
                return _p;
            })
        );
        setPlayersDisplayObject(createPlayersDisplayObject(playersObject));
    };
    const handleMouseDown = (e) => {
        const [num, name, id, label] = e.target.id.split("-");
        console.log(e.target.id);
        if (id === "playerTotalScore" || id === "rebound") return;
        else if (id === "playerStatus") {
            changePlayersObject(num, id, 0);
            return;
        }
        let time = new Date();
        // console.log("mouse down: ", time.getTime());
        setClickTime(time.getTime());
        setSelectedNum(num);
        setSelectedName(name);
        setSelectedID(id);
        setSelectedLabel(label);
        // setOpenChangeStatistics(true);
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

    const handleMouseUp = () => {
        let time = new Date();
        // console.log("time mouse up: ", time.getTime());
        if (clickTime !== null) {
            if (time.getTime() - clickTime > 3000) {
                console.log("indirect");
                setClickTime(null);
                setOpenChangeStatistics(true);
            } else {
                console.log("direct +1");
                handleChange(selectedNum, selectedID, 1);
                setClickTime(null);
                setOpenChangeStatistics(false);
            }
        }
    };
    useEffect(() => {
        initState(gameID, setOpponent);
    }, []);

    return (
        <Container onMouseUp={handleMouseUp}>
            <Box sx={{ marginTop: 100, width: "inherit" }}>
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
            <Paper style={{ width: "100%" }}>
                <TableContainer style={{ maxHeight: "540px" }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <StickyTableCell
                                    align="center"
                                    colSpan={2}
                                ></StickyTableCell>
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
                                            if (index < 1)
                                                return (
                                                    <StickyTableCell>
                                                        <TableCell
                                                            key={c.id}
                                                            onMouseDown={
                                                                handleMouseDown
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
                                                    onMouseDown={
                                                        handleMouseDown
                                                    }
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
            </Paper>

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
                <DialogActions>
                    <Button
                        style={{ margin: "10px" }}
                        variant="outlined"
                        onClick={() => setOpenAddPlayer(false)}
                    >
                        完成
                    </Button>
                </DialogActions>
            </Dialog>
        </Container>
    );
};

export default GameStatisticsComponent;
