var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var mongodb = require('mongodb');

connDb();

var usersSchema = new mongoose.Schema({
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
        
        users.find({}, function (err, docs) {
            if (!err) {
                console.log("num of item => " + docs.length)
                //for (var i = 0; i < docs.length; i++) {
                //    console.log(docs[i]);
                //}
                
                res.render('users', { docs: docs, id: req.session.user });
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

// ユーザデータ一覧
router.get('/:id', function (req, res) {
    var id = req.param('id');
    
    users.findOne({_id: mongodb.ObjectID(id)}, function (err, item) {
        if (!err) {
            console.log(item);
            res.render('useredit', { username: item.name, item: item, id: req.session.user });
        } else {
            console.log(err);
        }
    });
});

// ユーザデータ追加
router.post('/add', function (req, res) {
    var user = new users({
        name: req.body.name,
        age: req.body.age
    });

    user.save(function (err, user) {
        if (!err) {
            console.log("added " + user.name);
        } else {
            console.log(err);
        }
        res.redirect('/users');
    });
});

// ユーザデータ更新
router.post('/update', function (req, res) {
    var id = req.body.id;
    
    // 1度selectしたデータをsaveしてupdateする
    users.findOne({ _id: mongodb.ObjectID(id) }, function (err, item) {
        if (!err) {
            var name = req.body.name;
            var age = req.body.age;
            
            item.name = name;
            item.age = age;
            return item.save(function (err) {
                if (!err) {
                    console.log("updated " + name);
                } else {
                    console.log(err);
                }
                res.redirect('/users');
            });
        } else {
            console.log(err);
        }
    });
});

// ユーザデータ削除
router.get('/delete/:id', function (req, res) {
    var id = req.param('id');
    
    users.findOne({ _id: mongodb.ObjectID(id) }, function (err, item) {
        if (!err) {
            console.log(item);
            return users.remove(item, function (err) {
                if (!err) {
                    console.log("deleted");
                } else {
                    console.log(err);
                }
                res.redirect('/users');
            });
            res.render('useredit', { username: item.name, item: item, id: req.session.user });
        } else {
            console.log(err);
        }
    });
});

// mongoose接続
function connDb() {
    console.log("connDb");
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
};

// mongodbへの接続を切断
function disconnDb() {
    console.log("disconnDb");
    try {
        mongoose.disconnect()  // mongodbへの接続を切断
    } catch (e) {
        console.log(e);
    };
}

////個人取得
function getUserFromId(id) {
}

//app.get("/api/users/:_id", function(req, res) {
//users.findOne({_id: mongodb.ObjectID(req.params._id)}, function(err, item) {
//  res.send(item);
//});
//});


module.exports = router;