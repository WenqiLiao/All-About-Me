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

app.use('/javascripts', express.static(__dirname + './../public/javascripts'));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'dont know what',
    resave: false,
    saveUninitialized: true,
}));

// Middleware to use Passport with Express
app.use(passport.initialize());
// Needed to use express-session with passport
app.use(passport.session());

// go to home page
app.get('/', (req, res) => {
    res.render('index', {user:req.user});
});
// go to polaroid page
app.get('/polaroid', (req, res) => {
  res.render('polaroid', {user:req.user});
});
// go to register page
app.get('/register', (req, res) => {
    res.render('register', {user:req.user});
});
// register a new user
app.post('/register', (req, res) => {
  //console.log("body", req.body);
    const newUser = new User({
        username: req.body.email,
        name: req.body.name,
        horoscope: req.body.horoscope,
        relationship: req.body.relationship
    });
    User.register(newUser, req.body.password, function(err, user){
        if(err){
          console.log("err", err);
          res.render('register',{user: req.user, message:'The email is already in use'});
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
    res.render('forum', {comments: comments, user:req.user});
});
});
app.post('/forum', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
  //console.log("ever");
  //console.log("body", req.body);
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
        //console.log("save");
        Comment.find({}).sort('createdAt: -1').exec((err, comments) => {
            res.render('forum', {comments: comments, user:req.user});
        });
    }
  });
});
// api for filter
app.get('/api/category', async (req, res) => {
  const comments = await Comment.find({}).sort('createdAt: -1').exec();
  //console.log("comments in api", comments);
  res.json(comments.map(c => {
    return {author: c.author, authorName: c.authorName, horoscope: c.authorHoroscope, relationship: c.authorRelationship, content: c.content};
  }));
});
app.post('/api/category', async (req, res) => {
  //console.log('api body', req.body);
  try {
    const category = req.body.category;
    //console.log("category", category);
    let comments;
    if (category === 'mine') {
      comments = await Comment.find({author: req.user._id}).sort('createdAt: -1').exec();
    } else if (category === 'friend') {
      comments = await Comment.find({authorRelationship: category}).sort('createdAt: -1').exec();
    } else if (category === 'family') {
      comments = await Comment.find({authorRelationship: category}).sort('createdAt: -1').exec();
    } else if (category === 'all') {
      comments = await Comment.find({}).sort('createdAt: -1').exec();
    }
    //console.log("comments", comments);
    res.json(comments.map(c => {
      return {author: c.author, authorName: c.authorName, horoscope: c.authorHoroscope, relationship: c.authorRelationship, content: c.content};
    }));
    
  } catch(e) {
    console.log("error", e);
    res.json({status: 'error'});
  }
});

//api for delete
app.get('/api/delete', async (req, res) => {
  const comments = await Comment.find({}).sort('createdAt: -1').exec();
  //console.log("comments in api", comments);
  res.json(comments.map(c => {
    return {author: c.author, authorName: c.authorName, horoscope: c.authorHoroscope, relationship: c.authorRelationship, content: c.content};
  }));
});
app.get('/api/delete_author', async (req, res) => {
  res.json({author: req.user});
});
app.post('/api/delete', async (req, res) => {
  //console.log('api body', req.body);
  try {
    const content = req.body.content;
    //console.log("content", content);
    Comment.findOneAndDelete({content: content}, async function (err, docs) {
      if (err){
          console.log("did not delete", err)
      }
      //console.log(docs);
      let comments = await Comment.find({}).sort('createdAt: -1').exec();
      //console.log("comments", comments);
      res.json(comments.map(c => {
        return {author: c.author, authorName: c.authorName, horoscope: c.authorHoroscope, relationship: c.authorRelationship, content: c.content};
      }));
    });


  } catch(e) {
    console.log("error", e);
    res.json({status: 'error'});
  }
});



app.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

app.listen(process.env.PORT || 3000);
