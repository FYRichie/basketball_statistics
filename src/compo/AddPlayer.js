import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { TextField, Grid, Button, FormLabel, Avatar } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
}));

function AddPlayer() {
  const [opponent, setOpponent] = useState("");
  const [currentPlayer, setCurrentPlayer] = useState();
  const [player, setPlayer] = useState([]);
  const [addDisabled, setAddDisabled] = useState(false);

  const classes = useStyles();
  const handleEnterOpponent = (e) => {
    setOpponent(e.target.value);
  };
  const handleEnterPlayer = (e) => {
    setCurrentPlayer(e.target.value);
  };
  const addPlayer = (player_num) => {
    if (
      player.includes(player_num) ||
      isNaN(player_num) ||
      player_num < 0 ||
      player_num > 99
    )
      return;
    if (player.length === 12) {
      setAddDisabled(true);
      return;
    }
    console.log(`Success adding player ${player_num}`);
    console.log(player_num);
    setPlayer([...player, player_num]);
    setCurrentPlayer("");
  };
  const finishLogIn = () => {
    console.log(player, opponent);
  };
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item>
          <TextField
            variant="outlined"
            required
            label="對手"
            onChange={handleEnterOpponent}
          />
        </Grid>
        <Grid item>
          <FormLabel>球員</FormLabel>
          <Grid item>
            <TextField
              variant="outlined"
              disabled={addDisabled}
              onChange={handleEnterPlayer}
              value={currentPlayer}
              label="球員號碼"
            />
            <Button
              color="primary"
              disabled={addDisabled}
              onClick={() => addPlayer(currentPlayer)}
            >
              新增球員
            </Button>
          </Grid>
          <Grid item>
            {player.map((p) => (
              <Avatar>{p}</Avatar>
            ))}
          </Grid>
        </Grid>
        <Button
          variant="contained"
          disabled={!(opponent !== "" && player.length >= 5)}
          onClick={finishLogIn}
        >
          完成登錄
        </Button>
      </Grid>
    </div>
  );
}

export default AddPlayer;
