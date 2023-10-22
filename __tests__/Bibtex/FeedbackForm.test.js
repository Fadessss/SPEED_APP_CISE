import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackForm from '../../components/Bibtex/FeedbackForm';

// Test case: FeedbackForm component renders correctly
test('FeedbackForm component renders correctly', () => {
    // Mocked feedback data to be displayed in the component
    const displayMessage = {
        entryType: 'Sample Entry Type',
        citationKey: 'https://example.com/sample-citation-key',
        entryTags: {
            title: 'Sample Title',
            abstract: 'Sample Abstract',
        },
    };

    // Render the FeedbackForm component with the provided displayMessage
    render(<FeedbackForm displayMessage={displayMessage} />);

    // Check if the component renders the expected content
    expect(screen.getByText('File Uploaded')).toBeInTheDocument();
    expect(screen.getByText(/Bibliographic Data:/i)).toBeInTheDocument();
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Entry Type/i)).toBeInTheDocument();
    expect(screen.getByText('Citation Key:')).toBeInTheDocument();

    // Fetching the link and checking its text and href
    const linkElement = screen.getByRole('link', { name: /https:\/\/example.com\/sample-citation-key/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('https://example.com/sample-citation-key');

    expect(screen.getByText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Abstract:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Abstract/i)).toBeInTheDocument();
});
