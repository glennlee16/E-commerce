// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0

/*
ABOUT THIS NODE.JS EXAMPLE: This example works with the AWS SDK for JavaScript version 2 (v2).

Purpose:
admin-get-user.js demonstrates how an administrator can get a user from Amazon Cognito.

Inputs:
 - USERPOOLID
 - EMAIL

*/
// snippet-start:[cognito.JavaScript.admin-get-user-v2]

import { USERPOOL_ID } from "./utils";

const aws = require("aws-sdk");
/*Initializing CognitoIdentityServiceProvider from AWS SDK JS*/
const cognito = new AWS.CognitoIdentityServiceProvider({
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
// snippet-end:[cognito.JavaScript.admin-get-user-v2]
