const express = require('express');
const fs = require('fs');
// const log = require('../log.csv')
const morgan = require('morgan')
const path = require('path')
let csvToJson = require('convert-csv-to-json')
// const Writable = require("stream").Writable

// const logStream = fs.createWriteStream(path.join(__dirname, 'log.csv'), {flags: 'a'})

const app = express();
app.set('json spaces', 1)

// morgan.token("cust-user-agent", function(req, res) {
//     return req.headers['user-agent'].replace(';','');
// })

// morgan.token("custom", ":cust-user-agent; :date[iso]; :method; :url; HTTP/:http-version; :status")

// app.use(morgan('custom'));

// app.use(morgan('custom', {stream: logStream}));


app.get('/', (req, res) => {
// write your code to respond "ok" here

    // class MyStream extends Writable {
    //     write(line) {
    //     //here you send the log line to wherever you need
    //     console.log("Logger:: ", line)
    //     }
    // }
    let log = `${req.headers['user-agent'].replace(';','')};${new Date().toISOString()};${req.method};${req.url};HTTP/${req.httpVersion};${res.statusCode}`
  
    // let writer = new MyStream()
    // app.use(morgan('custom', { stream: writer }))
    console.log(log)

    fs.appendFile("./server/log.csv", `${log}\n`, (err) => {
        if (err) {
            console.log(err);
        }
        // else {
        //     console.log("created")
        // }
    });

    res.status(200).send('ok');
});

app.get('/logs', (req, res) => {
// write your code to return a json object containing the log data here
    res.send(csvToJson.getJsonFromCsv("./server/log.csv"))
});

app.get('*', function(req, res){

    res.status(404).end('Not Found');

})

module.exports = app;
