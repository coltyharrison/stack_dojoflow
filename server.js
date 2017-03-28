var express = require('express'),
    app = express(),
    bp = require('body-parser'),
    port = 8000,
    path = require('path');

app.use(bp.json());
app.use(express.static(path.join(__dirname, './bower_components')));
app.use(express.static(path.join(__dirname, './client')));
require(path.join(__dirname, './server/config/routes.js'))(app);

app.listen(port, function(err) {
    if (err) {
        console.log(err);
    } else {
        console.log('Listening on port 8000');
    }
});
