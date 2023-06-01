const sessionStorage= require('node-sessionstorage')
module.exports=function(req, res, next) {
    let check = sessionStorage.getItem('admin-login')
    res.locals.userName=check
    console.log(check);
    if (check) {
        next();
    } else{
        res.redirect('/login')
    }
}