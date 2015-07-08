var express = require('express');
var router = express.Router();

/* GET users listing. */
/**
 * 引数付き：idとpassという引数指定の場合
 */
router.get('/', function (req, res) {
    var id = req.params.id;
    var pass = req.params.pass;
    res.send('id=' + id + " pass=" + pass);
});


module.exports = router;