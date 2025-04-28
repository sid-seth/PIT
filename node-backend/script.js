

document.getElementById('inputForm').addEventListener('submit', async (event) => {
    event.preventDefault(); // Prevent the form from refreshing the page

    const userInput = document.getElementById('userInput').value; // Get the user input

    try {
        const response = await fetch('http://localhost:3000/backend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ input: userInput }), // Send user input to the backend
        });

        const responseData = await response.text(); // Read the response from the backend
        document.getElementById('output').innerText = responseData; // Display the response
    } catch (error) {
        console.error('Error:', error);
        document.getElementById('output').innerText = 'Failed to communicate with the backend.';
    }
});
