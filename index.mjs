import {createServer} from 'node:http'
// Function to handle incoming requests
const requestListener = (req, res) => {
    // Parse the URL using the WHATWG URL API
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);

    // Set headers for the response (JSON and status code 200)
    res.setHeader('Content-Type', 'application/json');
    
    // Log the method and URL to debug
    console.log(`Request method: ${req.method}, Request URL: ${parsedUrl.pathname}`);

    // GET request handling
    if (req.method === 'GET' && parsedUrl.pathname === '/api/data') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Hello, this is your data!' }));
    }
    // POST request handling
    else if (req.method === 'POST' && parsedUrl.pathname === '/api/data') {
        let body = '';

        // Collect data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once data collection is done
        req.on('end', () => {
            const receivedData = JSON.parse(body); // Parse the received JSON   
            res.writeHead(200); // Ensure headers are sent only once
            res.end(JSON.stringify({ message: 'Data received!', data: receivedData }));
        });
    }
     // PUT request handling (newly added)
     else if (req.method === 'DELETE' && parsedUrl.pathname.startsWith('/api/data/')) {
        console.log('path : ',parsedUrl.pathname.split('/'));
        let itemId = parsedUrl.pathname.split('/').pop();
        let body = '';

        // Collect data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once data collection is done
        req.on('end', () => {
            const updatedData = JSON.parse(body); // Parse the received JSON
            res.writeHead(200); // Send status 200
            res.end(JSON.stringify({ message: `Delete Request : ${itemId}`, data: updatedData }));
        });
    }
     // PUT request handling (newly added)
     else if (req.method === 'PUT' && parsedUrl.pathname.startsWith('/api/data')) {
        let itemId = parsedUrl.pathname.split('/').pop();
        let body = '';

        // Collect data chunks
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // Once data collection is done
        req.on('end', () => {
            const updatedData = JSON.parse(body); // Parse the received JSON
            res.writeHead(200); // Send status 200
            res.end(JSON.stringify({ message: `Update Request : ${itemId}`, data: updatedData }));
        });
    }
    // If route or method is not found
    else {
        res.writeHead(404);
        res.end(JSON.stringify({ message: 'Route not found' }));
    }
};

// Create an HTTP server
const server = createServer(requestListener);

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
