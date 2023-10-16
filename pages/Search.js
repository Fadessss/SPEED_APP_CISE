import React, { useState, useEffect } from 'react';
import styles from './search.module.css';
import Header from '../components/Search/Header.js';
import ResultHeader from '../components/Search/ResultHeader.js';
import ResultRow from '../components/Search/ResultRow.js';
import SummaryPopup from '../components/Search/SummaryPopup.js';
import RatingPopup from '../components/Search/RatingPopup.js';
import axios from 'axios';
import AnalystLogin from '../components/Analyst Login/AnalystLogin';

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

function Search() {
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
        direction: 'ascending',
    });
    const [searchResults, setSearchResults] = useState([]);
    const [showAnalystLogin, setShowAnalystLogin] = useState(false);
    const [analystPassword, setAnalystPassword] = useState('');
    const [isAnalystLoggedIn, setIsAnalystLoggedIn] = useState(false);
    const [resultMessage, setResultMessage] = useState('');

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

    //Fetch individual results based on selected topic and claim
    const fetchResults = async () => {
        try {
            const res = await axios.post('/api/fetchResults', { topic: selectedTopic, claim: selectedClaim });
            setSearchResults(res.data);
        } catch (error) {
            console.error('Error while fetching results', error);
        }
    };

    //fetch all db entries
    const fetchAllResults = async () => {
        try {
            const res = await axios.get('/api/fetchAllResults');
            setSearchResults(res.data);
        } catch (error) {
            console.error('Error while fetching all results', error);
        }
    };

    //sortable columns
    const sortResults = () => {
        let sortedResults = [...searchResults]; // direct reference to searchResults state
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

    // Function to handle analyst login
    const handleAnalystLogin = () => {
        // Check if the entered password is correct
        if (analystPassword === '1234') {
            setIsAnalystLoggedIn(true);
            setShowAnalystLogin(false);
            setAnalystPassword('');
            console.log('Analyst logged in');
        } else {
            alert('Incorrect password. Please try again.');
        }
    };

    const handleAnalystLogout = () => {
        setIsAnalystLoggedIn(false);
        console.log('Analyst logged out');
    };

    // Function to handle sending result to analysis queue
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

        console.log('Sending result to analysis queue:', dataForAnalysisDB);

        const insertData = async () => {
            try {
                const res = await axios.post('/api/insertToAnalysisDB', dataForAnalysisDB);

                if (res.status === 200) {
                    setResultMessage('Data Inserted Successfully');
                } else {
                    setResultMessage('Data Insertion Failed');
                }
            } catch (err) {
                console.error('An error occurred while inserting data', err);
                setResultMessage('An error occurred while inserting data');
            }
        };

        insertData();
    };

    //Display page
    return (
        <div className={styles.container}>
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
                isAnalystLoggedIn={isAnalystLoggedIn}
                sendToAnalysisQueue={sendToAnalysisQueue}
            />
            {/* Analyst login popup */}
            <AnalystLogin
                setShowAnalystLogin={setShowAnalystLogin}
                analystPassword={analystPassword}
                setAnalystPassword={setAnalystPassword}
                isAnalystLoggedIn={isAnalystLoggedIn}
                handleAnalystLogin={handleAnalystLogin}
                handleAnalystLogout={handleAnalystLogout}
            />

            {/* Results table */}
            <table className={styles.table}>
                <tbody>
                    {/* Column headers */}
                    <ResultHeader sortConfig={sortConfig} setSortConfig={setSortConfig} isAnalystLoggedIn={isAnalystLoggedIn} />
                    {/* Rows (sortable by column header) */}
                    {sortResults().map((result, index) => (
                        <ResultRow
                            key={index}
                            result={result}
                            setShowPopup={setShowPopup}
                            setSelectedResult={setSelectedResult}
                            setShowRatingPopup={setShowRatingPopup}
                            isAnalystLoggedIn={isAnalystLoggedIn}
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
        </div>
    );
}

export default Search;
