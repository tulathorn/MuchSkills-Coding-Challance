const mongoose = require('mongoose')
const ToolsModel = require('../model/tools')

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost/test', { useNewUrlParser: true, useFindAndModify: false })

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))
db.once('open', function () {
  // we're connected!
  console.log('database connected')
})

const resolvers = {
  Query: {
    newTools: async () => {
      const data = await ToolsModel.find().then((data) => data)
      return data
    },
    tool: async (parent, args) => {
      console.log(args)
      const data = await ToolsModel.findOne({ _id: args._id }).then((data) => data)
      return data
    },
  },
  Mutation: {
    addNewTool: async (parent, args) => {
      console.log('root', parent)
      console.log('data', args)
      const result = await ToolsModel.create(args).then((data) => data)
      return [result]
    },
    updateNewTool: async (parent, args) => {
      console.log('update call')
      console.log('parent', parent)
      console.log('data', args)
      const result = await ToolsModel.findOneAndUpdate({ _id: args._id }, { ...args }).then(
        (data) => data
      )
      console.log('result', result)
      return result
    },
    deleteNewTool: async (parent, args) => {
      const id = args._id
      const result = await ToolsModel.deleteOne({ _id: id }).then((data) => data)
      return await ToolsModel.find().then((data) => data)
    },
  },
}

module.exports = resolvers
