import * as http from "http";

const requests = [];

const server = http.createServer((request, response) => {
  requests.push(request);
  console.log(requests.length);

  setTimeout(() => response.end("hi there"), 5000);
});

server.listen(3001);
