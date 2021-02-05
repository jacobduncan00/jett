import { useEffect, useState } from "react";
import axios from "axios";
import { LeaderboardEntry } from "../../types/LeaderBoardEntry";
import LeaderboardCard from "../../components/leaderboard-card/index";

const leaderboard = () => {
  const [leaderboardEntries, setLeaderboardEntries] = useState<
    LeaderboardEntry[]
  >([]);

  const [pos, setPosition] = useState(1);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("/api/leaderboard");
        response.data.forEach((entry: LeaderboardEntry) => {
          entry.position = pos;
          console.log(entry.position);
          setPosition(pos + 1);
        });
        setLeaderboardEntries(
          response.data.sort(function (
            a: LeaderboardEntry,
            b: LeaderboardEntry
          ) {
            // b - a = descending
            // a -b = ascending
            return b.wpm - a.wpm;
          })
        );
      } catch (e) {
        console.log(e);
      }
    }
    fetchData();
  }, []);

  return (
    <div>
      <h1 className="leaderboard-header">Leaderboard</h1>
      {leaderboardEntries.map((entry) => (
        <LeaderboardCard
          key={Math.random().toString(36).substr(2, 9)} // random key to make error go away TODO: Better way of doing this
          className="color: red;"
          position={entry.position}
          username={entry.username}
          wpm={entry.wpm}
          errors={entry.errors}
          accuracy={entry.accuracy}
        />
      ))}
    </div>
  );
};

export default leaderboard;
