import { Client } from "pg"
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(request: NextApiRequest, response: NextApiResponse) {
  const client = new Client({
    connectionString:
      "postgres://fbgolzhwwbwrqi:1922e596b1bebb29210ec4430ceac80b58c3a140772d08ce6efc2a749d8ad640@ec2-23-23-88-216.compute-1.amazonaws.com:5432/d8drqrvum08iii",
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    client.connect();
    const leaderboardData = await client.query("SELECT * FROM leaderboard");
    console.log("ROWS", leaderboardData.rows);
    response.status(200).send(leaderboardData.rows);
    client.end();
  } catch (error) {
    response.status(409).send({});
  }
};
