import { DynamoDB } from "@aws-sdk/client-dynamodb";
import { UpdateCommand, PutCommand, DynamoDBDocumentClient, ScanCommand, DeleteCommand, } from "@aws-sdk/lib-dynamodb";
import crypto from "crypto";

// Set up connections to multiple global tables in different regions
const currentRegion = process.env.AWS_DEFAULT_REGION;
const replicatedRegions = ['ap-northeast-1', 'ap-northeast-2'];

// Fallback to the first available
const region = replicatedRegions.find((r) => r === currentRegion) || replicatedRegions[0];

const ddb = new DynamoDB({ region, });
const docClient = DynamoDBDocumentClient.from(ddb);

// Function to fetch tasks from the DynamoDB table
export const fetchTasks = async () => {
  const command = new ScanCommand({
    ExpressionAttributeNames: { "#name": "name" },
    ProjectionExpression: "id, #name, completed",
    TableName: "CloudTest",
  });
  const response = await docClient.send(command);
  return response;
};

// Function to create a new task in the DynamoDB table
export const createTasks = async ({ name, completed }) => {
  const uuid = crypto.randomUUID();
  const command = new PutCommand({
    TableName: "CloudTest",
    Item: { id: uuid, name, completed, },
  });
  const response = await docClient.send(command);
  return response;
};

// Function to update an existing task in the DynamoDB table
export const updateTasks = async ({ id, name, completed }) => {
  const command = new UpdateCommand({
    TableName: "CloudTest",
    Key: { id, },
    ExpressionAttributeNames: { "#name": "name", },
    UpdateExpression: "set #name = :n, completed = :c",
    ExpressionAttributeValues: { ":n": name, ":c": completed, },
    ReturnValues: "ALL_NEW",
  });
  const response = await docClient.send(command);
  return response;
};

// Function to delete a task from the DynamoDB table by ID
export const deleteTasks = async (id) => {
  const command = new DeleteCommand({
    TableName: "CloudTest",
    Key: { id, }, 
  });
  const response = await docClient.send(command);
  return response;
};
