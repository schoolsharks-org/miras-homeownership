import express from 'express';
import {createSession,closeSession,fetchSessions, getPastSessionInfo, getEmailReport} from "../../controllers/admin.controller.js"
import { getTopUsers } from '../../controllers/leaderboard.controller.js';
const router = express.Router();


router.get("/scoreboard",getTopUsers)

router.get("/fetchSessions",fetchSessions)
router.get("/getPastSession",getPastSessionInfo)
router.post("/createSession",createSession)
router.post("/closeSession",closeSession)
router.post("/getSessionReport",getEmailReport)


export default router;
