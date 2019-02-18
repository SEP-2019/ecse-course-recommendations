const MAX_USERNAME_LENGTH = 64;
const MAX_PASSWORD_LENGTH = 64;
const MIN_PASSWORD_LENGTH = 8;
const MAX_EMAIL_LENGTH = 384;
const ID_LENGTH = 9;

function isAlphabet(str) {
	return String(str).match(/^[a-z]+$/i);
}

function isAlphabetWithSpace(str) {
	return String(str).match(/^[a-z ]+$/i);
}

function isAlphanumeric(str) {
	return String(str).match(/^[a-z0-9]+$/i);
}

function isNumeric(str) {
	return String(str).match(/^[0-9]*$/);
}

exports.verifyUsername = username => {
	if (String(username).length > MAX_USERNAME_LENGTH) {
		return false;
	}
	return isAlphanumeric(username);
}

exports.verifyPassword = password => {
	if (String(password).length > MAX_PASSWORD_LENGTH || String(password).length < MIN_PASSWORD_LENGTH) {
		return false;
	}
	return true;
}

exports.verifyEmail = email => {
	if (String(email).length > MAX_EMAIL_LENGTH) {
		return false;
	}
	return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
}

exports.verifyId = id => {
	return (isNumeric(id) && (String(id).length == ID_LENGTH));
}