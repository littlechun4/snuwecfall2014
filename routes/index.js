var express = require('express');
var router = express.Router();
var userModel = require('../models/user')

/* GET home page. */
router.get('/', function(req, res) {
    if (req.session.user === undefined || req.session.user === null) {
        res.render('index', { title: 'Express' });
    }
    else {
        var user = req.session.user;

        res.render('user_page', req.session.user);
    }
});

router.post('/login', function(req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (req.session.user === undefined) {
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
                
                session_user = {'user_name': user.username, 'login_count': user.login_count};
                req.session.user = session_user;

                res.json(req.session.user);
            }
        });
    }
    else {
        res.redirect('/');
    }
});

router.post('/signup', function(req, res) {
    var username = req.param('username');
    var password = req.param('password');

    if (req.session.user === undefined) {
        if (username.length < 5 || username.length > 20) {
            res.json({'error_code': -1});
        }
        else if (password.length < 8 || password.length > 20) {
            res.json({'error_code': -2});
        }
        else {
            userModel.findOne({'username': username}, function(err, user) {
                if (user !== null){
                    res.json({'error_code': -3});
                }
                else {
                    var new_user = new userModel({'username': username, 'password': password, 'login_count': 0});

                    new_user.save(function (err) {
                        if (err) {
                            console.log(err);
                        }
                    });
                    
                    new_user.login_count += 1;
                    new_user.save(function (err) {});

                    req.session.user = {'user_name': new_user.username, 'login_count': new_user.login_count};

                    res.json(req.session.user);
                }
            }); 
        }
    }
    else {
        res.redirect('/');
    }
});


router.post('/logout', function(req, res) {
    req.session.user = undefined;
    res.send();
});


router.post('/clearData', function(req, res) {
    userModel.remove({}, function () {});
    res.redirect('/');
});

module.exports = router;
