import { useEffect, useState, useCallback } from "react";
import axios, { AxiosError, AxiosResponse } from "axios";

const leaderboard = () => {

    const [leaderboardObj, setLeaderboardObj] = useState([]);
    useEffect(() => {
      async function fetchData() {
        try {
          const response = await fetch("/api/leaderboard");
          const setter = await response.json();
          setLeaderboardObj([...setter]);
        } catch(e) {
          console.log(e);
        }
      };
      fetchData();
    }, [leaderboardObj]);


    return(
      <div>{leaderboardObj.map((person) => {
        <h1>{person.username}</h1>
      })}</div>
    )

}

export default leaderboard;
