var express = require('express');
var cors = require('cors');
var bodyParser = require("body-parser");
var app = express();
var multer = require('multer');

var port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(cors());
app.use(bodyParser.urlencoded({
    extended: false
}));

var Users = require('./Routes/Users');
var api = require('./api.js');
app.use('/users',Users);
app.use('/api', api);
app.use(express.static(__dirname + '/uploads'));



var storage = multer.diskStorage({ //multers disk storage settings
    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
    }
});

var upload = multer({ //multer settings
    storage: storage
}).single('photo');

/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({
                success: 0,
                err_desc: err
            });
            return;
        }
        res.json({
            success: 1,
            err_desc: null,
            url: req.file.filename
        });
    });
});

app.listen(port,function(){
    console.log("Server is running on port: "+port);
});