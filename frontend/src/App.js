import React, { useState } from 'react';

function App() {
  const [value, setValue] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState(null);

  async function onSubmit(e) {
    e.preventDefault();
    setError(null); // Clear any previous error

    try {
      const res = await fetch('https://new-serveless.azurewebsites.net/api/HttpTrigger1?code=jewh3D2qhjJbsL6RPVVkka9EdSb_K5H8P-KUpbzZC0-aAzFuaTd-bQ%3D%3D', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json', // Ensure you're sending JSON
        },
        body: JSON.stringify({ name: value }), // Send name in request body
      });

      // Check if the response is valid and in JSON format
      const contentType = res.headers.get('Content-Type');
      if (contentType && contentType.includes('application/json')) {
        const data = await res.json();
        setResponse(data); // Handle JSON response
      } else {
        const text = await res.text(); // Handle non-JSON response (like HTML error page)
        setResponse(text);
      }
    } catch (err) {
      setError('Something went wrong: ' + err.message);
    }
  }

  return (
    <div className="App">
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={value}
          onChange={(e) => setValue(e.target.value)} // Correct state update for value
        />
        <button type="submit">Submit</button>
      </form>

      {response && <p>{response}</p>} {/* Display the response */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display any error */}
    </div>
  );
}

export default App;
