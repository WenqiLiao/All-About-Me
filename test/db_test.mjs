import '../db.mjs';
import * as mongoose from 'mongoose';
import {Mockgoose} from 'mockgoose';
let mockgoose = new Mockgoose(mongoose);
const User = mongoose.model('User');

before(function(done) {
	mockgoose.prepareStorage().then(function() {
		mongoose.connect('mongodb://localhost/wl2250', function(err) {
			done(err);
		});
	});
});

describe('save user', function() {
	it("fails to save without name", function(done) {
		const newUser = new User({
            username: '1051251498@qq.com',
            relationship: 'self'
        });
        newUser.save(function(err) {
            should.exist(err);
            done();
        });
	});
});