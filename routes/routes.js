const logRoutes = require('./logs');

const appRouter = (app, fs) => {
    // A default route that handles empty routes
    // at the base API url
    app.get('/', (req, res) => {
        res.send('welcome to the logs api-server');
    });

    // run log route module here to complete the wire up
    logRoutes(app, fs);
};

module.exports = appRouter;