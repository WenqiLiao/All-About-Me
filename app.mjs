import express from 'express'
import bodyParser from 'body-parser';
import session from 'express-session';
import passport from 'passport';
import connectEnsureLogin from 'connectEnsureLogin';
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
    res.locals.user = req.session.user;
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
// go to login page
app.get('/login', (req, res) => {
    res.render('login');
  });
// log in as user
app.post('/login', passport.authenticate('local', { failureRedirect: '/' }),  function(req, res) {
	console.log(req.user)
	res.redirect('/');
});
// go to forum page
app.get('/forum', connectEnsureLogin.ensureLoggedIn(), (req, res) => {
    res.render('forum', {user:req.user});
});
/*
app.post('/dragon', (req, res) => {
    if(req.body.dragonName.length > 0) {
      dragons.push({dragonName: req.body.dragonName, rider: req.body.rider, identification: req.body.identification, house: req.body.house});
      req.session.addCount = (req.session.addCount || 0) + 1;
      //console.log('inside dragon '+ req.session.addCount);
      res.redirect('/');
    } else {
      res.render('dragon', {dragons, error: 'name is not valid'});
    }
  });
*/


app.listen(process.env.PORT || 3000);
