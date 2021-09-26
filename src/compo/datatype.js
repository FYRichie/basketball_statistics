import React, { useState } from "react";
import { makeStyles } from "@material-ui/core";
import { Select, FormControl, InputLabel, MenuItem } from "@material-ui/core";

const data = {
  period: [
    "第一節",
    "第二節",
    "第三節",
    "第四節",
    "延長一",
    "延長二",
    "延長三",
  ],
  kind: [
    {
      type: "得分",
      options: ["罰球", "兩分", "三分"],
      scored: ["進", "沒進"],
    },
    {
      type: "抄截",
      options: [],
    },
    {
      type: "犯規",
      options: [
        "P: 沒有造成罰球",
        "P1: 對方罰一球",
        "P2: 對方罰兩球",
        "P3: 對方罰三球",
        "T: 球員技術犯規",
        "C: 教練技術犯規",
        "U: 違反運動家精神",
      ],
    },
    {
      type: "籃板",
      options: ["進攻籃板", "防守籃板"],
    },
    {
      type: "助攻",
      options: [],
    },
    {
      type: "阻攻",
      options: [],
    },
    {
      type: "失誤",
      options: [],
    },
    {
      type: "人員輪換",
      options: ["上場", "下場"],
      // add time
    },
  ],
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function OtherData(type, classes) {
  const [score, setScore] = useState("");
  const [scored, setScored] = useState("");
  const [foul, setFoul] = useState("");
  const [rebound, setRebound] = useState("");
  const [playerOnOff, setPlayerOnOff] = useState("");
  let render = <></>;

  switch (type) {
    case "得分": {
      const getScore = () => {
        return data.kind[0].options.map((s) => (
          <MenuItem value={s}>{s}</MenuItem>
        ));
      };
      const getScored = () => {
        return data.kind[0].scored.map((s) => (
          <MenuItem value={s}>{s}</MenuItem>
        ));
      };
      const changeScore = (e) => {
        setScore(e.target.value);
      };
      const changeScored = (e) => {
        setScored(e.target.value);
      };
      render = (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="set-score-label">得分種類</InputLabel>
            <Select
              labelId="set-score-label"
              id="set-score"
              value={score}
              label="得分種類"
              onChange={changeScore}
            >
              {getScore()}
            </Select>
          </FormControl>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="set-scored-label">進/沒進</InputLabel>
            <Select
              labelId="set-scored-label"
              id="set-scored"
              value={scored}
              label="進/沒進"
              onChange={changeScored}
            >
              {getScored()}
            </Select>
          </FormControl>
        </>
      );
      break;
    }
    case "犯規": {
      const getFoul = () => {
        return data.kind[2].options.map((f) => (
          <MenuItem value={f}>{f}</MenuItem>
        ));
      };
      const changeFoul = (e) => {
        setFoul(e.target.value);
      };
      render = (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="set-foul-label">犯規種類</InputLabel>
            <Select
              labelId="set-foul-label"
              id="set-foul"
              value={foul}
              label="犯規種類"
              onChange={changeFoul}
            >
              {getFoul()}
            </Select>
          </FormControl>
        </>
      );
      break;
    }
    case "籃板": {
      const getRebound = () => {
        return data.kind[3].options.map((r) => (
          <MenuItem value={r}>{r}</MenuItem>
        ));
      };
      const changeRebound = (e) => {
        setRebound(e.target.value);
      };
      render = (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="set-rebound-label">籃板種類</InputLabel>
            <Select
              labelId="set-rebound-label"
              id="set-rebound"
              value={rebound}
              label="籃板種類"
              onChange={changeRebound}
            >
              {getRebound()}
            </Select>
          </FormControl>
        </>
      );
      break;
    }
    case "人員輪換": {
      const getPlayerOnOff = () => {
        return data.kind[7].options.map((p) => (
          <MenuItem value={p}>{p}</MenuItem>
        ));
      };
      const changePlayerOnOff = (e) => {
        setPlayerOnOff(e.target.value);
      };
      render = (
        <>
          <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel id="set-playeronoff-label">人員輪換</InputLabel>
            <Select
              labelId="set-playeronoff-label"
              id="set-playeronoff"
              value={playerOnOff}
              label="人員輪換"
              onChange={changePlayerOnOff}
            >
              {getPlayerOnOff()}
            </Select>
          </FormControl>
        </>
      );
      break;
    }
    default:
      break;
  }
  return [
    render,
    {
      score: score,
      scored: scored,
      foul: foul,
      rebound: rebound,
      playerOnOff: playerOnOff,
    },
  ];
}

function Data() {
  const [period, setPeriod] = useState("");
  const [type, setType] = useState("");
  const classes = useStyles();

  const getPeriods = () => {
    return data.period.map((p) => <MenuItem value={p}>{p}</MenuItem>);
  };
  const getTypes = () => {
    return data.kind.map((k) => <MenuItem value={k.type}>{k.type}</MenuItem>);
  };
  const changePeriod = (e) => {
    setPeriod(e.target.value);
  };
  const changeType = (e) => {
    setType(e.target.value);
  };

  const [render, dataObject] = OtherData(type, classes);

  return [
    <>
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
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="set-type-label">種類</InputLabel>
        <Select
          labelId="set-type-label"
          id="set-label"
          value={type}
          label="種類"
          onChange={changeType}
        >
          {getTypes()}
        </Select>
      </FormControl>
      {render}
    </>,
    {
      period: period,
      type: type,
      ...dataObject,
    },
  ];
}

export default Data;
