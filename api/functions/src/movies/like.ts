import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  console.log('pk', event.pathParameters?.pk)
  console.log('typeof pk', typeof event.pathParameters?.pk)
  const params = {
    // Get the table name from the environment variable
    TableName: Table.Movies.tableName,
    Key: {
      pk: 'MOVIE',
      sk: event.pathParameters.sk,
    },
    // Update the "likes"
    UpdateExpression: "SET likes = likes + :incr",
    ExpressionAttributeValues: {
      ":incr": 1
    },
    ReturnValues: "ALL_NEW",
  };

  const results = await dynamoDb.update(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(results.Attributes),
  };
};
