const mongoose = require('mongoose')

// const schema = new mongoose.Schema({
//   name: String,
//   departments: [{ name: String }],
// })

const schema = new mongoose.Schema({
  name: String,
  isDev: Boolean,
  isDesign: Boolean,
  isBusiness: Boolean,
  isOperation: Boolean,
})

const Tools = new mongoose.model('tools', schema, 'tools')

module.exports = Tools
