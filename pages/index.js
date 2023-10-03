// Import necessary dependencies from 'react', 'axios' and 'next/link'.
import { useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import UploadForm from '../components/Bibtex/UploadForm';

// Define our Home component.
export default function Home() {
    // Use react's useState hook to manage the state of text variable.
    const [text, setText] = useState('');

    // The handleSubmit function is triggered when the form is submitted. It makes a POST request to '/api/data' with `text` as payload.
    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Send a POST request to our API at the '/api/data' endpoint, and pass along our text data.
        const res = await axios.post('/api/data', { text });
    };

    // Render the UI for our Home component
    return (
        <div>
            <form onSubmit={handleSubmit}>
                {/* A text field with a submit button to test database functionality */}
                <label>
                    Text:
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
            {/* Link to search page */}
            <Link href="/Search">Go to Search page</Link>
            <br />
            <Link href="/ImportBibtex">Go to Upload page</Link>
        </div>
    );
}
