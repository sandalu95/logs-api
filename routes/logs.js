const _ = require("lodash");

const logRoutes = (app, fs) => {
    const dataPath = './data/logsData.json';

    //To get all logs
    app.get('/logs', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.status(200).send(JSON.parse(data));
        });
    });

    //To get logs within given time duration
    app.post('/logs', (req, res) => {
        fs.readFile(dataPath, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            const startDateTime = req.body.startDateTime;
            const endDateTime = req.body.endDateTime;
            const dataLimit = req.body.dataLimit;

            const parsed = JSON.parse(data);
            const sorted = _.sortBy(parsed,'timestamp');

            const valueArr = [];

            sorted.forEach(value=>{
                if(valueArr.length<dataLimit && new Date(value.timestamp)>new Date(startDateTime) && new Date(value.timestamp)<new Date(endDateTime) ) {
                    valueArr.push(value);
                }
            })
            res.status(200).send(valueArr);
        });
    });
};

module.exports = logRoutes;