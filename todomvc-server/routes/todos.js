var express = require('express');
var router = express.Router();

var db = require('mysql').createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'angular2_todomvc'
});

db.connect();

router.post('/', function(req, res, next) {
    var sql = 'select * from todos';
    var filter = req.body && req.body.filter;
    if(filter === 'completed') {
        sql += ' where todos.completed == 1'
    }else if(filter === 'active') {
        sql += ' where todo.completed == 0'
    }
    db.query(sql, function(error, result) {
        if(error) {
            res.send({ success: false, data: error })
        } else {
            res.send({ success: true, data: result })
        }
    })
});

router.post('/add', function(req, res, next) {
    var sql = 'insert into todos(`desc`, `completed`) values(?, ?)';
    var sqlParams = [req.body.desc, req.body.completed];

    db.query(sql, sqlParams, function(error, result) {
        if(error) {
            res.send({ success: false, data: error });
        }else {
            res.send({ success: true, data: { id: result.insertId }})
        }
    })
    
});

router.post('/toggle', function(req, res, next) {
    var sql = 'update todos set completed=? where id=?';
    var todo = req.body.todo;
    todo.completed = (todo.completed + 1) % 2;

    db.query(sql, [todo.completed, todo.id], function(error, result) {
        if(error) {
            res.send({ success: false, data: error })
        }else {
            res.send({ success: true, data: todo })
        }
    })
})

router.post('/remove', function(req, res, next) {
    var sql = 'delete from todos where id=?';
    var todo = req.body.todo;

    db.query(sql, [todo.id], function(error) {
        console.log(arguments)
        if(error) {
            res.send({ success: false, data: error })
        }else {
            res.send({ success: true, data: todo })
        }
    })
})

router.post('/modify', function(req, res, next) {
    var sql = 'update todos set `desc`=? where id=?';
    var todo = req.body.todo;

    db.query(sql, [todo.desc, todo.id], function(error) {
        console.log(arguments)
        if(error) {
            res.send({ success: false, data: error })
        }else {
            res.send({ success: true, data: todo })
        }
    })
})

router.get('/toggleAll', function(req, res, next) {
    var sql = 'update todos set completed=mod(completed + 1, 2)';
    
    db.query(sql, function(error) {
        console.log(arguments)
        if(error) {
            res.send({ success: false, data: error })
        }else {
            res.send({ success: true })
        }
    })
})

router.get('/clearCompleted', function(req, res, next) {
    var sql = 'delete from todos where completed=1';
    console.log('clearCompleted')
    db.query(sql, function(error) {
        console.log(arguments)
        if(error) {
            res.send({ success: false, data: error })
        }else {
            res.send({ success: true })
        }
    })
})

module.exports = router;