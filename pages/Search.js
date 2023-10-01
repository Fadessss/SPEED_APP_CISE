import React, { useState } from 'react';
import styles from './search.module.css';
import Header from '../components/Search/Header.js';
import ResultHeader from '../components/Search/ResultHeader.js';
import ResultRow from '../components/Search/ResultRow.js';
import SummaryPopup from '../components/Search/SummaryPopup.js';
import RatingPopup from '../components/Search/RatingPopup.js';

const topics = ['Topic 1', 'Topic 2', 'Topic 3', 'Topic 4', 'Topic 5'];
const claims = ['Claim 1', 'Claim 2', 'Claim 3', 'Claim 4', 'Claim 5'];

// Dummy data
const results = [
    // Deep Learning Topic
  {
    title: 'Improving Code Quality through Deep Learning Techniques',
    authors: 'James Smith, Maria Rodriguez',
    year: '2018',
    journal: 'The IEEE Journal',
    SEpractice: 'Deep Learning Techniques',
    claim: 'improve code quality',
    result: 'Agree',
    research: 'Case Study',
    participant: 'Practitioner',
  },
  {
    title: 'Applications of Deep Learning in Software Engineering',
    authors: 'Amy Watson, Olivia Walker',
    year: '2017',
    journal: 'International Software Engineering Journal',
    SEpractice: 'Deep Learning Techniques',
    claim: 'improve automated testing',
    result: 'Agree',
    research: 'Survey',
    participant: 'Student',
  },
  {
    title: 'Deep Learning and Software Quality Assurance',
    authors: 'Joseph Cooper and Sam King',
    year: '2019',
    journal: 'Journal of Quality Assurance in Software Engineering',
    SEpractice: 'Deep Learning Techniques',
    claim: 'reduce manual testing efforts',
    result: 'Agree',
    research: 'Case Study',
    participant: 'Practitioner',
  },
  // Agile Topic
  {
    title: 'Software Development Efficiency through Agile Practices',
    authors: 'Robert Johnson',
    year: '2020',
    journal: 'Software Engineering Review',
    SEpractice: 'Agile Practices',
    claim: 'speed up development time',
    result: 'Agree',
    research: 'Interview',
    participant: 'Student',
  },
  {
    title: 'Agile Practices and Software Quality: An Empirical Study',
    authors: 'Jessica Moore and Harper White',
    year: '2021',
    journal: 'Software Quality Journal',
    SEpractice: 'Agile Practices',
    claim: 'have no impact on software quality',
    result: 'Disagree',
    research: 'Interview',
    participant: 'Practitioner',
  },
  {
    title: 'Impacts of Agile Practices on Project Success',
    authors: 'William Johnson, Ava Taylor',
    year: '2016',
    journal: 'The IEEE Software Journal',
    SEpractice: 'Agile Practices',
    claim: 'increase project success rate',
    result: 'Agree',
    research: 'Experiment',
    participant: 'Student',
  },
  // Test Driven Development Topic
  {
    title: 'Influence of Test-driven Development on Software Quality',
    authors: 'Jennifer Brown, Emma Davis',
    year: '2006',
    journal: 'Journal of Software and Systems Development',
    SEpractice: 'Test-driven Development',
    claim: 'improves code quality',
    result: 'Disagree',
    research: 'Survey',
    participant: 'Practitioner',
  },
  {
    title: 'Influence of Test-driven Development on Software Complexity',
    authors: 'Amelia Jackson, Lucas Harris',
    year: '2015',
    journal: 'Complex Systems and Software Engineering Journal',
    SEpractice: 'Test-driven Development',
    claim: 'reduces software complexity',
    result: 'Agree',
    research: 'Survey',
    participant: 'Student',
  },
  {
    title: 'Examining the Effects of Test-driven Development in Global Software Development',
    authors: 'Ella Lewis, Ethan Clark',
    year: '2020',
    journal: 'Global Software Development Journal',
    SEpractice: 'Test-driven Development',
    claim: 'improves workload distribution in global software development',
    result: 'Agree',
    research: 'Case Study',
    participant: 'Practitioner',
  },
  // Pair Programming Topic
  {
    title: 'Enhancing Software Development through Pair Programming',
    authors: 'Oliver Wilson, Sophie Thomas',
    year: '2019',
    journal: 'International Journal of Software Engineering',
    SEpractice: 'Pair Programming',
    claim: 'speeds up development time',
    result: 'Agree',
    research: 'Experiment',
    participant: 'Student',
  },
  {
    title: 'Pair Programming and its Effects on Student Performance',
    authors: 'Freya Wilson, Benjamin Turner',
    year: '2018',
    journal: 'Software Engineering Education Journal',
    SEpractice: 'Pair Programming',
    claim: 'enhances junior developer experience in software engineering.',
    result: 'Agree',
    research: 'Experiment',
    participant: 'Student',
  },
  {
    title: 'Exploring the Positive and Negative Aspects of Pair Programming in Industry Projects',
    authors: 'Eva Green',
    year: '2019',
    journal: 'Journal of Industrial Software Engineering',
    SEpractice: 'Pair Programming',
    claim: 'can hinder individual student performance',
    result: 'Disagree',
    research: 'Interview',
    participant: 'Practitioner',
  },
  // Continuous Integration Topic
  {
    title: 'Continuous Integration and its Effect on Bug Frequency',
    authors: 'Lily Jones, Mason Thompson',
    year: '2019',
    journal: 'Journal of Software Production',
    SEpractice: 'Continuous Integration',
    claim: 'reduces the frequency of bugs',
    result: 'Agree',
    research: 'Experiment',
    participant: 'Practitioner',
  },
  {
    title: 'Impact of Continuous Integration on Development Speed',
    authors: 'Leo Carter',
    year: '2020',
    journal: 'International Journal of Software Development',
    SEpractice: 'Continuous Integration',
    claim: 'speeds up development time',
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
    claim: 'improves code quality',
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