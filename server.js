const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', ()=> {
    return new Date().getFullYear()
});
hbs.registerHelper('screamIt', (text)=> {
    return text.toUpperCase();
});

app.set('view engine', 'hbs');

app.use((req, res, next)=> {
    var now = new Date().toString();
    var log = `${now}: ${req.method}: ${req.url}`;
    console.log(`${log}`);
    fs.appendFile('server.log', log + '\n');
    next();
});

// app.use((req, res, next)=> {
//     res.render('maintenance.hbs', {
//         pageTitle: 'Maintenance Page',
//         maintenanceMsg: 'Sorry the page is currently down for Maintenance!!',
//         descriptionMsg: 'We will be back soon, try again in an hour!!'
//     });
//     next();
// });

app.use(express.static(__dirname + '/public'));

app.get('/', (req, res)=> {
    // res.send('<h1>Hello from Express</h1>');
    res.render('home.hbs',{
        name: 'Jason',
        type: 'json',
        pageTitle: 'Welcome Page',
        likes: [
            'walking', 'programming', 'beer'
        ],
        welcomeMsg: 'Hello visitor\'s moustache welcome to my node site yay !!!'
    });

});

app.get('/about', (req, res)=> {
    // res.send('About Page');
    res.render('about.hbs', {
        pageTitle: 'About Page'
    });
});

app.get('/bad', (req, res)=> {
    res.send({
        errorMessage: 'Error handling request'
    });
});

app.listen(port, ()=> {
    console.log(`Server is up on port ${port}`);
});