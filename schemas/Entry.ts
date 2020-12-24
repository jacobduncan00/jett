import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

let EntrySchema = new Schema({
  userName: { type: String, required: true },
  wpm: { type: String, required: true },
  numberOfErrors: { type: Number, required: true }, // cant use error: {} here as mongoose doesn't like that
  accuracy: { type: String, required: true },
});

let Entry: mongoose.Model<any> = mongoose.model("Entry", EntrySchema);

export default Entry;