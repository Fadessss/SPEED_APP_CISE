import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import RatingPopup from '../../components/Search/RatingPopup';

test('RatingPopup component renders correctly', () => {
  // Mock the required props
  const selectedResult = {
    title: 'Sample Title',
  };
  const setShowRatingPopup = jest.fn();
  const showRatingPopup = true;
  const userRating = 3;
  const setUserRating = jest.fn();
  const submitRating = jest.fn();


  // Render the RatingPopup component with the mock props
  render(
    <RatingPopup
      selectedResult={selectedResult}
      setShowRatingPopup={setShowRatingPopup}
      showRatingPopup={showRatingPopup}
      userRating={userRating}
      setUserRating={setUserRating}
      submitRating={submitRating}
    />
  );

  // Check if the component renders the expected content
  expect(screen.getByText('Rate Sample Title')).toBeInTheDocument();
  expect(screen.getByText('1')).toBeInTheDocument();
  expect(screen.getByText('2')).toBeInTheDocument();
  expect(screen.getByText('3')).toBeInTheDocument();
  expect(screen.getByText('4')).toBeInTheDocument();
  expect(screen.getByText('5')).toBeInTheDocument();
  expect(screen.getByText('Submit Rating')).toBeInTheDocument();


  // Simulate a click on the close button and check if the setShowRatingPopup function is called
  fireEvent.click(screen.getByText('X'));
  expect(setShowRatingPopup).toHaveBeenCalledWith(false);

  // You can add more test cases to cover other interactions and scenarios as needed.
});
