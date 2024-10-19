import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getPastSession } from "../../../app/adminSlice";
import Scoreboard from "../../Scoreboard";

const PreviousSession = () => {
  const { pastSessionData } = useSelector((state) => state.admin);
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!pastSessionData) {
      dispatch(getPastSession({ sessionid: id, navigate }));
    }
  }, [id]);

  if (!pastSessionData) {
    return null;
  }
  return (
    <>
      <Scoreboard
        role={"prevSession"}
        totalPlayers={pastSessionData.totalPlayers}
        leaderboardData={pastSessionData.leaderboard}
      />
    </>
  );
};

export default PreviousSession;
