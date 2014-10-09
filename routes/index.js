var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Express' });
});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    userModel.findOne({'username': username, 'password': password}, function(err, user){
        console.log(user);
        if (err){
            console.log(err);
        }

        if (user === null){
             res.json({'error_code': -4});                   
        }
        else {
            req.session.username = username;

            res.render('user_page.jade', {'username': username, 'count': user.login_count});
        }
    });
});

/*
router.get('/add_user', function(req, res) {
    var username = 'littlechun4';
    var password = 'asdf';

    var new_user = new userModel({'username': username, 'password': password, 'login_count': 0});

    new_user.save(function(err) {
        if (err) {
            console.log(err);
        }
    });

    res.write('User added');
});
*/

module.exports = router;
