import { DynamoDB } from "aws-sdk";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export async function handler() {
  const params = {
    // Get the table name from the environment variable
    TableName: Table.Movies.tableName,
    KeyConditionExpression: "pk = :pk",
    ScanIndexForward: false,
    ExpressionAttributeValues: {
      ":pk": "MOVIE",
    },
  };
  const results = await dynamoDb.query(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Items),
  };
}
