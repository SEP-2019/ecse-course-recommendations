const mocha = require('mocha');
const users = require('../logic/users/users.js');
const assert = require('assert');
const nock = require('nock');

const expectedInvalidUsername = 'invalid format username';
const expectedInvalidPass = 'invalid format password';
const expectedInvalidEmail = 'invalid format email';
const expectedInvalidId = 'invalid format id';

async function afterStudentInsert(username,done){
	await users.deleteStudentAndUserByUsername(username);
	done();
};

/*
const host = 'http://localhost:3000';
const addStudentURL = '/users/addStudentUser';

describe('POST /users/addStudentUser', function() {
	it('responds with undefined username', function() {
		nock(host)
			.post(addStudentURL, {'password': 'password',
			                      'email': 'email@email.com',
			                      'student_id': '123456789'})
			.reply(200, 'undefined username');	
	});

	it('responds with undefined password', function() {
		nock(host)
			.post(addStudentURL, {'username': 'username',
			               'email': 'email@email.com',
			               'student_id': '123456789'})
			.reply(200, 'undefined password');
	});

	it('responds with undefined email', function() {
		nock(host)
			.post(addStudentURL, {'username': 'username',
			                      'password': 'password',
			                      'student_id': '123456789'})
			.reply(200, 'undefined email');
	});

	it('responds with undefined id', function() {
		nock(host)
			.post(addStudentURL, {'username': 'username',
			                      'password': 'password',
			                      'student_id': '123456789'})
			.reply(200, 'undefined id');
	});
});
*/

describe('Tests add student user', function() {
	it('responds with undefined username', function (done) {
		users.insertStudentUser(null, 'password', 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'undefined username');
					resolve();
				}).then(done);
		     	});
	});

	it('responds with undefined password', function (done) {
		users.insertStudentUser('username', null, 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'undefined password');
					resolve();
				}).then(done);
		     	});
	});

	it('responds with undefined email', function (done) {
		users.insertStudentUser('username', 'password', null, '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'undefined email');
					resolve();
				}).then(done);
		     	});
	});

	it('responds with undefined id', function (done) {
		users.insertStudentUser('username', 'password', 'email@email.com', null)
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'undefined id');
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format username 1', function (done) {
		users.insertStudentUser('usernameWithSymbols123%@^', 'password', 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidUsername);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format username 2', function(done) {
		users.insertStudentUser('username123%@^', 'password', 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidUsername);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format username 3', function (done) {
		users.insertStudentUser('RidiculouslyLongUsernameThatHasZeroPurposeToBeMadeAndAddedIntoTheDatabase',
		                        'password', 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidUsername);
					resolve();
				}).then(done);
		     	});
	});
	
	it('responds with invalid format password 1', function(done) {
		users.insertStudentUser('username', 'short', 'email@email.com', '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidPass);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format password 2', function (done) {
		let studentId = 123456789;
		users.insertStudentUser('username',
		                        'thisIsARidiculouslyLongPasswordAndStuffButKeepGoingBecauseYeahSoDontDoThis',
		                        'email',
		                        studentId)
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidPass);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format email 1', function (done) {
		users.insertStudentUser('username',
		                        'password',
		                        'email',
		                        '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidEmail);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format email 2', function (done) {
		users.insertStudentUser('username',
		                        'password',
		                        'email#@gma.com',
		                        '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidEmail);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format email 3', function (done) {
		users.insertStudentUser('username',
		                        'password',
		                        'email@g.c',
		                        '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidEmail);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format email 4', function (done) {
		users.insertStudentUser('username',
		                        'password',
		                        'email.2.2.12@@gmai.test.com',
		                        '123456789')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidEmail);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with invalid format id 1', function (done) {
		users.insertStudentUser('username', 'passWITHsymbo!@#AOZ;]', 'email@email.com', '2apfqw42')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, expectedInvalidId);
					resolve();
				}).then(done);
		     	});
	});

	it('responds with true 1', function(done) {
		let username = 'username1';
		users.insertStudentUser(username, 'password', 'email@email.com', '2344124')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'true');
					resolve();
				}).then(afterStudentInsert(username, done));
		     	});
	});

	it('responds with true 2', function (done) {
		let username = 'username';
		users.insertStudentUser(username, 'passWITHsymbo!@#AOZ;]', 'email@email.com', '2311')
			.then(response => {
				return new Promise(function (resolve) {
					assert.equal(response, 'true');
					resolve();
				}).then(afterStudentInsert(username, done));
		     	});
	});
});
