// UploadForm.js:

import React from 'react';
import { ChangeEvent, useState } from 'react';
import styles from './upload.module.css';
import { MdCloudUpload, MdDelete } from 'react-icons/md';
import { AiFillFileImage } from 'react-icons/ai';

const UploadForm = ({ onFileChange }) => {
    const [file, setFile] = useState();

    function handleFileUpload(event) {
        const uploadedFile = event.target.files[0];
        setFile(uploadedFile);
        onFileChange(uploadedFile); // Pass the file to the callback function
    }

    // Component
    return (
        <div className={styles.uploadContainer}>
            <form>
                <div className={styles.upload}>
                    <div className={styles.uploadIcon}>
                        <AiFillFileImage size={30} />
                    </div>
                    <div className={styles.uploadText}>
                        <label className={styles.uploadLabel}>Upload a file</label>
                        <input id="file-upload" type="file" onChange={handleFileUpload} />
                    </div>
                </div>
            </form>
        </div>
    );
};

export default UploadForm;
