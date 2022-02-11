const AWS = require("aws-sdk");
const db = new AWS.DynamoDB.DocumentClient();
module.exports.createUserData = async (e, context) => {
  let userData = "";

  const { current, targetValue } = JSON.parse(e.body);

  const { id } = e.pathParameters;
  const params = {
    TableName: "HumanWaterTable",
    Item: { id, current,    targetValue, },
  };

  try {
    const data = await db.put(params).promise();
    userData = data;
  } catch (error) {
    userData = `Error!`;
  }

  const res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(userData),
  };
 return res;
};

module.exports.update = async (e, context) => {
  let userData = "";
  const { current, targetValue } = JSON.parse(e.body);
  const { id } = e.pathParameters;
  const params = {
    TableName: "HumanWaterTable",  Key: { id, },
    UpdateExpression: "set #current = :current, #targetValue = :targetValue",
    ExpressionAttributeNames: {
      "#current": "current",
      "#targetValue": "targetValue",
    },
    ExpressionAttributeValues: {
      ":current": current,
      ":targetValue": targetValue,
    },
    ReturnValues: "ALL_NEW",
  };

  try {
    const data = await db.update(params).promise();
    userData = data;
  } catch (error) {
    userData = `Error!`;
  }

  const res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(userData),
  };

  return res;
};
module.exports.get = async (e, context) => {
  let userData = "";
  const { id } = e.pathParameters;
  const params = {
    TableName: "HumanWaterTable",
    Key: { id,  },
  };

  try {
    const data = await db.get(params).promise();
    userData = data.Item;
  } catch (err) {
    userData = `Error!`;
  }
  const res = {
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Credentials": true,
    },
    body: JSON.stringify(userData),
  };

  return res;
};




