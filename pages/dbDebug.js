import { useState, useEffect } from 'react';
import axios from 'axios';

export default function dbDebug() {
  const [resultMessage, setResultMessage] = useState('');

  const data = [
    {
      title: 'Improving Code Quality through Deep Learning Techniques',
      authors: ['James Smith', 'Maria Rodriguez'],
      journalOrConferenceName: 'The IEEE Journal',
      yearOfPublication: 2018,
      volume: 1,
      number: 1,
      pages: 'pp.1-10',
      DOI: 'SomeValidDOI',
      SEPractice: 'Deep Learning Techniques',
      claim: 'Deep Learning Techniques improve code quality',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Applications of Deep Learning in Software Engineering',
      authors: ['Amy Watson', 'Olivia Walker'],
      journalOrConferenceName: 'International Software Engineering Journal',
      yearOfPublication: 2017,
      volume: 2,
      number: 2,
      pages: 'pp.11-20',
      DOI: 'AnotherValidDOI',
      SEPractice: 'Deep Learning Techniques',
      claim: 'Deep Learning Techniques improve automated testing',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Deep Learning and Software Quality Assurance',
      authors: ['Joseph Cooper', 'Sam King'],
      journalOrConferenceName: 'Journal of Quality Assurance in Software Engineering',
      yearOfPublication: 2019,
      volume: 3,
      number: 3,
      pages: 'pp.21-30',
      DOI: 'YetAnotherValidDOI',
      SEPractice: 'Deep Learning Techniques',
      claim: 'Deep Learning Techniques reduce manual testing efforts',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Software Development Efficiency through Agile Practices',
      authors: ['Robert Johnson'],
      journalOrConferenceName: 'Software Engineering Review',
      yearOfPublication: 2020,
      volume: 4,
      number: 4,
      pages: 'pp.31-40',
      DOI: 'AndAnotherValidDOI',
      SEPractice: 'Agile Practices',
      claim: 'Agile Practices speed up development time',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Agile Practices and Software Quality: An Empirical Study',
      authors: ['Jessica Moore', 'Harper White'],
      journalOrConferenceName: 'Software Quality Journal',
      yearOfPublication: 2021,
      volume: 5,
      number: 5,
      pages: 'pp.41-50',
      DOI: 'MoreDOIs',
      SEPractice: 'Agile Practices',
      claim: 'Agile Practices have no impact on software quality',
      resultOfEvidence: 'Disagree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Practitioner',
    },
  ];

  const insertData = async () => {
    try {
      const res = await axios.post('/api/insertData', { data });

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

  const dropCollection = async () => {
    try {
      const res = await axios.post('/api/dropCollection', { collectionName: 'sepractices' });

      if (res.status === 200) {
        setResultMessage('Collection Dropped Successfully');
      } else {
        setResultMessage('Failed to Drop Collection');
      }
    } catch (err) {
      console.error('An error occurred while dropping collection', err);
      setResultMessage('An error occurred while dropping collection');
    }
  };

  return (
    <div>
      <button onClick={insertData}>Insert Data</button>
      <button onClick={dropCollection}>Drop Collection</button>
      <p>{resultMessage}</p>
    </div>
  );
}