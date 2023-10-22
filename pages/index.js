// Import necessary dependencies from 'react', 'axios' and 'next/link'.
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import styles from "./home.module.css";

// Define our Home component.
export default function Home() {
    // Use react's useState hook to manage the state of text variable.
    const [text, setText] = useState("");

    // The handleSubmit function is triggered when the form is submitted. It makes a POST request to '/api/data' with `text` as payload.
    const handleSubmit = async (event) => {
        // Prevent the default form submission behavior
        event.preventDefault();

        // Send a POST request to our API at the '/api/data' endpoint, and pass along our text data.
        const res = await axios.post("/api/data", { text });
    };

    // Render the UI for our Home component
    return (
        <div className={styles.container}>
            
            {/* Link to input page */}
            <Link href="/Input" className={styles.link}>
                Go to Input page
                <br />
            </Link>
             {/* Link to search page */}
            <Link href="/Search" className={styles.link}>
                Go to Search page
                <br />
            </Link>
             {/* Link to upload page */}
            <Link href="/ImportBibtex" className={styles.link}>
                Go to Upload page
                <br />
            </Link>
             {/* Link to analysis page */}
            <Link href="/Analysis" className={styles.link}>
                Go to Analysis page
                <br />
            </Link>
             {/* Link to moderator page */}
            <Link href="/Moderator" className={styles.link}>
                Go to Moderator page
                <br />
            </Link>
             {/* Link to moderator database debug page */}
            <Link href="/dbDebug" className={styles.link}>
                Moderator Debug page (TESTING ONLY)
                <br />
            </Link>
            {/* Link to analysis database debug page */}
            <Link href="/debugAnalysisDB" className={styles.link}>
                AnalystDB Debug page (TESTING ONLY)
                <br />
            </Link>
            {/* Link to search (articles) database debug page */}
            <Link href="/dbDebugArticles" className={styles.link}>
                Articles Debug page (TESTING ONLY)
                <br />
            </Link>
        </div>
    );
}
