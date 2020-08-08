const { MongoClient } = require('mongodb')

// 1
// specify the url for connecting to the desired MongoDB instance.
// This is the default url usually available, but feel free to replace it with your own if different.
const MONGO_URL = 'mongodb://localhost:27017/MuchSkill'

// 2
module.exports = async () => {
  const db = await MongoClient.connect(MONGO_URL)
  return {
    Tools: db.collection('Tools'),
  }
}
