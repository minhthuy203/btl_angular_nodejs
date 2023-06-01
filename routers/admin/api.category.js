const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports =function(app) {
    app.get('/api/category', function(req, res){
        let sql = 'SELECT * FROM category where status =1'
        db.query(sql, function(err,data){
            let name = sessionStorage.getItem('admin-login');
            res.send({
                result: data
              });
        })
    })

    app.post('/api/category', function(req, res){
        let _name = req.body.name
        let sql = 'SELECT * FROM category WHERE name like ?'
        let message =null
        db.query(sql,['%'+_name+'%'], function(err,data){
            let name = sessionStorage.getItem('admin-login');
            if(_name == 0 ){
               message= 'vui lòng nhập từ khóa'
               res.send({
                result: data
              });
                // res.redirect('/category')
            }
            else{
                res.send({
                    result: data
                  });
            }
        })

    })

    app.get('/api/category/:id', function(req, res){
        let id = req.params.id
        let sql = 'DELETE FROM category WHERE id =?'
        let message =null
        db.query(sql,[id], function(err,data){
            if(err){
                res.send({
                    result: data
                  });
            }
            else{
                res.send({
                    result: data
                  });
            }
        })
    })
    app.get('/api/category', function(req, res){
        let name = sessionStorage.getItem('admin-login');
        res.send({
            result: data
          });
    })
    app.post('/api/category', function(req, res){
        let data = req.body;
        let sql = 'insert into category set ?'
        db.query(sql, [data],function(err, data){
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })
    app.get('/api/category/:id', function(req, res){
        let id = req.params.id
        let sql = 'select * from category where id = ?'
        db.query(sql,[id],function(err, data){
        let name = sessionStorage.getItem('admin-login');
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })
    app.post('/api/category/:id', function(req, res){
        let id = req.params.id
        let data = req.body;
        let sql = 'update category set ? where id = ?'
        db.query(sql, [data,id],function(err, data){
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })
 

    app.get('/api/product_by_category/:id', function(req, res){
        let id = req.params.id
        let sql = 'SELECT * FROM product where category_id =?'
        db.query(sql,[id], function(err,data){
            let name = sessionStorage.getItem('admin-login');
            res.send({
                result: data
              });
        })
    })
}
