//import { Timestamp } from "bson";
import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const UserSchema = new mongoose.Schema({
    username: {type: String, required: true},
    password: {type: String, required: true},
    //birthday: {type: Timestamp, required: false},
    horoscope: {type: String, required: false},
    relationship: {type: String, required: true},
    email: {type: String, required: true},
});

const CommentSchema = new mongoose.Schema({
    username: {type: mongoose.Schema.Types.ObjectId, ref:'User'},
    content: {type: String, required: true},
    //createdAt: {type: Timestamp, required: false}
});

UserSchema.plugin(passportLocalMongoose);

mongoose.model('User', UserSchema);
mongoose.model('Comment', CommentSchema);

// is the environment variable, NODE_ENV, set to PRODUCTION? 
import fs from 'fs';
import path from 'path';
import url from 'url';
const __dirname = path.dirname(url.fileURLToPath(import.meta.url));
let dbconf;
if (process.env.NODE_ENV === 'PRODUCTION') {
 // if we're in PRODUCTION mode, then read the configration from a file
 // use blocking file io to do this...
 const fn = path.join(__dirname, 'config.json');
 const data = fs.readFileSync(fn);

 // our configuration file will be in json, so parse it and set the
 // conenction string appropriately!
 const conf = JSON.parse(data);
 dbconf = conf.dbconf;
} else {
 // if we're not in PRODUCTION mode, then use
 dbconf = 'mongodb://localhost/wl2250';
}

mongoose.connect(dbconf), {
    // avoid deprecation warnings from the native MongoDB driver
    useNewUrlParser: true,
    // set to avoid deprecation warnings
    useUnifiedTopology: true
};

