import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ResultHeader from '../../components/Search/ResultHeader';

// Test case: ResultHeader component renders correctly
test('ResultHeader component renders correctly', () => {
  // Mock the sortConfig and setSortConfig function
  const mockSortConfig = { key: 'title', direction: 'ascending' };
  const setSortConfig = jest.fn();

  // Render the ResultHeader component with the mock props
  render(<ResultHeader sortConfig={mockSortConfig} setSortConfig={setSortConfig} />);

  // Check if the component renders the expected column headers
  expect(screen.getByText('Title')).toBeInTheDocument();
  expect(screen.getByText('Authors')).toBeInTheDocument();
  expect(screen.getByText('Year')).toBeInTheDocument();
  expect(screen.getByText('Journal')).toBeInTheDocument();
  expect(screen.getByText('SE Practice')).toBeInTheDocument();
  expect(screen.getByText('Claim')).toBeInTheDocument();
  expect(screen.getByText('Result')).toBeInTheDocument();
  expect(screen.getByText('Research')).toBeInTheDocument();
  expect(screen.getByText('Participant')).toBeInTheDocument();
  expect(screen.getByText('Summary')).toBeInTheDocument();
  expect(screen.getByText('Rate')).toBeInTheDocument();

  // Simulate a click on a column header and check if the setSortConfig function is called with the expected arguments
  fireEvent.click(screen.getByText('Title'));
  expect(setSortConfig).toHaveBeenCalledWith({ key: 'title', direction: 'descending' });
});
