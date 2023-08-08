import * as http from "http";
import { Worker } from "worker_threads";

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

server.listen(3000);

function mainPage(request, response) {
  response.end(`main, result = ${cachedResult}`);
}

function calculate(request, response) {
  const worker = new Worker("./calc.js");
  console.log("worker:", worker);

  // in real, error event
  worker.on("message", (value) => {
    cachedResult = value;
    response.end("calculate");
  });
}
