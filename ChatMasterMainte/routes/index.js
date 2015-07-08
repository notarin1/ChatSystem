var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res) {
    // Sessionチェック
    if (!req.session.user) {
//      res.render('index', { title: 'Express' });
        res.render('login', { title: 'Chat Maintenance' });    // ログイン画面(メイン画面)
    } else {
        res.redirect('/users'); // 認証時はユーザリスト画面
    }
});

module.exports = router;