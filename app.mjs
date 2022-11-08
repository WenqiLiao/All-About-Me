import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import connectEnsureLogin from 'connect-ensure-login';
import './db.mjs';
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
// make {{user}} variable available for all paths
app.use((req, res, next) => {
    res.locals.user = req.user;
    next();
});
// Middleware to use Passport with Express
app.use(passport.initialize());
// Needed to use express-session with passport
app.use(passport.session());
// passport local strategy
passport.use(User.createStrategy());

// to use with sessions
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// go to home page
app.get('/', (req, res) => {
    res.render('index', {user: req.user, home: true});
});
// go to register page
app.get('/register', (req, res) => {
    res.render('register');
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
            console.log(err); 
            //res.redirect("/register");
        } else {
            //A new user was saved
            console.log(user + "2");
            passport.authenticate('local', function (error, user, info) {
                // this will execute in any case, even if a passport strategy will find an error
                // log everything to console
                console.log(error);
                console.log(user);
                console.log(info);
          
                if (error) {
                  res.status(401).send(error);
                  return;
                } else if (!user) {
                  res.status(401).send(info);
                  return;
                } else {
                  next();
                }
          
                res.status(401).send(info);
              })(req, res);
        }
    });
});
// go to login page
app.get('/login', (req, res) => {
    res.render('login');
  });
// log in as user
app.post('/login', passport.authenticate('local', { failureRedirect: '/', failureMessage: true }),  function(req, res) {
	console.log(req.user)
	res.redirect('/forum');
});
// go to forum page
app.get('/forum', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('forum', {user:req.user});
});

// a test forum page without logging in 
const testComments = [
    {author: 'Wenqi', content: 'This is a test comment'},
];

app.get('/test', (req, res) => {
    res.render('test', {testComments});
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
