import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import connectEnsureLogin from 'connect-ensure-login';
import './db.mjs';
import './auth.js';
import path from 'path'
import mongoose from 'mongoose'; 
import { fileURLToPath } from 'url';

const Comment = mongoose.model('Comment');
const User = mongoose.model('User');

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'dont know what',
    resave: false,
    saveUninitialized: true,
}));

// make {{user}} variable available for all paths [not working]
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// Middleware to use Passport with Express
app.use(passport.initialize());
// Needed to use express-session with passport
app.use(passport.session());

// go to home page
app.get('/', (req, res) => {
    res.render('index', {user:req.user});
});
// go to register page
app.get('/register', (req, res) => {
    res.render('register', {user:req.user});
});
// register a new user
app.post('/register', (req, res) => {
    const newUser = new User({
        username: req.body.email,
        name: req.body.name,
        horoscope: req.body.horoscope,
        relationship: req.body.relationship
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          res.render('register',{user:req.user, message:'Your registration information is not valid'});
        } else {
          passport.authenticate('local')(req, res, function() {
            res.redirect('/');
          });
        }
    });
});
// go to login page
app.get('/login', (req, res) => {
    res.render('login', {user:req.user});
});
// log in as user
app.post('/login', function(req, res, next) {
  passport.authenticate('local', function(error, user, info) {

    if(user) {
      req.logIn(user, function(err) {
        res.redirect('/');
      });
    } else {
      res.render('login', {user: req.user, message:'Your login or password is incorrect.'});
    }
  })(req, res, next);
});

// go to forum page
app.get('/forum', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  Comment.find({}).sort('-createdAt').exec((err, comments) => {
    res.render('forum', {comments: comments});
});
});
app.post('/forum', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  console.log("ever");
  console.log("body", req.body);
  const cmt = new Comment ({
    author: req.user._id,
    authorName: req.user.name,
    authorHoroscope: req.user.horoscope,
    authorRelationship: req.user.relationship,
    content: req.body.comment
  })
  cmt.save(function (err) {
    if (err) {
      res.render('forum', {message: 'error occurs'});
    } else {
        console.log("save");
        Comment.find({}).sort('-createdAt').exec((err, comments) => {
            res.render('forum', {comments: comments});
        });
    }
  });
});

app.get('/test', (req, res) => {
    Comment.find({}).sort('-createdAt').exec((err, comments) => {
        res.render('test', {comments: comments});
    });
});
app.post('/test', (req, res) => {
    const cmt = new Comment({
        author: req.body.author,
        content: req.body.content
      });
      cmt.save(function (err) {
        if (err) {
          res.render('test', {message: 'error occurs'});
        } else {
            console.log("save");
            Comment.find({}).sort('-createdAt').exec((err, comments) => {
                res.render('test', {comments: comments});
            });
        }
      });
});

app.post('/test', (req, res) => {
    if(req.body.author.length > 0 && req.body.content > 0) {
      testComments.push({author: req.body.author, content: req.body.content});
      res.redirect('/test');
    } else {
      res.render('test', {testComments, error: 'name is not valid'});
    }
});

app.listen(process.env.PORT || 3000);
