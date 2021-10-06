import { TableCell, Button, withStyles } from "@material-ui/core";
const StickyTableCell = withStyles((theme) => ({
    head: {
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 2,
    },
    body: {
        left: 0,
        position: "sticky",
        zIndex: theme.zIndex.appBar + 1,
    },
}))(TableCell);
export const columns = [
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
export const createPlayersObject = (players, newPlayer = 0, playersOjbect) => {
    return players.map((p, index) => {
        if (index >= newPlayer)
            return {
                ID: p.ID,
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
        else return playersOjbect[index];
    });
};
export const createPlayersDisplayObject = (playersObject) => {
    const pdo = playersObject.map((p) => {
        const number = p.num;
        const name = p.name;
        const playerTotalScore = p.score.freethrow.made + p.score.twopointer.made * 2 + p.score.threepointer.made * 3;
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
export const getType = () => {
    return columns.map((c, index) => {
        if (index < 1)
            return (
                <StickyTableCell key={c.id} style={{ top: 57, minWidth: c.minWidth }}>
                    {c.label}
                </StickyTableCell>
            );
        return (
            <TableCell key={c.id} style={{ top: 57, minWidth: c.minWidth }}>
                {c.label}
            </TableCell>
        );
    });
};
export const foulType = [
    {
        type: "P",
        desc: "沒有造成對方罰球",
    },
    {
        type: "P1",
        desc: "對方罰球一顆",
    },
    {
        type: "P2",
        desc: "對方罰球兩顆",
    },
    {
        type: "P3",
        desc: "對方罰球三顆",
    },
    {
        type: "T",
        desc: "技術犯規",
    },
    {
        type: "U",
        desc: "違反運動道德",
    },
];
export const getFoulType = (handleChange, selectedNum, seletcedID) => {
    return foulType.map((f) => {
        return (
            <Button
                onClick={() => {
                    handleChange(selectedNum, seletcedID, f.type);
                }}
            >{`${f.type}:${f.desc}`}</Button>
        );
    });
};
