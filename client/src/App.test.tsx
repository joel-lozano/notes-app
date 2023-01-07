import { render, screen, within, waitFor } from '@testing-library/react';
import mockResponses from './__mocks__/mockResponses.json';
import userEvent from '@testing-library/user-event';
import fetchMock from 'jest-fetch-mock';
import Note from './types/Note';
import App from './App';

/*
 * The states of all other components depend on the state of the
 * app component. Therefore, all tests are located within this app
 * component test file.
*/

function setup(mockResponse: Array<Note>): void {
    fetchMock.once(JSON.stringify(mockResponse));
    render(<App />);
}

describe('Notes list', () => {
    it('renders create new note button', async () => {
        setup([]);
        const createNoteLabel = /create/i;
        const notesList = screen.getByRole('list');

        expect(within(notesList).getByText(createNoteLabel)).toBeInTheDocument();
        await waitFor(() => within(notesList).findByText(createNoteLabel));
    });

    it('updates display on render', async () => {
        setup(mockResponses.getOneNote);
        const testNoteTitle = /untitled/i;
        const notesList = screen.getByRole('list');

        expect(within(notesList).queryByText(testNoteTitle)).not.toBeInTheDocument();
        await waitFor(() => within(notesList).findByText(testNoteTitle));
    });
});

describe('Create note button', () => {
    it('adds note to list and focuses on click', async () => {
        setup([]);
        const notesList = screen.getByRole('list');
        fetchMock.once(JSON.stringify(mockResponses.createNote));
        fetchMock.once(JSON.stringify(mockResponses.getOneNote));
        
        userEvent.click(within(notesList).getByText(/create/i));
        await waitFor(() => within(notesList).findByText(/untitled/i));

        const [ focusedTitle, focusedContent ] = screen.getAllByRole('textbox');
        await waitFor(() => within(focusedTitle).findByText(/untitled/i));
        await waitFor(() => within(focusedContent).findByText(/empty/i));
    });
});

describe('Note editor', () => {
    const DEFAULT = {
        'TITLE': /no notes/i,
        'CONTENT': /create one/i
    };

    it('renders default message', async () => {
        setup([]);
        const [ title, content ] = screen.getAllByRole('textbox');

        expect(within(title).getByText(DEFAULT.TITLE)).toBeInTheDocument();
        expect(within(content).getByText(DEFAULT.CONTENT)).toBeInTheDocument();

        await waitFor(() => within(title).findByText(DEFAULT.TITLE));
        await waitFor(() => within(content).findByText(DEFAULT.CONTENT));
    });

    it('updates display on render', async () => {
        setup(mockResponses.getOneNote);
        const [ title, content ] = screen.getAllByRole('textbox');

        await waitFor(() => within(title).findByText(/untitled/i));
        await waitFor(() => within(content).findByText(/empty/i));
    });
});