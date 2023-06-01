const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports =function(app) {
    app.get('/category', function(req, res){
        let sql = 'SELECT * FROM category'
        db.query(sql, function(err,data){
            res.render('admin/category/category',{
                data:data,
            })
        })
    })

    app.post('/category', function(req, res){
        let _name = req.body.name
        let sql = 'SELECT * FROM category WHERE name like ?'
        let message =null
        db.query(sql,['%'+_name+'%'], function(err,data){
            if(_name == 0 ){
               message= 'vui lòng nhập từ khóa'
                res.render('admin/category/category-error-search',{
                    message ,
                })    
                // res.redirect('/category')
            }
            else{
                res.render('admin/category/category',{
                    data:data,
                })
            }
        })

    })

    app.get('/delete-category/:id', function(req, res){
        let id = req.params.id
        let sql = 'DELETE FROM category WHERE id =?'
        let message =null
        db.query(sql,[id], function(err,data){
            if(err){
                message= 'Danh mục bày đang chứa sản phẩm, hiện tại chưa xóa đc =)))'
                res.render('admin/category/category-error',{message})
            }
            else{
                res.redirect('/category')
            }
        })
    })
    app.get('/create-category', function(req, res){
        res.render('admin/category/create-category',{
        })
    })
    app.post('/create-category', function(req, res){
        let formData = req.body;
        let sql = 'insert into category set ?'
        db.query(sql, [formData],function(err, data){
            if(!err){
                res.redirect('/category')
            }
        })
    })
    app.get('/update-category/:id', function(req, res){
        let id = req.params.id
        let sql = 'select * from category where id = ?'
        db.query(sql,[id],function(err, data){
            if(!err){
                res.render('admin/category/update-category',{
                    data:data.length > 0 ? data[0] : null,
                })
            }
        })
    })
    app.post('/update-category/:id', function(req, res){
        let id = req.params.id
        let formData = req.body;
        let sql = 'update category set ? where id = ?'
        db.query(sql, [formData,id],function(err, data){
            if(!err){
                res.redirect('/category')
            }
        })
    })
 

    
}
