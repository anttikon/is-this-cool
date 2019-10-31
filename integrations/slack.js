import fetch from 'isomorphic-unfetch'
import { URLSearchParams } from 'url'
import NodeCache from 'node-cache'

const myCache = new NodeCache()
const SLACK_USERS_LIST_URL = 'https://slack.com/api/users.list'
const fetchUsers = async () => {
  const params = new URLSearchParams()
  params.append('token', process.env.SLACK_TOKEN)
  const response = await fetch(SLACK_USERS_LIST_URL, {
    method: 'POST',
    body: params
  })

  if (response.status !== 200) {
    throw new Error(`Slack response: ${response.status}`)
  }

  const json = await response.json()
  if (!json.ok) {
    throw new Error('Slack response NOT OK')
  }

  return json.members
}

export const getUsers = async () => {
  const cachedUsers = myCache.get(SLACK_USERS_LIST_URL)
  if (cachedUsers) {
    return cachedUsers
  } else {
    const users = await fetchUsers()
    myCache.set(SLACK_USERS_LIST_URL, users, 60)
    return users
  }
}

const questionText = 'Is pair programming cool?'
const sendMessageBlocks = [
  {
    type: 'section',
    text: {
      type: 'mrkdwn',
      text: questionText
    }
  },
  {
    type: 'actions',
    block_id: 'buttons',
    elements: [
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'Yes!'
        },
        value: 'Yes!'
      },
      {
        type: 'button',
        text: {
          type: 'plain_text',
          text: 'No!'
        },
        value: 'No!'
      }
    ]
  }
]

export const postMessage = userId => {
  const params = new URLSearchParams()
  params.append('token', process.env.SLACK_TOKEN)
  params.append('channel', userId)
  params.append('text', questionText)
  params.append('as_user', true)
  params.append('blocks', JSON.stringify(sendMessageBlocks))
  return fetch('https://slack.com/api/chat.postMessage', {
    method: 'POST',
    body: params
  }).then(res => res.json())
}
