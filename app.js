const express = require('express')
const { nanoid } = require('nanoid')
const mongoose = require('mongoose')
const UrlModel = require('./model')

require('dotenv').config()

mongoose.connect(process.env.DB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
})

mongoose.connection.once('open', () => {
    console.log(`Database connected`)
})

const app = express()
const port = 1234

app.get('/:id', async (req, res) => {
    const { id: slug } = req.params
    try {
        const url = await UrlModel.findOne({ slug })
        if(!url) {
            res.status(404).json('Url not found.')
        }
        res.redirect(record.url)
    } catch (error) {
        res.status(404).json('Url not found.')
    }
})

app.post('/url', async (req, res) => {
    let { url, slug } = req.body
    try {
        if(!slug) {
            slug = nanoid(5)
        } else {
            const record = await UrlModel.findOne({ slug })
            if(record) {
                res.status(400).json('Slug in used.')
            }
        }
        const newUrl = new UrlModel({ url, slug })
        await newUrl.save()
        res.json(newUrl)
    } catch (error) {
        if(error.status) res.status(error.status)
        else res.status(500)
        res.json(error)
    }
})

app.listen(port , () => {
    console.log(`Server is starting at http://localhost:${port}`)
})
