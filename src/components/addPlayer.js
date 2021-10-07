import React, { useState } from "react";
import { useParams } from "react-router-dom";
import {
    TextField,
    Box,
    Tooltip,
    IconButton,
    Dialog,
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar,
    Button,
    DialogTitle,
    DialogContent,
} from "@material-ui/core";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import DeleteIcon from "@mui/icons-material/Delete";
import { Alert, AlertTitle } from "@mui/material";
import { createPersonalStat, deletePersonalStat } from "../api";
import {
    createPlayersObject,
    createPlayersDisplayObject,
} from "./gameStatisticsTool";

const AddPlayer = (props) => {
    const { gameID } = useParams();
    const {
        players,
        setPlayers,
        playersObject,
        setPlayersObject,
        setPlayersDisplayObject,
    } = props;
    const [playerNum, setPlayerNum] = useState("");
    const [playerName, setPlayerName] = useState("");
    const [openAlert, setOpenAlert] = useState(false);
    const [alertText, setAlertText] = useState("");

    const handleChangeNum = (e) => {
        setPlayerNum(e.target.value);
    };
    const handleChangeName = (e) => {
        setPlayerName(e.target.value);
    };
    const handleAddPlayer = async () => {
        if (playerName === "" || playerNum === "") {
            setAlertText("球員號碼跟球員姓名其中一個是空的！");
            setOpenAlert(true);
        } else if (isNaN(playerNum)) {
            setAlertText("球員號碼不是一個數字！");
            setOpenAlert(true);
        } else {
            setAlertText("");
            setPlayerNum("");
            setPlayerName("");
            const playerID = await createPersonalStat(
                gameID,
                playerNum,
                playerName
            );

            const newPlayers = [
                ...players,
                {
                    ID: playerID,
                    num: playerNum,
                    name: playerName,
                },
            ];
            setPlayers(newPlayers);
            const _playersObject = createPlayersObject(
                newPlayers,
                newPlayers.length - 1,
                playersObject
            );
            setPlayersObject(_playersObject);
            const playersDisplayObject =
                createPlayersDisplayObject(_playersObject);
            setPlayersDisplayObject(playersDisplayObject);
        }
    };
    const handleCloseAlert = () => {
        setOpenAlert(false);
        setAlertText("");
    };
    const handleDeletePlayer = async (ID) => {
        const deletePlayer = players.find((p) => p.ID === ID);
        setPlayers(players.filter((p) => p.ID !== ID));
        await deletePersonalStat(deletePlayer.ID);
        const _po = playersObject.filter((p) => p.ID !== ID);
        setPlayersObject(_po);
        setPlayersDisplayObject(createPlayersDisplayObject(_po));
    };
    const getPlayerList = () => {
        return players.map((p) => {
            return (
                <ListItem key={p.ID}>
                    <ListItemAvatar>
                        <Avatar>{p.num}</Avatar>
                    </ListItemAvatar>
                    <ListItemText primary={p.name} />
                    <IconButton
                        onClick={() => handleDeletePlayer(p.ID)}
                        edge="end"
                    >
                        <DeleteIcon />
                    </IconButton>
                </ListItem>
            );
        });
    };

    return (
        <>
            <DialogTitle>修改球員名單</DialogTitle>
            <DialogContent>
                <List>{getPlayerList()}</List>
                {players.length < 12 ? (
                    <Box
                        component="form"
                        sx={{
                            "& .MuiTextField-root": { m: 1, width: "25ch" },
                        }}
                        noValidate
                        autoComplete="off"
                    >
                        <div>
                            <TextField
                                key="set-player-num"
                                variant="outlined"
                                value={playerNum}
                                style={{ margin: "0 0 0 10px", width: "100px" }}
                                onChange={handleChangeNum}
                                label="球員號碼"
                            />
                            <TextField
                                key="set-player-name"
                                variant="outlined"
                                value={playerName}
                                style={{ margin: "0 0 0 10px" }}
                                onChange={handleChangeName}
                                label="球員名"
                            />
                            <Tooltip>
                                <IconButton onClick={handleAddPlayer}>
                                    <AddCircleOutlineOutlinedIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    </Box>
                ) : (
                    <div />
                )}
                {players.length < 5 ? (
                    <Alert style={{ margin: "10px" }} severity="warning">
                        球員人數不足5人
                    </Alert>
                ) : (
                    <div />
                )}
            </DialogContent>
            <Dialog open={openAlert} onClose={handleCloseAlert}>
                <Alert severity="error">
                    <AlertTitle>輸入問題</AlertTitle>
                    {alertText}
                </Alert>
            </Dialog>
        </>
    );
};

export default AddPlayer;
