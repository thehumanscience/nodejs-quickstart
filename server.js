const express = require('express');
const mysql = require('mysql');
const response = require('./methods.js')
const app = express();
const path = require('path');

app.set("view engine", "pug");


// Set views path
app.set('views', path.join(__dirname, 'views'));
// Set public path
app.use(express.static(path.join(__dirname, 'public')));

/* ... rest of the application goes here ... */

var frequentCalls = response.methods.methodsToPass();

console.log(frequentCalls);



// Create connection
const db = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'password' //use your own password for root
    
});

// Connect
db.connect((err) => {
    if(err){
        console.log( err);
    }
    console.log('MySql Connected...');
});



// Create DB
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE nodemysql';
    db.query(sql, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Database created...');
    });
});

// Create table
app.get('/createpoststable', (req, res) => {
    let sql = 'CREATE TABLE nodemysql.posts(id int AUTO_INCREMENT, title VARCHAR(255), body VARCHAR(255), PRIMARY KEY(id))';
    db.query(sql, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Posts table created...');
    });
});

// Insert post 1
app.get('/addpost1', (req, res) => {
    let post = {title:'Post One', body:'This is post number one'};
    let sql = 'INSERT INTO nodemysql.posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Post 1 added...');
    });
});

// Insert post 2
app.get('/addpost2', (req, res) => {
    let post = {title:'Post Two', body:'This is post number two'};
    let sql = 'INSERT INTO nodemysql.posts SET ?';
    let query = db.query(sql, post, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Post 2 added...');
    });
});

// Select posts
app.get('/getposts', (req, res) => {
    let sql = 'SELECT * FROM nodemysql.posts';
    let query = db.query(sql, (err, results) => {
        if(err) console.log( err);
        console.log(results);
        
        res.render('getposts');
    });
});

// Select posts
app.get('/hello', (req, res) => {
    let sql = 'SELECT * FROM nodemysql.posts';
    let query = db.query(sql, (err, results) => {
        if(err) console.log( err);
        console.log(results);
        
        res.render('hello');
    });
});


// Select posts
app.get('/bootstrap', (req, res) => {
    let sql = 'SELECT * FROM nodemysql.posts';
    let query = db.query(sql, (err, results) => {
        if(err) console.log( err);
        console.log(results);
     
        res.render('bootstrap');
    });
});

// Select posts
app.get('/datatable', (req, res) => {
    let sql = 'SELECT * FROM nodemysql.posts';
    let query = db.query(sql, (err, results) => {
        if(err) console.log( err);

        console.log('Results: ', typeof(results));
     	
        res.render('datatable',{'results':results});
    });
});

// Select single post
app.get('/getpost/:id', (req, res) => {
    let sql = `SELECT * FROM nodemysql.posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Post fetched...');
    });
});

// Update post
app.get('/updatepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `UPDATE nodemysql.posts SET title = '${newTitle}' WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Post updated...');
    });
});

// Delete post
app.get('/deletepost/:id', (req, res) => {
    let newTitle = 'Updated Title';
    let sql = `DELETE FROM nodemysql.posts WHERE id = ${req.params.id}`;
    let query = db.query(sql, (err, result) => {
        if(err) console.log( err);
        console.log('Result: ', result);
        res.send('Post deleted...');
    });
});

app.listen('3000', () => {
    console.log('Server started on port 3000');
});