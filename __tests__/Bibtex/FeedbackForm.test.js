import React from 'react';
import { render, screen } from '@testing-library/react';
import FeedbackForm from '../../components/Bibtex/FeedbackForm';

test('FeedbackForm component renders correctly', () => {
    const displayMessage = {
        entryType: 'Sample Entry Type',
        citationKey: 'https://example.com/sample-citation-key',
        entryTags: {
            title: 'Sample Title',
            abstract: 'Sample Abstract',
        },
    };

    render(<FeedbackForm displayMessage={displayMessage} />);

    expect(screen.getByText('File Uploaded')).toBeInTheDocument();
    expect(screen.getByText(/Bibliographic Data:/i)).toBeInTheDocument();
    expect(screen.getByText(/Type:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Entry Type/i)).toBeInTheDocument();
    expect(screen.getByText('Citation Key:')).toBeInTheDocument();

    // Fetching the link and checking its text
    const linkElement = screen.getByRole('link', { name: /https:\/\/example.com\/sample-citation-key/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.getAttribute('href')).toBe('https://example.com/sample-citation-key');

    expect(screen.getByText(/Title:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Title/i)).toBeInTheDocument();
    expect(screen.getByText(/Abstract:/i)).toBeInTheDocument();
    expect(screen.getByText(/Sample Abstract/i)).toBeInTheDocument();
});