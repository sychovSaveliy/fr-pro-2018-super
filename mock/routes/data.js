let fs = require('fs');
let path = '.';

function pathConcat(pathname) {
	return path + '/' + pathname;
}

function filereader(fsRef, path) {
	return new Promise(function (resolve, reject) {
		fsRef.readFile(path, 'utf8', function (e, d) {

			if (e) reject(e);

			else resolve(JSON.parse(d));
		});
	});
}

function getBuildings(req, res) {
	let path = pathConcat('api' + req.route.path + '/' + req.method.toLowerCase() + '.json'),
		servicePromise = filereader(fs, path);

	console.log(path);
	
	servicePromise
		.then((response) => {
			res.json(response);
		});
}

function getUser(req, res) {
	let path = pathConcat('api' + req.url + '/' + req.method.toLowerCase() + '.json'),
		servicePromise = filereader(fs, path);

	console.log(path);
	
	servicePromise
		.then((response) => {
			response.data = 'VAYSA';

			return response;
		})
		.then((response) => {
			res.json(response);
		});
}


function auth(req, res) {
	let body = JSON.parse(req.body),
		path = pathConcat('api' + req.url + '/' + body.login + '/' + req.method.toLowerCase() + '.json'),
		servicePromise = filereader(fs, path);

	console.log(req.body);
	
	servicePromise
		.then((response) => {
			res.json(response);
		});
}

function reg(req, res) {
	let body = JSON.parse(req.body),
		pathSuccess = 'failed';

	console.log(body);
	if (body.pass === body.pass2) {
		pathSuccess = 'success'
	}

	let	path = pathConcat('api' + req.url + '/' + pathSuccess + '/' + req.method.toLowerCase() + '.json'),
		servicePromise = filereader(fs, path);

	
	servicePromise
		.then((response) => {
			res.json(response);
		});
}


module.exports = { getBuildings, pathConcat, getUser, auth, reg };