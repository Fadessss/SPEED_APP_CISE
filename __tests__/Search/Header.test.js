import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Header from '../../components/Search/Header';

test('Header component renders correctly', () => {
  // Mock the required props
  const selectedTopic = 'Sample Topic';
  const setTopic = jest.fn();
  const selectedClaim = 'Sample Claim';
  const setClaim = jest.fn();
  const topics = ['Topic 1', 'Topic 2', 'Topic 3'];
  const claims = ['Claim 1', 'Claim 2', 'Claim 3'];
  const onGo = jest.fn();
  const onAll = jest.fn();

  // Render the Header component with the mock props
  render(
    <Header
      selectedTopic={selectedTopic}
      setTopic={setTopic}
      selectedClaim={selectedClaim}
      setClaim={setClaim}
      topics={topics}
      claims={claims}
      onGo={onGo}
      onAll={onAll}
    />
  );

  // Check if the component renders the expected content
  expect(screen.getByText('SPEED')).toBeInTheDocument();
  expect(screen.getByText('Topic')).toBeInTheDocument();
  expect(screen.getByText('Claim')).toBeInTheDocument();
  expect(screen.getByText('Go')).toBeInTheDocument();
  expect(screen.getByText('All')).toBeInTheDocument();

  // Simulate interactions such as changing topic and claim selections and clicking buttons
  fireEvent.change(screen.getByRole('combobox', { name: 'Topic' }), {
    target: { value: 'Topic 2' },
  });
  expect(setTopic).toHaveBeenCalledWith('Topic 2');

  fireEvent.change(screen.getByRole('combobox', { name: 'Claim' }), {
    target: { value: 'Claim 3' },
  });
  expect(setClaim).toHaveBeenCalledWith('Claim 3');

  fireEvent.click(screen.getByText('Go'));
  expect(onGo).toHaveBeenCalledTimes(1);

  fireEvent.click(screen.getByText('All'));
  expect(onAll).toHaveBeenCalledTimes(1);
});
