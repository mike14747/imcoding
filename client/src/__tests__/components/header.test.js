import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../../components/header/header';

describe('Test the header component', () => {
    test('Make sure the logo is displayed and is a home link', () => {
        render(<Router>
            <Header />
        </Router>);

        const homeLink = screen.getByRole('link');
        expect(homeLink).toHaveAttribute('href', '/');

        const logo = screen.getByRole('img');
        expect(logo).toHaveAttribute('src', 'images/imcoding_logo.png');
        expect(logo).toHaveAttribute('alt', 'Home');

        // screen.debug();
    });
});
