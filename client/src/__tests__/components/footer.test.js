import React from 'react';
import { render, screen } from '@testing-library/react';
import { expect } from '@jest/globals';

import Footer from '../../components/footer/footer';

describe('Test the footer component', () => {
    jest.resetModules();

    test('Make sure all 3 parts of the footer render', () => {
        render(<Footer />);

        console.log('process.env.REACT_APP_EMAIL:', process.env.REACT_APP_EMAIL);

        expect(screen.getByText('Let me know if you have any questions, comments or info on how to improve any of the code in these articles.')).toBeInTheDocument();
        expect(screen.getByText(/I'd love to know how you do it!/)).toBeInTheDocument();

        const contact = screen.getByRole('link');
        expect(contact).toHaveTextContent(/Contact Me/i);
        expect(contact).toHaveAttribute('href', 'mailto:mike4747@oh.rr.com');

        expect(screen.getByText('© 2020 imcoding')).toBeInTheDocument();
    });
});
