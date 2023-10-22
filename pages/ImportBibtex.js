import React from 'react';
import { useState } from 'react';
import UploadForm from '../components/Bibtex/UploadForm';
import FeedbackForm from '../components/Bibtex/FeedbackForm';
var bibtexParse = require('@orcid/bibtex-parse-js');

const Upload = () => {
    const [message, setMessage] = useState(null);
    const [jsonData, setJsonData] = useState(null); // Local variable for entire JSON data
    const [entryType, setEntryType] = useState(null);
    const [citationKey, setCitationKey] = useState(null);
    const [title, setTitle] = useState(null);

    // Retrieve the file from the component
    const handleFileChange = (uploadedFile) => {
        checkFile(uploadedFile);
    };

    // Process the file, checking that it is a bibtex file (.bib) only
    const checkFile = (uploadedFile) => {
        if (uploadedFile) {
            // Check that the file is a .bib file
            if (uploadedFile.name.split('.').pop() !== 'bib') {
                // File is not bib, change the file state to null
                // Send a message to the user through the feedback component
                console.log('Invalid file type');
                setMessage('err');
            } else {
                // Process the file
                console.log('File uploaded');
                parseBibtex(uploadedFile);
            }
        }
    };

    const parseBibtex = (uploadedFile) => {
        try {
            const reader = new FileReader();

            reader.onload = (event) => {
                const fileContent = event.target.result;
                const parsedData = bibtexParse.toJSON(fileContent);
                console.log(parsedData);

                // Save entire JSON data to a local variable
                setJsonData(parsedData);

                // Save individual bibliographic details to separate local variables
                if (parsedData && parsedData[0]) {
                    const firstEntry = parsedData[0];
                    setEntryType(firstEntry.entryType || null);
                    setCitationKey(firstEntry.citationKey || null);
                    setTitle(firstEntry.entryTags.title || null);
                }

                setMessage(parsedData);
            };

            reader.onerror = (error) => {
                console.error('Error reading file:', error);
                setMessage('err');
            };

            reader.readAsText(uploadedFile);
        } catch (error) {
            console.error('Error parsing BibTeX:', error);
            setMessage('err');
        }
    };

    // Debugging
    console.log('debugging info');
    console.log(jsonData);
    console.log(entryType);
    console.log(citationKey);
    console.log(title);

    // The actual page
    return (
        <div>
            <UploadForm onFileChange={handleFileChange} />
            <FeedbackForm displayMessage={message} />
        </div>
    );
};

export default Upload;
