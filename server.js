var express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const serverPort = 3000

var app = express();

hbs.registerPartials( __dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + 'public'));
// declaring your public folder here makes your public assets to disrgard the middlewares, if you want to avoid this, you need to move the function above to a line after all your middleware.


app.use((req, res, next) => {
    var now = new Date().toString()
    var log = `${now}:${req.method} ${req.url}`

    console.log(log)
    fs.appendFile('server.log', log + '\n', (err) => {
        if(err) {
            console.log('Unable to append to server.log')
        }
    })

    next()
});

// app.use((req, res, next) => {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Site Under Maintenance',
//         heading: "Site Under Maintenance",
//         welcomeMessage: `We will be right back. This site is under maintenance`
//     })
// })

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase()
})

app.get('/', (req, res) => {
    res.render('index.hbs', {
        pageTitle: 'Homepage',
        welcomeMessage: `Welcome to my website`
    })
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'ABout Page'
    })
})

app.listen(serverPort, () => {
    console.log(`app running at localhost port:${serverPort}`);
})