var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var usersSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    name: { type: String, required: true },
    age: { type: Number, min: 0, default: 0 }
});
var users = mongoose.model('users', usersSchema);

/*
 * GET users listing.
 * 
 * Jade記法：http://qiita.com/sasaplus1/items/189560f80cf337d40fdf
 */

/* GET User list. */
router.get('/', function (req, res) {
    console.log("req.session.user=[" + req.session.user + "]");
    if ("inoue" == req.session.user) {
        mongoose.connect('mongodb://localhost:27017/users',
          // コールバックでエラー時の処理が書けるみたい。
          function (err) {
                if (err) {
                    console.log(err);
                } else {
                    console.log('connection success!');
                }
            }
        );
        
        users.find({}, function (err, docs) {
            if (!err) {
                console.log("num of item => " + docs.length)
                for (var i = 0; i < docs.length; i++) {
                    console.log(docs[i]);
                }
                
                res.render('main', { docs: docs, id: req.session.user });
                
                mongoose.disconnect()  // mongodbへの接続を切断
            } else {
                console.log("find error")
            }
        });
    } else {
        res.redirect("/");
    }
    
    /*
    users.find().toArray(function (err, items) {
        console.log(items.id);
        res.render('main', { id: req.session.user });
    });
    */
});

////個人取得
//app.get("/api/users/:_id", function(req, res) {
//users.findOne({_id: mongodb.ObjectID(req.params._id)}, function(err, item) {
//  res.send(item);
//});
//});


module.exports = router;