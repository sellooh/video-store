import { ulid } from "ulid";
import { DynamoDB } from "aws-sdk";
import { APIGatewayProxyHandlerV2 } from "aws-lambda";
import { Table } from "sst/node/table";

const dynamoDb = new DynamoDB.DocumentClient();

export const handler: APIGatewayProxyHandlerV2 = async (event) => {
  const data = JSON.parse(event.body);

  const params = {
    // Get the table name from the environment variable
    TableName: Table.Movies.tableName,
    Item: {
      pk: 'MOVIE',
      sk: ulid(),
      createdAt: Date.now(),
      name: data.name,
      likes: 0,
    },
  };
  await dynamoDb.put(params).promise();

  return {
    statusCode: 200,
    body: JSON.stringify(params.Item),
  };
};
