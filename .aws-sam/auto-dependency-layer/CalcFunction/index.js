exports.handler = async function (event) {
  console.log(JSON.stringify(event, null, 2));
  return {
    statsCode: 200,
    bod: { message: "hello world! fff" },
    headers: {
      "Content-Type": "application/json",
    },
  };
};
