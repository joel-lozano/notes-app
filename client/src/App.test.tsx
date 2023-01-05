import { render, screen, waitFor } from '@testing-library/react';
import mockResponse from './__mocks__/notes-response.json';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
    it('renders', async () => {
        fetchMock.once(JSON.stringify([]));
        render(<App />);
        expect(screen.getByText(/no notes/i)).toBeInTheDocument();
        // await waitFor(() => screen.findByText(/untitled note/i))
    });
});