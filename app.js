require("dotenv").config() // utiliza .env

const express = require("express");
const hbs = require('hbs');
const axios = require('axios');

const app = express();

//config hbs + public + partials
app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static('public'));

//config partials
hbs.registerPartials(__dirname + '/views/partials')


//routes
app.get('/', async (req, res, next) => {
    try {
        const {
            idCharacter
        } = req.params;
        const {
            data
        } = await axios.get('https://rickandmortyapi.com/api/character');
        res.render('home', {
            characters: data.results
        })
    } catch (error) {
        console.log('error', error)
        res.send("error")
        // const search = error.message
        // window.open(`https://stackoverflow.com/search?q=${search}`, '_blank')
    }
})

app.get('/single-character/:idCharacter', async (req, res, next) => {
    try {
        const {
            idCharacter
        } = req.params
        const {
            data
        } = await axios.get(`https://rickandmortyapi.com/api/character/${idCharacter}`)
        console.log('data', data)
        res.render('single', {
            character: {
                ...data,
                single: true
            }
        })
    } catch (error) {
        console.log('error', error)
        res.send("error")
    }
})

app.listen(process.env.PORT, () => {
    console.log('My project running on port 3000 🎧 🥁 🎸 🔊')
})