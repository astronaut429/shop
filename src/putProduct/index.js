const { object, string, number, date, InferType } = require("yup");
const AWS = require("aws-sdk");
const { v4: uuidv4 } = require("uuid");

AWS.config.update({ region: "us-east-2" });
const docClient = new AWS.DynamoDB.DocumentClient({ apiVersion: "2012-08-10" });

const productSchema = object({
  name: string().required(),
  price: number().required().positive(),
  currency: string().required().oneOf(["CAD", "USD"]),
  uom: string().required(),
  description: string(),
});

exports.handler = async function (event) {
  console.log(JSON.stringify(event, null, 2));
  const { body } = event;
  let product;
  try {
    const rawProduct = JSON.parse(body);
    product = productSchema.validateSync(rawProduct);
    console.log("new product received:", product);

    const id = uuidv4();
    product.id = id;

    var params = {
      TableName: "TABLE",
      Item: { id, ...product },
    };

    const res = await docClient.put(params).promise();

    console.log(res);
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify(error.errors || error),
    };
  }
  return product;
};
