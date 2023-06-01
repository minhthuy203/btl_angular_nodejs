const mysql = require('mysql');
const db =mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password:'',
    database: 'btl_nodejs_t'
});

db.connect(function(err) {
    if (err) throw new Error('Kết nối database thất bại');
})
module.exports= db;