/***************************************************************************/
/*Initial Setup*/

var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer(); // for parsing multipart/form-data
var mongoose = require('mongoose');
var app = express();

var mongo_url = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/massageonrun';

mongoose.connect(mongo_url);

app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(multer());

app.use(express.static(__dirname + '/public'));

/*Allow CORS request*/
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    next();
});


/***************************************************************************/
/*Database Schema*/

var reviewSchema = new mongoose.Schema({
    userId: String,
    userIdReview: String,
    rating: String,
    review: String
}, { collection: 'review' });

var reviewModel = mongoose.model("ReviewModel", reviewSchema);


/***************************************************************************/
/*Review Module*/

/*Add Review*/
app.post('/v1/:userId/review/:userIdReview/add', function (req, res) {
    var review = new reviewModel({
        userId: req.params.userId,
        userIdReview: req.params.userIdReview,
        review: req.body.review,
        rating: req.body.rating
    });
    reviewModel.find({ userId: req.params.userId, userIdReview: req.params.userIdReview }, function (err, data) {
        if (data.length == 0) {
            review.save(function () {
                res.json(review);
            });
        } else {
            res.json({ error: "User has already reviewed" });
        }
    });
});

/*Remove Review*/
app.post('/v1/:userId/review/:userIdReview/remove', function (req, res) {
    reviewModel.remove({ userId: req.params.userId, userIdReview: req.params.userIdReview }, function (err, data) {
        if (data > 0) {
            res.json({ message: "Successfully Removed" });
        } else {
            res.json({ error: "No relationship found" });
        }
    });
});

/*Get reviews posted for this user*/
app.get('/v1/:userId/review', function (req, res) {
    reviewModel.find({ userIdReview: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({ error: "User has not been reviewed" });
        }
    });
});

/*Get reviews posted by this user*/
app.get('/v2/:userId/review', function (req, res) {
    reviewModel.find({ userId: req.params.userId }, function (err, data) {
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({ error: "User has not reviewed anyone" });
        }
    });
});


/***************************************************************************/

var customer = [
     { firstName: "alice", lastName: "wonderland" },
    { firstName: "bob", lastName: "mmarley" },
    { firstName: "charlie", lastName: "garcia" }
]

app.get('/api/customer', function (req, res) {
    res.json(customer);
})

app.post('/api/customer', function (req, res) {
    var newCustomer = req.body;
    customer.push(newCustomer);
    res.json(customer);
})

/***************************************************************************/

var bookingResults = [
        { firstName: "alice", address: "wonderland", cost: "1000", date: "234567", time: "1234" },
        { firstName: "bob", address: "mmarley", cost: "1050", date: "9633", time: "1234" },
        { firstName: "charlie", address: "garcia", cost: "900", date: "09876", time: "1234" },
]

app.get('/api/booking', function (req, res) {
    res.json(bookingResults);
})

app.get('/api/booking/:index', function (req, res) {
    res.json(bookingResults[req.params.index]);
})

app.delete('/api/booking/:index', function (req, res) {
    bookingResults.splice(req.params.index, 1);
    res.json(bookingResults);
})

app.post('/api/booking', function (req, res) {
    var newBooking = req.body;
    bookingResults.push(newBooking);
    res.json(bookingResults);
})


/***************************************************************/

var area = [
{ title: 'Select Area', value: 0 },
{ title: 'Bandra - Churchgate', value: 500 },
{ title: 'Borivali - Khar', value: 700 }
];

app.get('/area', function (req, res) {
    res.json(area);
})

/***************************************************************/

var timeSlot = ['06.00 am', '06.30 am', '07.00 am', '07.30 am', '08.00 am', '08.30 am', '09.00 am', '09.30 am', '10.00 am', '10.30 am', '11.00 am', '11.30 am', '12.00 pm', '12.30 pm', '01.00 pm', '01.30 pm', '02.00 pm', '02.30 pm', '03.00 pm', '03.30 pm', '04.00 pm', '04.30 pm', '05.00 pm', '05.30 pm', '06.00 pm', '06.30 pm', '07.00 pm', '07.30 pm', '08.00 pm', '08.30 pm', '09.00 pm', '09.30 pm', '10.00 pm', '10.30 pm'];

app.get('/time', function (req, res) {
    res.json(timeSlot);
})

/***************************************************************/

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 8080;

app.listen(port, ip);