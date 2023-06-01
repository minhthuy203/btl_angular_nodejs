const db = require('../../connect')
const sessionStorage= require('node-sessionstorage')

module.exports =function(app) {
    app.get('/api/product', function(req, res){
        let sql = 'SELECT product.*, category.name as cate_name FROM product join category on category.id = product.category_id order by product.id asc'
        db.query(sql, function(err,data){
            res.send({
                result: data
              });
        })
    })

    app.delete('/api/product/:id', function(req, res){
        let id = req.params.id
        let sql = 'DELETE FROM product WHERE id =?'
        let message =null
        db.query(sql,[id], function(err,data){
            if(err){
                message= 'Danh mục bày đang chứa sản phẩm, hiện tại chưa xóa đc =)))'
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
    app.get('/api/product', function(req, res){
        let sql = 'select * from category '
        db.query(sql, function(err, data){
            res.send({
                result: data
              });
        })
      
    })
    app.post('/api/product', function(req, res){
        let data = req.body;
        let sql = 'insert into product set ?'
        db.query(sql, [data],function(err, data){
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })

    app.get('/api/product/:id', function(req, res){
        let id = req.params.id
        let sqlCate = 'SELECT * FROM category';
        let category;
        db.query(sqlCate, function(err, dataCate){
            category=dataCate;
        })
        let sql = 'select * from product where id = ?'
        db.query(sql,[id],function(err, data){
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })
    app.put('/api/product/:id', function(req, res){
        let id = req.params.id
        let data = req.body;
        let sql = 'update product set ? where id = ?'
        db.query(sql, [data,id],function(err, data){
            if(!err){
                res.send({
                    result: data
                  });
            }
        })
    })
    
    app.post('/api/product', function(req, res){
        let _name = req.body.name
        // let sqlCate = 'SELECT product.*, category.name as cate_name FROM product join category on category.id = product.category_id'
        // let cate ;
        // db.query(sqlCate, function(err,data){
        //     cate = data
        // })
        let sql = 'SELECT product.*, category.name as cate_name FROM product join category on category.id = product.category_id WHERE product.name like ?'
        let message =null
        db.query(sql,['%'+_name+'%'], function(err,data){
            if(_name == 0 ){
               message= 'vui lòng nhập từ khóa'
               res.send({
                result: data
              });
            }
            else{
                // res.redirect('/product')
                res.send({
                    result: data
                  });
            }
        })

     app.get('/api/product/:id', function(req, res){
        let id = req.params.id
        let sql = 'select * from product where id = ?'
        db.query(sql, [id],function(err, data){
            res.send({
                result: data
              });
        })
    })
    })

    app.get('/api/prodNew', function(req, res){
        db.query("SELECT p.*,c.name as dm FROM  product p JOIN category c on p.category_id = c.id ORDER BY id DESC LIMIT 3", function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.send({
                    result: data
                })
            }
        });
    
    });
    app.get('/api/prodSale', function(req, res){
        db.query("SELECT p.*,c.name as dm FROM  product p JOIN category c on p.category_id = c.id where p.sale_price >0 LIMIT 3", function(err, data){
            let message = null;
            if(err){
                message = err.sqlMessage;
            } else{
                res.send({
                    result: data
                })
            }
        });
    
    });
}