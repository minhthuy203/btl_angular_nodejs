const db = require("../../connect")

module.exports = function(server) {
    server.get('/api/favorite', function(req, res) {
        db.query("SELECT * FROM favourite", function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.get('/api/favorite/:acc_id', function(req, res) {
        let acc_id = req.params.acc_id;
        let sql = "SELECT f.*,p.* FROM favourite f join product  p on f.product_id = p.id WHERE f.account_id = ?";
        db.query(sql, [acc_id], function(err, data) {
            res.send({
                result: data
            })
        })
    });
    server.post('/api/favorite', function(req, res) {
        let formData = req.body;
        console.log(formData)
    
        console.log(formData.account_id)
        let sql = "SELECT * FROM favourite WHERE account_id = ? AND product_id = ?"
        db.query(sql, [formData.account_id,formData.product_id], function(err, data) {
            console.log(data)
            if ( data.length > 0) {
                let sql1 = "DELETE FROM favourite WHERE account_id = ? AND product_id = ?";
                db.query(sql1, [formData.account_id,formData.product_id], function(err, data) {
                    res.send({
                        result: 'Bỏ yêu thích thành công'
                    })
                })
            } else {
                let sql = "INSERT INTO favourite SET ?";
                db.query(sql, [formData], function(err, data) {
                    console.log(err)
                    res.send({
                        result: 'yêu thích thành công'
                    })
                })
            }
        })
    });
    server.delete('/api/favorite/:acc_id/:pro_id', function(req, res) {
        let sql1 = "DELETE FROM favourite WHERE account_id = ? AND product_id = ?";
        db.query(sql1, [req.params.acc_id, req.params.pro_id], function(err, data) {
            res.send({
                result: 'bỏ thích thành công'
            })
        })
    });
    server.get('/api/favorite/:acc_id/:pro_id', function(req, res) {
        let id = req.params.id;
        let sql1 = "select * FROM favourite WHERE account_id = ? AND product_id = ?";
        db.query(sql1, [req.params.acc_id, req.params.pro_id], function(err, data) {
            res.send({
                result: data.length >0 ? true :false
            })
        })
    });
}