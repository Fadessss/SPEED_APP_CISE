import React, { useState, useEffect } from "react";
import styles from "../components/Analysis/search.module.css";
import Header from "../components/Analysis/Header.js";
import ResultHeader from "../components/Analysis/ResultHeader.js";
import ResultRow from "../components/Analysis/ResultRow.js";
import SummaryPopup from "../components/Search/SummaryPopup.js";
import RatingPopup from "../components/Search/RatingPopup.js";
import axios from "axios";
import AnalystLogin from "../components/Analyst Login/AnalystLogin";
import { set } from "mongoose";
import AnalystNotification from "../components/Analyst Notification/AnalystNotification";
import { toast } from "react-toastify";

async function fetchResults() {
    try {
        const res = await axios.post("/api/fetchResultsAnalysis", { topic: selectedTopic, claim: selectedClaim });
        setSearchResults(res.data);
    } catch (error) {
        console.error("Error while fetching results", error);
    }
}

async function fetchAllResults() {
    try {
        const res = await axios.get("/api/fetchAllResultsAnalysis");
        setSearchResults(res.data);
    } catch (error) {
        console.error("Error while fetching all results", error);
    }
}

function Analysis() {
    //constants and states for topics (unused), claims (unused), summary, ratings and sorting
    const [topics, setTopics] = useState([]);
    const [claims, setClaims] = useState([]);
    const [selectedTopic, setTopic] = useState(null);
    const [selectedClaim, setClaim] = useState(null);
    const [showPopup, setShowPopup] = useState(false);
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [userRating, setUserRating] = useState(1);
    const [averageRating, setAverageRating] = useState(null);
    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: "ascending",
    });
    const [searchResults, setSearchResults] = useState([]);
    const [showAnalystLogin, setShowAnalystLogin] = useState(false);
    const [analystPassword, setAnalystPassword] = useState("");
    const [isAnalystLoggedIn, setIsAnalystLoggedIn] = useState(false);
    const [resultMessage, setResultMessage] = useState("");
    const [analysisSummary, setAnalysisSummary] = useState("");

    // Fetch topics and claims on component mount
    useEffect(() => {
        const fetchTopicsClaims = async () => {
            try {
                const res = await axios.get("/api/fetchTopicsClaimsAnalysis");
                setTopics(res.data.topics);
                setClaims(res.data.claims);

                // Move selectedTopic and selectedClaim setState's here
                if (res.data.topics.length > 0) {
                    setTopic(res.data.topics[0]);
                }
                if (res.data.claims.length > 0) {
                    setClaim(res.data.claims[0]);
                }
            } catch (error) {
                console.error("Error while fetching topics and claims", error);
            }
        };
        fetchTopicsClaims();
    }, []);

    //Fetch individual results based on selected topic and claim
    const fetchResults = async () => {
        try {
            const res = await axios.post("/api/fetchResultsAnalysis", { topic: selectedTopic, claim: selectedClaim });
            setSearchResults(res.data);
        } catch (error) {
            console.error("Error while fetching results", error);
        }
    };

    //fetch all db entries
    const fetchAllResults = async () => {
        try {
            const res = await axios.get("/api/fetchAllResultsAnalysis");
            setSearchResults(res.data);
        } catch (error) {
            console.error("Error while fetching all results", error);
        }
    };

    //sortable columns
    const sortResults = () => {
        let sortedResults = [...searchResults]; // direct reference to searchResults state
        if (sortConfig.direction === "ascending") {
            sortedResults.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1));
        } else {
            sortedResults.sort((a, b) => (a[sortConfig.key] < b[sortConfig.key] ? 1 : -1));
        }
        return sortedResults;
    };

    //rating submit function
    const submitRating = async () => {
        try {
            await saveRating(selectedResult._id, userRating); // save the rating
            const averageRating = await fetchAverageRating(selectedResult._id); // fetch the average rating

            setAverageRating(averageRating); // Update the averageRating state

            toast.success("Rating saved successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error while saving the rating:", error);
            toast.error("Error saving the rating", {
                position: "top-left",
                autoClose: 3000,
            });
        }
    };

    // Function to handle analyst login
const handleAnalystLogin = async () => {
    // Check if the entered password is correct
    if (analystPassword === "1234") {
        setIsAnalystLoggedIn(true);
        setShowAnalystLogin(false);
        setAnalystPassword("");
        console.log("Analyst logged in");
        await fetchAllResults();
    } else {
        alert("Incorrect password. Please try again.");
    }
};

    const handleAnalystLogout = () => {
        setIsAnalystLoggedIn(false);
        console.log("Analyst logged out");
    };

    // function to cycle the analysis status of a result between 'Awaiting' 'In Progress' and 'Completed'
    // const cycleAnalysisStatus = (result) => {
    //     console.log(result.analysisStatus);

    //     if (result.analysisStatus === "Awaiting") {
    //         result.analysisStatus = "In Progress";
    //     } else if (result.analysisStatus === "In Progress") {
    //         result.analysisStatus = "Completed";
    //     } else {
    //         result.analysisStatus = "Awaiting";
    //     }

    //     console.log(result.analysisStatus);
    // };

    // const getAnalysisStatus = (result) => {
    //     return result.analysisStatus;
    // };

    // Function to handle sending a result to the analysis queue
    const publishArticle = (result) => {
        let dataFromOriginalDB = result;
        let dataToPublish;

        dataToPublish = {
            title: dataFromOriginalDB.title,
            authors: dataFromOriginalDB.authors,
            journalOrConferenceName: dataFromOriginalDB.journalOrConferenceName,
            yearOfPublication: dataFromOriginalDB.yearOfPublication,
            volume: dataFromOriginalDB.volume,
            number: dataFromOriginalDB.number,
            pages: dataFromOriginalDB.pages,
            DOI: dataFromOriginalDB.DOI,
            SEPractice: dataFromOriginalDB.SEPractice,
            claim: dataFromOriginalDB.claim,
            resultOfEvidence: dataFromOriginalDB.resultOfEvidence,
            typeOfResearch: dataFromOriginalDB.typeOfResearch,
            typeOfParticipant: dataFromOriginalDB.typeOfParticipant,
            analysisStatus: "Awaiting",
        };

        console.log("Publishing article:", dataToPublish);

        const insertData = async () => {
            try {
                const res = await axios.post("/api/insertToArticlesDB", dataToPublish);

                if (res.status === 200) {
                    console.log("Successfully sent article!");

                    // Update the button text to 'Sent'
                    result.analysisStatus = "Sent";

                    // Trigger a re-render by updating the searchResults state
                    setSearchResults([...searchResults]);

                    toast.success("Article submitted successfully!", {
                        position: "top-right",
                        autoClose: 3000, // Notification will auto-close after 3 seconds
                    });
                } else {
                    console.log("Error sending article!");
                }
            } catch (err) {
                console.error("An error occurred while inserting data", err);
            }
        };

        insertData();
    };


    const submitAnalysisSummary = async (id) => {
        try {
            await axios.post("/api/updateAnalysisSummary", { id, analysisSummary });
            toast.success("Analysis summary saved successfully!", {
                position: "top-right",
                autoClose: 3000,
            });
        } catch (error) {
            console.error("Error while saving the analysis summary:", error);
            toast.error("Error saving the analysis summary", {
                position: "top-left",
                autoClose: 3000,
            });
        }
    };

    //Display page
    return (
        <div className={styles.container}>
            {/* Conditionally render the login component */}
            {!isAnalystLoggedIn ? (
                <>
                    <AnalystLogin
                        setShowAnalystLogin={setShowAnalystLogin}
                        analystPassword={analystPassword}
                        setAnalystPassword={setAnalystPassword}
                        isAnalystLoggedIn={isAnalystLoggedIn}
                        handleAnalystLogin={handleAnalystLogin}
                        handleAnalystLogout={handleAnalystLogout}
                    />
                    <AnalystNotification />
                </>
            ) : (
                <>
                    {/* Header bar */}
                    <Header
                    />
                    {/* Results table */}
                    <table className={styles.table}>
                        <tbody>
                            {/* Column headers */}
                            <ResultHeader sortConfig={sortConfig} setSortConfig={setSortConfig} isAnalystLoggedIn={isAnalystLoggedIn} />
                            {/* Rows (sortable by column header) */}
                            {sortResults().map((result, index) => (
                                <ResultRow
                                    onSubmitAnalysisSummary={submitAnalysisSummary}
                                    analysisSummary={analysisSummary}
                                    setAnalysisSummary={setAnalysisSummary}
                                    key={index}
                                    result={result}
                                    setShowPopup={setShowPopup}
                                    setSelectedResult={setSelectedResult}
                                    setShowRatingPopup={setShowRatingPopup}
                                    isAnalystLoggedIn={isAnalystLoggedIn}
                                    analysisOnClickFunction={publishArticle}
                                    getAnalysisStatus={getAnalysisStatus}
                                    onAnalysisPage={true}
                                />
                            ))}
                        </tbody>
                    </table>

                    {/* Summary popup */}
                    <SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={showPopup} />

                    {/* Rating popup */}
                    <RatingPopup
                        showRatingPopup={showRatingPopup}
                        selectedResult={selectedResult}
                        setShowRatingPopup={setShowRatingPopup}
                        userRating={userRating}
                        setUserRating={setUserRating}
                        submitRating={submitRating}
                        averageRating={averageRating}
                        setAverageRating={setAverageRating}
                    />
                </>
            )}
        </div>
    );
}

export default Analysis;
