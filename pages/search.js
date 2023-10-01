import React, { useState } from 'react';
import styles from './search.module.css';

// Define your placeholder topics and claims
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
    claim: 'Deep Learning Techniques improve code quality',
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
    claim: 'Deep Learning Techniques improve automated testing',
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
    claim: 'Deep Learning Techniques reduce manual testing efforts',
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
    claim: 'Agile Practices speed up development time',
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
    claim: 'Agile Practices have no impact on software quality',
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
    claim: 'Agile Practices increase project success rate',
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
    claim: 'Test-driven Development improves code quality',
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
    claim: 'Test-driven Development reduces software complexity',
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
    claim: 'Test-driven Development improves workload distribution in global software development',
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
    claim: 'Pair Programming speeds up development time',
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
    claim: 'Pair Programming enhances student results in software engineering subjects',
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
    claim: 'Pair Programming can hinder individual student performance',
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
    claim: 'Continuous Integration reduces the frequency of bugs',
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
  const [selectedResult, setSelectedResult] = useState(null);

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

  return (
    <div className={styles.container}>
      {/* Header bar */}
      <div className={styles.searchBar}>
        {/* Logo */}
        <h1>SPEED</h1>
        <div>
          {/* Topic with dropdown list */}
          <h3>Topic</h3>
          <select value={selectedTopic} onChange={(e) => setTopic(e.target.value)}>
            {topics.map((topic) => (
              <option key={topic} value={topic}>
                {topic}
              </option>
            ))}
          </select>
        </div>
        <div>
          {/* Claim with dropdown list */}
          <h3>Claim</h3>
          <select value={selectedClaim} onChange={(e) => setClaim(e.target.value)}>
            {claims.map((claim) => (
              <option key={claim} value={claim}>
                {claim}
              </option>
            ))}
          </select>
        </div>
        {/* go button (initiates search) */}
        <button>Go</button>
      </div>

      {/* Table of results */}
      <table className={styles.table}>
        <tr className={styles.tableRow}>
          {/* Adding onClick events for sorting */}
          <th className={sortConfig.key === "title" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'title', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Title</th>
          <th className={sortConfig.key === "authors" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'authors', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Authors</th>
          <th className={sortConfig.key === "year" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'year', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Year</th>
          <th className={sortConfig.key === "journal" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'journal', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Journal</th>
          <th className={sortConfig.key === "SEpractice" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'SEpractice', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>SE Practice</th>
          <th className={sortConfig.key === "claim" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'claim', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Claim</th>
          <th className={sortConfig.key === "result" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'result', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Result</th>
          <th className={sortConfig.key === "research" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'research', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Research</th>
          <th className={sortConfig.key === "participant" ? styles.columnSort + " " + styles[sortConfig.direction] : styles.columnSort} onClick={() => setSortConfig({ key: 'participant', direction: sortConfig.direction === 'ascending' ? 'descending' : 'ascending' })}>Participant</th>
          <th>Summary</th>
        </tr>
        {/* Using the sortResults function before mapping */}
        {sortResults(results).map((result, index) => (
          <tr key={index} className={styles.tableRow}>
            {/* table columns */}
            <td className={styles.tableData}>{result.title}</td>
            <td className={styles.tableData}>{result.authors}</td>
            <td className={styles.tableData}>{result.year}</td>
            <td className={styles.tableData}>{result.journal}</td>
            <td className={styles.tableData}>{result.SEpractice}</td>
            <td className={styles.tableData}>{result.claim}</td>
            <td className={styles.tableData}>{result.result}</td>
            <td className={styles.tableData}>{result.research}</td>
            <td className={styles.tableData}>{result.participant}</td>
            {/* Summary button */}
            <td className={styles.tableData}>
              <button onClick={() => { setShowPopup(true); setSelectedResult(result); }}>Summary</button>
            </td>
          </tr>
        ))}
      </table>

      {/* Summary popup */}
      {showPopup ? (
        <div className={styles.popup}>
          <button className={styles.closeButton} onClick={() => setShowPopup(false)}>X</button>
          <h2>{selectedResult.title} - {selectedResult.year} - {selectedResult.authors}</h2>
          <p>This is the summary, about 200 words long. It provides a brief summary of the data related to the claim within the journal article.
          <br /><br />
          Eg. {selectedResult.title} demonstrates evidence which {selectedResult.result}s that {selectedResult.SEpractice} {selectedResult.claim}.
            <br /><br />
            The article was written by {selectedResult.authors} in {selectedResult.year}, and was published in {selectedResult.journal}.
            </p>
        </div>
      ) : null}

    </div>
  );
}

export default Search;