var express = require('express');
var router = express.Router();

/* GET home page. */
router.post('/', function (req, res) {
    delete req.session.user;
    console.log('deleted sesstion');
    res.redirect('/');
});

module.exports = router;