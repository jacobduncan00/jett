import { Client } from "pg";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  request: NextApiRequest,
  response: NextApiResponse
) {
  const client = new Client({
    connectionString: process.env.NEXT_PUBLIC_PGURI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    const leaderboardData = await client.query("SELECT * FROM leaderboard");
    response.status(200).send(leaderboardData.rows);
    await client.end();
  } catch (error) {
    response.status(409).send({});
  }
}
