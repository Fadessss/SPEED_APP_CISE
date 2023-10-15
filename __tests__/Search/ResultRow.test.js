import { render, fireEvent } from '@testing-library/react';
import ResultRow from '../../components/Search/ResultRow';

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

describe("ResultRow", () => {
    it("should render the correct data in table row", () => {
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );
        expect(getByText('TestTitle')).toBeInTheDocument(); // Replace 'TestTitle' with the actual text you expect in your component
    });

    it("should call setShowPopup and setSelectedResult when 'Summary' button is clicked", () => {
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );

        fireEvent.click(getByText('Summary'));
        expect(setShowPopup).toBeCalledWith(true);
        expect(setSelectedResult).toBeCalledWith(result);
    });

    it("should call setShowRatingPopup and setSelectedResult when 'Rate' button is clicked", () => {
        const setShowPopup = jest.fn();
        const setSelectedResult = jest.fn();
        const setShowRatingPopup = jest.fn();
        const { getByText } = render(
          <table>
            <tbody>
              <ResultRow result={result} setShowPopup={setShowPopup} setSelectedResult={setSelectedResult} setShowRatingPopup={setShowRatingPopup} />
            </tbody>
          </table>
        );

        fireEvent.click(getByText('Rate'));
        expect(setShowRatingPopup).toBeCalledWith(true);
        expect(setSelectedResult).toBeCalledWith(result);
    });
});

