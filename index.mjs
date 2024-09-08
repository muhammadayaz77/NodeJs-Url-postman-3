import { createServer } from "node:http";
// Create the server
const server = createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/data') {
    // Handle GET request
    const responseData = {
      message: 'This is a GET response!',
      data: {
        id: 1,
        name: 'Sample Data'
      }
    };

    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(responseData));

  } else if (req.method === 'POST' && req.url === '/submit') {
    // Handle POST request
    let body = '';

    // Collect the incoming data
    req.on('data', chunk => {
      body += chunk.toString(); // Convert buffer to string
    });

    // Once all data is received
    req.on('end', () => {
      const parsedData = JSON.parse(body); // Parse JSON data
      const responseData = {
        message: 'Data received successfully!',
        receivedData: parsedData
      };
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(responseData));
    });

  } else {
    // Handle 404 for other routes
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end('404 Not Found');
  }
});

// Start the server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
