import { Client } from "pg"

export default async function handler(request: any, response: any) {
  const client = new Client({
    connectionString: "postgres://fbgolzhwwbwrqi:1922e596b1bebb29210ec4430ceac80b58c3a140772d08ce6efc2a749d8ad640@ec2-23-23-88-216.compute-1.amazonaws.com:5432/d8drqrvum08iii",
    ssl: {
      rejectUnauthorized: false
    }
  });


  try {
    await client.connect();
    let { userName, wpm, numberOfErrors, accuracy } = request.body;
    const dbresponse = await client.query(`INSERT INTO leaderboard(username, wpm, errors, accuracy) VALUES ('${userName}', ${wpm}, ${numberOfErrors}, ${accuracy})`);
    response.status(200).send("Success");
    await client.end();
  } catch(error) {
    response.status(409).send("Failure");
  }
};
