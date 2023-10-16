import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import Header from '../components/Search/Header.js';
import ResultHeader from '../components/Search/ResultHeader.js';
import ResultRow from '../components/Search/ResultRow.js';
import SummaryPopup from '../components/Search/SummaryPopup.js';
import RatingPopup from '../components/Search/RatingPopup.js';
import ModeratorLogin from '../components/ModeratorLogin/ModeratorLogin.js'; // Import ModeratorLogin component
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


async function fetchResults() {
    try {
        const res = await axios.post('/api/fetchResults', { topic: selectedTopic, claim: selectedClaim });
        setSearchResults(res.data);
    } catch (error) {
        console.error('Error while fetching results', error);
    }
}

async function fetchAllResults() {
    try {
        const res = await axios.get('/api/fetchAllResults');
        setSearchResults(res.data);
    } catch (error) {
        console.error('Error while fetching all results', error);
    }
}

function Moderator() {
    // Constants and states for topics, claims, summary, ratings, and sorting
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
        direction: 'ascending',
    });
    const [searchResults, setSearchResults] = useState([]);
    const [showModeratorLogin, setShowModeratorLogin] = useState(false);
    const [moderatorPassword, setModeratorPassword] = useState('');
    const [isModeratorLoggedIn, setIsModeratorLoggedIn] = useState(false);



    // Fetch topics and claims on component mount
    useEffect(() => {
        const fetchTopicsClaims = async () => {
            try {
                const res = await axios.get('/api/fetchTopicsClaims');
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
                console.error('Error while fetching topics and claims', error);
            }
        };
        fetchTopicsClaims();
    }, []);

    // Fetch individual results based on selected topic and claim
    const fetchResults = async () => {
        try {
            const res = await axios.post('/api/fetchResults', { topic: selectedTopic, claim: selectedClaim });
            setSearchResults(res.data);
        } catch (error) {
            console.error('Error while fetching results', error);
        }
    };

    // Fetch all db entries
    const fetchAllResults = async () => {
        try {
            const res = await axios.get('/api/fetchAllResults');
            setSearchResults(res.data);
        } catch (error) {
            console.error('Error while fetching all results', error);
        }
    };

    // Sortable columns
    const sortResults = () => {
        let sortedResults = [...searchResults]; // Direct reference to searchResults state
        if (sortConfig.direction === 'ascending') {
            sortedResults.sort((a, b) => (a[sortConfig.key] > b[sortConfig.key] ? 1 : -1));
        } else {
            sortedResults.sort((a, b) => (a[sortConfig.key] < b[sortConfig.key] ? 1 : -1));
        }
        return sortedResults;
    };

    const submitRating = () => {
        setAverageRating(4);
    };

    // Function to handle moderator login
    const handleModeratorLogin = () => {
        // Check if the entered password is correct
        if (moderatorPassword === '1234') {
            setIsModeratorLoggedIn(true);
            setShowModeratorLogin(false);
            setModeratorPassword('');
            console.log('Moderator logged in');
            // Call fetchAllResults when the moderator logs in
            fetchAllResults();
        } else {
            alert('Incorrect password. Please try again.');
        }
    };
    const handleModeratorLogout = () => {
        setIsModeratorLoggedIn(false);
        console.log('Moderator logged out');
    };

    // Function to handle sending a result to the analysis queue
    const sendToAnalysisQueue = (result) => {
        let dataFromOriginalDB = result;
        let dataForAnalysisDB;

        dataForAnalysisDB = {
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
            analysisStatus: 'Awaiting',
        };

        console.log('Sending article to the analysis queue:', dataForAnalysisDB);

        const insertData = async () => {
            try {
                const res = await axios.post('/api/insertToAnalysisDB', dataForAnalysisDB);

                if (res.status === 200) {
                    console.log('Successfully sent article!');

                    // Update the button text to 'Sent'
                    result.analysisStatus = 'Sent';

                    // Trigger a re-render by updating the searchResults state
                    setSearchResults([...searchResults]);

                    toast.success('Article submitted successfully!', {
                        position: 'top-right',
                        autoClose: 3000, // Notification will auto-close after 3 seconds
                    });
                } else {
                    console.log('Error sending article!');
                }
            } catch (err) {
                console.error('An error occurred while inserting data', err);
            }
        };



        insertData();
    };

    // Display page
    return (
        <div className={styles.container}>
            <ToastContainer autoClose={3000} />

            {/* Conditionally render the login component */}
            {!isModeratorLoggedIn ? (
                <ModeratorLogin
                    handleModeratorLogin={handleModeratorLogin}
                    setModeratorPassword={setModeratorPassword}
                    isModeratorLoggedIn={isModeratorLoggedIn}
                    moderatorPassword={moderatorPassword}
                    handleModeratorLogout={handleModeratorLogout}
                />
            ) : (
                <>
                    {/* Header bar */}
                    <Header
                        selectedTopic={selectedTopic}
                        setTopic={setTopic}
                        selectedClaim={selectedClaim}
                        setClaim={setClaim}
                        topics={topics}
                        claims={claims}
                        onGo={fetchResults}
                        onAll={fetchAllResults} // Pass down fetchAllResults function
                        isModeratorLoggedIn={isModeratorLoggedIn}
                        sendToAnalysisQueue={sendToAnalysisQueue}
                    />
                    {/* Results table */}
                    <table className={styles.table}>
                        <tbody>
                            {/* Column headers */}
                            <ResultHeader sortConfig={sortConfig} setSortConfig={setSortConfig} isModeratorLoggedIn={isModeratorLoggedIn} />

                            {/* Rows (sortable by column header) */}
                            {sortResults().map((result, index) => (
                                <ResultRow
                                    key={index}
                                    result={result}
                                    setShowPopup={setShowPopup}
                                    setSelectedResult={setSelectedResult}
                                    setShowRatingPopup={setShowRatingPopup}
                                    isModeratorLoggedIn={isModeratorLoggedIn}
                                    analysisOnClickFunction={sendToAnalysisQueue}
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
                    />
                </>
            )}
        </div>
    );
}

export default Moderator;
