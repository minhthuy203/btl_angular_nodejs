const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports = function (app) {
    app.get('/login',function(req, res) {
        res.render('admin/login/login',{
            message:null, 
        })
    })
    app.post('/login',function(req, res) {
        let sql = 'SELECT * FROM account where email=? AND password=?'
        let message = null
        // console.log(db.query(sql));
        db.query(sql,[req.body.email, req.body.password] ,function(err, data){
            // console.log(req.body.email, req.body.password);
            if(!err && data.length > 0){
                if(data[0].role != 'admin'){
                    res.render('admin/login/login',{
                        message:'Bạn không có quyền vào trang này',
                    })
                }
                else{
                    sessionStorage.setItem('admin-login', data[0].name)
                    res.redirect('/')
                }
            }
            else{
                res.render('admin/login/login',{
                    message:'Thông tin tài khoản không chính xác',
                    data: data
                })
            }
        })
    })
    
 
    
}