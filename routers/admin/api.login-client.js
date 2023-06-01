const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports = function (app) {
    app.post('/api/login-client',function(req, res) {
        let sql = 'SELECT * FROM account where email=? AND password=? and role = "customer"'
        db.query(sql,[req.body.email, req.body.password] ,function(err, data){
            res.send({
                result: data.length ? data[0] : null
              });
        })
    })
    app.post('/api/register',function(req, res) {
        let sql = 'insert into account set ?'
        let formData = req.body
        db.query(sql, [formData], function (err, data) {
            if (err) {
                res.send({
                    result: err.sqlMessage,
                    status: false
                })
            } else{ 
                res.send({
                    result: "Đăng ký thành công",
                    status: true
                })
            }
            
        })
    })
    app.get('/api/logout', function (req, res) {
        sessionStorage.removeItem('admin-login');
        res.send({
            result: data
          });
    })
 
    
}