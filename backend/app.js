"use strict";
const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const api = require('./routes');
const app = express();
const port = 5000;

app.use(cors());

// Used to parse the post data of the body.
app.use(bodyParser.json({ limit: "10mb" })); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ limit: "10mb", extended: false })); // to support URL-encoded bodies


app.get("/test", (req, res) => {
    return res.json({ message: "ALLO" });
})

app.use('/api', api);

app.listen(port, () => console.log(`Example app listening on port ${port}!`))