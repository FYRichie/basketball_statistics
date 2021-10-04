import React, { useState } from "react";
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
import { BrowserRouter, Route } from "react-router-dom";
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

const columns = [
    { id: "number", label: "背號", minWidth: 50 },
    { id: "name", label: "名字", minWidth: 100 },
    { id: "playerTotalScore", label: "得分", minWidth: 50 },
    { id: "freeThrowsMade", label: "罰球(進)", minWidth: 60 },
    { id: "freeThrowsAttempt", label: "罰球(總)", minWidth: 60 },
    { id: "twoPointersMade", label: "兩分(進)", minWidth: 60 },
    { id: "twoPointersAttempt", label: "兩分(總)", minWidth: 60 },
    { id: "threePointersMade", label: "三分(進)", minWidth: 60 },
    { id: "threePointersAttempt", label: "三分(總)", minWidth: 60 },
    { id: "rebound", label: "籃板", minWidth: 50 },
    { id: "offensiveRebound", label: "進攻籃板", minWidth: 60 },
    { id: "deffensiveRebound", label: "防守籃板", minWidth: 60 },
    { id: "assist", label: "助攻", minWidth: 50 },
    { id: "steal", label: "抄截", minWidth: 50 },
    { id: "foul", label: "犯規", minWidth: 50 }, // add foul type
    { id: "block", label: "阻攻", minWidth: 50 },
    { id: "turnover", label: "失誤", minWidth: 50 },
    { id: "playerStatus", label: "上下場", minWidth: 50 },
];
const createPlayersObject = (players) => {
    return players.map((p) => {
        return {
            num: p.num,
            name: p.name,
            score: {
                freethrow: {
                    made: 0,
                    attempt: 0,
                },
                twopointer: {
                    made: 0,
                    attempt: 0,
                },
                threepointer: {
                    made: 0,
                    attempt: 0,
                },
            },
            rebound: {
                offensive: 0,
                deffensive: 0,
            },
            assist: 0,
            steal: 0,
            foul: [],
            block: 0,
            turnover: 0,
            oncourt: false,
        };
    });
};
const createPlayersDisplayObject = (playersObject) => {
    const pdo = playersObject.map((p) => {
        const number = p.num;
        const name = p.name;
        const playerTotalScore =
            p.score.freethrow.made +
            p.score.twopointer.made * 2 +
            p.score.threepointer.made * 3;
        const freeThrowsMade = p.score.freethrow.made;
        const freeThrowsAttempt = p.score.freethrow.attempt;
        const twoPointersMade = p.score.twopointer.made;
        const twoPointersAttempt = p.score.twopointer.attempt;
        const threePointersMade = p.score.threepointer.made;
        const threePointersAttempt = p.score.threepointer.attempt;
        const rebound = p.rebound.offensive + p.rebound.deffensive;
        const offensiveRebound = p.rebound.offensive;
        const deffensiveRebound = p.rebound.deffensive;
        const assist = p.assist;
        const steal = p.steal;
        const foul = p.foul.length;
        const block = p.block;
        const turnover = p.turnover;
        const playerStatus = p.oncourt ? "上場" : "下場";
        return {
            number,
            name,
            playerTotalScore,
            freeThrowsMade,
            freeThrowsAttempt,
            twoPointersMade,
            twoPointersAttempt,
            threePointersMade,
            threePointersAttempt,
            rebound,
            offensiveRebound,
            deffensiveRebound,
            assist,
            steal,
            foul,
            block,
            turnover,
            playerStatus,
        };
    });
    return pdo.sort((p1, p2) => {
        return p1.playerStatus > p2.playerStatus;
    });
};
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

function GameStatisticsComponent() {
    // const [unfinishedGame, setUnfinishedGame] = useState(false); // may set to true when start new game or db returns there's an unfinished game
    const opponent = "電機"; // may change to get from backend with gameid
    const URL_parser = window.location.href.split("/");
    const gameID = URL_parser[URL_parser.length - 1];
    const [openChangeStatistics, setOpenChangeStatistics] = useState(false);
    const [selectedNum, setSelectedNum] = useState("");
    const [selectedName, setSelectedName] = useState("");
    const [selectedID, setSelectedID] = useState("");
    const [selectedLabel, setSelectedLabel] = useState("");
    const [period, setPeriod] = useState(1);

    const players = [
        // may pass in by parent componenet
        { num: "1", name: "一號" },
        { num: "2", name: "二號" },
        { num: "3", name: "三號" },
        { num: "4", name: "四號" },
        { num: "5", name: "五號" },
        { num: "6", name: "六號" },
        { num: "7", name: "七號" },
        { num: "8", name: "八號" },
        { num: "9", name: "九號" },
        { num: "10", name: "十號" },
        { num: "11", name: "十一號" },
        { num: "12", name: "十二號" },
    ];
    const [playersObject, setPlayersObject] = useState(
        // statistics for players
        createPlayersObject(players)
    );
    const [playersDisplayObject, setPlayersDisplayObject] = useState(
        // for display
        createPlayersDisplayObject(playersObject)
    );

    const get_type = () => {
        return columns.map((c, index) => {
            if (index < 2)
                return (
                    <TableCell
                        key={c.id}
                        style={{ top: 57, minWidth: c.minWidth }}
                    >
                        {c.label}
                    </TableCell>
                );
            return (
                <TableCell key={c.id} style={{ top: 57, minWidth: c.minWidth }}>
                    {c.label}
                </TableCell>
            );
        });
    };
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
                    _p.foul.push(""); // foul type, count length
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
        // console.log(e.target.id);
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
                        <TableRow>{get_type()}</TableRow>
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
                                                        id={
                                                            p.number +
                                                            "-" +
                                                            p.name +
                                                            "-" +
                                                            c.id +
                                                            "-" +
                                                            c.label
                                                        }
                                                    >
                                                        {value}
                                                    </TableCell>
                                                </StickyTableCell>
                                            );
                                        return (
                                            <TableCell
                                                key={c.id}
                                                onClick={handleClickCell}
                                                id={
                                                    p.number +
                                                    "-" +
                                                    p.name +
                                                    "-" +
                                                    c.id +
                                                    "-" +
                                                    c.label
                                                }
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
                aria-labelledby={selectedNum + "-" + selectedID + "-title"}
            >
                <DialogTitle id={selectedNum + "-" + selectedID + "-title"}>
                    {"更改 " + selectedName + " 的 " + selectedLabel}
                </DialogTitle>
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
            </Dialog>
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
