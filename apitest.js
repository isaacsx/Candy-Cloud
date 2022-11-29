const {
  fetch,
  FetchResultTypes,
  FetchMethods,
  FetchMediaContentTypes,
} = require("@sapphire/fetch");

fetch(
  "http://localhost:3000/upload?hwid=isaacxhwidewfleak2022&title=hola",
  {
    body: "print('Hello World')",
    method: FetchMethods.Post,
    headers: {
      "Content-Type": FetchMediaContentTypes.TextPlain,
    },
  },
  FetchResultTypes.JSON
)
  .then(console.log)
  .catch(console.error);
