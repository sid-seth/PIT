const express = require('express');
const { spawn } = require('child_process');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 5000;

// Enable CORS
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

let cppProcess = null;

// Health check route
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        cppProcessRunning: !!cppProcess
    });
});

// Start the binary on the first request
app.post('/start-exe', (req, res) => {
    if (cppProcess) {
        return res.status(400).json({ error: 'Process is already running' });
    }

    const binaryPath = path.resolve(__dirname, 'personal_investment_guide_linux');
    let responded = false;

    cppProcess = spawn(binaryPath);

    cppProcess.stdout.once('data', (data) => {
        if (!responded) {
            responded = true;
            res.json({ message: `Process started successfully: ${data.toString()}` });
        }
    });

    cppProcess.stderr.on('data', (data) => {
        console.error(`Error from binary: ${data}`);
    });

    cppProcess.on('error', (err) => {
        console.error(`Failed to start the process: ${err.message}`);
        if (!responded) {
            responded = true;
            res.status(500).json({ error: `Startup failed: ${err.message}` });
        }
    });

    cppProcess.on('close', (code) => {
        console.log(`C++ program exited with code ${code}`);
        cppProcess = null;
    });
});

// Send input to the running process
app.post('/send-input', (req, res) => {
    const input = req.body.input;

    if (!cppProcess) {
        return res.status(400).json({ error: 'Process is not running. Start it first.' });
    }

    if (input === undefined || input === null) {
        return res.status(400).json({ error: 'Input is required' });
    }

    cppProcess.stdin.write(`${input}\n`, (err) => {
        if (err) {
            console.error(`Failed to write to process: ${err.message}`);
            return res.status(500).json({ error: 'Failed to send input to process' });
        }
    });

    cppProcess.stdout.once('data', (data) => {
        return res.json({ message: data.toString() });
    });

    if (input === '0') {
        cppProcess.stdin.end();
    }
});

// Stop and clean up the process
app.post('/stop-exe', (req, res) => {
    if (!cppProcess) {
        return res.status(400).json({ error: 'Process is not running' });
    }

    cppProcess.stdin.end();
    cppProcess.kill();

    cppProcess.on('close', () => {
        cppProcess = null;
        res.json({ message: 'Process stopped successfully' });
    });
});

app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
