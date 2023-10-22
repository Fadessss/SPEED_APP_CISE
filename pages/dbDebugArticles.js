import { useState, useEffect } from 'react';
import axios from 'axios';

export default function DbDebug() {
  const [resultMessage, setResultMessage] = useState('');

  const data = [
    {
      title: 'Improving Code Quality through Deep Learning Techniques',
      authors: ['James Smith & Maria Rodriguez'],
      journalOrConferenceName: 'The IEEE Journal',
      yearOfPublication: 2018,
      volume: 1,
      number: 1,
      pages: 'pp.1-10',
      DOI: '10.1234/ijkl7890',
      SEPractice: 'Communication and Collaboration',
      claim: 'improves code quality',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Applications of Deep Learning in Software Engineering',
      authors: ['Amy Watson & Olivia Walker'],
      journalOrConferenceName: 'International Software Engineering Journal',
      yearOfPublication: 2017,
      volume: 2,
      number: 2,
      pages: 'pp.11-20',
      DOI: '10.5678/mnop0123',
      SEPractice: 'Communication and Collaboration',
      claim: 'improves automated testing',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Survey',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Deep Learning and Software Quality Assurance',
      authors: ['Joseph Cooper & Sam King'],
      journalOrConferenceName: 'Journal of Quality Assurance in Software Engineering',
      yearOfPublication: 2019,
      volume: 3,
      number: 3,
      pages: 'pp.21-30',
      DOI: '10.9012/qrst4567',
      SEPractice: 'Communication and Collaboration',
      claim: 'reduces manual testing efforts',
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
      DOI: '10.3456/uvwx7891',
      SEPractice: 'Agile Practices',
      claim: 'speed up development time',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Interview',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Agile Practices and Software Quality: An Empirical Study',
      authors: ['Jessica Moore & Harper White'],
      journalOrConferenceName: 'Software Quality Journal',
      yearOfPublication: 2021,
      volume: 5,
      number: 5,
      pages: 'pp.41-50',
      DOI: '10.6789/yza1234',
      SEPractice: 'Agile Practices',
      claim: 'have no impact on software quality',
      resultOfEvidence: 'Disagree',
      typeOfResearch: 'Interview',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Impacts of Agile Practices on Project Success',
      authors: ['William Johnson & Ava Taylor'],
      journalOrConferenceName: 'The IEEE Software Journal',
      yearOfPublication: 2016,
      volume: 6,
      number: 6,
      pages: 'pp.51-60',
      DOI: '10.2222/bcd3456',
      SEPractice: 'Agile Practices',
      claim: 'increase project success rate',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Influence of Test-driven Development on Software Quality',
      authors: ['Jennifer Brown & Emma Davis'],
      journalOrConferenceName: 'Journal of Software and Systems Development',
      yearOfPublication: 2006,
      volume: 7,
      number: 7,
      pages: 'pp.61-70',
      DOI: '10.3333/efg7890',
      SEPractice: 'Test-driven Development',
      claim: 'improves code quality',
      resultOfEvidence: 'Disagree',
      typeOfResearch: 'Survey',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Influence of Test-driven Development on Software Complexity',
      authors: ['Amelia Jackson & Lucas Harris'],
      journalOrConferenceName: 'Complex Systems and Software Engineering Journal',
      yearOfPublication: 2015,
      volume: 8,
      number: 8,
      pages: 'pp.71-80',
      DOI: '10.4444/hij1234',
      SEPractice: 'Test-driven Development',
      claim: 'reduces software complexity',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Survey',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Examining the Effects of Test-driven Development in Global Software Development',
      authors: ['Ella Lewis & Ethan Clark'],
      journalOrConferenceName: 'Global Software Development Journal',
      yearOfPublication: 2020,
      volume: 9,
      number: 9,
      pages: 'pp.81-90',
      DOI: '10.5555/klm4567',
      SEPractice: 'Test-driven Development',
      claim: 'improves workload distribution in global software development',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Enhancing Software Development through Pair Programming',
      authors: ['Oliver Wilson & Sophie Thomas'],
      journalOrConferenceName: 'International Journal of Software Engineering',
      yearOfPublication: 2019,
      volume: 10,
      number: 10,
      pages: 'pp.91-100',
      DOI: '10.6666/nop7891',
      SEPractice: 'Pair Programming',
      claim: 'speeds up development time',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Pair Programming and its Effects on Student Performance',
      authors: ['Freya Wilson & Benjamin Turner'],
      journalOrConferenceName: 'Software Engineering Education Journal',
      yearOfPublication: 2018,
      volume: 11,
      number: 11,
      pages: 'pp.101-110',
      DOI: '10.7777/qrs1234',
      SEPractice: 'Pair Programming',
      claim: 'enhances junior developer experience in software engineering',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Exploring the Positive and Negative Aspects of Pair Programming in Industry Projects',
      authors: ['Eva Green'],
      journalOrConferenceName: 'Journal of Industrial Software Engineering',
      yearOfPublication: 2019,
      volume: 12,
      number: 12,
      pages: 'pp.111-120',
      DOI: '10.8888/tuv4567',
      SEPractice: 'Pair Programming',
      claim: 'can hinder individual student performance',
      resultOfEvidence: 'Disagree',
      typeOfResearch: 'Interview',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Continuous Integration and its Effect on Bug Frequency',
      authors: ['Lily Jones & Mason Thompson'],
      journalOrConferenceName: 'Journal of Software Production',
      yearOfPublication: 2019,
      volume: 13,
      number: 13,
      pages: 'pp.121-130',
      DOI: '10.9999/wxy7891',
      SEPractice: 'Continuous Integration',
      claim: 'reduces the frequency of bugs',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Experiment',
      typeOfParticipant: 'Practitioner',
    },
    {
      title: 'Impact of Continuous Integration on Development Speed',
      authors: ['Leo Carter'],
      journalOrConferenceName: 'International Journal of Software Development',
      yearOfPublication: 2020,
      volume: 14,
      number: 14,
      pages: 'pp.131-140',
      DOI: '10.1010/zab2345',
      SEPractice: 'Continuous Integration',
      claim: 'speeds up development time',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Student',
    },
    {
      title: 'Adopting Continuous Integration: A Case Study',
      authors: ['Sophia Davis & Jacob Miller'],
      journalOrConferenceName: 'Software Engineering Case Studies',
      yearOfPublication: 2018,
      volume: 15,
      number: 15,
      pages: 'pp.141-150',
      DOI: '10.1111/cde5678',
      SEPractice: 'Continuous Integration',
      claim: 'improves code quality',
      resultOfEvidence: 'Agree',
      typeOfResearch: 'Case Study',
      typeOfParticipant: 'Practitioner',
    }
  ];

  const insertData = async () => {
    try {
      const res = await axios.post('/api/insertDataDebugArticles', { data });

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
      const res = await axios.post('/api/dropCollection', { collectionName: 'articles' });

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