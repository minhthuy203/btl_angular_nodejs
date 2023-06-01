const express = require('express');
const ejs = require('ejs');
const bodyParser = require('body-parser');
const db = require('./connect')
const cors = require('cors');
const corsOptions = {
    origin: '*',
    credentials: true,
    optionSuccessStatus: 200,
};
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'))
app.use(cors(corsOptions));

// api 
// app.use(require('./middleware/control-allow'));

require('./routers/admin/api.category')(app)
require('./routers/admin/api.product')(app)
require('./routers/admin/api.favorite')(app)
require('./routers/admin/api.account')(app)
require('./routers/admin/login.router')(app)

// require('./routers/admin/api.login-client')(app)
app.use(require('./middleware/admin'));
require('./routers/admin/main.router')(app)
require('./routers/admin/category.router')(app)
require('./routers/admin/product.router')(app)
require('./routers/admin/create-admin.router')(app)

app.listen(4000)