var express = require('express');
var router = express.Router();
var morgan = require('morgan');

/* GET home page. */
router.post('/', function (req, res) {
    var id = req.body.id;
    var pw = req.body.pw;
    
    console.log("User name = " + id + ", password is " + pw);

    if (id == "inoue" && pw == "keisuke") {
        // 成功時
        // セッション変数の作成
        req.session.user = id;
        // メイン画面に遷移(redirect)
        res.redirect('/users');   //送信
    } else {
        // LOGIN認証失敗時
        res.redirect('/');
    }
});

module.exports = router;