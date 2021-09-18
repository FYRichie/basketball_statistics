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
            options: [
                {
                    way: "罰球",
                    score: 1,
                },
                {
                    way: "兩分",
                    score: 2,
                },
                {
                    way: "三分",
                    score: 3,
                },
            ],
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
        },
    ],
};

export default data;
