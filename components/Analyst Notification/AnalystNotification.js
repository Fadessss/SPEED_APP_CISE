import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Analyst Login/analyst.module.css";

export default function AnalystNotification() {
    const [searchResults, setSearchResults] = useState([]); // State to store search results
    let notificationNumber; // Variable to store the count of articles awaiting analysis

    useEffect(() => {
        // Define an asynchronous function to fetch data from an API
        const fetchData = async () => {
            try {
                // Send a GET request to the server to fetch all analysis results
                const res = await axios.get("/api/fetchAllResultsAnalysis");
                // Update the searchResults state with the fetched data
                setSearchResults(res.data);
            } catch (error) {
                console.error("Error while fetching all results", error);
            }
        };

        // Fetch data on component mount (runs only once)
        fetchData();
    }, []); // The empty dependency array means this effect runs once on mount

    // Function to count the number of articles awaiting analysis
    const checkAnalysisStatus = () => {
        let count = 0; // Initialize a count variable

        for (let i = 0; i < searchResults.length; i++) {
            // Iterate through searchResults
            if (searchResults[i].analysisStatus === "Awaiting") {
                // If the analysisStatus is "Awaiting"
                count++; // Increment the count
            }
        }

        notificationNumber = count; // Update the notificationNumber
    };

    checkAnalysisStatus(); // Call the function to count articles awaiting analysis

    return (
        <div className={styles.analystNotificationContainer}>
            <h1 className={styles.notificationNumber}>
                There are {notificationNumber} articles awaiting analysis!
            </h1>
        </div>
    );
}
