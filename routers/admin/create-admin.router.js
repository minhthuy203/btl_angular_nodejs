const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports =function(app) {
    app.get('/create_admin', function(req, res){
        res.render('admin/account/account',{
        })
    })
    app.get('/account', function(req, res){
        res.render('admin/account/account',{
        })
    })
    app.get('/create-account', function(req, res){
        res.render('admin/account/create-account',{
        })
    })
    app.post('/create-account',function(req,res){
        let from_data = req.body
        let sql = 'insert into account set ?'
        db.query(sql,[from_data],function(err,data){
            if (!err) {
                res.redirect('/view-account')
                }else{
                 console.log(err)
    
                }
    
        })
    
     })
     app.get('/view-account', function(req, res){
        let sql = 'SELECT * FROM account where role ="admin"'
        db.query(sql, function(err,data){
            res.render('admin/account/view-account',{
                data:data,

            })
        })
    })


    app.get('/delete-account/:id', function(req, res){
        let id = req.params.id
        let sql = 'DELETE FROM account WHERE id =?'
        let message =null
        db.query(sql,[id], function(err,data){
            if(err){
                message= 'Danh mục bày đang chứa sản phẩm, hiện tại chưa xóa đc =)))'
                res.render('admin/account/create-admin-error',{message})
            }
            else{
                res.redirect('/view-account')
            }
        })
    })
   
    // app.post('/create-account', function(req, res){
    //     let formData = req.body;
    //     let sql = 'insert into account set ?'
    //     db.query(sql, [formData],function(err, data){
    //         if(!err){
    //             res.redirect('/create-admin')
    //         }
    //     })
    // })
    app.get('/update-account/:id', function(req, res){
        let id = req.params.id
        let sql = 'select * from account where id = ?'
        db.query(sql,[id],function(err, data){
            if(!err){
                res.render('admin/account/update-account',{
                    data:data.length > 0 ? data[0] : null,

                })
            }
        })
    })
    app.post('/update-account/:id', function(req, res){
        let id = req.params.id
        let formData = req.body;
        let sql = 'update account set ? where id = ?'
        db.query(sql, [formData,id],function(err, data){
            if(!err){
                res.redirect('/view-account')
            }
        })
    })

}