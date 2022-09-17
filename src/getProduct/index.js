exports.handler = async function (event) {
  console.log(JSON.stringify(event, null, 2));
  return [{ a: 1 }, { a: 2 }];
};
