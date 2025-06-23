const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());





// Set up a WebSocket server
// const wss = new WebSocket.Server({ port: 5001 }); // Use a separate port for WebSocket communication

// wss.on('connection', (ws) => {
//     console.log('Client connected to WebSocket');

//     ws.on('close', () => {
//         console.log('Client disconnected from WebSocket');
//     });
// });

let buffer = "";

// websocket.on("message", (data) => {
//     buffer += data.toString(); // Append incoming data to the buffer
//     if (buffer.includes("END")) { // Check for the delimiter
//         const messages = buffer.split("END"); // Split the buffer into messages
//         buffer = messages.pop(); // Keep any leftover (incomplete) data
//         messages.forEach((message) => broadcastToClients(message));
//     }
// });

// Broadcast output to all connected WebSocket clients
// function broadcastToClients(data) {
//     wss.clients.forEach((client) => {
//         if (client.readyState === WebSocket.OPEN) {
//             client.send(data);
//         }
//     });
// }









// Persistent child process for the `.exe` file
let cppProcess = null;





// Start the .exe file on the first request
app.post('/start-exe', (req, res) => {
    if (!cppProcess) {
        cppProcess = spawn('./personal_investment_guide_linux');




        
//         // Modify stdout handler in '/start-exe' endpoint
// cppProcess.stdout.on('data', (data) => {
//     console.log(`Output from .st_exe: ${data}`);
//     broadcastToClients(data.toString()); // Send data to WebSocket clients
// });


        // cppProcess.stdout.on('data', (data) => {
        //     console.log(`Output from .exe: ${data}`);
            
        // });

        cppProcess.stderr.on('data', (data) => {
            console.error(`Error from .exe: ${data}`);
        });

        cppProcess.on('error', (err) => {
            console.error(`Failed to start the process: ${err.message}`);
        });

        cppProcess.on('close', (code) => {
            console.log(`C++ program exited with code ${code}`);
            cppProcess = null; // Reset the process when it exits
        });
 
        cppProcess.stdout.once('data', (data) => {
            console.log(`Output from process: ${data}`);
            // return res.json({ message: data.toString() }); // Send the output as the response
            res.json({ message: `Process started successfully ${data.toString()}` });
        });
    } else {
        res.status(400).json({ error: 'Process is already running' });
    }
});

// Send input to the running .exe file
app.post('/send-input', (req, res) => {
    const input = req.body.input;

    if (!cppProcess) {
        return res.status(400).json({ error: 'Process is not running. Start it first.\n' });
    }

    if (input === undefined || input === null) {
        return res.status(400).json({ error: 'Input is required' });
    }

    cppProcess.stdin.write(`${input}\n`, (err) => {
        if (err) {
            console.error(`Failed to write to process: ${err.message}`);
            return res.status(500).json({ error: 'Failed to send input to process' });
        }

        // res.json({ message: `Input "${input}" sent to the process` });
    });
    cppProcess.stdout.once('data', (data) => {
        console.log(`Output from process: ${data}`);
        return res.json({ message: data.toString() }); // Send the output as the response
    });
       
        // Modify stdout handler in '/start-exe' endpoint
// cppProcess.stdout.on('data', (data) => {
//     console.log(`Output from .in_exe: ${data}`);
//     broadcastToClients(data.toString()); // Send data to WebSocket clients
// });
    // Optional: Exit process if input is "0"
    if (input === '0') {
        cppProcess.stdin.end();
    }
});

// Shutdown the server and .exe process
app.post('/stop-exe', (req, res) => {
    if (cppProcess) {
        cppProcess.stdin.end(); // Gracefully end the input stream
        cppProcess.kill(); // Terminate the process
        cppProcess = null;
        res.json({ message: 'Process stopped successfully' });
    } else {
        res.status(400).json({ error: 'Process is not running' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
