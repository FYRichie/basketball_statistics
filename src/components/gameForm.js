import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import Backdrop from "@material-ui/core/Backdrop";
import { createGame } from "../axios";
import { Button, TextField, Modal } from "@material-ui/core";

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

function GameForm(props) {
  const classes = useStyles();
  const getNowTime = () => {
    let seconds = Date.now();
    seconds = seconds - (seconds % 3600) * 1000;
    // console.log("sec:", typeof(seconds));
    seconds = seconds + 28800 * 1000;
    return new Date(seconds).toISOString().slice(0, 16);
  };
  const { setGameModal, gameModal, setUnfinishedGame, setGameId } = props;
  const [timeSelect, setTimeSelect] = useState(getNowTime());
  const [opponent, setOpponent] = useState("");
  // console.log("now: ", new Date().toISOString());
  // console.log("timeselect: ", timeSelect);
  // console.log();

  const checkvalid = () => {
    if (opponent === "") {
      return false;
    }
    return true;
  };

  const submitGame = () => {
    if (!checkvalid()) {
      alert("opponent can't be none");
    } else {
      console.log(new Date(timeSelect));
      let date = new Date(timeSelect);
      createGame(date.toISOString(), opponent).then((id) => {
        console.log(id);
      });
      setUnfinishedGame(true);
    }
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      className={classes.modal}
      open={gameModal}
      onClose={() => {
        setGameModal(false);
      }}
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
          onChange={(event) => {
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
          onChange={(event) => {
            setOpponent(event.target.value);
          }}
        />
        <div className={classes.modal_btn_container}>
          <Button
            variant="contained"
            className={classes.modal_btn}
            onClick={submitGame}
          >
            確認
          </Button>
          <Button
            variant="contained"
            className={classes.modal_btn}
            onClick={() => {
              setTimeSelect(getNowTime());
              setOpponent("");
            }}
          >
            清除
          </Button>
        </div>
      </div>
    </Modal>
  );
}

export default GameForm;
