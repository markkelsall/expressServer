const express = require('express');

const app = express();
let router = express.Router();

exports.start = (serverConfig) => {
    let port = serverConfig.port || 8080;
    let address = serverConfig.address || '/';

    app.listen(port);
    console.log('Server started on ' + port);
    console.log('address: ' + address);

    router.get('/', function(req, res) {
        res.send('im the home page!');
    });

    router.get('/about', function(req, res) {
        res.send('im the about page!');
    });

    // apply the routes to our application
    app.use('/' + address, router);
}
