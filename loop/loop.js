import * as http from "http";

let cachedResult = 0;

const server = http.createServer((request, response) => {
  switch (request.url) {
    case "/":
      mainPage(request, response);
      break;

    case "/calc":
      calculate(request, response);
      break;

    default:
      response.writeHead(404);
      response.end("Page not found");
  }
});

server.listen(3003);

function mainPage(request, response) {
  response.end(`main, result = ${cachedResult}`);
}

function calculate(request, response) {
  let res = 0;

  for (let i = 1; i < 20000; i++) {
    for (let j = 1; j < 20000; j++) {
      let n = i % j;
      res += n * (Math.random() > 0.5 ? 1 : -1);
    }
  }

  cachedResult = res;
  response.end("calculate");
}
