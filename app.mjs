import express from 'express'
import './db.mjs';
import path from 'path'
import mongoose from 'mongoose'; 
import { fileURLToPath } from 'url';
import session from 'express-session';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set('view engine', 'hbs');

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
}));

// make {{user}} variable available for all paths
app.use((req, res, next) => {
    res.locals.user = req.session.user;
    next();
});

// go to home page
app.get('/', (req, res) => {
      res.render('index', {user: req.session.user, home: true});
});




const Comment = mongoose.model('Comment');

app.listen(process.env.PORT || 3000);
