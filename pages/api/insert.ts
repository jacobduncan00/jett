import {MongoClient} from "mongodb"
import * as dotenv from "dotenv"

dotenv.config({ path: "~/src/jett/.env.local" })

const client = new MongoClient(process.env.MONGO_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})

export default async function handler(request: any, response: any) {

  await client.connect()
  const db = client.db("jett")
  const collection = db.collection('entries')
  
  console.log("hit [POST] /leaderboard/insert");
  let { userName, wpm, numberOfErrors, accuracy } = request.body;

  console.log(userName, wpm, numberOfErrors, accuracy);

  type Entry = {
    userName: string,
    wpm: string,
    numberOfErrors: Number,
    accuracy: string
  }

  let leaderboardEntry: Entry = {userName: userName, wpm: wpm, numberOfErrors: numberOfErrors, accuracy: accuracy};

  collection.insertOne({
    leaderboardEntry
  }, () => {
    client.close()
  })

  response.status(200)
  response.end()

  
}