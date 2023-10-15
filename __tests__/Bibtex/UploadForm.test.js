import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import UploadForm from '../../components/Bibtex/UploadForm';

test('UploadForm component renders correctly', () => {
  // Mock the callback function
  const onFileChange = jest.fn();

  // Render the UploadForm component with the mock callback function
  render(<UploadForm onFileChange={onFileChange} />);

  // Check if the component renders the expected content
  expect(screen.getByLabelText('Upload a file')).toBeInTheDocument();
  
  // Simulate a file upload
  const file = new File(['sample content'], 'sample.txt', { type: 'text/plain' });
  const fileInput = screen.getByLabelText('Upload a file'); 
  fireEvent.change(fileInput, { target: { files: [file] } });

  // Check if the file input change triggers the callback function with the selected file
  expect(onFileChange).toHaveBeenCalledTimes(1);
  expect(onFileChange).toHaveBeenCalledWith(file);
});