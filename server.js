const express = require('express');

const app = express();
let router = express.Router();

exports.start = (serverConfig) => {
    let port = serverConfig.port || 8080;
    let address = serverConfig.address;
    let routes = serverConfig.routes;

    app.listen(port);
    console.log('Server started on: ' + port);
    console.log('app address: ' + address);

    routes.forEach((route) => {
        console.log('adding route: ' + route.address);
        switch (route.method) {
            case 'GET':
                router.get(route.address, (req, res) => {
                    res.sendFile(serverConfig.projectAddress + '/' + route.response);
                });
                break;
            default:
                router.get(route.address, (req, res) => {
                    res.sendFile(serverConfig.projectAddress + '/' + route.response);
                });
        }
    });

    // apply the routes to our application
    app.use('/' + address, router);
}
