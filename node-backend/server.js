// const express = require('express');
// const { exec } = require('child_process');
// const app = express();
// const port = 3000;
// const cors = require('cors');
// app.use(cors());

// // app.use(express.static('public'));

// app.get('/backend', (req, res) => {
//     exec('backend.exe', (error, stdout, stderr) => {
//         if (error) {
//             console.error(`Error: ${error.message}`);
//             res.status(500).send('Error executing C++ code.');
//             return;
//         }
//         if (stderr) {
//             console.error(`Stderr: ${stderr}`);
//         }
//         res.send(stdout); // Output from the C++ backend
//     });
// });

// async function fetchBackend() {
//     const response = await fetch('http://localhost:3000/backend');
//     const text = await response.text();
//     document.getElementById('output').innerText = text;
// }

// app.listen(port, () => {
//     console.log(`Server is running at http://localhost:${port}`);
// });



const express = require('express');
const { spawn } = require('child_process');
const app = express();
const port = 5000;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON request bodies
app.use(express.json());

// Serve frontend files (ensure the public folder exists)
app.use(express.static('public'));

// Handle POST requests to the backend
app.post('/backend', (req, res) => {
    const userInput = req.body.input; // Get the input value from the request body

    const process = spawn('interactive_backend.exe'); // Start the C++ executable

    // Send the input to the C++ program
    process.stdin.write(userInput + '\n');
    process.stdin.end();

    let output = '';

    // Retrieve the output from the C++ program
    process.stdout.on('data', (data) => {
        output += data.toString(); // Append the output
    });

    process.stderr.on('data', (data) => {
        console.error(`Error: ${data.toString()}`);
    });

    process.on('close', (code) => {
        if (code !== 0) {
            res.status(500).send('C++ process exited with an error.');
            return;
        }
        res.send(output); // Send the C++ program's response back to the frontend
    });
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
