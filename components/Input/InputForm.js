import React, { Component } from 'react';

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
        };
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({
            [name]: value,
        });
    };

    handleSubmit = (e) => {
        e.preventDefault();
        const errors = this.validateForm();
        if (Object.keys(errors).length === 0) {
            // Form is valid, proceed with submission or other actions
            console.log('Form data submitted:', this.state);
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
        const { errors } = this.state;

        return (
            <form onSubmit={this.handleSubmit} className="user-friendly-form">
                <div className="form-group">
                    <label htmlFor="title">
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
                    />
                    {errors.title && <span className="error-message">{errors.title}</span>}
                </div>

                <div className="form-group">
                    <label htmlFor="authors">
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
                    />
                    {errors.authors && <span className="error-message">{errors.authors}</span>}
                </div>

                {/* Group related fields */}
                <div className="group">
                    <div className="form-group">
                        <label htmlFor="journalOrConferenceName">
                            Journal/Conference Name<span className="required">*</span>:
                        </label>
                        <input
                            type="text"
                            id="journalOrConferenceName"
                            name="journalOrConferenceName"
                            value={this.state.journalOrConferenceName}
                            onChange={this.handleChange}
                            placeholder="Enter the journal/conference name"
                            required
                        />
                        {errors.journalOrConferenceName && (
                            <span className="error-message">{errors.journalOrConferenceName}</span>
                        )}
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="yearOfPublication">
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
                    />
                    {errors.yearOfPublication && (
                        <span className="error-message">{errors.yearOfPublication}</span>
                    )}
                </div>

                <div className="form-group">
                    <label htmlFor="volume">Volume:</label>
                    <input
                        type="number"
                        id="volume"
                        name="volume"
                        value={this.state.volume}
                        onChange={this.handleChange}
                        placeholder="Enter the volume"
                        min="1" // Set the minimum value to 1
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="number">Number:</label>
                    <input
                        type="number"
                        id="number"
                        name="number"
                        value={this.state.number}
                        onChange={this.handleChange}
                        placeholder="Enter the number"
                        min="1" // Set the minimum value to 1
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="pages">Pages:</label>
                    <input
                        type="number"
                        id="pages"
                        name="pages"
                        value={this.state.pages}
                        onChange={this.handleChange}
                        placeholder="Enter the pages"
                        min="1" // Set the minimum value to 1
                    />
                </div>



                <div className="group">
                    <div className="form-group">
                        <label htmlFor="DOI">DOI:</label>
                        <input
                            type="text"
                            id="DOI"
                            name="DOI"
                            value={this.state.DOI}
                            onChange={this.handleChange}
                            placeholder="Enter the DOI"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="SEPractice">
                            SE Practice<span className="required">*</span>:
                        </label>
                        <select
                            id="SEPractice"
                            name="SEPractice"
                            value={this.state.SEPractice}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Select an SE Practice</option>
                            <option value="Communication and Collaboration">Communication and Collaboration</option>
                            <option value="Agile Practices">Agile Practices</option>
                            <option value="Test-driven Development">Test-driven Development</option>
                            <option value="Pair Programming">Pair Programming</option>
                            <option value="Continuous Integration">Continuous Integration</option>
                            {/* Add more SE Practice options here */}
                        </select>
                        {errors.SEPractice && (
                            <span className="error-message">{errors.SEPractice}</span>
                        )}
                    </div>

                    <div className="form-group">
                        <label htmlFor="claim">
                            Claim<span className="required">*</span>:
                        </label>
                        <select
                            id="claim"
                            name="claim"
                            value={this.state.claim}
                            onChange={this.handleChange}
                            required
                        >
                            <option value="">Select a Claim</option>
                            <option value="Reduces manual testing efforts">Reduces manual testing efforts</option>
                            <option value="Speeds up development time">Speeds up development time</option>
                            <option value="Have no impact on software quality">Have no impact on software quality</option>
                            <option value="Increase project success rate">Increase project success rate</option>
                            <option value="Improves automated testing">Improves automated testing</option>
                            <option value="Improves code quality">Improves code quality</option>
                            <option value="Improves workload distribution in global software development">Improves workload distribution in global software development</option>
                            <option value="Can hinder individual student performance">Can hinder individual student performance</option>
                            <option value="Enhances junior developer experience in software engineering">Enhances junior developer experience in software engineering</option>
                            <option value="Reduces the frequency of bugs">Reduces the frequency of bugs</option>
                            <option value="Reduces software complexity">Reduces software complexity</option>
                            {/* Add more Claim options here */}
                        </select>
                        {errors.claim && (
                            <span className="error-message">{errors.claim}</span>
                        )}
                    </div>

                </div>

                <div className="form-group">
                    <label htmlFor="resultOfEvidence">Result of Evidence:</label>
                    <select
                        id="resultOfEvidence"
                        name="resultOfEvidence"
                        value={this.state.resultOfEvidence}
                        onChange={this.handleChange}
                    >
                        <option value="Agree">Agree</option>
                        <option value="Disagree">Disagree</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="typeOfResearch">Type of Research:</label>
                    <select
                        id="typeOfResearch"
                        name="typeOfResearch"
                        value={this.state.typeOfResearch}
                        onChange={this.handleChange}
                    >
                        <option value="Case Study">Case Study</option>
                        <option value="Experiment">Experiment</option>
                        <option value="Survey">Survey</option>
                        <option value="Interview">Interview</option>
                    </select>
                </div>

                <div className="form-group">
                    <label htmlFor="typeOfParticipant">Type of Participant:</label>
                    <select
                        id="typeOfParticipant"
                        name="typeOfParticipant"
                        value={this.state.typeOfParticipant}
                        onChange={this.handleChange}
                    >
                        <option value="Student">Student</option>
                        <option value="Practitioner">Practitioner</option>
                    </select>
                </div>

                <button type="submit">Submit</button>
            </form>
        );
    }
}

export default InputForm;
