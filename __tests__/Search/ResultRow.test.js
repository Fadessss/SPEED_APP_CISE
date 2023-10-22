// Import testing utilities for rendering and interaction
import { render, fireEvent } from '@testing-library/react';

// Import the component to be tested
import ResultRow from '../../components/Search/ResultRow';

// Define mock data for populating the ResultRow props
const result = {
    title: "TestTitle",
    yearOfPublication: "2022",
    authors: "TestAuthor",
    resultOfEvidence: "TestEvidence",
    SEPractice: "TestSEPractice",
    claim: "TestClaim",
    journalOrConferenceName: "TestConName",
    typeOfResearch: "TestResearch",
    typeOfParticipant: "TestParticipant"
};

// Begin describing the test suite for the ResultRow component
describe("ResultRow", () => {
    // Test case: It should render the correct data in the table row
    it("should render the correct data in the table row", () => {
        // Create mock functions for setShowPopup, setSelectedResult, and setShowRatingPopup
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();

        // Render the ResultRow component with provided data and functions within a table
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );

        // Expect that 'TestTitle' or the actual expected text is present in the rendered component
        expect(getByText('TestTitle')).toBeInTheDocument(); // Replace 'TestTitle' with the expected text in your component
    });

    // Test case: It should call setShowPopup and setSelectedResult when 'Summary' button is clicked
    it("should call setShowPopup and setSelectedResult when 'Summary' button is clicked", () => {
        // Create mock functions for setShowPopup and setSelectedResult
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();

        // Render the ResultRow component with provided data and functions within a table
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );

        // Simulate a click on the 'Summary' button
        fireEvent.click(getByText('Summary'));

        // Expect that setShowPopup has been called with 'true' and setSelectedResult with the result data
        expect(setShowPopup).toBeCalledWith(true);
        expect(setSelectedResult).toBeCalledWith(result);
    });

    // Test case: It should call setShowRatingPopup and setSelectedResult when 'Rate' button is clicked
    it("should call setShowRatingPopup and setSelectedResult when 'Rate' button is clicked", () => {
        // Create mock functions for setShowPopup, setSelectedResult, and setShowRatingPopup
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();

        // Render the ResultRow component with provided data and functions within a table
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );

        // Simulate a click on the 'Rate' button
        fireEvent.click(getByText('Rate'));

        // Expect that setShowRatingPopup has been called with 'true' and setSelectedResult with the result data
        expect(setShowRatingPopup).toBeCalledWith(true);
        expect(setSelectedResult).toBeCalledWith(result);
    });
});
