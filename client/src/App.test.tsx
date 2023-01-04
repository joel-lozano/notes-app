import { render, screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import mockResponse from './__mocks__/notes-response.json';
import fetchMock from 'jest-fetch-mock';
import '@testing-library/jest-dom';
import App from './App';

describe('App', () => {
    it('renders', () => {
        fetchMock.once(JSON.stringify(mockResponse));
        act(() => {
            render(<App />);
        });
        expect(screen.getByText(/create new note/i)).toBeInTheDocument();
    });
});