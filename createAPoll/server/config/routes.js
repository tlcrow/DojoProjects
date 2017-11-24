var registrations = require('../controllers/registration.js');
var poll = require('../controllers/poll.js');
let path = require('path')

module.exports = function(app){
    app.post('/api/registration', registrations.create);

    app.post('/api/login', registrations.login);
    app.get('/api/logout', registrations.logout);
    app.get('/api/user', registrations.getUser)
    app.post('/api/poll/new', poll.create);
    app.get('/api/poll/:id', poll.getPoll);
    app.delete('/api/poll/:id', poll.delete);
    app.get('/api/polls', poll.getAll);
    // app.get('/api/poll/:id', poll.update);
    app.get('/api/contacts/:id', registrations.contactUser)
    app.get('/api/one/:id', poll.updateOne);
    app.get('/api/two/:id', poll.updateTwo);
    app.get('/api/three/:id', poll.updateThree);
    app.get('/api/four/:id', poll.updateFour);
    app.all('*', (req, res)=>{
        res.sendFile(path.resolve('./public/dist/index.html'))
    })

}