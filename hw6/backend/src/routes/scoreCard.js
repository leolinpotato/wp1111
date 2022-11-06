import { Router } from "express";
import ScoreCard from "../models/ScoreCard";

const router = Router();
router.delete("/cards", async(_, res) => {
    try {
      await ScoreCard.deleteMany({});
      console.log("Database deleted");
    } catch (error) { throw new Error("Database deletion failed"); }
    res.json({ message: "Database cleared" });
});
router.post("/card", async(req, res) => {
    let name = req.body.name;
    let subject = req.body.subject;
    let score = req.body.score;
    const existing = await ScoreCard.findOne({ name: name, subject: subject });
    let msg;
    if (existing) {
        try {
            await ScoreCard.deleteOne({ name: name, subject: subject});
            msg = `Update (${name}, ${subject}, ${score})`;
        } catch (error) { throw new Error("User deletion error: " + error); }
    }
    else msg = `Adding (${name}, ${subject}, ${score})`;
    try {
        const newScoreCard = new ScoreCard({ name, subject, score });
        console.log("Created ScoreCard", newScoreCard);
        newScoreCard.save();
        res.json({ card: newScoreCard, message: msg });
    } catch (error) { throw new Error("User creation error: " + error); } 
});
router.get("/cards", async(req, res) => {
    let type = req.query.type;
    let queryString = req.query.queryString;
    let errMsg;
    let msg = [];
    let list;
    if (type === "name")
        list = await ScoreCard.find({ name: queryString });
    else
        list = await ScoreCard.find({ subject: queryString });

    if (Object.keys(list).length == 0) {
        errMsg = `${type === "name" ? "Name" : "Subject"} (${queryString}) not found!`;
        msg = undefined;
    }
    else {
        for (let i = 0; i < Object.keys(list).length; i++) 
            msg.push(`Found card with ${type === "name" ? "name" : "subject"}: (${list[i].name}, ${list[i].subject}, ${list[i].score})`);
    }
    console.log(msg);
    res.json({ message: errMsg, messages: msg });
});
export default router;
 