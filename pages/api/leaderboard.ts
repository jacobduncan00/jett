import { Client } from "pg"

export default function handler(request: any, response: any) {
  const client = new Client({
    connectionString: "postgres://fbgolzhwwbwrqi:1922e596b1bebb29210ec4430ceac80b58c3a140772d08ce6efc2a749d8ad640@ec2-23-23-88-216.compute-1.amazonaws.com:5432/d8drqrvum08iii",
    ssl: {
      rejectUnauthorized: false
    }
  });


  client.connect();

  let flag = 1 
  if (flag == 1) {
      client.query("SELECT * FROM leaderboard", async(e, res) => {
        if (e) {
            console.log("ERROR", e.stack)
            await response.status(409)
            await response.end("failed")
            flag = 0
        } else {
            console.log("SUCCESS", res)
            await response.status(200)
            await response.end(res.rows)
        }
        client.end()
      });
  } else {
    response.status(409);
    response.end();
  }

};
