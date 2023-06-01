const db = require('../../connect')
const upload = require('../../middleware/upload.multer');


module.exports =function(app) {
    app.get('/product', function(req, res){
        let sql = 'SELECT product.*, category.name as cate_name FROM product join category on category.id = product.category_id order by product.id asc'
        db.query(sql, function(err,data){
            res.render('admin/product/product',{
                data:data,
            })
        })
    })

    app.get('/delete-product/:id', function(req, res){
        let id = req.params.id
        let sql = 'DELETE FROM product WHERE id =?'
        let message =null
        db.query(sql,[id], function(err,data){
            if(err){
                message= 'Danh mục bày đang chứa sản phẩm, hiện tại chưa xóa đc =)))'
                res.render('admin/product/product-error',{
                    message,
                })
            }
            else{
                res.redirect('/product')
            }
        })
    })
    app.get('/create-product', function(req, res){
        let sql = 'select * from category '
        db.query(sql, function(err, data){
              res.render('admin/product/create-product',{
                data:data,
        })
        })
      
    })
    app.post('/create-product', upload, function (req, res) {
        let formData = req.body;
        if (req.file) {
            formData.image = req.file.filename;
        }
        let Sql = "INSERT INTO product set ?";
        db.query(Sql, [formData], function (err, data) {
            console.log(err);
            res.redirect('/product');

        })
    });

    app.get('/update-product/:id',function(req, res){
        let id = req.params.id
        let sqlCate = 'SELECT * FROM category';
        let category;
        db.query(sqlCate, function(err, dataCate){
            category=dataCate;
        })
        let sql = 'select * from product where id = ?'
        db.query(sql,[id],function(err, data){
            if(!err){
                res.render('admin/product/update-product',{
                    data:data.length > 0 ? data[0] : null,
                    listcate:category,
                })
            }
        })
    })
    app.post('/update-product/:id',upload,  function(req, res){
        let id = req.params.id
        let formData = req.body;
        if (req.file) {
            formData.image = req.file.filename;
        }
        let sql = 'update product set ? where id = ?'
        db.query(sql, [formData,id],function(err, data){
            if(!err){
                res.redirect('/product')
            }
        })
    })
    
    app.post('/product', function(req, res){
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
                res.render('admin/product/product-error-search',{
                    message ,
                })    
            }
            else{
                // res.redirect('/product')
                res.render('admin/product/product',{
                    data:data,
                    // category: cate
                })
            }
        })
    
    })
}

