const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports = function (app) {
    app.get('/', function(req, res) {
        res.render('admin/main',{
        })
    })
    app.get('/logout', function (req, res) {
        sessionStorage.removeItem('admin-login');
        res.redirect('/login');
    })
}