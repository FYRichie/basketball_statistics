import {
    TableCell,
    Button,
    withStyles,
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableBody,
} from "@material-ui/core";
import { findGameById, findPlayerStatByGameId } from "../api";
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

export const createPlayersDisplayObject = (playersObject) => {
    const pdo = playersObject.map((p) => {
        const number = p.num;
        const name = p.name;
        const playerTotalScore =
            p.score.freethrow.made.reduce((a, b) => a + b) +
            p.score.twopointer.made.reduce((a, b) => a + b) * 2 +
            p.score.threepointer.made.reduce((a, b) => a + b) * 3;
        const freeThrowsMade = p.score.freethrow.made.reduce((a, b) => a + b);
        const freeThrowsAttempt = p.score.freethrow.attempt.reduce(
            (a, b) => a + b
        );
        const twoPointersMade = p.score.twopointer.made.reduce((a, b) => a + b);
        const twoPointersAttempt = p.score.twopointer.attempt.reduce(
            (a, b) => a + b
        );
        const threePointersMade = p.score.threepointer.made.reduce(
            (a, b) => a + b
        );
        const threePointersAttempt = p.score.threepointer.attempt.reduce(
            (a, b) => a + b
        );
        const rebound =
            p.rebound.offensive.reduce((a, b) => a + b) +
            p.rebound.deffensive.reduce((a, b) => a + b);
        const offensiveRebound = p.rebound.offensive.reduce((a, b) => a + b);
        const deffensiveRebound = p.rebound.deffensive.reduce((a, b) => a + b);
        const assist = p.assist.reduce((a, b) => a + b);
        const steal = p.steal.reduce((a, b) => a + b);
        const foul = p.foul.reduce((a, b) => a + b).length;
        const block = p.block.reduce((a, b) => a + b);
        const turnover = p.turnover.reduce((a, b) => a + b);
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
                <StickyTableCell
                    key={c.id}
                    style={{ top: 57, minWidth: c.minWidth }}
                >
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
export const initState = async (
    gameID,
    setOpponent,
    // setPlayers,
    setPlayersObject,
    setPlayersDisplayObject,
    // quarterPoints,
    setQuarterPoints
) => {
    const [game] = await findGameById(gameID);
    // console.log(data);
    setOpponent(game.opponent);
    const P = await findPlayerStatByGameId(gameID);
    console.log(P);
    // setPlayers(
    //     P.map((p) => {
    //         return { ID: p.ID, num: p.num, name: p.name };
    //     })
    // );
    setPlayersObject(P);
    setPlayersDisplayObject(createPlayersDisplayObject(P));
    let _qP = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0 };
    const quarters = [1, 2, 3, 4, 5, 6, 7];
    for (let i = 0; i < quarters.length; i++) {
        for (let j = 0; j < P.length; j++) {
            _qP[quarters[i]] +=
                P[j].score.freethrow.made[i] +
                2 * P[j].score.twopointer.made[i] +
                3 * P[j].score.threepointer.made[i];
        }
    }
    // console.log(_qP);
    setQuarterPoints(_qP);
};
export const QuarterStatistics = (props) => {
    const { quarterPoints } = props;
    const sumValues = (obj) => Object.values(obj).reduce((a, b) => a + b);
    return (
        <>
            <TableContainer style={{ maxHeight: "180px" }}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell colSpan={1}>總分</TableCell>
                            <TableCell colSpan={1}>第一節</TableCell>
                            <TableCell colSpan={1}>第二節</TableCell>
                            <TableCell colSpan={1}>第三節</TableCell>
                            <TableCell colSpan={1}>第四節</TableCell>
                            <TableCell colSpan={1}>延長一</TableCell>
                            <TableCell colSpan={1}>延長二</TableCell>
                            <TableCell colSpan={1}>延長三</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{sumValues(quarterPoints)}</TableCell>
                            {Object.keys(quarterPoints).map((quarter) => {
                                return (
                                    <TableCell>
                                        {quarterPoints[quarter]}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};
