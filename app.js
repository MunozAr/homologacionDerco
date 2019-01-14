var express = require('express')
var path = require('path')
var logger = require('morgan')
var bodyParser = require('body-parser')
var brand = require('./routes/brand')
var client = require('./routes/client')
var report = require('./routes/report')
var csv = require('./routes/csv')
var client_add = require('./routes/client')
var clients = require('./routes/clients')
var office = require('./routes/office')
var clients_brands = require('./routes/clients_brands')
var offices_brands = require('./routes/offices_brands')
var contact = require('./routes/contact')
var users = require('./routes/users')
var testdrive = require('./routes/testdrive')
var auth = require('./routes/auth')
var mongoose = require('mongoose')
const cors = require('cors')

mongoose.connect('mongodb://derco:...seasons@159.65.38.71:27017/derco', { useNewUrlParser: true })
.then(() =>  console.log('connection succesful'))
.catch((err) => console.error(err))

var app = express()
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({'extended':'false'}))
app.use(express.static(path.join(__dirname, 'dist')))
app.use('/clients', clients)
app.use('/login', express.static(path.join(__dirname, 'dist')))
app.use('/register', express.static(path.join(__dirname, 'dist')))
app.use('/show-client/:id', express.static(path.join(__dirname, 'dist')))
app.use('/show-brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/edit-client/:id', express.static(path.join(__dirname, 'dist')))
app.use('/edit-brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/add-client', express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-brands', express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-brands/:brand', express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-brands/:brand/page/:page', express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-brands/:brand/client/show/:id', express .static(path.join(__dirname, 'dist')))
app.use('/clients-by-brands/:brand/client/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/clients-brands', clients_brands)
app.use('/offices-brands', offices_brands)
app.use('/office',  office)
app.use('/clients-by-offices/',  express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-offices/brand/:slug',  express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-offices/office/show/:id',  express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-offices/office/edit/:id',  express.static(path.join(__dirname, 'dist')))
app.use('/clients-by-offices/office/add/:slug',  express.static(path.join(__dirname, 'dist')))
app.use('/client', client)
app.use('/contact', contact)
app.use('/testdrive', testdrive)
app.use('/clients-list', express.static(path.join(__dirname, 'dist')))
app.use('/brand', brand)
app.use('/brands', express.static(path.join(__dirname, 'dist')))
app.use('/brands/brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/brands/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/brands/add', express.static(path.join(__dirname, 'dist')))
app.use('/contacts', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/admin', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/admin/:brand', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/admin/:brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/admin/edit/:brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/:brand', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/admin/:brand', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/admin/:brand/:id', express.static(path.join(__dirname, 'dist')))
app.use('/users-list', express.static(path.join(__dirname, 'dist')))
app.use('/users-list/user/:id', express.static(path.join(__dirname, 'dist')))
app.use('/users-list/user/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/client/supervisor', express.static(path.join(__dirname, 'dist')))
app.use('/client/supervisor/page/:page', express.static(path.join(__dirname, 'dist')))
app.use('/client/supervisor/show/:id', express.static(path.join(__dirname, 'dist')))
app.use('/client/supervisor/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/offices/supervisor', express.static(path.join(__dirname, 'dist')))
app.use('/offices/supervisor/show/:id', express.static(path.join(__dirname, 'dist')))
app.use('/offices/supervisor/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/supervisor', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/supervisor/show/:id', express.static(path.join(__dirname, 'dist')))
app.use('/contacts/supervisor/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/supervisor/add', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/supervisor/show/:id', express.static(path.join(__dirname, 'dist')))
app.use('/testdrives/supervisor/edit/:id', express.static(path.join(__dirname, 'dist')))
app.use('/client/add', client_add)
app.use('/api/auth', auth)
app.use('/api/users', users)
app.use('/csv', csv)
app.use('/report', report)
app.use(cors())
app.set('json spaces', 4);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found')
  err.status = 404
  next(err)
})

// restful api error handler
app.use(function(err, req, res, next) {
  console.log(err)

  if (req.app.get('env') !== 'development') {
      delete err.stack
  }

	res.status(err.statusCode || 500).json(err)
})

module.exports = app
