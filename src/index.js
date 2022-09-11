exports.handler = async function (event) {
  return {
    statusCode: 200,
    body: { message: "hello world!" },
  };
};
