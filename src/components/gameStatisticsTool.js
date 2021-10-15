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
import {
    findAssist,
    findBlock,
    findFoul,
    findGameById,
    findPlayerStat,
    findPoint,
    findRebound,
    findSteal,
    findTurnover,
} from "../api";
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
export const createPlayersObject = (
    players,
    gameID,
    newNum = 0,
    playersOjbect = []
) => {
    return Promise.all(
        players.map(async (p, index) => {
            if (index >= newNum) {
                const freeThrowMade = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "freethrow",
                    made: "made",
                });
                const freeThrowsAttempt = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "freethrow",
                    made: "attempt",
                });
                const twoPointersMade = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "twopointer",
                    made: "made",
                });
                const twoPointersAttempt = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "twopointer",
                    made: "attempt",
                });
                const threePointersMade = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "threepointer",
                    made: "made",
                });
                const threePointersAttempt = await findPoint({
                    gameId: gameID,
                    playerId: p.ID,
                    pointType: "threepointer",
                    made: "attempt",
                });
                const offensiveRebound = await findRebound({
                    gameId: gameID,
                    playerId: p.ID,
                    reboundType: "offensive",
                });
                const deffensiveRebound = await findRebound({
                    gameId: gameID,
                    playerId: p.ID,
                    reboundType: "deffensive",
                });
                const assist = await findAssist({
                    gameId: gameID,
                    playerId: p.ID,
                });
                const steal = await findSteal({
                    gameId: gameID,
                    playerId: p.ID,
                });
                const foul = await findFoul({ gameId: gameID, playerId: p.ID });
                const block = await findBlock({
                    gameId: gameID,
                    playerId: p.ID,
                });
                const turnover = await findTurnover({
                    gameId: gameID,
                    playerId: p.ID,
                });
                return {
                    ID: p.ID,
                    num: p.num,
                    name: p.name,
                    score: {
                        freethrow: {
                            made: freeThrowMade.length,
                            attempt: freeThrowsAttempt.length,
                        },
                        twopointer: {
                            made: twoPointersMade.length,
                            attempt: twoPointersAttempt.length,
                        },
                        threepointer: {
                            made: threePointersMade.length,
                            attempt: threePointersAttempt.length,
                        },
                    },
                    rebound: {
                        offensive: offensiveRebound.length,
                        deffensive: deffensiveRebound.length,
                    },
                    assist: assist.length,
                    steal: steal.length,
                    foul: foul.map((f) => f.foulType),
                    block: block.length,
                    turnover: turnover.length,
                    oncourt: false,
                };
            } else return await playersOjbect[index];
        })
    );
};
export const createPlayersDisplayObject = (playersObject) => {
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
    setPlayers,
    setPlayersObject,
    setPlayersDisplayObject,
    quarterPoints,
    setQuarterPoints
) => {
    const [game] = await findGameById(gameID);
    // console.log(data);
    setOpponent(game.opponent);
    const P = await findPlayerStat({ gameId: gameID });
    // console.log(players);
    const players = P.map((p) => {
        return {
            ID: p._id,
            num: p.number,
            name: p.name,
        };
    });
    setPlayers(players);
    const po = await createPlayersObject(players, gameID);
    setPlayersObject(po);
    setPlayersDisplayObject(createPlayersDisplayObject(po));
    let _qP = quarterPoints;
    const quarters = Object.keys(quarterPoints);
    for (let i = 0; i < quarters.length; i++) {
        const freeThrowMade = await findPoint({
            gameId: gameID,
            quarter: quarters[i],
            pointType: "freethrow",
            made: "made",
        });
        const twoPointersMade = await findPoint({
            gameId: gameID,
            quarter: quarters[i],
            pointType: "twopointer",
            made: "made",
        });
        const threePointersMade = await findPoint({
            gameId: gameID,
            quarter: quarters[i],
            pointType: "threepointer",
            made: "made",
        });
        console.log(
            freeThrowMade.length,
            twoPointersMade.length,
            threePointersMade.length
        );
        _qP[quarters[i]] =
            freeThrowMade.length +
            2 * twoPointersMade.length +
            3 * threePointersMade.length;
    }
    console.log(_qP);
    setQuarterPoints(_qP);
};
export const QuarterStatistics = (props) => {
    const { quaterPoints } = props;
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
                            <TableCell>{sumValues(quaterPoints)}</TableCell>
                            {Object.keys(quaterPoints).map((quater) => {
                                return (
                                    <TableCell>
                                        {quaterPoints[quater]}
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
