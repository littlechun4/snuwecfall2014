var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.user === undefined || req.session.user === null) {
        console.log(req.session.user);
        res.render('index', { title: 'Express' });
    }
    else {
        var user = req.session.user;

        res.render('user_page', {'username': user.username, 'count': user.login_count});
    }
});

router.post('/login', function(req, res) {
    var username = req.body.username;
    var password = req.body.userpassword;

    userModel.findOne({'username': username, 'password': password}, function(err, user){
        if (err){
            console.log(err);
        }

        if (user === null){
             res.json({'error_code': -4});                   
        }
        else {
            user.login_count += 1;
            user.save(function(err) {
                if (err) {
                    console.log(err);
                }
            });
            
            session_user = {'username': user.username, 'login_count': user.login_count};
            req.session.user = session_user;

            res.render('user_page.jade', {'username': session_user.username, 'count': session_user.login_count});
        }
    });
});

router.get('/logout', function(req, res) {
    req.session.user = undefined;
    
    res.redirect('/');
});

/*
router.get('/add_user', function(req, res) {
    var username = 'littlechun4';
    var password = 'asdf';

    var new_user = new userModel({'username': username, 'password': password, 'login_count': 0});

    new_user.save(function(err) {
        if (err) {
            console.log(err);
            res.send('error');
        }
    });

    res.send('User added');
});
*/

module.exports = router;
