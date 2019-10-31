import fetch from 'isomorphic-unfetch'
import { setAnswer } from '../../integrations/gcp'

const responseToUser = (responseUrl, text) =>
  fetch(responseUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({ text })
  })

export default async function handle(req, res) {
  if (!req.body.payload) {
    res.statusCode = 400
    return res.send('Payload is required')
  }

  const json = JSON.parse(req.body.payload)
  const answer = json.actions[0].value
  const { id, username } = json.user
  const responseUrl = json.response_url

  setAnswer(id, username, answer)
    .then(() => responseToUser(responseUrl, `Your response was: ${answer}`))
    .catch(e => {
      console.error(e)
      return responseToUser(
        responseUrl,
        'Cannot process your answer! :( Please try again!'
      )
    })

  res.json({ success: true })
}
