// Import testing utilities for rendering and interaction
import { render, fireEvent } from '@testing-library/react';

// Import the component to be tested
import SummaryPopup from '../../components/Search/SummaryPopup';

// Define mock data for populating the SummaryPopup props
const selectedResult = {
    title: "TestTitle",
    yearOfPublication: "2022",
    authors: "TestAuthor",
    resultOfEvidence: "TestEvidence",
    SEPractice: "TestSEPractice",
    claim: "TestClaim",
    journalOrConferenceName: "TestConName"
};

// Begin describing the test suite for the SummaryPopup component
describe("SummaryPopup", () => {
    // Test case: It should render the popup when showPopup is true
    it("should render the popup when showPopup is true", () => {
        // Create a mock function for setShowPopup
        const setShowPopup = jest.fn();
        
        // Render the SummaryPopup component with provided data and function
        const { asFragment } = render(
            <SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={true}/>
        );
        
        // Take a snapshot of the rendered component for comparison
        expect(asFragment()).toMatchSnapshot();
    });

    // Test case: It should not render the popup when showPopup is false
    it("should not render the popup when showPopup is false", () => {
        // Create a mock function for setShowPopup
        const setShowPopup = jest.fn();
        
        // Render the SummaryPopup component with provided data and function
        const { asFragment } = render(
            <SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={false}/>
        );
        
        // Take a snapshot of the rendered component for comparison
        expect(asFragment()).toMatchSnapshot();
    });

    // Test case: It should call setShowPopup function when the close button is clicked
    it("should call setShowPopup function when close button is clicked", () => {
        // Create a mock function for setShowPopup
        const setShowPopup = jest.fn();
        
        // Render the SummaryPopup component with provided data and function
        const { getByText } = render(
            <SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={true}/>
        );

        // Simulate a click on the 'X' close button
        fireEvent.click(getByText('X'));

        // Expect that setShowPopup function has been called
        expect(setShowPopup).toHaveBeenCalled();
    });
});
