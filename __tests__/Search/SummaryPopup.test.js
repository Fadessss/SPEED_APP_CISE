// import everything necessary for the tests
import { render, fireEvent } from '@testing-library/react';
import SummaryPopup from '../../components/Search/SummaryPopup';

// mock data for populating the SummaryPopup props
const selectedResult = {
    title: "TestTitle",
    yearOfPublication: "2022",
    authors: "TestAuthor",
    resultOfEvidence: "TestEvidence",
    SEPractice: "TestSEPractice",
    claim: "TestClaim",
    journalOrConferenceName: "TestConName"
};

describe("SummaryPopup", () => {
    it("should render the popup when showPopup is true", () => {
        const setShowPopup = jest.fn();
        const { asFragment } = render(<SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={true}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should not render the popup when showPopup is false", () => {
        const setShowPopup = jest.fn();
        const { asFragment } = render(<SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={false}/>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("should call setShowPopup function when close button is clicked", () => {
        const setShowPopup = jest.fn();
        const { getByText } = render(<SummaryPopup selectedResult={selectedResult} setShowPopup={setShowPopup} showPopup={true}/>);

        fireEvent.click(getByText('X'));
        expect(setShowPopup).toHaveBeenCalled();
    });
});