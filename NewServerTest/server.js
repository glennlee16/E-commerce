const USERPOOL_ID = "us-east-1_FsymXYNN1";

const aws = require("aws-sdk");
/*Initializing CognitoIdentityServiceProvider from AWS SDK JS*/
const cognito = new aws.CognitoIdentityServiceProvider({
  apiVersion: "2016-04-18",
});

exports.handler = async (event, context) => {
  const EMAIL = event.email;
  const cognitoParams = {
    UserPoolId: USERPOOL_ID,
    Username: EMAIL,
  };

  let response = await cognito.adminGetUser(cognitoParams).promise();
  console.log(JSON.stringify(response, null, 2));
};



// Import required modules
const express = require('express');

// Create an instance of express
const app = express();

// Define a route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/cognito', (req, res) => {
  res.send('Hello, Cognito!');
});

// Start the server
const port = process.env.PORT || 3002;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});