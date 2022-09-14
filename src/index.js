exports.handler = async function (event) {
  console.log(JSON.stringify(event, null, 2));
  return {
    statusCode: 201,
    body: { message: "hello world! fff" },
  };
};
