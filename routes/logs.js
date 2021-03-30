const _ = require("lodash");

const loadTypes = {
    prev:"PREV",
    next:"NEXT"
}

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
            const loadType = req.body.loadType;

            const parsed = JSON.parse(data);
            const sorted = _.sortBy(parsed,'timestamp');

            let valueArr = [];
            sorted.forEach(value=>{
                if(new Date(value.timestamp)>new Date(startDateTime) && new Date(value.timestamp)<new Date(endDateTime) ) {
                    valueArr.push(value);
                }
            })
            valueArr = loadType===loadTypes.next?valueArr.slice(0,dataLimit):valueArr.slice(-dataLimit);

            res.status(200).send(valueArr);
        });
    });
};

module.exports = logRoutes;