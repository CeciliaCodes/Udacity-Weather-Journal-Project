// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require('express');
// Start up an instance of app
const app = express();
/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
const { response } = require('express');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));





//GET route for projectData

app.get('/postData', sendData);
function sendData(req, res) {
    res.send(projectData);
}

//POST routes for temperature, date, user response
app.post('/addData', function(request, response) {
    projectData = {
        temperature: request.body.temperature,
        date: request.body.date,
        userResponse: request.body.userResponse,
    };

    
    response.send({
        status: 200,
        message: "Successfully added entry"
    })
});



// Setup Server
const port = 8000;

const server = app.listen(port, listening);

function listening(){
    console.log("Server listening on port");
    console.log(`runing on localhost: ${port}`);
};
