import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Tabs from './Tabs';
import { fetchTabData } from '../utils/fetchData';
import '@testing-library/jest-dom/extend-expect';

jest.mock('../utils/fetchData');

describe('Tabs Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders tabs and loads data for the active tab', async () => {
        fetchTabData.mockResolvedValueOnce({ title: 'Tab 1 Title', content: 'Tab 1 Content' });

        render(<Tabs />);

        expect(screen.getByText('Tab 1')).toBeInTheDocument();
        expect(screen.getByText('Tab 2')).toBeInTheDocument();
        expect(screen.getByText('Tab 3')).toBeInTheDocument();
        expect(screen.getByText('Tab 4')).toBeInTheDocument();


        await waitFor(() => expect(screen.getByText('Tab 1 Title')).toBeInTheDocument());
        expect(screen.getByText('Tab 1 Content')).toBeInTheDocument();
    });

    test('handles tab switch and data fetch', async () => {
        fetchTabData
            .mockResolvedValueOnce({ title: 'Tab 1 Title', content: 'Tab 1 Content' })
            .mockResolvedValueOnce({ title: 'Tab 2 Title', content: 'Tab 2 Content' });

        render(<Tabs />);

        await waitFor(() => expect(screen.getByText('Tab 1 Title')).toBeInTheDocument());

        fireEvent.click(screen.getByText('Tab 2'));


        await waitFor(() => expect(screen.getByText('Tab 2 Title')).toBeInTheDocument());
        expect(screen.getByText('Tab 2 Content')).toBeInTheDocument();
    });

    test('displays an error message if fetch fails', async () => {
        fetchTabData.mockRejectedValueOnce('Error fetching data');

        render(<Tabs />);

        await waitFor(() => expect(screen.getByText('Error fetching data')).toBeInTheDocument());
    });
});
