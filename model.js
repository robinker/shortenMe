const mongoose = require('mongoose')
const Schema = mongoose.Schema
const UrlSchema = new Schema({
    url: { type: String, trim: true, require: true },
    slug: { type: String, trim: true, lowercase: true , index: { unique: true } },
})

const UrlModel = mongoose.model('URL', UrlSchema)

module.exports = UrlModel
