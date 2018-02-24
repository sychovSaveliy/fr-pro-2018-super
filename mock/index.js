let express = require('express');
let app = express();
let bodyParser = require('body-parser');
let $data = require('./routes/data');
let fs = require('fs');
let port = 5000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.text());
app.use(bodyParser.json({type: 'application/json'}));
app.use(function (req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
	res.setHeader('Access-Control-Allow-Credentials', true);
	next();
});

app.get('/', function (req, res) {
	return res.json({ message: 'UI API!' });
	// return res.end(fs.readFileSync('./index.html'));
});

app.route('/buildings/filtred')
	.get($data.getBuildings);

app.route('/auth')
	.post($data.auth);

app.route('/registration')
	.post($data.reg);

app.route('/user/:userId')
	.get($data.getUser);

app.listen(port);
console.log('Mock server listening on port ' + port);

module.exports = { app };