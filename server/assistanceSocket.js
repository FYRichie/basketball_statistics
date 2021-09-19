const GameStatistics = require("./model/statistics");

class AssistanceSocket {
    constructor(ws) {
        this.ws = null;
        this.init(ws);
    }
    init = (ws) => {
        this.ws = ws;
    };
    sendData = (data) => {
        if (this.ws) this.ws.send(JSON.stringify(data));
    };
    handleMessage = () => {
        this.ws.onmessage = async (message) => {
            const data = message.data;
            const [task, payload] = JSON.parse(data);
            switch (task) {
                case "frontendInit": {
                    await GameStatistics.find({}, (err, res) => {
                        if (err) throw err;
                        const resData = res.map((g) => ({
                            id: g.id,
                            opponent: g.opponent,
                        }));
                        this.sendData(["success", resData]);
                    });
                    break;
                }
                case "createNewGame": {
                    await GameStatistics.create({}, (err, res) => {
                        if (err) throw err;
                        this.sendData(["success", res.id]);
                    });
                    break;
                }
                case "addPlayerAndOpponent": {
                    await GameStatistics.findOneAndUpdate(
                        { id: payload.id },
                        {
                            opponent: payload.opponent,
                            players: payload.players,
                        },
                        (err, res) => {
                            if (err) throw err;
                            this.sendData(["success", res]);
                        }
                    );
                    break;
                }
                case "addStatistics": {
                    await GameStatistics.findOne({ id: payload.id }).exec(
                        async (err, res) => {
                            if (err) throw err;
                            if (res) {
                                await GameStatistics.updateOne(
                                    { id: payload.id },
                                    {
                                        statistics: [
                                            ...res.statistics,
                                            ...payload.statistics,
                                        ],
                                    },
                                    (er, re) => {
                                        if (er) throw er;
                                        this.sendData(["success", re]);
                                    }
                                );
                            }
                        }
                    );
                    break;
                }
                case "getStatisticsById": {
                    await GameStatistics.findOne(
                        { id: payload.id },
                        (err, res) => {
                            if (err) throw err;
                            this.sendData(["success", res]);
                        }
                    );
                    break;
                }
                default:
                    break;
            }
        };
    };
}

module.exports = AssistanceSocket;
