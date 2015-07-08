var express = require('express');
var router = express.Router();

/* GET users listing. */
/**
 * 引数付き：idとpassという引数指定の場合
 */
router.get('/:id', function (req, res) {
    var id = req.param('id');
    res.send('id=' + id);
});

module.exports = router;