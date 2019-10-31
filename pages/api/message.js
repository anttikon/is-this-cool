import { getUsers, postMessage } from '../../integrations/slack'
import { getAnswerByUser, setAnswer } from '../../integrations/gcp'

export default async function handle(req, res) {
  const { displayName } = req.query
  if (!displayName || !displayName.length) {
    res.statusCode = 400
    return res.send('displayName is required query parameter')
  }

  const answerByUser = await getAnswerByUser(displayName)
  if (answerByUser && answerByUser.answer === 'pending') {
    res.statusCode = 400
    return res.send('plz no flooding :(')
  }

  try {
    const users = await getUsers()
    const user = users.find(
      user =>
        user.profile.display_name.toLowerCase() === displayName.toLowerCase()
    )
    if (!user) {
      res.statusCode = 404
      return res.send('Cannot find user with given username')
    }
    await setAnswer(user.id, user.profile.display_name.toLowerCase(), 'pending')
    await postMessage(user.id)
    res.json({ success: true })
  } catch (e) {
    console.error(e)
    res.statusCode = 500
    return res.send('')
  }
}
