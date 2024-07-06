const express = require("express");
const http = require("http");
const path = require("path");
const hostname = "127.0.0.1";
const port = 5500;

const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "../index.html"));
})


// Prints a log once the server starts listening
app.listen(port, hostname, function () {
  console.log(`Server running at http://${hostname}:${port}/`);
});
