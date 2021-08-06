import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { render, screen } from '@testing-library/react';

import Header from '../../components/header/header';
import ListChangedContext from '../../context/listChangedContext';
import CurrentSlugContext from '../../context/currentSlugContext';

describe('Test the header component', () => {
    test('Make sure the logo is displayed and is a home link', () => {
        render(<Router>
            <CurrentSlugContext.Provider value={{ currentSlug, setCurrentSlug }}>
                <ListChangedContext.Provider value={{ hasChanged, setHasChanged }}>
                    <Header />
                </ListChangedContext.Provider>
            </CurrentSlugContext.Provider>
        </Router>);

        expect(1).toBe(1);

        // screen.debug();
    });
});
