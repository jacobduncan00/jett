import { Client } from "pg";

export default async function handler(request: any, response: any) {
  const client = new Client({
    connectionString: process.env.NEXT_PUBLIC_PGURI,
    ssl: {
      rejectUnauthorized: false,
    },
  });

  try {
    await client.connect();
    let { userName, wpm, numberOfErrors, accuracy } = request.body;
    await client.query(
      `INSERT INTO leaderboard(username, wpm, errors, accuracy) VALUES ('${userName}', ${wpm}, ${numberOfErrors}, ${accuracy})`
    );
    response.status(200).send("Success");
    await client.end();
  } catch (error) {
    response.status(409).send("Failure");
  }
}
