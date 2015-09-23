
var express = require('express');
var app = express();

app.set('port', 3000);
app.use('/', express.static(__dirname + '/static'));

app.listen(app.get('port'), function() {
	console.log('server listening on port ', app.get('port'));
});

