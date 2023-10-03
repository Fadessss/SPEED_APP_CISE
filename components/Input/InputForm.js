import React, { Component } from 'react';
import styles from './inputform.module.css';

class InputForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            authors: '',
            journalOrConferenceName: '',
            yearOfPublication: '',
            volume: '',
            number: '',
            pages: '',
            DOI: '',
            SEPractice: '',
            claim: '',
            resultOfEvidence: 'Agree',
            typeOfResearch: 'Case Study',
            typeOfParticipant: 'Student',
            errors: {},
            submitted: false, // Add a submitted state
            isSubmitting: false, // Track form submission
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = async (e) => {
        e.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            // Form is valid, start the submission process
            this.setState({ isSubmitting: true });

            try {
                // Make the API call to submit the form data
                const response = await fetch('/api/insertData', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ data: this.state }), // Send the form data to the API
                });

                if (response.ok) {
                    // Form submission successful, reset the form and disable the button
                    this.setState({
                        submitted: true,
                        isSubmitting: false, // Set isSubmitting to false after successful submission
                    });
                } else {
                    // Handle API call errors here
                    console.error('API call error:', response.statusText);
                    this.setState({ isSubmitting: false }); // Set isSubmitting to false on error
                }
            } catch (error) {
                // Handle submission error, you can show an error message or retry
                console.error('Submission error:', error);
                this.setState({ isSubmitting: false }); // Set isSubmitting to false on error
            }
        } else {
            // Form has errors, update the state to show error messages
            this.setState({ errors });
        }
    };


    validateForm = () => {
        const errors = {};

        if (this.state.title.trim() === '') {
            errors.title = 'Title is required';
        }

        if (this.state.authors.trim() === '') {
            errors.authors = 'Authors are required';
        }

        if (this.state.journalOrConferenceName.trim() === '') {
            errors.journalOrConferenceName = 'Journal/Conference Name is required';
        }

        // Add validation logic for other fields here

        return errors;
    };

    render() {
        const { errors, isSubmitting, submitted } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="input-form">
                <div className={styles.form_group}>
                    <label htmlFor="title" className={styles.form_group_label}>
                        Title<span className="required">*</span>:
                    </label>
                    <input
                        type="text"
                        id="title"
                        name="title"
                        value={this.state.title}
                        onChange={this.handleChange}
                        placeholder="Enter the title"
                        required
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                    {errors.title && <span className={styles.error_message}>{errors.title}</span>}
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="authors" className={styles.form_group_label}>
                        Authors<span className="required">*</span>:
                    </label>
                    <input
                        type="text"
                        id="authors"
                        name="authors"
                        value={this.state.authors}
                        onChange={this.handleChange}
                        placeholder="Enter the authors"
                        required
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                    {errors.authors && <span className={styles.error_message}>{errors.authors}</span>}
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="journalOrConferenceName" className={styles.form_group_label}>
                        Journal/Conference Name<span className="required">*</span>:
                    </label>
                    <select
                        id="journalOrConferenceName"
                        name="journalOrConferenceName"
                        value={this.state.journalOrConferenceName}
                        onChange={this.handleChange}
                        required
                        className={styles.form_group_select}

                    >
                        <option value="">Select a Journal/Conference Name</option>
                        {[
                            "Journal of Quality Assurance in Software Engineering",
                            "Software Engineering Review",
                            "Software Quality Journal",
                            "The IEEE Software Journal",
                            "International Software Engineering Journal",
                            "Global Software Development Journal",
                            "Software Engineering Education Journal",
                            "Journal of Software Production",
                            "Software Engineering Case Studies",
                            "Journal of Software and Systems Development",
                            "Complex Systems and Software Engineering Journal",
                        ].sort().map((journal, index) => (
                            <option key={index} value={journal}>
                                {journal}
                            </option>
                        ))}
                    </select>
                    {errors.journalOrConferenceName && (
                        <span className={styles.error_message}>{errors.journalOrConferenceName}</span>
                    )}
                </div>


                <div className={styles.form_group}>
                    <label htmlFor="yearOfPublication" className={styles.form_group_label}>
                        Year of Publication<span className="required">*</span>:
                    </label>
                    <input
                        type="number"
                        id="yearOfPublication"
                        name="yearOfPublication"
                        value={this.state.yearOfPublication}
                        onChange={this.handleChange}
                        placeholder="Enter the year (e.g., 2023)"
                        min="1900" // Set the minimum year
                        max="2099" // Set the maximum year
                        step="1"   // Allow only whole numbers
                        required
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                    {errors.yearOfPublication && (
                        <span className={styles.error_message}>{errors.yearOfPublication}</span>
                    )}
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="volume" className={styles.form_group_label}>Volume:</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        value={this.state.volume}
                        onChange={this.handleChange}
                        placeholder="Enter the volume"
                        min="1" // Set the minimum value to 1
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="number" className={styles.form_group_label}>Number:</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        placeholder="Enter the number"
                        min="1" // Set the minimum value to 1
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="pages" className={styles.form_group_label}>Pages:</label>
                    <input
                        type="number"
                        id="pages"
                        name="pages"
                        value={this.state.pages}
                        onChange={this.handleChange}
                        placeholder="Enter the pages"
                        min="1" // Set the minimum value to 1
                        className={`form_group_input ${styles.form_group_input}`}
                    />
                </div>



                <div className="group">
                    <div className={styles.form_group}>
                        <label htmlFor="DOI" className={styles.form_group_label}>DOI:</label>
                        <input
                            type="text"
                            id="DOI"
                            name="DOI"
                            value={this.state.DOI}
                            onChange={this.handleChange}
                            placeholder="Enter the DOI"
                            className={`form_group_input ${styles.form_group_input}`}
                        />
                    </div>

                    <div className={styles.form_group}>
                        <label htmlFor="SEPractice" className={styles.form_group_label}>
                            SE Practice<span className="required">*</span>:
                        </label>
                        <select
                            id="SEPractice"
                            name="SEPractice"
                            value={this.state.SEPractice}
                            onChange={this.handleChange}
                            required
                            className={styles.form_group_select}

                        >
                            <option value="">Select an SE Practice</option>
                            {[
                                "Communication and Collaboration",
                                "Agile Practices",
                                "Test-driven Development",
                                "Pair Programming",
                                "Continuous Integration",
                                // Add more SE Practice options here
                            ].sort().map((practice, index) => (
                                <option key={index} value={practice}>
                                    {practice}
                                </option>
                            ))}
                        </select>
                        {errors.SEPractice && (
                            <span className={styles.error_message}>{errors.SEPractice}</span>
                        )}
                    </div>


                    <div className={styles.form_group}>
                        <label htmlFor="claim" className={styles.form_group_label}>
                            Claim<span className="required">*</span>:
                        </label>
                        <select
                            id="claim"
                            name="claim"
                            value={this.state.claim}
                            onChange={this.handleChange}
                            required
                            className={styles.form_group_select}

                        >
                            <option value="">Select a Claim</option>
                            {[
                                "Reduces manual testing efforts",
                                "Speeds up development time",
                                "Have no impact on software quality",
                                "Increase project success rate",
                                "Improves automated testing",
                                "Improves code quality",
                                "Improves workload distribution in global software development",
                                "Can hinder individual student performance",
                                "Enhances junior developer experience in software engineering",
                                "Reduces the frequency of bugs",
                                "Reduces software complexity",
                                // Add more Claim options here
                            ].sort().map((claim, index) => (
                                <option key={index} value={claim}>
                                    {claim}
                                </option>
                            ))}
                        </select>
                        {errors.claim && (
                            <span className={styles.error_message}>{errors.claim}</span>
                        )}
                    </div>

                </div>

                <div className={styles.form_group}>
                    <label htmlFor="resultOfEvidence" className={styles.form_group_label}>Result of Evidence:</label>
                    <select
                        id="resultOfEvidence"
                        name="resultOfEvidence"
                        value={this.state.resultOfEvidence}
                        onChange={this.handleChange}
                        className={styles.form_group_select}

                    >
                        <option value="Agree">Agree</option>
                        <option value="Disagree">Disagree</option>
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="typeOfResearch" className={styles.form_group_label}>Type of Research:</label>
                    <select
                        id="typeOfResearch"
                        name="typeOfResearch"
                        value={this.state.typeOfResearch}
                        onChange={this.handleChange}
                        className={styles.form_group_select}

                    >
                        <option value="Case Study">Case Study</option>
                        <option value="Experiment">Experiment</option>
                        <option value="Survey">Survey</option>
                        <option value="Interview">Interview</option>
                    </select>
                </div>

                <div className={styles.form_group}>
                    <label htmlFor="typeOfParticipant" className={styles.form_group_label}>Type of Participant:</label>
                    <select
                        id="typeOfParticipant"
                        name="typeOfParticipant"
                        value={this.state.typeOfParticipant}
                        onChange={this.handleChange}
                        className={styles.form_group_select}
                    >
                        <option value="Student">Student</option>
                        <option value="Practitioner">Practitioner</option>
                    </select>
                </div>

                <button
                    type="submit"
                    className={`${styles.submit_button} ${submitted ? styles.submitted_button : ''}`}
                    disabled={isSubmitting || submitted}
                >
                    {isSubmitting ? 'Submitting...' : submitted ? 'Submitted' : 'Submit'}
                </button>

            </form>
        );
    }
}

export default InputForm;
