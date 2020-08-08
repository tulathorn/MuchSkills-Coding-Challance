const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  name: String,
  departments: [{ name: String }],
})

const Tools = new mongoose.model('tools', schema, 'tools')

module.exports = Tools
