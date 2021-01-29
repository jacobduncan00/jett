import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";
import { LeaderboardEntry } from "../../Types/LeaderBoardEntry";

const leaderboard = () => {
    const [leaderboardEntries, setLeaderboardEntries] = useState<LeaderboardEntry[]>([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await axios.get("/api/leaderboard");
          setLeaderboardEntries(response.data);
        } catch(e) {
          console.log(e);
        }
      };
      fetchData();
    }, []);


    return(
      <div>{leaderboardEntries.map((entry) => (
         <h1>{entry.username}</h1>
      ))}</div>
    )

}

export default leaderboard;
