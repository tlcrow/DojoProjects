var registrations = require('../controllers/registration.js');
var question = require('../controllers/question.js');
var answer = require('../controllers/answer.js')
let path = require('path')

module.exports = function(app){
    app.post('/api/registration', registrations.create);
    app.post('/api/login', registrations.login);
    app.get('/api/logout', registrations.logout);
    app.get('/api/user', registrations.getUser);
    app.post('/api/question/new', question.create);
    app.post('/api/answer/new/:id', answer.create);
    app.get('/api/question/:id', question.getOne);
    app.get('/api/answer/:id', answer.getOne);
    app.get('/api/questions', question.getAll);
    app.get('/api/answers', answer.getAll);
    // app.put('/api/update/:id', question.update);
    app.get('/api/likes/:id', answer.update);
    app.all('*', (req, res)=>{
        res.sendFile(path.resolve('./public/dist/index.html'))
    })

}