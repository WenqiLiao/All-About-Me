import '../db.mjs';
import * as mongoose from 'mongoose';
import chai from 'chai';
import assert from 'assert';
let should = chai.should();
const User = mongoose.model('User');
mongoose.connect('mongodb://localhost/wl2250');

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
    it("fails to save without email(username)", function(done) {
		const newUser = new User({
            name: 'lwq',
            relationship: 'self'
        });
        newUser.save(function(err) {
            should.exist(err);
            done();
        });
	});
    it("fails to save without relationship", function(done) {
		const newUser = new User({
            username: '1051251498@qq.com',
            name: 'lwq',
        });
        newUser.save(function(err) {
            should.exist(err);
            done();
        });
	});
});

describe('find user using relationship', function() {
    it("will found user whose relationship is self", function(done) {
		const newUser = new User({
            username: 'test@qq.com',
            relationship: 'self',
            name: 'lwq'
        });
        newUser.save() 
            .then(
                User.findOne({ relationship: 'self' })
                .then((user) => {
                    assert(user.relationship === 'self'); 
                    done();
                })
            )  
	});
});
const newUser = new User({
    username: 'test1@qq.com',
    relationship: 'self',
    name: 'lwq'
});
newUser.save();
// source: https://www.geeksforgeeks.org/how-to-use-mocha-with-mongoose/
describe('Delete a user', function() {
    it('Removes a user', (done) => {
        User.findOneAndRemove({ username: 'test1@qq.com' })
            .then(() => User.findOne({ username: 'test1@qq.com' }))
            .then((user) => {
                assert(user == null);
                done();
            });
        });
});

after(() => { mongoose.disconnect() });