import * as gen from "txtgen";

export default function handler(request: any, response: any) {
  let numSentences = request.body.numSentences;
  let paragraph = gen.paragraph(numSentences);
  console.log(`Hit /sentences endpoint with ${numSentences} being generated!`);
  response.status(200).json({
    content: paragraph,
  });
}
