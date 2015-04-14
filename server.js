var express = require("express");
var multer = require("multer");
var app = express();
var done = false;

app.use(express.static('bower_components'));
app.use(express.static('scripts'));
app.use(express.static('style'));

app.use(multer({
        dest: './Uploads/',
        rename: function (fieldname, filename) {
            return filename + Date.now();
        },
        onFileUploadStart: function (file) {
            console.log(file.originalname + ' is starting...')
        },
        onFileUploadComplete: function (file) {
            console.log(file.fieldname + ' uploaded to ' + file.path)
            done = true;
        }
    }
));

app.get('/', function (req, res) {
    res.sendfile("Index.html");
});

app.post('/UploadTest', function (req, res) {
    if (done == true) {
        console.log(req.files);
        res.end("File uploaded.");
    }
});

app.listen(3000, function () {
    console.log("Working on port 3000");
});