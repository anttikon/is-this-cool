import { Firestore } from '@google-cloud/firestore'
const firestore = new Firestore()

const mapAnswers = snapshot => {
  const documents = []
  if (!snapshot.empty) {
    snapshot.forEach(doc => {
      documents.push({ id: doc.id, ...doc.data() })
    })
  }
  return documents
}

export const getAnswerByUser = async username => {
  const snapshot = await firestore
    .collection('answers')
    .where('username', '==', username)
    .get()
  return mapAnswers(snapshot)[0]
}

export const setAnswer = (id, username, answer) =>
  firestore
    .collection('answers')
    .doc(id)
    .set({
      username,
      answer
    })
