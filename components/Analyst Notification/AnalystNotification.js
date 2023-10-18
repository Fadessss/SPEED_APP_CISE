import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "../Analyst Login/analyst.module.css";

export default function AnalystNotification() {
    const [searchResults, setSearchResults] = useState([]);
    let notificationNumber;

    useEffect(() => {
        // Define the asynchronous function inside the useEffect
        const fetchData = async () => {
            try {
                const res = await axios.get("/api/fetchAllResultsAnalysis");
                setSearchResults(res.data);
            } catch (error) {
                console.error("Error while fetching all results", error);
            }
        };

        // Fetch data on component mount
        fetchData();
    }, []); // Empty dependency array means this effect will run only once on mount

    const checkAnalysisStatus = () => {
        let count = 0;
        for (let i = 0; i < searchResults.length; i++) {
            if (searchResults[i].analysisStatus === "Awaiting") {
                count++;
            }
        }
        notificationNumber = count;
    };

    checkAnalysisStatus();

    return (
        <div className={styles.analystNotificationContainer}>
            <h1 className={styles.notificationNumber}>There are {notificationNumber} articles awaiting analysis!</h1>
        </div>
    );
}
