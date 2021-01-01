import { Client } from "pg"

export default function handler(request: any, response: any) {
  const client = new Client({
    connectionString: "postgres://fbgolzhwwbwrqi:1922e596b1bebb29210ec4430ceac80b58c3a140772d08ce6efc2a749d8ad640@ec2-23-23-88-216.compute-1.amazonaws.com:5432/d8drqrvum08iii",
    ssl: {
      rejectUnauthorized: false
    }
  });


  client.connect();

  let { userName, wpm, numberOfErrors, accuracy } = request.body;


  let flag = 1 
  if (flag == 1) {
    client.query(`INSERT INTO leaderboard(username, wpm, errors, accuracy) VALUES ('${userName}', ${wpm}, ${numberOfErrors}, ${accuracy})`, async (err, res) => {
      if(err) {
        console.log("ERROR", err.stack)
        await response.status(409)
        await response.end(err.stack)
        flag = 0 
      } else {
        console.log("SUCCESS", res)
        await response.status(200)
        await response.end("Success")
      }
      client.end()
    });
  } else {
    response.status(409);
    response.end();
  }

};
