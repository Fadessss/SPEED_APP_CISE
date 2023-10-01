import React, { useState } from 'react';
import styles from './search.module.css';
import Header from './Header.js';
import ResultHeader from './ResultHeader.js';
import ResultRow from './ResultRow.js';
import SummaryPopup from './SummaryPopup.js';
import RatingPopup from './RatingPopup.js';

const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];
const claims = ['Claim 1', 'Claim 2', 'Claim 3', 'Claim 4', 'Claim 5'];

// Dummy data
const results = [
    {
        title: 'Impact of Continuous Integration on Development Speed',
        authors: 'Leo Carter',
        year: '2020',
        journal: 'International Journal of Software Development',
        SEpractice: 'Continuous Integration',
        claim: 'Continuous Integration speeds up development time',
        result: 'Agree',
        research: 'Case Study',
        participant: 'Student',
    },
    {
        title: 'Adopting Continuous Integration: A Case Study',
        authors: 'Sophia Davis, Jacob Miller',
        year: '2018',
        journal: 'Software Engineering Case Studies',
        SEpractice: 'Continuous Integration',
        claim: 'Adopting Continuous Integration increases code quality',
        result: 'Agree',
        research: 'Case Study',
        participant: 'Practitioner',
    }
];

function Search() {
    const [selectedTopic, setTopic] = useState(topics[0]);
    const [selectedClaim, setClaim] = useState(claims[0]);
    const [showPopup, setShowPopup] = useState(false);
    const [showRatingPopup, setShowRatingPopup] = useState(false);
    const [selectedResult, setSelectedResult] = useState(null);
    const [userRating, setUserRating] = useState(1);
    const [averageRating, setAverageRating] = useState(null);

    const [sortConfig, setSortConfig] = useState({
        key: null,
        direction: 'ascending',
    });

    const sortResults = (results) => {
        let sortedResults = [...results];
        if (sortConfig.direction === 'ascending') {
            sortedResults.sort((a, b) => a[sortConfig.key] > b[sortConfig.key] ? 1 : -1);
        } else {
            sortedResults.sort((a, b) => a[sortConfig.key] < b[sortConfig.key] ? 1 : -1);
        }
        return sortedResults;
    };

    const submitRating = () => {
        setAverageRating(4);
    }

    return (
        <div className={styles.container}>
            <Header selectedTopic={selectedTopic} setTopic={setTopic} selectedClaim={selectedClaim} setClaim={setClaim} topics={topics} claims={claims} />
            <table className={styles.table}>
                <tbody>
                    <ResultHeader sortConfig={sortConfig} setSortConfig={setSortConfig} />
                    {sortResults(results).map((result, index) =>
                        <ResultRow
                            key={index}
                            result={result}
                            setShowPopup={setShowPopup}
                            setSelectedResult={setSelectedResult}
                            setShowRatingPopup={setShowRatingPopup}
                        />
                    )}
                </tbody>
            </table>
            <SummaryPopup
                selectedResult={selectedResult}
                setShowPopup={setShowPopup}
                showPopup={showPopup}
            />
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