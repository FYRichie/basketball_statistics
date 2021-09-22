import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Button,
    TextField,
    Box,
    AppBar,
    Toolbar,
    IconButton,
    Modal,
    // DateTimePicker
    // TextField
} from "@material-ui/core";
import { CallMissedSharp } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
    modal: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      margin: theme.spacing(2),
    },
    background: {
        background: "white",
        display: "flex",
        padding: theme.spacing(2),
        minWidth: 120,
        height: 100,
    },
    modal_btn: {
        width: "50px",
        margin: 10,
      },
}));

function GameForm(props){
    const classes = useStyles();
    const { setGameModal, gameModal, setUnfinishedGame, setGameId } = props;
    const [timeSelect, setTimeSelect] = useState(new Date().toISOString().slice(0,16));//
    const [opponent, setOpponent] = useState("");
    // console.log("now: ", new Date().toISOString());
    // console.log("timeselect: ", timeSelect);

    const checkvalid = () => {
        if (opponent === ""){
            return false;
        }
        return true;
    }

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={gameModal}
            onClose={()=>{setGameModal(false)}}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
              timeout: 500,
            }}
        >
            <div className={classes.background}>
                <TextField
                    required
                    id="game-time"
                    label="Required"
                    type="datetime-local"
                    variant="outlined"
                    helperText="pick a game start time"
                    value={timeSelect}
                    onChange={(event)=>{
                        setTimeSelect(event.target.value);
                        console.log(timeSelect);
                    }} 
                    InputLabelProps={{
                        shrink: true,
                    }}
                />
                <TextField 
                    required
                    id="game-opponent"
                    label="Required"
                    helperText="Opponent name"
                    variant="outlined"
                    value={opponent}
                    onChange={(event)=>{
                        setOpponent(event.target.value);}
                    }
                />
                <div className={classes.modal_btn_container}>
                    <Button
                        variant="contained"
                        className={classes.modal_btn}
                        onClick={()=>{
                            if (!checkvalid()){
                                alert("opponent can't be none");
                            } else{
                                setUnfinishedGame(true);
                            }
                        }}
                    >
                        確認
                    </Button>
                    <Button
                        variant="contained"
                        className={classes.modal_btn}
                        onClick={()=>{
                            setTimeSelect(new Date().toISOString().slice(0,16));
                            setOpponent("");
                        }}
                    >
                        清除
                    </Button>
                </div>
            </div>
        </Modal>
    )
}

export default GameForm;