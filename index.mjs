import {createServer} from 'node:http'
const requestListener = (req, res) => {
    const parsedUrl = new URL(req.url, `http://${req.headers.host}`);
    res.setHeader('Content-Type', 'application/json');
    console.log(`Request method: ${req.method}, Request URL: ${parsedUrl.pathname}`);

    // GET request handling
    if (req.method === 'GET' && parsedUrl.pathname === '/api/data') {
        res.writeHead(200);
        res.end(JSON.stringify({ message: 'Hello, this is your data!' }));
    }
    else if(req.url == '/'){
        res.writeHead(200);
        res.end(JSON.stringify({page : 'Home'}))
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
    console.log(`http://localhost:${PORT}`);
});
